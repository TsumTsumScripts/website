// npm run thumbs
// Renders the YouTube thumbnails (1280x720 JPEG, under YouTube's 2 MB limit) to video/out/thumbs.
import {spawnSync} from 'node:child_process';
import {mkdirSync, statSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const ids = ['thumb-vid-skills', 'thumb-vid-autoplay'];
const run = (cmd, a) => {
  const r = spawnSync(cmd, a, {cwd: root, stdio: 'inherit'});
  if (r.status !== 0) {
    process.exit(r.status ?? 1);
  }
};

run('node', ['scripts/footage.mjs']);
// Frames for the cards, pulled at exact times (seconds into each cut) as 540x896 PNGs.
const frames = [
  ['skill-burst.mp4', 3.5, 'thumb-burst.png'],
  ['skill-elsa.mp4', 2.5, 'thumb-elsa.png'],
  ['skill-gaston.mp4', 7.0, 'thumb-gaston.png'],
  ['autoplay-round.mp4', 100, 'thumb-autoplay.png'],
];
for (const [file, t, name] of frames) {
  run('ffmpeg', ['-v', 'error', '-y', '-ss', String(t), '-i', join('public', 'footage', file), '-frames:v', '1', join('public', 'footage', name)]);
}
mkdirSync(join(root, 'out', 'thumbs'), {recursive: true});
for (const id of ids) {
  const out = join(root, 'out', 'thumbs', `${id.replace('thumb-', '')}.jpg`);
  run('npx', ['remotion', 'still', 'src/index.ts', id, out, '--image-format=jpeg', '--jpeg-quality=92']);
  console.log(`${out}: ${(statSync(out).size / 1024).toFixed(0)} KB`);
}
