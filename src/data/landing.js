// Landing-page and site-level media, plus the featured cards.
// Same shape as features.js, so `npm run media:plan` sees both.

const hero = {
  id: 'shot-landing-hero',
  alt: 'The Tsum Tsum script playing a round on a phone',
  capture: 'Phone or emulator mid-round, floating bar visible, a long chain mid-draw. Landscape-safe crop 4:3 around the board.',
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
  seconds: 45,
  brief:
    '16:9 trailer. Cold open on a long chain (3s), title card "Tsum Tsum Script" (2s), six feature beats of ~5s each using the best clips (auto-play, skills, bubbles, chores, Quick Bar, presets), a Discord/CTA end card (4s). Captions only, no voice.',
  note: 'The script in 45 seconds.',
};

const starterShots = [
  { id: 'shot-starter-menu', alt: 'The starter tool\'s numbered menu', capture: 'Terminal showing the starter tool menu with a device listed.' },
  { id: 'shot-starter-started', alt: 'The service started', capture: 'Terminal after "Start service" succeeded.' },
];

/** Landing "What's in the sewing box" cards: feature keys, in order. */
const landingFeatureKeys = ['autoplay', 'skills', 'bubbles', 'hearts', 'boxes', 'quickbar'];

module.exports = {hero, playClips, trailer, starterShots, landingFeatureKeys};
