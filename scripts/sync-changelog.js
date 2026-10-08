// Turn the script's CHANGELOG.md into the data the Changelog page renders.
//
//   node scripts/sync-changelog.js               write src/data/changelog.generated.json
//   node scripts/sync-changelog.js --prerelease  copy the checkout's latest alpha/beta
//                                                Summary into changelog/prerelease.md
//
// Only each version's `### Summary` is read -- that block is the user-facing
// changelog, one line per feature (see the script repo's CHANGELOG.md header).
// Everything below it is the internal record and never reaches this site.
//
// The page shows the latest production release and, when one is newer, the
// latest alpha or beta. Pre-releases are not on the public script repo's main,
// which the deploy builds from, so their Summary is kept here in
// changelog/prerelease.md (same format); `--prerelease` refreshes it.

'use strict';

const fs = require('fs');
const path = require('path');
const {featureFor} = require('../src/data/featureLinks');

const siteDir = path.resolve(__dirname, '..');
const scriptRepo = process.env.TSUM_SCRIPT_REPO || path.resolve(siteDir, '..', 'tsum-tsum-script');
const source = path.join(scriptRepo, 'app.gap.Tsum', 'CHANGELOG.md');
const prerelease = path.join(siteDir, 'changelog', 'prerelease.md');
const out = path.join(siteDir, 'src', 'data', 'changelog.generated.json');

/** a = alpha, b = beta, anything else is production. */
function channelOf(version) {
  if (/a\d*$/i.test(version)) return 'Alpha';
  if (/b\d*$/i.test(version)) return 'Beta';
  return 'Production';
}

/** Sort key: 5.0a1 < 5.0b1 < 5.0. */
function rank(version) {
  const m = /^(\d+)\.(\d+)(?:([ab])(\d*))?/i.exec(version) || [];
  const stage = {a: 0, b: 1}[(m[3] || '').toLowerCase()] ?? 2;
  return [Number(m[1]) || 0, Number(m[2]) || 0, stage, Number(m[4]) || 0];
}

function newer(a, b) {
  const x = rank(a);
  const y = rank(b);
  for (let i = 0; i < x.length; i++) if (x[i] !== y[i]) return x[i] > y[i];
  return false;
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

/** Each `## [version]` section's Summary lines, in file order; empty ones dropped. */
function readReleases(file) {
  const releases = [];
  let cur = null;
  let inSummary = false;
  for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
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
  return releases.filter((r) => r.body.some((l) => l.trim()));
}

const fromScript = fs.existsSync(source) ? readReleases(source) : [];
if (!fs.existsSync(source)) console.warn(`changelog: ${source} not found`);

if (process.argv.includes('--prerelease')) {
  const latest = fromScript.find((r) => r.channel !== 'Production');
  if (!latest) throw new Error(`changelog: no alpha or beta with a Summary in ${source}`);
  const body = latest.body.join('\n').trim();
  fs.mkdirSync(path.dirname(prerelease), {recursive: true});
  fs.writeFileSync(prerelease, [
    '# Pre-release notes',
    '',
    `Copied from the script repo's app.gap.Tsum/CHANGELOG.md by`,
    '`node scripts/sync-changelog.js --prerelease`; edit them there, not here.',
    '',
    `## [${latest.version}]`,
    '',
    '### Summary',
    '',
    body,
    '',
  ].join('\n'));
  console.log(`changelog: copied ${latest.version} to ${path.relative(siteDir, prerelease)}`);
  process.exit(0);
}

const all = [...fromScript];
if (fs.existsSync(prerelease)) {
  for (const r of readReleases(prerelease)) {
    if (!all.some((x) => x.version === r.version)) all.push(r);
  }
}

const production = all.filter((r) => r.channel === 'Production').sort((a, b) => (newer(a.version, b.version) ? -1 : 1))[0];
const pre = all
  .filter((r) => r.channel !== 'Production' && (!production || newer(r.version, production.version)))
  .sort((a, b) => (newer(a.version, b.version) ? -1 : 1))[0];

const data = [pre, production]
  .filter(Boolean)
  .map((r) => ({version: r.version, channel: r.channel, ...parseSummary(r.body)}));

fs.writeFileSync(out, JSON.stringify(data, null, 2) + '\n');
console.log(`changelog: kept ${data.map((r) => `${r.version} (${r.channel})`).join(', ') || 'nothing'}`);
