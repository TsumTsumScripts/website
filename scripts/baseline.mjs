#!/usr/bin/env node
// A "before" copy of the site to compare edits against, served beside the dev
// server: build the tree as it is (or at a commit), keep that build, serve it
// on its own port. Then shoot before/after pairs from 3001 and 3000 with
// `../tools/look/look.sh web <url-on-3001> <url-on-3000>`.
//
//   npm run baseline                  build HEAD's working tree -> .scratch/baseline/<stamp>/, serve on 3001
//   npm run baseline -- --at <ref>    build that commit in a temporary worktree instead
//   npm run baseline -- --port 3002
//   npm run baseline -- --stop        stop the server this script started
//
// The copy lives in .scratch/ (ignored by git) and is never deleted by this
// script, so a session can keep several. `--at` symlinks node_modules into the
// worktree and points `sync` at the script checkout beside this repo.

import fs from 'node:fs';
import path from 'node:path';
import {spawn, execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

const site = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const scratch = path.join(site, '.scratch', 'baseline');
const pidFile = path.join(scratch, 'serve.pid');
const argv = process.argv.slice(2);
const opt = (name, dflt) => { const i = argv.indexOf(name); return i < 0 ? dflt : argv[i + 1]; };
const port = Number(opt('--port', 3001));
const at = opt('--at', null);

const sh = (cmd, args, opts = {}) => execFileSync(cmd, args, {stdio: 'inherit', cwd: site, ...opts});

function stop() {
  if (!fs.existsSync(pidFile)) { console.log('baseline: nothing running'); return; }
  const pid = Number(fs.readFileSync(pidFile, 'utf8'));
  try { process.kill(pid); console.log(`baseline: stopped pid ${pid}`); } catch { console.log(`baseline: pid ${pid} was not running`); }
  fs.rmSync(pidFile, {force: true});
}

if (argv.includes('--stop')) { stop(); process.exit(0); }
if (fs.existsSync(pidFile)) stop();                     // one baseline server at a time
fs.mkdirSync(scratch, {recursive: true});

const stamp = new Date().toISOString().replace(/[-:]/g, '').slice(0, 15);
const label = at ? `${stamp}-${at.replace(/[^\w.-]/g, '_')}` : stamp;
const copy = path.join(scratch, label);

if (at) {
  // Build the commit in a worktree that borrows this checkout's node_modules.
  const wt = path.join(scratch, `wt-${label}`);
  sh('git', ['worktree', 'add', '--detach', '-q', wt, at]);
  try {
    fs.symlinkSync(path.join(site, 'node_modules'), path.join(wt, 'node_modules'));
    const env = {...process.env, TSUM_SCRIPT_REPO: process.env.TSUM_SCRIPT_REPO || path.resolve(site, '..', 'tsum-tsum-script')};
    sh('npm', ['run', '-s', 'build'], {cwd: wt, env});
    fs.cpSync(path.join(wt, 'build'), copy, {recursive: true});
  } finally {
    sh('git', ['worktree', 'remove', '--force', wt]);
  }
} else {
  sh('npm', ['run', '-s', 'build']);
  fs.cpSync(path.join(site, 'build'), copy, {recursive: true});
}

// docusaurus serve, detached, so the session's shell is free; the pid file is
// how --stop finds it again.
const child = spawn('npx', ['docusaurus', 'serve', '--dir', copy, '--port', String(port), '--no-open'],
  {cwd: site, detached: true, stdio: ['ignore', fs.openSync(path.join(scratch, 'serve.log'), 'a'), fs.openSync(path.join(scratch, 'serve.log'), 'a')]});
child.unref();
fs.writeFileSync(pidFile, String(child.pid));
console.log(`baseline: ${at ? at + ' ' : ''}built into ${path.relative(site, copy)}, serving on http://localhost:${port}/ (pid ${child.pid}; npm run baseline -- --stop)`);
console.log(`before/after: ../tools/look/look.sh web http://localhost:${port}/<page> http://localhost:3000/<page>`);
