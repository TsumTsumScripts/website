// Turn the script's CHANGELOG.md into the data the Changelog page renders.
//
//   node scripts/sync-changelog.js
//
// Only each version's `### Summary` is read -- that block is the user-facing
// changelog, one line per feature (see the script repo's CHANGELOG.md header).
// Everything below it is the internal record and never reaches this site.
// Writes src/data/changelog.generated.json (git-ignored).

'use strict';

const fs = require('fs');
const path = require('path');
const {featureFor} = require('../src/data/featureLinks');

const siteDir = path.resolve(__dirname, '..');
const scriptRepo = process.env.TSUM_SCRIPT_REPO || path.resolve(siteDir, '..', 'tsum-tsum-script');
const source = path.join(scriptRepo, 'app.gap.Tsum', 'CHANGELOG.md');
const out = path.join(siteDir, 'src', 'data', 'changelog.generated.json');

/** a = alpha, b = beta, anything else is production. */
function channelOf(version) {
  if (/a\d*$/i.test(version)) return 'Alpha';
  if (/b\d*$/i.test(version)) return 'Beta';
  return 'Production';
}

function parseSummary(lines) {
  const additions = [];
  const fixes = [];
  const plain = [];
  let mode = null; // 'add' | 'fix'
  let area = null;
  let last = null;
  for (const raw of lines) {
    const line = raw.trimEnd();
    if (!line.trim()) { last = null; continue; }
    if (/^\*\*Additions\*\*/.test(line)) { mode = 'add'; area = null; continue; }
    if (/^\*\*Fixes\*\*/.test(line)) { mode = 'fix'; area = null; continue; }
    const heading = /^\*([^*].*)\*$/.exec(line);
    if (heading) { area = heading[1].trim(); additions.push({area, items: []}); continue; }
    const bullet = /^(?:[-*]|\d+\.)\s+(.*)$/.exec(line);
    if (bullet) {
      const item = {text: bullet[1].trim(), feature: null};
      item.feature = featureFor(item.text, area);
      if (mode === 'fix') fixes.push(item);
      else if (mode === 'add' && additions.length) additions[additions.length - 1].items.push(item);
      else plain.push(item);
      last = item;
    } else if (last) {
      last.text += ' ' + line.trim(); // a wrapped bullet
      last.feature = featureFor(last.text, area);
    }
  }
  return {additions: additions.filter((a) => a.items.length), fixes, plain};
}

const releases = [];
if (fs.existsSync(source)) {
  const lines = fs.readFileSync(source, 'utf8').split('\n');
  let cur = null;
  let inSummary = false;
  for (const line of lines) {
    const v = /^## \[([^\]]+)\]/.exec(line);
    if (v) {
      cur = {version: v[1], channel: channelOf(v[1]), body: []};
      releases.push(cur);
      inSummary = false;
      continue;
    }
    if (!cur) continue;
    if (/^### /.test(line)) { inSummary = /^### Summary\b/.test(line); continue; }
    if (inSummary) cur.body.push(line);
  }
} else {
  console.warn(`changelog: ${source} not found; writing an empty changelog`);
}

const data = releases
  .filter((r) => r.body.some((l) => l.trim()))
  .map((r) => ({version: r.version, channel: r.channel, ...parseSummary(r.body)}));

fs.writeFileSync(out, JSON.stringify(data, null, 2) + '\n');
console.log(`changelog: ${data.length} releases with a Summary`);
