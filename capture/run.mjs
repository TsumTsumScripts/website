#!/usr/bin/env node
// Renders scenes to capture/out/<id>.png as the emulator draws them: 540x960 px at
// 240dpi (a 360x640 CSS viewport). --scale 2, the default, is 1080x1920.
//
//   node capture/run.mjs                 every scene
//   node capture/run.mjs shot-quickbar-hero
//   node capture/run.mjs --list
//   node capture/run.mjs --scale 1       native 540x960 instead
//   node capture/run.mjs --publish       also write static/media/<id>.webp (cwebp)

import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {launch, open, root, WIDTH, HEIGHT} from './harness.mjs';
import {scenes} from './scenes.mjs';

const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const scaleAt = args.indexOf('--scale');
const scale = scaleAt >= 0 ? Number(args[scaleAt + 1]) : 2;
const ids = args.filter((a, i) => !a.startsWith('--') && args[i - 1] !== '--scale');

if (flag('--list')) {
  for (const s of scenes) { console.log(s.id); }
  process.exit(0);
}

const picked = ids.length ? scenes.filter((s) => ids.includes(s.id)) : scenes;
for (const id of ids) {
  if (!scenes.some((s) => s.id === id)) { console.error(`No scene "${id}". Try --list.`); process.exit(1); }
}

const out = path.join(root, 'capture', 'out');
fs.mkdirSync(out, {recursive: true});
const browser = await launch();
let failed = 0;
try {
  for (const scene of picked) {
    const png = path.join(out, `${scene.id}.png`);
    try {
      const h = await open(browser, scene, scale);
      const clip = await scene.steps(h);
      const crop = scene.cropTop ? {x: 0, y: scene.cropTop, width: WIDTH, height: HEIGHT - scene.cropTop} : undefined;
      await h.shot(png, clip || crop);
      await h.close();
      console.log(`ok   ${scene.id}  ->  ${path.relative(root, png)}`);
      if (flag('--publish')) {
        const webp = path.join(root, 'static', 'media', `${scene.id}.webp`);
        fs.mkdirSync(path.dirname(webp), {recursive: true});
        execFileSync('cwebp', ['-q', '90', '-quiet', png, '-o', webp]);
        console.log(`     published ${path.relative(root, webp)}`);
      }
    } catch (e) {
      failed++;
      console.error(`FAIL ${scene.id}: ${e.message}`);
    }
  }
} finally {
  await browser.close();
}
process.exit(failed ? 1 : 0);
