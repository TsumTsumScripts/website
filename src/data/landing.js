// Landing-page and site-level media, plus the featured cards.
// Same shape as features.js, so `npm run media:plan` sees both.

const hero = {
  id: 'shot-landing-hero',
  alt: 'The Tsum Tsum script playing a round on a phone',
  capture: 'Phone or emulator mid-round, floating bar visible, a long chain mid-draw. Full portrait screen.',
};

/** Short clips of the game being played by the script (landing "Watch it play"). */
const playClips = [
  { id: 'clip-play-chains', alt: 'Chains drawn back to back', seconds: 8, capture: '8s raw capture of the board: chain after chain, no overlays. Loops cleanly.' },
  { id: 'clip-play-skill', alt: 'A skill firing', seconds: 8, capture: '8s: gauge fills, skill fires, board clears. Burst skill. Loops.' },
  { id: 'clip-play-fever', alt: 'Fever time', seconds: 8, capture: '8s of fever time with the script chaining at speed.' },
  { id: 'clip-play-bubbles', alt: 'Bubbles popping', seconds: 8, capture: '8s of bubbles being popped as chains land.' },
];

const trailer = {
  id: 'vid-trailer',
  kind: 'remotion',
  seconds: 38,
  brief:
    '16:9 trailer. Cold open on a long chain (3s), title card "Tsum Tsum Script" (2.5s), five feature beats from the existing cuts (auto-play, skills, bubbles, chores as box buying and level unlocking, Quick Bar), a Discord end card (4s). Captions only, no voice.',
  note: 'The script in under 40 seconds.',
};

const starterShots = [
  { id: 'shot-starter-devices', alt: 'The starter page in a browser, listing two emulators and a phone with MuMu #1 selected', capture: 'Starter page: the device list, one device selected with its service stopped.' },
  { id: 'shot-starter-started', alt: 'The chosen device after Start service: the service is running, with the app and export cards beside it', capture: 'Starter page: the chosen device\'s panel after "Start service" succeeded.' },
];

/** The Tsum Tsum Stats page: the program's own pages in a desktop browser, with a test account's data. */
const statsShots = [
  { id: 'shot-stats-site-stats', alt: 'The Stats page for the last 7 days: coin and medal tiles over the Coin efficiency by Tsum chart', capture: 'Tsum Tsum Stats, Stats page, last 7 days: KPI tiles and the top of Coin efficiency by Tsum. Midnight Felt theme, laptop window, 1280x800 at 2x.' },
  { id: 'shot-stats-site-catalog', alt: 'The Catalog: 375 of 683 Tsums owned, and Cost to max with the days left at the current pace', capture: 'Tsum Tsum Stats, Catalog with an imported Tsum List: the owned bar and the Cost to max panel. Midnight Felt theme, laptop window, 1280x800 at 2x.' },
  { id: 'shot-stats-site-help', alt: 'Help: the 10.0.2.2:21025 address to paste into the GAP app\'s Script events, with the steps', capture: 'Tsum Tsum Stats, Help section 1, heading just under the top bar. Midnight Felt theme, laptop window, 1280x800 at 2x.' },
];

/**
 * The Companion page: the GAP Companion phone app (debug build, 540x960 emulator) and web dashboard
 * (1280x800 at 2x), signed in to a local test account with simulated Tsum devices. No real account data.
 */
const companionShots = {
  fleet: { id: 'shot-companion-fleet', alt: 'The web dashboard\'s device table: three devices running Tsum, each with its latest round, and every device\'s rounds and coins added up underneath', capture: 'Companion web dashboard, Devices in Table view, All devices totals below. 1280x600 at 2x.' },
  bulk: { id: 'shot-companion-bulk', alt: 'Three devices selected in the phone app, with the menu that acts on all of them: Start, Pause, Resume, Stop after round, Apply preset, Stop', capture: 'Companion phone app, Devices in selection mode (Select all), top-bar menu open with counts. 540x960.' },
  device: { id: 'shot-companion-device', alt: 'A device in the phone app: Tsum Phone running Mickey for 30 minutes at 20 fps, with its Coin farm workflow synced and the run bar: Pause, Stop after this round, Stop', capture: 'Companion phone app, one device\'s Stats tab, top: status card, speed, workflow, My Tsum card, run bar. 540x960.' },
  stats: { id: 'shot-companion-stats', alt: 'A device\'s Stats tab on the web: a chart of coins and base coins for the recent rounds over a table of the last rounds', capture: 'Companion web dashboard, a device\'s Stats tab scrolled to Coins per round and Recent rounds. 1280x800 at 2x.' },
  settings: { id: 'shot-companion-settings', alt: 'A device\'s Settings tab on the web: Apply preset, Last run settings, Change My Tsum, and the Skill settings with a skill menu and steppers', capture: 'Companion web dashboard, a device\'s Settings tab (Play). 1280x800 at 2x.' },
  preset: { id: 'shot-companion-preset', alt: 'A preset named Fever push in the phone app: Use fan and +Coin on, Maximum chain 4 and Skill type Burst set, Skill level left unset', capture: 'Companion phone app, preset editor with four settings set. 540x960.' },
  applied: { id: 'shot-companion-applied', alt: 'Apply "Fever push" in the phone app: Applied on MuMu 1, Tsum Tablet and Tsum Phone', capture: 'Companion phone app, bulk Apply preset result dialog. 540x960.' },
  workflow: { id: 'shot-companion-workflow', alt: 'The workflow editor on the web: Restart app, Select Tsum, Skill, Play rounds and Loop forever, with the Select Tsum step set to Mickey Mouse on loop 1 and Daisy Duck on loop 2', capture: 'Companion web dashboard, workflow editor with the Select Tsum step sheet open (two loops). 1280x640 at 2x.' },
  assign: { id: 'shot-companion-assign', alt: 'Assign to devices: three devices ticked and synced, with Start now on idle devices', capture: 'Companion web dashboard, workflow Assign to devices dialog. 1280x800 at 2x.' },
};

/** The Companion page's how-to videos: phone screen recordings with tap rings and captions (Remotion). */
const companionVideos = {
  fleet: { id: 'vid-companion-fleet', kind: 'remotion', seconds: 19, brief: '9:16. Phone app (OBS, 540x960): long-press a device card, Select all, open the menu, Pause all three devices, then Resume. Numbered step captions and tap rings.', note: 'pause or resume every device at once' },
  presets: { id: 'vid-companion-presets', kind: 'remotion', seconds: 28, brief: '9:16. Phone app (OBS, 540x960), two takes: Presets, New, name it Fever push, set Use fan, +Coin, Maximum chain and Skill type, Save; then Devices, select all, Apply preset, Applied on each. Numbered step captions and tap rings.', note: 'make a preset and apply it to every device' },
  workflow: { id: 'vid-companion-workflow', kind: 'remotion', seconds: 32, brief: '9:16. Phone app (OBS, 540x960): Workflows, +, name it Tsum swap, add Select Tsum, Play rounds and Loop; Cinderella on loop 1 and Piglet on loop 2, copied to the other devices; Save; Assign to all three. Numbered step captions and tap rings.', note: 'build a workflow that changes Tsum between loops' },
};

/** Landing "What's in the sewing box" cards: feature keys, in order. */
const landingFeatureKeys = ['autoplay', 'skills', 'bubbles', 'hearts', 'boxes', 'quickbar'];

module.exports = {hero, playClips, trailer, starterShots, statsShots, companionShots, companionVideos, landingFeatureKeys};
