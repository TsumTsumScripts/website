---
title: Release to the catalogue
description: Cut a channel release and publish it where the app downloads from.
---

# Release to the catalogue

A release is a build of one channel, written into the sibling
`tsum-tsum-catalogue` checkout as the files the library's index is built
from. Three commands, one per channel:

```bash
npm run release:alpha
npm run release:beta
npm run release:production
npm run release:alpha -- --dry-run   # show the entry, write nothing
npm run release:alpha -- --yes       # skip the note review (for scripts; needs no terminal)
```

## Before you start

1. **`package.json` carries the version.** Bump it (`npm version 5.0a3
   --no-git-tag-version`, or edit it) — it is the one place the version lives.
2. **`CHANGELOG.md` has a `## [<that version>]` section with a `### Summary`
   block.** There is no `[Unreleased]`: the section named for the version is
   the one that ships, and a missing section or an empty Summary fails the
   release before anything is built. The Summary is the player-facing note —
   one line per *feature*, not per change, and only what a player sees. Later
   work on a feature folds into its existing line. It is laid out as
   `**Additions**` (bullets under an italic `*Area*` line each), then `**Fixes**`,
   and ships — and is announced on Discord — exactly so.
3. The catalogue checkout is beside this repository, at the path
   `config.json`'s `Catalogue` names (`../../tsum-tsum-catalogue/LineTsumTsum`).
4. **The build is signed.** A maintainer releases with the signing key set; the
   release warns loudly without it, and an unsigned release loses what a
   signature gives. Contributors do not release, and never need
   the key ([Trust and access](../architecture/trust-and-access#why-a-release-is-signed)).

## What `config.json` says

| Field | Meaning |
|:--|:--|
| `Game` | Copied into every entry. |
| `Publisher` | The source name the catalogue publishes under (`Tsum Tsum Scripts`), and so the first segment of the installed folder. Changing it moves every player's install. |
| `Catalogue` | Where a release is written, relative to the package. |
| `Channels.<name>` | `Name` (what the app shows), `Archive` (the zip's base name), `Directory` (under `Catalogue`), `Note` (appended to every release note on that channel), `Status` (the lowest `ReleaseStatus` the channel offers: 0 Alpha, 1 Beta, 2 Production). |
| `MessageMaxChars` | The note is read on a phone; over this, the release refuses; `0` turns the check off. |
| `HistoryLimit` | How many builds stay installable (5); older archives are deleted from the catalogue on the next release. |
| `MinHost`, `MaxHost` | The app versions a build runs on (optional, inclusive; a channel may set its own). The app will not download or run a build outside them — raise `MinHost` when the script starts using an API a newer app added. |

```json reference title="app.gap.Tsum/config.json"
https://github.com/TsumTsumScripts/tsum-tsum-script/blob/main/app.gap.Tsum/config.json
```

## What happens

1. **The note is proposed, not taken.** The release prints the Summary bullets
   exactly as the app will render them — a numbered list, the channel's note,
   the character count — and waits: `a` approve, `e` edit in `$VISUAL` /
   `$EDITOR`, `d` deny (nothing is built). A note over the limit or with no
   bullets cannot be approved; edit it until it can. An approved edit is
   offered back to `CHANGELOG.md`, so what shipped and what the repo says
   shipped stay the same text.
2. **The channel is built.**
3. **Four things are written** into `<Catalogue>/<Directory>/`:

   ```
   ../tsum-tsum-catalogue/LineTsumTsum/Beta/
   ├── TsumTsum-Beta-5.0a2.zip     the build
   ├── TsumTsum-Beta-5.0a1.zip     and the ones before it, up to HistoryLimit
   ├── metadata.json              describes the newest build and lists the rest
   └── CHANGELOG.md               every release cut on this channel, newest first
   ```

   `metadata.json`'s top-level fields describe this build — `Game`, `Name`,
   `Version`, `Date`, `Hash` (taken from the bytes just written, so the entry
   cannot describe a different build), `File`, `Message` — and its `Versions`
   array lists this build and the ones before it, so a player can roll back
   from the script's card in the app. Re-publishing a version replaces its
   row and its changelog section rather than adding a second. Archives past
   `HistoryLimit` are deleted; stage those deletions when you commit.
4. **The release tells you what to do next**: check the entry with the
   catalogue's `build-catalogue` script, then commit and push there.

```js reference title="app.gap.Tsum/tools/release/release.js"
https://github.com/TsumTsumScripts/tsum-tsum-script/blob/main/app.gap.Tsum/tools/release/release.js#L39-L68
```

## Finish in the catalogue

```bash
cd ../../tsum-tsum-catalogue
bash build-catalogue.sh       # or build-catalogue.ps1; builds catalogue.json locally
git add -A && git commit -m "Tsum Tsum Beta 5.0a2" && git push
```

`catalogue.json` itself is never committed there: the catalogue's GitHub
Actions workflow rebuilds it on every push to `main`, publishes it to GitHub
Pages, and announces the new version on Discord. Running the
script locally is a check that the entry folds in cleanly, not the publish.

Within a few minutes the Library of every app that has added the source shows the new version — with an
**UPDATE** badge on devices that have an older one installed, unless that
install was *pinned* by choosing its version by name.

## Two paths onto a device, and they are not the same

- `npm run release:*` publishes an archive for the app to **install** from
  the catalogue. This is what a user gets.
- `debug_deploy.ps1` and `npm run adb` push `dist/` straight over the
  catalogue-installed script's folder
  (`scripts/Tsum Tsum Scripts/Tsum Tsum/Tsum-Tsum/` for Production),
  skipping the catalogue. That copy is unsigned, so it loses what a signature
  gives until the next install.
- `npm run buildAndAdb` builds, then pushes to its own `scripts/DEV` folder,
  listed in the app as "Tsum Tsum DEV" beside the installed script. This is the
  everyday debug loop.
