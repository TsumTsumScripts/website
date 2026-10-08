// npm run render [-- <id> ...] [--publish]
// Renders each composition to video/out/<id>.mp4 (git-ignored). --publish also copies it to
// static/media/<id>.mp4, where it replaces the placeholder; run `npm run media:plan` in the
// site afterwards (yt-* are the 16:9 YouTube uploads and are never published to the site).
// With no ids, renders every composition. A published id listed in `posters` also gets its
// poster frame at static/img/video-posters/<id>.jpg (shown by <Media poster> until it plays).
import {spawnSync} from 'node:child_process';
import {copyFileSync, mkdirSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const publish = args.includes('--publish');
const ids = args.filter((a) => !a.startsWith('--'));
const all = ['vid-trailer', 'vid-skills', 'vid-autoplay', 'vid-levels', 'yt-skills', 'yt-autoplay', 'yt-boxes'];
// Frame to use as the poster: the trailer's title card, settled, before it fades.
const posters = {'vid-trailer': 135};
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
  // yt-* are the 16:9 YouTube uploads; only vid-* go on the site.
  if (publish && id.startsWith('vid-')) {
    copyFileSync(out, join(root, '..', 'static', 'media', `${id}.mp4`));
    console.log(`published static/media/${id}.mp4`);
    if (id in posters) {
      const poster = join(root, '..', 'static', 'img', 'video-posters', `${id}.jpg`);
      run('npx', ['remotion', 'still', 'src/index.ts', id, poster, `--frame=${posters[id]}`, '--image-format=jpeg', '--jpeg-quality=82']);
      console.log(`published static/img/video-posters/${id}.jpg`);
    }
  }
}
