---
title: Setup and first build
description: Clone, install, type-check, build, and push to a device.
---

# Setup and first build

## Prerequisites

- **Node.js 20.15 or newer** (the package's `engines` field). The build and every
  check run in Node on your PC; nothing needs to be installed on the device.
- **git**, with `core.autocrlf` off on Windows. The repository pins LF line
  endings through `.gitattributes` and `.editorconfig` — see
  [Windows and line endings](../contributing/windows-and-line-endings).
- **adb** on your PATH if you want to push to a device or emulator. Optional
  until you do.
- The **General Automation Platform** app on an Android device or emulator, with
  the game installed, to see a change work for real.

You do **not** need anything beyond the above. A command the source comments
mention but `package.json` does not define belongs to the development toolkit,
which is private, and nothing here runs it.

## Clone and install

The repository has one package, `app.gap.Tsum/`. Everything runs from there.

```bash
git clone https://github.com/TsumTsumScripts/tsum-tsum-script.git
cd tsum-tsum-script/app.gap.Tsum
npm install
```

## Type-check

```bash
npm run typecheck
```

Runs all four TypeScript compilations — the game bundle, the settings page,
the Quick Bar page (why there are three is [The bundle](../architecture/the-bundle))
and `src/gapWorkflow.ts` on its own. `npm run typecheck:game`, `typecheck:settings`,
`typecheck:quickbar` and `typecheck:workflow` run one each. The game bundle is `strict: true` and clean; keep it that way.

## Build

```bash
npm run build
```

The build is a dependency graph of steps that run concurrently
([Build and release](../architecture/build-and-release)). It writes:

| Output | What |
|:--|:--|
| `build/index.js` | The concatenated game bundle, readable, with comments stripped. The offline tools load this one. |
| `dist/index.js` | The same bundle with whitespace removed — what ships. Nothing is renamed or rewritten. |
| `dist/index.html` | The settings page with its CSS and script inlined, so it needs no network. |
| `dist/quickbar.html` | The Quick Bar page, inlined the same way. |
| `dist/tsums.dat`, `tsumsCollection.dat`, `tsumNames.dat` | The tsum libraries, copied without their headers. |
| `dist/gap-env.json`, `gap-backup.json` | What the app reads beside the script: env vars and backed-up page keys. |
| `dist/LICENSE`, `dist/NOTICE` | Travel with the archive. |
| `dist/gap-signature.json` | Only when a maintainer builds with the signing key. Your builds are unsigned, which is fine for development ([Trust and access](../architecture/trust-and-access#why-a-release-is-signed)). |
| `TsumTsum-Alpha-5.0a2.zip` + `.sha256` | The release archive, named from `config.json` (channel) and `package.json` (version), and its digest. |

The build also regenerates `PAGE_DISPATCH.md` and `EVENTS.md`, runs the
dispatch traces and the code-map check (all *optional*: they report and never
block), and runs `live:check`, which is required.

Pick a channel with `npm run build -- --channel Beta`; the wrappers
`build.sh -c Beta` and `build.ps1 -Channel Beta` do the same. The channel
decides which unfinished skills and settings the build offers.

The package's scripts, as they are on `main`:

```json reference title="app.gap.Tsum/package.json"
https://github.com/TsumTsumScripts/tsum-tsum-script/blob/main/app.gap.Tsum/package.json#L6-L30
```

## Put it on a device

Three ways, from quickest to most official:

1. **`npm run buildAndAdb`** builds, then pushes to its own `scripts/DEV`
   folder ("Tsum Tsum DEV" in the app), leaving the installed script alone.
   This is the everyday loop. `npm run adb` pushes an existing `dist/` over
   the installed copy instead:
   `/sdcard/Download/GameAutomationPlatform/scripts/Tsum Tsum Scripts/Tsum Tsum/Tsum-Tsum/`.
2. **`debug_deploy.ps1`** builds and pushes over the *installed* script's
   folder, which it derives from `config.json`, so your build lands on top of
   the release the app already has rather than beside it. This is the debug
   loop.
3. **`npm run release:<channel>`** publishes to the catalogue, which is what a
   user installs from — [Release to the catalogue](../publishing/release-to-catalogue).

Then press Play in the app. A development copy starts with every access
switch off, like any script; turn on environment variables and network access
on its Library card only if you are working on Share round stats. The Log panel shows the script's output; the
[Debug tab](../reference/settings#debug) of the settings page
turns on more.

## Check your work

Before opening a pull request, run the checks the build runs, as gates:

```bash
npm run typecheck
npm run pages:docs:check    # PAGE_DISPATCH.md is current
npm run events:docs:check   # EVENTS.md is current
npm run dispatch:eval       # nothing moved in the dispatch/scheduler traces
npm run map:check           # CODEMAP.md matches the tree
npm run i18n:check          # every language has what it needs
npm run live:check          # every setting says when it reaches a running script
```

[Contributing → Workflow](../contributing/workflow) says what each catches and
what to do when one fails.
