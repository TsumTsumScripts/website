// Renders the script's real settings page and Quick Bar in headless Chrome, with
// the host's `JavaScriptInterface` stubbed, so screenshots and video frames need
// no emulator. The pages are the script repo's built `dist/` files, not a copy.

import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';
import puppeteer from 'puppeteer-core';

const here = path.dirname(fileURLToPath(import.meta.url));
export const root = path.resolve(here, '..');

export const SCRIPT_DIR = path.resolve(
  process.env.TSUM_SCRIPT_DIR || path.join(root, '..', 'tsum-tsum-script', 'app.gap.Tsum'));
/** The service starter's page, served by tsum-stats --starter; read from its source. */
export const STARTER_SITE = path.resolve(
  process.env.TSUM_STATS_DIR || path.join(root, '..', 'tsum-stats'), 'internal', 'starter', 'site');
const CHROME = process.env.CHROME_PATH
  || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

/**
 * The emulator is 540x960 px at 240dpi, which is a density of 1.5, so the WebView
 * lays the pages out in a 360x640 CSS px viewport. `scale` 1 is the emulator's own
 * 540x960 output; 2 is 1080x1920 with the same layout.
 */
export const DENSITY = 240 / 160;
export const WIDTH = 540 / DENSITY;
export const HEIGHT = 960 / DENSITY;
/** The band the host gives the Quick Bar, and the window it grows to for a sheet. */
const STRIP_PX = 62;
const EXPANDED_PX = 560;

const BACKDROPS = path.join(here, 'backdrops');
const CACHE = path.join(here, '.cache');

/**
 * Installed before any page script runs, in every frame. Answers the few bridge
 * calls the pages make from `window.__capture`, so a scene decides what the
 * "engine" reports without there being one.
 */
function installBridge(cfg) {
  window.__capture = cfg;
  window.__capture.calls = [];
  try {
    for (const [key, value] of Object.entries(cfg.storage || {})) {
      localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
    }
  } catch (e) { /* storage blocked: the pages fall back to defaults */ }

  window.JavaScriptInterface = {
    runScript(script) { window.__capture.calls.push(script); },
    runScriptCallback(script, callback) {
      const cap = window.__capture;
      cap.calls.push(script);
      let reply = 'null';
      if (script.indexOf('quickBarState(') === 0) {
        reply = JSON.stringify(cap.engine || {active: false});
      } else if (script.indexOf('quickBarApply(') === 0) {
        try {
          const [key, value] = new Function('return [' + script.slice(script.indexOf('(') + 1, -1) + ']')();
          if (cap.engine) { cap.engine[key] = value; }
        } catch (e) { /* an unreadable apply is simply not mirrored */ }
        reply = '{"ok":true}';
      } else if (typeof window[callback] !== 'function') {
        return;
      }
      setTimeout(() => { if (typeof window[callback] === 'function') { window[callback](reply); } }, 0);
    },
    showMenu() {},
    hideMenu() {},
    setClipboard(text) { window.__capture.clipboard = text; },
    getClipboard() { return window.__capture.clipboard || ''; },
    setQuickBarExpanded(expanded) {
      if (window.parent !== window) { window.parent.postMessage({qbExpanded: !!expanded}, '*'); }
    },
    setQuickBarHotspot() {},
    broadcast() {},
  };
  // The host's clipboard succeeding hides the page's own fallback (the code and QR).
  if (cfg.noClipboard) {
    delete window.JavaScriptInterface.setClipboard;
    delete window.JavaScriptInterface.getClipboard;
  }
}

/** The Quick Bar sits along the bottom of the screen over the game, in an iframe. */
function writeFrame(backdrop, strip, banner, expandedPx) {
  fs.mkdirSync(CACHE, {recursive: true});
  const file = path.join(CACHE, 'frame.html');
  const image = backdrop ? `url(${pathToFileURL(path.resolve(BACKDROPS, backdrop)).href})`
    : 'linear-gradient(160deg, #2b3a55 0%, #1a2233 55%, #10151f 100%)';
  fs.writeFileSync(file, `<!doctype html><meta charset="utf-8">
<style>
  html, body { margin: 0; width: ${WIDTH}px; height: ${HEIGHT}px; overflow: hidden; }
  body { background: ${image} center / cover no-repeat; position: relative; }
  .banner { position: absolute; left: 50%; top: 150px; transform: translateX(-50%); padding: 7px 14px;
    border-radius: 999px; background: rgba(10, 14, 22, 0.88); color: #fff; white-space: nowrap;
    font: 600 13px/1.2 system-ui, sans-serif; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4); }
  iframe { position: absolute; left: 0; bottom: 0; width: ${WIDTH}px; height: ${STRIP_PX}px;
    border: 0; background: transparent; }
</style>
${banner ? `<div class="banner">${banner}</div>` : ''}
<iframe id="qb" ${strip ? '' : 'hidden '}src="${pathToFileURL(path.join(SCRIPT_DIR, 'dist', 'quickbar.html')).href}"></iframe>
<script>
  addEventListener('message', (e) => {
    if (e.data && 'qbExpanded' in e.data) {
      document.getElementById('qb').style.height = (e.data.qbExpanded ? ${expandedPx} : ${STRIP_PX}) + 'px';
    }
  });
</script>`);
  return file;
}

export async function launch() {
  if (!fs.existsSync(CHROME)) { throw new Error(`Chrome not found at ${CHROME}; set CHROME_PATH.`); }
  if (!fs.existsSync(path.join(SCRIPT_DIR, 'dist', 'index.html'))) {
    throw new Error(`No built pages in ${SCRIPT_DIR}/dist; build the script or set TSUM_SCRIPT_DIR.`);
  }
  return puppeteer.launch({executablePath: CHROME, headless: true, args: ['--hide-scrollbars']});
}

/**
 * Opens a scene's page and returns a handle for its steps.
 * `scene.page` is 'settings' (full screen) or 'quickbar' (strip over a backdrop).
 */
export async function open(browser, scene, scale) {
  if (scene.page === 'starter') { return openStarter(browser, scene, scale); }
  const page = await browser.newPage();
  await page.setViewport({width: WIDTH, height: HEIGHT, deviceScaleFactor: DENSITY * scale});
  const cfg = {
    storage: {
      tsumtsumtheme: scene.theme || 'dark',
      tsumtsumlanguage: 'en-US',
      ...(scene.presets ? {tsumtsumpresets: scene.presets} : {}),
      ...(scene.settings ? {tsumtsumsettings2: scene.settings} : {}),
      ...(scene.storage || {}),
    },
    engine: scene.engine,
    noClipboard: !!scene.noClipboard,
  };
  await page.evaluateOnNewDocument(installBridge, cfg);
  const url = scene.page === 'quickbar'
    ? pathToFileURL(writeFrame(scene.backdrop, scene.strip !== false, scene.banner, scene.expandedPx || EXPANDED_PX)).href
    : pathToFileURL(path.join(SCRIPT_DIR, 'dist', 'index.html')).href;
  await page.goto(url, {waitUntil: 'load'});

  const target = scene.page === 'quickbar'
    ? await (await page.waitForSelector('#qb')).contentFrame()
    : page;

  const h = {
    page, target,
    sleep: (ms) => new Promise((r) => setTimeout(r, ms)),
    /** Click the first visible element matching `selector` whose text contains `text`. */
    async clickText(selector, text) {
      const ok = await target.evaluate((sel, t) => {
        const el = [...document.querySelectorAll(sel)].find(
          (e) => e.offsetParent !== null && e.textContent.trim().includes(t));
        if (el) { el.click(); }
        return !!el;
      }, selector, text);
      if (!ok) { throw new Error(`No visible ${selector} containing "${text}"`); }
      await h.sleep(150);
    },
    async click(selector) {
      await target.waitForSelector(selector, {visible: true});
      await target.click(selector);
      await h.sleep(150);
    },
    /** The host pushing the strip's state, as `onGapState` receives it. */
    async gapState(state) {
      await target.evaluate((json) => onGapState(json), JSON.stringify({
        active: true, paused: true, visible: true, stripHeight: STRIP_PX, ...state}));
      await h.sleep(100);
    },
    async tab(name) {
      await h.clickText('.tab-button', name);
      await h.sleep(150);
    },
    async type(selector, text) {
      await target.waitForSelector(selector, {visible: true});
      await target.type(selector, text);
    },
    /**
     * A close-up: scrolls to the first element and returns the full-width band
     * from it to the last, for `shot`. An element is a CSS selector, or
     * `title:Chains` for the group heading with that text.
     */
    async clipTo(first, last = first, pad = 6) {
      const band = await target.evaluate((a, b, padding) => {
        const find = (sel) => sel.indexOf('title:') === 0
          ? [...document.querySelectorAll('.group-title')].find((e) => e.textContent.trim() === sel.slice(6))
          : document.querySelector(sel);
        const from = find(a);
        const to = find(b);
        if (!from || !to) { return null; }
        // The app bar and tab strip stay put while the page scrolls; a close-up is of rows only.
        for (const chrome of document.querySelectorAll('.tab-strip, .app-bar, header')) {
          chrome.style.display = 'none';
        }
        from.scrollIntoView({block: 'start'});
        const top = from.getBoundingClientRect().top;
        const bottom = to.getBoundingClientRect().bottom;
        return {y: Math.max(0, top - padding) + scrollY, bottom: bottom + padding + scrollY};
      }, first, last, pad);
      if (!band) { throw new Error(`clipTo: nothing matches ${first} / ${last}`); }
      await h.sleep(150);
      if (process.env.CAPTURE_DEBUG) { console.error(first, last, JSON.stringify(band)); }
      return {x: 0, y: band.y, width: WIDTH, height: Math.min(HEIGHT, band.bottom - band.y)};
    },
    async shot(file, clip) {
      await h.sleep(250);
      await page.screenshot({path: file, type: 'png', captureBeyondViewport: false, ...(clip ? {clip} : {})});
    },
    async close() { await page.close(); },
  };
  return h;
}

/** The starter is a desktop page: a laptop browser window. */
export const STARTER_WIDTH = 1280;
export const STARTER_HEIGHT = 800;
const STARTER_ORIGIN = 'http://starter.test';

/**
 * Opens the service starter's page as its server would serve it. Its own files come
 * from STARTER_SITE; `/api/starter/<path>` is answered by `scene.api(path, body)`,
 * which returns an object (sent as JSON) or `{stream: [...]}` (sent as the NDJSON an
 * action streams). Fonts still load from Google, as on a real computer.
 */
async function openStarter(browser, scene, scale) {
  if (!fs.existsSync(path.join(STARTER_SITE, 'index.html'))) {
    throw new Error(`No starter page in ${STARTER_SITE}; set TSUM_STATS_DIR.`);
  }
  const page = await browser.newPage();
  await page.setViewport({width: STARTER_WIDTH, height: STARTER_HEIGHT, deviceScaleFactor: scale});
  await page.setRequestInterception(true);
  const types = {'.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml'};
  page.on('request', (req) => {
    const url = new URL(req.url());
    if (url.origin !== STARTER_ORIGIN) { req.continue(); return; }
    if (url.pathname.startsWith('/api/starter/')) {
      const rel = url.pathname.slice('/api/starter/'.length) + url.search;
      const body = req.postData() ? JSON.parse(req.postData()) : null;
      const reply = scene.api(rel, body) ?? {};
      if (reply.stream) {
        req.respond({status: 200, contentType: 'application/x-ndjson',
          body: reply.stream.map((m) => JSON.stringify(m) + '\n').join('')});
      } else {
        req.respond({status: 200, contentType: 'application/json', body: JSON.stringify(reply)});
      }
      return;
    }
    const rel = url.pathname.replace(/^\/starter\/?/, '') || 'index.html';
    const file = path.join(STARTER_SITE, rel);
    if (!file.startsWith(STARTER_SITE) || !fs.existsSync(file)) { req.respond({status: 404, body: ''}); return; }
    req.respond({status: 200, contentType: types[path.extname(file)] || 'application/octet-stream',
      body: fs.readFileSync(file)});
  });
  await page.goto(`${STARTER_ORIGIN}/starter/`, {waitUntil: 'networkidle0'});
  await page.evaluate(() => document.fonts.ready);

  const h = {
    page, target: page,
    sleep: (ms) => new Promise((r) => setTimeout(r, ms)),
    async click(selector) {
      await page.waitForSelector(selector, {visible: true});
      await page.click(selector);
      await h.sleep(300);
    },
    /** Scrolls so `selector`'s top sits `offset` CSS px below the window's top. */
    async scrollTo(selector, offset = 0) {
      await page.evaluate((sel, off) => {
        document.documentElement.style.scrollBehavior = 'auto';
        scrollTo(0, document.querySelector(sel).getBoundingClientRect().top + scrollY - off);
      }, selector, offset);
      await h.sleep(200);
    },
    async shot(file) {
      await h.sleep(250);
      await page.screenshot({path: file, type: 'png'});
    },
    async close() { await page.close(); },
  };
  return h;
}
