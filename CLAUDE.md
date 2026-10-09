# Tsum Tsum website

Docusaurus site for the Tsum Tsum script: felt-styled landing page, features guide
(`/features/<key>`), changelog, starter tool page and contributor docs (`/docs`).
`README.md` has the content layout and the MDX writing rules; read it before editing docs.

## Commands

- `npm start` / `npm run build` / `npm run serve`: dev, production build, serve `build/`.
  Both start and build run `npm run sync` first.
- `npm run typecheck` (tsc), `npm run refs:check` (code references resolve, media ids declared).
- `npm run media:plan`: regenerate `MEDIA_PLAN.md` and the id-to-file index. Run it after
  adding or removing anything in `static/media/`.
- `npm run contrast`: colour-contrast gate over the built site (run `npm run build` first). The rule
  is in `CONTRAST.md`: text 7:1 (large 4.5:1), focus rings and field edges 3:1. Paused: run it only when
  the user asks.
- `npm run capture`: render screenshots from the script's real pages (see below).

## Sibling repo

The script repo sits beside this one (`../tsum-tsum-script`, or `TSUM_SCRIPT_REPO` /
`TSUM_SCRIPT_DIR`). `sync` and `refs:check` read it, and the capture harness renders its built
`app.gap.Tsum/dist/` pages. Rebuild the script before capturing so the pages are current.

## Media

- Every screenshot, clip and video is declared in `src/data/features.js` or `landing.js`.
  `MEDIA_PLAN.md` and `src/data/mediaFiles.generated.json` are generated: never edit them by hand.
- A file at `static/media/<id>.<ext>` replaces that id's placeholder with no page edit
  (`src/components/felt/Media.tsx`). Stills show whole at their own proportions; only videos
  keep the slot's fixed aspect.
- Game art: only our own gameplay captures. Test account only: no friend names, ids or purchases.

## Capture harness (`capture/`)

Renders the settings page and Quick Bar in headless Chrome at the emulator's 540x960 at 240dpi
(a 360x640 CSS viewport, density 1.5). `--scale 2` (default) writes 1080x1920. The host's
`JavaScriptInterface` is stubbed; each scene in `capture/scenes.mjs` sets what the engine reports.

- `npm run capture [-- <id> ...]` writes `capture/out/<id>.png` (git-ignored).
- `--publish` also writes `static/media/<id>.webp`; run `npm run media:plan` afterwards.
- Backdrops in `capture/backdrops/` are game captures and stay local (git-ignored). Use the
  mid-round board from `../debug`; crop off the host's floating bar (`cropTop`), which shows an
  older version.
- Output is a render, not a device capture. Do not describe it as one.
- Not capturable here: anything in the game itself, terminals, spreadsheets, the remote phone app.

## Video (`video/`)

Remotion project, one composition per `vid-*` id, 1080x1920 at 30 fps. It has its own
`package.json`: run `npm install` inside `video/` once.

- `npm run video:studio` previews; `npm run video:render -- <id> ...` renders to `video/out/<id>.mp4`
  (git-ignored). `--publish` also copies it to `static/media/<id>.mp4`; run `npm run media:plan` after.
- `yt-skills` and `yt-autoplay` are 16:9 (1920x1080) versions for YouTube regular videos: the same cuts,
  words in a left panel. They are never published to the site. The results screen shows the account's
  currency and mail count, so `ResultMask` covers it; keep it on any cut that includes that screen.
- `npm --prefix video run thumbs` renders the YouTube thumbnails (1280x720 JPEG) to `video/out/thumbs/`.
- Inputs are the trimmed cuts in `capture/raw/cuts/` (git-ignored; `cuts.json` there has tap and
  event times). `video/scripts/footage.mjs` copies them into `video/public/footage/` first.
- Shared elements live in `video/src/shared/` (felt `Patch`, lower-third, ring pulse, callout,
  counter). Colours come from `video/src/theme.ts`, which mirrors `felt.css`: text uses a patch's `ink`.

## Conventions

- Commit as each task finishes, once typecheck, build and any relevant check (`refs:check`) pass,
  without waiting to be asked. One commit per logical change: when a file mixes changes from separate tasks, stage them apart. Do not push.
- Visual changes: show the user screenshots as the work goes and at the end, with before-and-after
  comparisons at the widths that matter (phone and desktop). Take the "before" shots first, before
  changing anything; screenshots you view yourself are not visible to the user, so send them.
- Colours: follow `CONTRAST.md`. Use a patch's `var(--ink)` on its fill, no `opacity` on text, and
  docs colours via the Infima variables in `custom.css` and `src/prism/themes.ts`.
- Generated and git-ignored: `docs/reference/generated/`, `src/data/*.generated.json`, `build/`,
  `capture/out/`, `capture/.cache/`. Never edit them.
- Public tree: nothing may name the private toolkit repository or copy host-app code.
