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
  { id: 'shot-stats-site-stats', alt: 'The Stats page: coin efficiency tiles over the coins-per-day chart', capture: 'Tsum Tsum Stats, Stats page, last 7 days: KPI tiles and the Coins per day chart. Device names anonymised.' },
  { id: 'shot-stats-site-catalog', alt: 'The Catalog: Tsum cards with levels, and the Cost to max panel', capture: 'Tsum Tsum Stats, Catalog in Cards layout with an imported Tsum List, Cost to max panel open.' },
  { id: 'shot-stats-site-help', alt: 'Help: the Script events address to paste into the GAP app', capture: 'Tsum Tsum Stats, Help section 1 with the 10.0.2.2:21025 address and one device connected.' },
];

/** Landing "What's in the sewing box" cards: feature keys, in order. */
const landingFeatureKeys = ['autoplay', 'skills', 'bubbles', 'hearts', 'boxes', 'quickbar'];

module.exports = {hero, playClips, trailer, starterShots, statsShots, landingFeatureKeys};
