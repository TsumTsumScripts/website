---
title: Trust and access
description: What the host lets a script do without asking, what it asks the player for, and why a release is signed.
---

# Trust and access

A script runs with a lot of reach. It sees everything on the screen, taps
anywhere, and its natives run as Android's shell user, which can do far more
than an ordinary app. The person running it is usually playing a game on their
own phone, often with an account they care about, and has no practical way to read a
compacted bundle before pressing Play.

So the host's rule is simple: **anything that can move data off the device, or
do something the player cannot see, is off until the player turns it on for
that one script.** Signing is the other half: it tells the host which script it
is actually running, so a copy someone has edited cannot borrow the trust the
original was given.

This page is the *why*, so a change does not quietly work against it. The host
is a black box here; its own documentation is the authority on how each gate
is enforced.

## What a script gets without asking

Everything needed to play: captures, colour reads, image matching, taps and
swipes, reading and writing its own files, and a set of **named
device calls** (launch or stop an app, check what is in the foreground, read the
UI tree, read touch events, device facts). The host composes each of those
commands itself, so a script says *what* it wants and never hands the shell a
string.

That last point is why the named calls exist. They cover what scripts used the
shell for, so the shell itself can be locked away without costing an honest
script anything. This script uses environment variables and the network for
one opt-in setting, and never the shell.

## What the player has to allow

Each installed script has an access screen, reached from its card in the
app's Library. It holds three switches, **all off by default**, each confirmed
with a warning when turned on, and each belonging to that script alone:

| Switch | What it unlocks | Why it is gated |
|:--|:--|:--|
| **Use environment variables** | Values the player typed in for this script, read with `getEnv` | They are the player's own settings for things like a server address; a script should only see them once the player has decided to use them. |
| **Allow network requests** | Requests to addresses the player supplied | It is the one route data can take off the device. |
| **Allow shell commands** | `execute()` | A shell can reach the network on its own (`curl` is just a command), so leaving it open would make the network switch meaningless. |

Copying values to another script copies the values, never the switches: one
script being trusted says nothing about the next. Turning a switch off takes
effect on the next request, mid-run included.

<ImagePlaceholder id="app-script-access" alt="A script's access screen in the app: the three switches with their warnings, and the form for its environment values" />

### The network never takes a literal address

A script cannot name a URL. It declares the values it would like in
`gap-env.json` beside the bundle, and sends to `env:KEY`, which the host
resolves to whatever the player entered for that key. That takes both the
environment and the network switch. A literal address is refused, and loading
code from the network is refused outright.

The reasons, from the player's side:

- **The player decides where their data goes.** The destination is a value they
  typed, not one buried in the bundle.
- **An update cannot add a destination.** A new release that wanted to send
  somewhere new would need a new key, which the player would see and have to
  fill in.
- **A request is visible.** Every one is queued, rate-limited and size-capped,
  and reported to the script as it goes (queued, sent, then done, failed or
  refused), so nothing can quietly stream data out in the background.

This script's only use is **Share round stats**, an Alpha setting that is off by
default. It declares one key:

```json reference title="app.gap.Tsum/gap-env.json"
https://github.com/TsumTsumScripts/tsum-tsum-script/blob/main/app.gap.Tsum/gap-env.json
```

Environment values are settings, not a vault. Never ask a player to put a
password or a token in one.

### The pages are off the network too

The settings page and the Quick Bar are web pages, and a web page could
otherwise `fetch` around every gate above. The host blocks every non-local load
from a script's pages. That costs nothing here, because both pages are built as
self-contained files with their styles, fonts and code inlined
([Three worlds](three-worlds)). Keep it that way: no CDN, no remote font, no
remote image.

## Why a release is signed

A release build carries a signature over every file it ships, tied to this
script's id. The host checks it when the script loads. It answers two
questions a hash in a catalogue cannot:

- **Is this the build that was published?** Editing any shipped file, or adding
  one the signature does not cover, breaks it.
- **Whose is it?** Only the maintainers hold the signing key, so a signature
  says the build came from this project and not from someone who renamed a copy.

What a valid signature changes:

- **GAP Companion** (the phone app that watches and controls a device) only
  works with a script whose signature verifies.
- **On a device linked to GAP Companion, an unsigned or edited script gets no
  network**, whatever the switches say. A linked device is one the player
  manages remotely, so it holds a stricter line.
- **A signed script does not need the shell switch.** The signature already says
  whose code it is, so its access screen shows that row as on and fixed.

Everywhere else, the player's switches are the only gate. That is what keeps
local development working: your own build is unsigned, and on a device that is
not linked it behaves exactly as a release would once you allow what it needs.

The key never enters this repository, and signing is a maintainer step at
release time. A contributor never needs it, and a pull request should never try
to work around its absence.

## Installing is checked too

- **Every catalogue entry carries the archive's SHA-256**, and the app discards a
  download that does not match before writing anything
  ([Your own library source](../publishing/your-own-library-source)).
- **The app lists no third-party source by itself.** The starter can *offer* the
  Tsum Tsum catalogue through a link, and the app still asks the player to
  confirm it, with a warning that a source is unverified.
- **The name `Official GAP` is reserved** for the app's own source; a source
  claiming it is refused.
- **Settings backup** saves only the page keys a script lists in
  `gap-backup.json`, so one script's backup never carries another's settings.

## What this means for a change

- **Reach for a named call, not `execute()`.** If a named call is missing, the
  fix is a new one in the host, not a shell command here. This script has no
  `execute()` left, and does not need the shell switch.
- **New network use needs a new `gap-env.json` key**, an opt-in setting that
  is off by default, and a line in the setting's description saying network
  access has to be allowed. The script must carry on normally when the switch
  is off or the request is refused.
- **Never ship a hard-coded address**, a remote asset in a page, or a fallback
  that tries another route when the gate says no.
- **Do not collect more than the feature needs.** Share round stats sends the
  rows of the round stats file and nothing else: no friend names, no account
  details, nothing from outside the game.
- **A refusal is an answer, not an error to retry.** Log it once and move on.
