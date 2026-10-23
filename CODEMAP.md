# CODEMAP

Which file owns what, and which document answers a question. The script's own map is
`../tsum-tsum-script/CODEMAP.md`.

```
tsum-tsum-website/
├── docusaurus.config.ts  site config: URL, navbar, footer, Discord invite (discordUrl)
├── sidebars.ts           the /docs sidebar
├── src/                  pages, felt components, theme wrappers, site data
├── docs/                 contributor docs (/docs); reference/generated/ is synced, git-ignored
├── changelog/            prerelease.md, releases.md: Summary blocks the public script repo lacks
├── plugins/              features-routes.js: one route per feature
├── scripts/              sync, refs, media-plan, contrast and baseline tools
├── static/               media/<id>.<ext> (screenshots, clips), img/, CNAME
├── capture/              headless-Chrome renders of the script's settings page and Quick Bar
├── video/                Remotion project (own package.json): vid-*, yt-*, thumbnails
└── .github/workflows/    deploy.yml: build + GitHub Pages
```

## Which document answers it

| Question | Document |
|:--|:--|
| Rules, commands, media, capture and video conventions | `CLAUDE.md` |
| Content layout, how code references work, MDX writing rules | `README.md` |
| Every screenshot and clip id, capture conventions, Remotion plan (generated) | `MEDIA_PLAN.md` |
| Placeholders in `/docs` still waiting for an image | `IMAGES_NEEDED.md` |
| The colour-contrast rule (text 7:1, rings and fields 3:1) | `CONTRAST.md` |
| Running the capture harness, its flags and scenes | `capture/README.md` |
| Deploying the site, rollback | `../tools/DEPLOYMENTS.md` § Website |
| The script's code, for the contributor docs | `../tsum-tsum-script/CODEMAP.md`; `docs/reference/code-map.md` is its condensed public copy |

## Finding a name

| Name | Where |
|:--|:--|
| Features guide (`/features/<key>`, tabs How to use / Settings / Screenshots / Video) | `src/components/FeaturesGuide.tsx`; routes `plugins/features-routes.js`; content `src/data/features.js` |
| Landing page, its hero and clips | `src/pages/index.tsx`; data `src/data/landing.js` |
| Changelog page | `src/pages/changelog.tsx`; data `src/data/changelog.generated.json` from `scripts/sync-changelog.js`; line → feature `src/data/featureLinks.js` |
| Starter tool page (per-OS guide, troubleshooting) | `src/pages/starter.tsx` |
| Tsum Tsum Stats page | `src/pages/stats-site.tsx` |
| `Media` (id → real file or placeholder) | `src/components/felt/Media.tsx`; index `src/data/mediaFiles.generated.json` from `scripts/media-plan.js` |
| `ImagePlaceholder` (docs, global MDX) | `src/components/ImagePlaceholder.tsx`, registered in `src/theme/MDXComponents.tsx` |
| Felt kit: `Patch` (`Tone`), `PageHead`, `FeltPage`, `FeltHeader`, `FeltFooter`, `FeltAccent`, `BestSetup`, `DiscordMark` | `src/components/felt/`; styles `src/css/felt.css` |
| Felt vs docs chrome (`useIsDocs`) | `src/components/felt/useIsDocs.ts`, wrappers `src/theme/Navbar/`, `src/theme/Footer/` |
| Docs colours, code colours | `src/css/custom.css` (Infima variables), `src/prism/themes.ts` |
| Synced docs (`EVENTS.md`, `PAGE_DISPATCH.md`, `BACKLOG.md`) | `scripts/sync-docs.js` → `docs/reference/generated/` |
| `reference` code blocks, image ids check | `scripts/check-refs.js` |
| Contrast gate | `scripts/contrast-check.mjs` |
| Baseline build and server (before/after shots) | `scripts/baseline.mjs` |
| Capture scenes, host stub | `capture/scenes.mjs`, `capture/harness.mjs`, `capture/run.mjs` |
| Video compositions | `video/src/Root.tsx`, `video/src/compositions/`; shared parts `video/src/shared/`; colours `video/src/theme.ts`; footage/render/thumbs `video/scripts/` |
| Deploy workflow (`site_ref`, `script_ref`, `build/deploy.json`) | `.github/workflows/deploy.yml` |

## Commands

| Command | What |
|:--|:--|
| `npm start` / `npm run build` / `npm run serve` | Dev on :3000 / production build into `build/` / serve it. Start and build run `npm run sync` first |
| `npm run typecheck` / `npm run refs:check` | tsc / code references resolve and media ids are declared |
| `npm run media:plan` | Regenerate `MEDIA_PLAN.md` and the media index after changing `static/media/` |
| `npm run contrast` | Contrast gate over `build/` (paused: only when asked) |
| `npm run capture [-- <id> ...] [--publish]` | Render scenes to `capture/out/`; `--publish` writes `static/media/<id>.webp` |
| `npm run baseline [-- --at <ref>] [-- --stop]` | Build the tree (or a commit) into `.scratch/baseline/<stamp>/` and serve it on 3001 as the "before" for screenshots; `--stop` ends it |
| `npm run video:studio` / `npm run video:render -- <id> [--publish]` | Remotion preview / render to `video/out/` (`npm install` in `video/` once) |
| `npm --prefix video run thumbs` | YouTube thumbnails to `video/out/thumbs/` |
| `node scripts/sync-changelog.js --prerelease` | Refresh `changelog/prerelease.md` from the script checkout |
| `node scripts/sync-changelog.js --releases` | Refresh `changelog/releases.md` (production Summaries of the latest major); `TSUM_CHANGELOG=<file>` reads another CHANGELOG.md |
| Deploy | GAP Devkit card **Tsum Tsum website** (dispatches `deploy.yml`, rollback); see `../tools/DEPLOYMENTS.md` § Website. A push to `main` also deploys |
