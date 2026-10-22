import type {Howto} from './CompanionHowto';

// The GAP Companion how-to clips. Each recording is the phone app on the 540x960 emulator, recorded
// with OBS against the local server on a test account with simulated Tsum devices
// (capture/raw/companion/<file>.mp4; its .json logs every tap at OBS's record time, copied here).

const FLEET = 'companion-fleet.mp4';
const PRESETS_A = 'companion-presets-a.mp4';
const PRESETS_B = 'companion-presets-b.mp4';
const WORKFLOW = 'companion-workflow.mp4';

const taps = (file: string, list: [number, number, number][]) => list.map(([at, x, y]) => ({file, at, x, y}));

/** vid-companion-fleet: pause every device at once, then resume. */
export const fleetHowto: Howto = {
  tone: 'jade',
  segs: [{file: FLEET, from: 1.6, to: 19.6, speed: 1}],
  taps: taps(FLEET, [[2.83, 270, 420], [5.03, 420, 78], [6.57, 492, 78], [8.27, 330, 219], [11.83, 270, 420], [13.82, 420, 78], [15.08, 492, 78], [16.52, 330, 285]]),
  steps: [
    {file: FLEET, at: 2.83, text: 'Long-press any device'},
    {file: FLEET, at: 5.03, text: 'Tap Select all'},
    {file: FLEET, at: 6.57, text: 'Open the menu, top right'},
    {file: FLEET, at: 8.27, text: 'Pause: all three stop'},
    {file: FLEET, at: 11.83, text: 'Resume them the same way'},
  ],
};

/** vid-companion-presets: make a preset, then apply it to every device. */
export const presetsHowto: Howto = {
  tone: 'marigold',
  segs: [
    {file: PRESETS_A, from: 1.8, to: 17.6, speed: 1},
    {file: PRESETS_B, from: 1.9, to: 13.4, speed: 1},
  ],
  taps: [
    ...taps(PRESETS_A, [[2.47, 473, 162], [4.17, 270, 188], [7.22, 467, 385], [8.17, 467, 551], [9.1, 480, 468], [10.15, 423, 468], [10.8, 423, 468], [11.43, 423, 468], [12.37, 432, 708], [13.62, 280, 507], [14.88, 406, 78], [16.42, 48, 78]]),
    ...taps(PRESETS_B, [[2.5, 270, 420], [4.62, 420, 78], [5.95, 492, 78], [7.4, 330, 417], [8.93, 150, 550], [10.0, 434, 640]]),
  ],
  steps: [
    {file: PRESETS_A, at: 2.47, text: 'Presets: tap New'},
    {file: PRESETS_A, at: 4.17, text: 'Give it a name'},
    {file: PRESETS_A, at: 7.22, text: 'Set only what should change'},
    {file: PRESETS_A, at: 14.88, text: 'Save: it syncs to your devices'},
    {file: PRESETS_B, at: 2.5, text: 'Select your devices'},
    {file: PRESETS_B, at: 5.95, text: 'Menu, then Apply preset'},
    {file: PRESETS_B, at: 8.93, text: 'Pick it and Apply'},
  ],
};

/** vid-companion-workflow: a workflow that changes Tsum between loops, assigned to every device. */
export const workflowHowto: Howto = {
  tone: 'grape',
  segs: [{file: WORKFLOW, from: 1.8, to: 32.3, speed: 1}],
  taps: taps(WORKFLOW, [[2.5, 420, 78], [4.22, 270, 188], [6.28, 132, 807], [7.32, 128, 900], [8.37, 286, 714], [9.72, 270, 418], [11.15, 270, 326], [12.3, 150, 460], [13.45, 270, 666], [14.6, 266, 445], [15.95, 150, 284], [17.12, 100, 487], [18.27, 266, 490], [19.62, 140, 416], [20.98, 180, 609], [22.33, 371, 691], [24.85, 334, 78], [26.4, 420, 78], [27.83, 40, 575], [28.38, 40, 649], [28.93, 40, 723], [29.68, 270, 900]]),
  steps: [
    {file: WORKFLOW, at: 2.5, text: 'Workflows: tap +'},
    {file: WORKFLOW, at: 6.28, text: 'Add Select Tsum, Play rounds, Loop'},
    {file: WORKFLOW, at: 9.72, text: 'Pick a Tsum for each loop'},
    {file: WORKFLOW, at: 20.98, text: 'Copy them to your other devices'},
    {file: WORKFLOW, at: 24.85, text: 'Save, then assign it'},
  ],
};
