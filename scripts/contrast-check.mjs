// Colour-contrast gate for the whole site. The rule lives in CONTRAST.md.
//
// Serves build/ locally, opens every page in headless Chrome in both colour modes, and
// measures the real rendered colours: every visible text node (foreground over the
// composited background behind it), form-field edges, keyboard focus rings, and the
// hover state of every link and button. Exits 1 when anything is below the rule.
//
//   npm run contrast                  # whole built site (run `npm run build` first)
//   npm run contrast -- /features/hearts /changelog
//   npm run contrast -- --base http://localhost:3000   # a running dev server
//   npm run contrast -- --theme dark --verbose

import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import puppeteer from 'puppeteer-core';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const BUILD = path.join(root, 'build');
const CHROME = process.env.CHROME_PATH
  || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

/** The rule (keep in step with CONTRAST.md). */
export const RULE = {
  text: 7,         // WCAG 1.4.6 (AAA) for normal text
  largeText: 4.5,  // WCAG 1.4.6 (AAA) for large text: >= 24px, or >= 18.66px bold
  ui: 3,           // WCAG 1.4.11: field edges, focus rings
  minPx: 12,       // below this is a warning, whatever the contrast
};

const args = process.argv.slice(2);
const flag = (name) => args.includes(`--${name}`);
const opt = (name) => { const i = args.indexOf(`--${name}`); return i >= 0 ? args[i + 1] : null; };
const valueFlags = new Set(['--base', '--theme']);
const routes = args.filter((a, i) => a.startsWith('/') && !valueFlags.has(args[i - 1]));
const themes = opt('theme') ? [opt('theme')] : ['light', 'dark'];
const verbose = flag('verbose');

function listRoutes() {
  const out = [];
  (function walk(dir) {
    for (const f of fs.readdirSync(dir, {withFileTypes: true})) {
      const p = path.join(dir, f.name);
      if (f.isDirectory()) { if (f.name !== 'assets' && f.name !== 'media') walk(p); continue; }
      if (!f.name.endsWith('.html')) continue;
      let r = '/' + path.relative(BUILD, p).replace(/\\/g, '/').replace(/\.html$/, '');
      r = r.replace(/\/index$/, '') || '/';
      out.push(r);
    }
  })(BUILD);
  return out.sort();
}

function serveBuild() {
  const types = {'.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
    '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.woff2': 'font/woff2', '.ico': 'image/x-icon'};
  const server = http.createServer((req, res) => {
    const url = decodeURIComponent(req.url.split('?')[0]);
    const tries = [url, `${url}.html`, path.join(url, 'index.html')].map((u) => path.join(BUILD, u));
    const file = tries.find((f) => f.startsWith(BUILD) && fs.existsSync(f) && fs.statSync(f).isFile());
    if (!file) { res.writeHead(404, {'content-type': 'text/html'}); res.end(fs.readFileSync(path.join(BUILD, '404.html'))); return; }
    res.writeHead(200, {'content-type': types[path.extname(file)] || 'application/octet-stream'});
    fs.createReadStream(file).pipe(res);
  });
  return new Promise((resolve) => server.listen(0, '127.0.0.1', () => resolve(server)));
}

/** Runs inside the page. Returns raw measurements; the verdict is made here in Node. */
function pageProbe(maxProbe) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 1;
  const ctx = canvas.getContext('2d', {willReadFrequently: true});
  const cache = new Map();
  /** Any CSS colour -> [r,g,b,a]. The canvas normalises every syntax the browser knows. */
  function rgba(css) {
    if (cache.has(css)) return cache.get(css);
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = '#000'; ctx.fillStyle = css;
    ctx.fillRect(0, 0, 1, 1);
    const d = ctx.getImageData(0, 0, 1, 1).data;
    // getImageData premultiplies away alpha detail for translucent fills; recover from the string.
    const m = /rgba?\(([^)]+)\)/.exec(ctx.fillStyle);
    let v;
    if (m) { const p = m[1].split(',').map(Number); v = [p[0], p[1], p[2], p.length > 3 ? p[3] : 1]; }
    else { v = [d[0], d[1], d[2], d[3] / 255]; }
    cache.set(css, v);
    return v;
  }
  const over = (top, under) => {
    const a = top[3];
    return [top[0] * a + under[0] * (1 - a), top[1] * a + under[1] * (1 - a), top[2] * a + under[2] * (1 - a), 1];
  };
  const lum = (c) => {
    const f = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
    return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]);
  };
  const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
  const hex = (c) => '#' + c.slice(0, 3).map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');

  /** Composited colour behind `el`'s own content, plus notes when it can't be known exactly. */
  function backdrop(el) {
    const layers = []; const notes = [];
    for (let n = el; n; n = n.parentElement) {
      const cs = getComputedStyle(n);
      const c = rgba(cs.backgroundColor);
      if (c[3] > 0) layers.push(c);
      const bi = cs.backgroundImage;
      if (/url\(/.test(bi)) notes.push('image');
      else if (/gradient/.test(bi.replace(/repeating-linear-gradient\([^)]*\)/g, ''))) notes.push('gradient');
      if (c[3] === 1) break;
    }
    let bg = [255, 255, 255, 1];
    for (let i = layers.length - 1; i >= 0; i--) bg = over(layers[i], bg);
    return {bg, notes};
  }
  const opacityOf = (el) => { let o = 1; for (let n = el; n; n = n.parentElement) o *= parseFloat(getComputedStyle(n).opacity); return o; };
  const visible = (el) => el.checkVisibility({checkOpacity: true, checkVisibilityCSS: true});
  const sig = (el) => {
    const cls = (typeof el.className === 'string' ? el.className : '').trim().split(/\s+/).filter(Boolean).slice(0, 3).join('.');
    return el.tagName.toLowerCase() + (cls ? '.' + cls : '');
  };
  const where = (el) => {
    const parts = [];
    for (let n = el; n && parts.length < 3; n = n.parentElement) parts.unshift(sig(n));
    return parts.join(' > ');
  };

  function textPairs(scope) {
    const out = [];
    const seen = new Set();
    const walker = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT);
    for (let t = walker.nextNode(); t; t = walker.nextNode()) {
      const text = t.nodeValue.replace(/\s+/g, ' ').trim();
      if (!text) continue;
      const el = t.parentElement;
      if (!el || /^(SCRIPT|STYLE|NOSCRIPT|TEMPLATE)$/.test(el.tagName)) continue;
      if (el.closest('[disabled],[aria-disabled="true"]')) continue;     // WCAG exempts inactive controls
      if (!el.checkVisibility({checkOpacity: true, checkVisibilityCSS: true})) continue;
      const range = document.createRange(); range.selectNodeContents(t);
      const rects = [...range.getClientRects()].filter((r) => r.width > 1 && r.height > 1);
      if (!rects.length) continue;
      const cs = getComputedStyle(el);
      const size = parseFloat(cs.fontSize); const weight = parseInt(cs.fontWeight, 10) || 400;
      const large = size >= 24 || (size >= 18.66 && weight >= 700);
      const fill = cs.webkitTextFillColor && cs.webkitTextFillColor !== cs.color ? cs.webkitTextFillColor : cs.color;
      const {bg, notes} = backdrop(el);
      let fg = rgba(fill);
      fg = [fg[0], fg[1], fg[2], fg[3] * opacityOf(el)];
      const solid = over(fg, bg);
      const key = `${sig(el)}|${hex(solid)}|${hex(bg)}`;
      if (seen.has(key)) continue; seen.add(key);
      out.push({kind: 'text', where: where(el), sample: text.slice(0, 48), fg: hex(solid), bg: hex(bg),
        ratio: ratio(solid, bg), large, size, notes});
    }
    return out;
  }

  window.__ccText = textPairs;
  window.__ccRing = (el) => {
    const cs = getComputedStyle(el);
    const c = rgba(cs.outlineColor);
    // a ring drawn inside the element (negative offset) sits on the element's own fill, otherwise on its parent's backdrop
    const under = backdrop(parseFloat(cs.outlineOffset) < 0 ? el : el.parentElement).bg;
    const ring = over(c, under);
    return {ring: hex(ring), under: hex(under), ratio: ratio(ring, under)};
  };
  const results = [];
  // 1. every visible text node
  results.push(...textPairs(document.body));

  // 2. form fields: an edge or a fill that stands apart from what's behind it
  for (const el of document.querySelectorAll('input:not([type=hidden]):not([type=checkbox]):not([type=radio]),select,textarea')) {
    if (!visible(el) || el.disabled) continue;
    const cs = getComputedStyle(el);
    const parentBg = backdrop(el.parentElement).bg;
    const own = over(rgba(cs.backgroundColor), parentBg);
    const bw = parseFloat(cs.borderTopWidth);
    const edge = bw > 0 && cs.borderTopStyle !== 'none' ? over(rgba(cs.borderTopColor), own) : null;
    const best = Math.max(edge ? ratio(edge, parentBg) : 1, ratio(own, parentBg));
    results.push({kind: 'field', where: where(el), sample: el.placeholder || el.type || el.tagName, fg: edge ? hex(edge) : hex(own),
      bg: hex(parentBg), ratio: best, notes: []});
    if (el.placeholder) { // ::placeholder is not a text node
      const ph = getComputedStyle(el, '::placeholder');
      const phc = rgba(ph.color); const solid = over([phc[0], phc[1], phc[2], phc[3] * parseFloat(ph.opacity || 1)], own);
      const size = parseFloat(cs.fontSize); const weight = parseInt(cs.fontWeight, 10) || 400;
      results.push({kind: 'text', where: where(el) + '::placeholder', sample: el.placeholder, fg: hex(solid), bg: hex(own),
        ratio: ratio(solid, own), large: size >= 24 || (size >= 18.66 && weight >= 700), size, notes: []});
    }
  }

  // 3. interactive elements, one per distinct look, for the focus and hover passes
  const picks = new Map();
  for (const el of document.querySelectorAll('a[href],button,summary,input:not([type=hidden]),select,textarea,[role=tab],[tabindex]:not([tabindex="-1"])')) {
    if (!visible(el) || el.disabled) continue;
    const r = el.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) continue;
    const k = where(el);
    if (!picks.has(k) && picks.size < maxProbe) picks.set(k, el);
  }
  let i = 0;
  const interactive = [];
  for (const el of picks.values()) { el.setAttribute('data-cc', String(i)); interactive.push({id: i, where: where(el)}); i++; }
  return {results, interactive};
}

/** Runs in the page after keyboard focus has landed on `[data-cc=id]`. */
function focusProbe(id) {
  const el = document.querySelector(`[data-cc="${id}"]`);
  if (!el) return null;
  el.scrollIntoView({block: 'center'});
  el.focus();
  if (!el.matches(':focus-visible')) return {skipped: true};
  const cs = getComputedStyle(el);
  const auto = cs.outlineStyle === 'auto'; // the browser's own two-tone ring: visible on any background
  const hasRing = cs.outlineStyle !== 'none' && (auto || parseFloat(cs.outlineWidth) >= 2);
  const ring = cs.outlineColor;
  const shadow = cs.boxShadow && cs.boxShadow !== 'none';
  return {ring, auto, hasRing, shadow, offset: parseFloat(cs.outlineOffset) || 0, width: parseFloat(cs.outlineWidth)};
}

async function main() {
  if (!fs.existsSync(BUILD) && !opt('base')) { console.error('No build/. Run `npm run build` first (or pass --base <url>).'); process.exit(2); }
  const server = opt('base') ? null : await serveBuild();
  const base = opt('base') || `http://127.0.0.1:${server.address().port}`;
  const pages = routes.length ? routes : listRoutes();
  const browser = await puppeteer.launch({executablePath: CHROME, headless: true, args: ['--no-sandbox']});

  // One finding per distinct (kind, element look, colours), listing the pages it shows up on.
  const findings = new Map();
  const warnings = new Map();
  const add = (map, f, page, theme) => {
    const key = `${f.kind}|${f.where}|${f.fg}|${f.bg}|${f.state || ''}`;
    const prev = map.get(key) || {...f, pages: new Set()};
    prev.pages.add(`${page} [${theme}]`);
    map.set(key, prev);
  };
  let measured = 0;

  for (const theme of themes) {
    for (const route of pages) {
      const page = await browser.newPage();
      await page.setViewport({width: 1280, height: 900});
      await page.emulateMediaFeatures([{name: 'prefers-color-scheme', value: theme}, {name: 'prefers-reduced-motion', value: 'reduce'}]);
      await page.evaluateOnNewDocument((t) => { try { localStorage.setItem('theme', t); } catch (e) { /* storage blocked */ } }, theme);
      await page.goto(base + route, {waitUntil: 'networkidle0', timeout: 60000});
      await page.evaluate(() => document.fonts.ready);
      const {results, interactive} = await page.evaluate(pageProbe, 80);

      const judge = (r, state) => {
        const need = r.kind === 'text' ? (r.large ? RULE.largeText : RULE.text) : RULE.ui;
        measured++;
        const f = {...r, need, state};
        if (r.ratio + 1e-9 < need) add(findings, f, route, theme);
        else if (r.kind === 'text' && r.size < RULE.minPx) add(warnings, {...f, why: `text is ${r.size}px (< ${RULE.minPx}px)`}, route, theme);
        else if (r.notes && r.notes.length) add(warnings, {...f, why: `background has a ${r.notes.join('/')}: measured against its flat colour only`}, route, theme);
      };
      results.forEach((r) => judge(r));

      // Focus ring: must be a real outline, 3:1 against what it sits on.
      await page.keyboard.press('Shift');
      for (const {id, where} of interactive) {
        const fp = await page.evaluate(focusProbe, id);
        if (!fp || fp.skipped) continue;
        const rg = await page.evaluate((i) => window.__ccRing(document.querySelector(`[data-cc="${i}"]`)), id);
        if (!fp.hasRing && !fp.shadow) {
          judge({kind: 'focus', where, sample: 'no visible focus indicator', fg: '-', bg: rg.under, ratio: 0, notes: []}, 'focus');
        } else if (fp.hasRing && !fp.auto) {
          judge({kind: 'focus', where, sample: 'focus ring', fg: rg.ring, bg: rg.under, ratio: rg.ratio, notes: []}, 'focus');
        }
      }
      await page.evaluate(() => document.activeElement && document.activeElement.blur());

      // Hover: force :hover on each distinct interactive element and re-measure its text.
      const cdp = await page.createCDPSession();
      await cdp.send('DOM.enable'); await cdp.send('CSS.enable');
      const doc = await cdp.send('DOM.getDocument', {depth: 0});
      for (const {id} of interactive) {
        try {
          const {nodeId} = await cdp.send('DOM.querySelector', {nodeId: doc.root.nodeId, selector: `[data-cc="${id}"]`});
          if (!nodeId) continue;
          await cdp.send('CSS.forcePseudoState', {nodeId, forcedPseudoClasses: ['hover']});
          const hov = await page.evaluate((i) => {
            const el = document.querySelector(`[data-cc="${i}"]`);
            return el ? window.__ccText(el) : [];
          }, id).catch(() => []);
          for (const r of hov) judge(r, 'hover');
          await cdp.send('CSS.forcePseudoState', {nodeId, forcedPseudoClasses: []});
        } catch (e) { /* element went away mid-pass */ }
      }
      await cdp.detach();
      await page.close();
    }
  }
  await browser.close();
  if (server) server.close();

  const fmt = (f) => {
    const pgs = [...f.pages]; const shown = pgs.slice(0, 3).join(', ') + (pgs.length > 3 ? ` +${pgs.length - 3} more` : '');
    const state = f.state ? ` (${f.state})` : '';
    const need = f.kind === 'text' ? `${f.need}:1${f.large ? ' large' : ''}` : `${f.need}:1`;
    return `  ${f.ratio.toFixed(2)}:1 < ${need}  ${f.kind}${state}  ${f.fg} on ${f.bg}\n    ${f.where}${f.sample ? `  "${f.sample}"` : ''}\n    ${f.why ? f.why + '\n    ' : ''}${shown}`;
  };
  const fail = [...findings.values()].sort((a, b) => a.ratio - b.ratio);
  console.log(`\nContrast rule: text ${RULE.text}:1 (large ${RULE.largeText}:1), UI ${RULE.ui}:1`);
  console.log(`${pages.length} pages x ${themes.length} modes, ${measured} measurements.\n`);
  if (fail.length) { console.log(`FAIL: ${fail.length} distinct problem(s)\n`); fail.forEach((f) => console.log(fmt(f) + '\n')); }
  else console.log('PASS: nothing below the rule.\n');
  if (verbose && warnings.size) { console.log(`Warnings (${warnings.size}):\n`); [...warnings.values()].forEach((f) => console.log(fmt(f) + '\n')); }
  else if (warnings.size) console.log(`${warnings.size} warning(s) hidden; pass --verbose to list.`);
  process.exit(fail.length ? 1 : 0);
}

main().catch((e) => { console.error(e); process.exit(2); });
