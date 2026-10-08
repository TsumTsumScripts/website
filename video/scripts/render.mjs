// npm run render [-- <id> ...] [--publish]
// Renders each composition to video/out/<id>.mp4 (git-ignored). --publish also copies it to
// static/media/<id>.mp4, where it replaces the placeholder; run `npm run media:plan` in the
// site afterwards. With no ids, renders every composition.
import {spawnSync} from 'node:child_process';
import {copyFileSync, mkdirSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const publish = args.includes('--publish');
const ids = args.filter((a) => !a.startsWith('--'));
const all = ['vid-skills', 'vid-autoplay'];
const run = (cmd, a) => {
  const r = spawnSync(cmd, a, {cwd: root, stdio: 'inherit'});
  if (r.status !== 0) {
    process.exit(r.status ?? 1);
  }
};

run('node', ['scripts/footage.mjs']);
mkdirSync(join(root, 'out'), {recursive: true});
for (const id of ids.length ? ids : all) {
  const out = join(root, 'out', `${id}.mp4`);
  run('npx', ['remotion', 'render', 'src/index.ts', id, out, '--codec', 'h264', '--crf', '27']);
  if (publish) {
    copyFileSync(out, join(root, '..', 'static', 'media', `${id}.mp4`));
    console.log(`published static/media/${id}.mp4`);
  }
}
