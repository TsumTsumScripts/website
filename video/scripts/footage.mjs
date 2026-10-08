// Copies the trimmed gameplay cuts into video/public/footage, where the compositions read them.
// The cuts live in capture/raw/cuts (git-ignored: unedited captures may show other players).
// Override the folder with TSUM_CUTS_DIR.
import {copyFileSync, existsSync, mkdirSync, readdirSync} from 'node:fs';
import {dirname, join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const from = resolve(process.env.TSUM_CUTS_DIR ?? join(here, '..', '..', 'capture', 'raw', 'cuts'));
const to = join(here, '..', 'public', 'footage');

if (!existsSync(from)) {
  console.error(`footage: no cuts at ${from}. Trim them from capture/raw first (see MEDIA_PLAN.md).`);
  process.exit(1);
}
mkdirSync(to, {recursive: true});
// The 25 s draft is a preview of the retime, not an input.
const files = readdirSync(from).filter((f) => f.endsWith('.mp4') && !f.endsWith('-draft.mp4'));
for (const f of files) {
  copyFileSync(join(from, f), join(to, f));
}
console.log(`footage: ${files.length} cuts copied to video/public/footage`);
