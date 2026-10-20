# Production release notes

Copied from the script repo's app.gap.Tsum/CHANGELOG.md by
`node scripts/sync-changelog.js --releases`, for releases the public script repo
does not have yet; edit them there, not here.

## [5.4]

### Summary

**Additions**
*Stats*
- Share round stats is available to everyone: it adds your rounds to the global Tsum Tsum Stats site without the starter.

## [5.3]

### Summary

**Additions**
*Settings*
- Buy Open Capsule and Export Tsum List are out of beta.

## [5.2]

### Summary

**Fixes**
- Page history no longer saves screenshots unless "Debug game" is on.

## [5.1]

### Summary

**Additions**
*Skills*
- Disney Villains (Set) skill is out of beta.

## [5.0]

### Summary

**Additions**
*Skills*
- Large tsums are recognised and chained.
- Nightmare Before Christmas (Set) improved: Oogie Boogie's dice are rerolled only under 7, and shrinking tsums are tracked better.
*Bubbles*
- Bottom-row bubbles are popped faster, and Mid Chain strategies no longer let them pile up.
- New Save One and Save One Mid Chain strategies.
*Run control*
- Game Region setting: choose whether the International or Japanese Tsum Tsum is launched when both are installed.
- Quick Bar "Last round" button, and an Auto Play toggle replacing Report.
- Auto Play Game moved to the Round tab; app restart frequency is in minutes, under Device (a saved value in hours is converted).
*Quick Bar and settings*
- New Accessible style, now the default: larger text and buttons, high contrast and a light Quick Bar. The felt look from the website is the other style, with cream and midnight themes.
- The Aa button opens Appearance: style, theme (Dark, Light or Device) and size (XS to L).
- A Code button copies the settings code, and Copy with settings list is now on by default.
- Pasting a preset export into the Code box saves its presets (a single line also applies it).
- Tap the Quick Bar readout to copy the run's figures.
- Copy debug info button: copies your device details and every setting, to paste when asking for help.
*Starter tool*
- The starter tool is now a page in your browser: start the service, install the app, restart adb, and export logs and stats as one zip, with Tsum Tsum Stats built in.
- It asks GAP to add the Tsum Tsum library to its Sources, keeps itself and Tsum Tsum Stats up to date, and has a Stop button.
- On Windows it logs each run to starter-log.txt and stays open on an error.
*Platform and data*
- Requires General Automation Platform 3.3 or newer.
- Each device keeps its own folder, so emulators sharing storage stop overwriting each other's files.
- Receiving hearts one by one always skips the ad mail; Skip first person is gone.
- Unlock Level jumps straight to the collection's first page.

**Fixes**
- Chains no longer break in a round's last seconds.
- Cinderella's skill now works with GAP.
- Resuming after a pause presses Continue instead of sometimes Try Again.
- Auto Unlock MyTsum Level raises a capped single-tsum party.
- Sending hearts is about 15% faster, no longer stalls after every heart on the Japanese game, and waits out a slow connection instead of skipping the rest of the ranking.
- Receiving hearts one by one no longer spins on the ad row, and no longer crashes the game on low-memory emulators such as MuMu Player.
- Bonus items no longer get scrambled when an event (JP) gives a free item that cannot be turned off.
- Box Buying no longer stalls on the JP build when a maxed-out Pick-Up Capsule pays out a Premium Ticket.
- Auto launch no longer waits 30 seconds for a game that is already open on MuMu (Android 15).
- Quick Bar dropdown labels (Preset, Bubble, Then) are no longer cut off at the top.
- The starter finds GAP again after its rename to General Automation Platform, and on Windows choosing a device no longer fails with "Write-NextStep is not recognized".
