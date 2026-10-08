# Capture harness

Renders the script's real **settings page** and **Quick Bar** in headless Chrome at
the emulator's 540x960 at 240dpi (a 360x640 CSS viewport at density 1.5; output 1080x1920 at the default 2x scale, same layout), so the
screenshots and video frames in [MEDIA_PLAN.md](../MEDIA_PLAN.md) need no
emulator or phone.

It loads the script repo's built `dist/index.html` and `dist/quickbar.html`
unchanged, and stubs only the host's `JavaScriptInterface`. A scene decides what
the "engine" reports (chip values, coin readout, which cells are pending), so the
pages draw exactly as they would in a round.

```bash
npm run capture                          # every scene -> capture/out/<id>.png
npm run capture -- shot-quickbar-hero    # one scene
npm run capture -- --list
npm run capture -- --scale 1             # native 540x960
npm run capture -- --publish             # also static/media/<id>.webp (cwebp -q 90)
```

`--publish` fills the site's media slot for that id, so only use it for ids you
are happy to ship as a render.

## Setup

- The script repo built beside this one: `../tsum-tsum-script/app.gap.Tsum/dist/`
  (override with `TSUM_SCRIPT_DIR`). Rebuild it first so the pages are current.
- Google Chrome (override with `CHROME_PATH`).

## Adding a scene

Add an entry to [scenes.mjs](scenes.mjs). `id` is the media-plan id. `page` is
`settings` (full screen) or `quickbar` (the strip along the bottom edge, over a
backdrop). `engine` is what `quickBarState()` returns; `presets`, `settings`,
`theme` and `storage` seed localStorage. `steps(h)` drives the page (`h.tab`, `h.click`,
`h.clickText`, `h.type`, `h.gapState`) and may return `h.clipTo(first, last)` for a
close-up of a band of rows. Other options: `strip: false` (backdrop only), `banner`
(the host's toast over the game), `expandedPx` (window height when a sheet opens),
`noClipboard` (so a Copy shows the page's own code and QR).

`cropTop` (CSS px) trims the top of a shot; the shared Quick Bar scenes use it to remove the
backdrop capture's floating bar, which shows an older version.

Quick Bar scenes sit over `backdrops/<file>` when a scene names one. Put **your own
gameplay captures** there (the plan forbids other game art); `board-midround.png` is the default mid-round board; with none the strip
sits over a plain gradient.

## Not the device

Chrome here is newer than the device's WebView, which lays out flex items a little
differently. The look is the same; check one frame against the emulator before
trusting pixel-level layout of a tight row.
