// One entry per screenshot. `id` is the media-plan id, so the output is named
// what the site looks for. `page` is 'settings' or 'quickbar'; `steps(h)` drives
// the page (see harness.mjs) and may return a clip (`h.clipTo`) for a close-up.
//
// The state below is invented sample data (a test account: no names, no ids).

const engine = {
  active: true, inRound: true, nextRound: '',
  skillType: 'burst', skillLevel: 6, maxChainsPerScan: 3, maxChain: 4,
  bubbleStrategy: 'one_mid_chain', bonus5to4: true, bonusCoin: true, bonusScore: false,
  autoPlayGame: true, sendHeartsAuto: true, receiveHeartsOneByOne: false,
  stopAfterGames: 0, stopAfterAction: 'pause', stopAfterThisRound: false,
  rounds: 14, baseCoinAvg: 1832, finalCoinAvg: 2654, medalAvg: 38,
  avgRoundSec: 118, playedSec: 1652, runSec: 2417,
};

const presets = [
  {name: 'Coin farming', values: {skillType: 'burst', bubbleStrategy: 'one_mid_chain'}},
  {name: 'Score push', values: {skillType: 'burst', bubbleStrategy: 'all_asap'}},
];

// What the settings page shows: the "Coin farming" preset loaded, the common jobs on.
const settings = {
  ...presets[0].values,
  bonusCoin: true, bonus5to4: true,
  sendHeartsAuto: true, sendHeartsToZeroScore: true,
  receiveHeartsOneByOne: true, receiveHeartsSkipRuby: true,
  unlockLevelHoursWait: 6, autoUnlockMyTsumLevel: true,
  buyBoxHoursWait: 12, trackRoundStats: true,
  stopAfterGames: 3, stopAfterAction: 'pause',
};

/**
 * What the starter's server answers: two emulators and a phone, MuMu #1 chosen last
 * time with its service stopped. "Start service" starts it. Invented serials.
 */
function starterApi() {
  const devices = [
    {serial: '127.0.0.1:16384', state: 'device', model: 'SM-S9180', abi: 'x86_64', service: 'stopped', installed: '5.0b1'},
    {serial: '127.0.0.1:16416', state: 'device', model: 'SM-S9180', abi: 'x86_64', service: 'running', installed: '5.0b1'},
    {serial: 'R5CT40XQ2LM', state: 'device', model: 'SM-A546E', abi: 'arm64-v8a', service: 'not installed', installed: ''},
  ];
  const started = [
    'starting the service on 127.0.0.1:16384 ...',
    '  abi    : x86_64 (app_process64)',
    '  libs   : /data/app/app.gap/lib/x86_64',
    '  step   : launched',
    '  step   : listening',
  ];
  return (rel, body) => {
    const [route, query] = rel.split('?');
    const serial = new URLSearchParams(query || '').get('serial');
    switch (route) {
      case 'status': return {
        version: '0.13', bundle: 'C:\\Users\\Player\\Downloads\\TsumTsum-Starter', storage: '/sdcard/Download/GAP',
        adb: {path: 'C:\\Users\\Player\\Downloads\\TsumTsum-Starter\\adb\\adb.exe', source: 'downloaded r37',
          missing: false, revision: '37', sizeMB: 9},
        channel: '', hasApks: false, lastDevice: '127.0.0.1:16384',
        collected: 'C:\\Users\\Player\\Downloads\\TsumTsum-Starter\\collected',
      };
      case 'devices': return {devices};
      case 'device': return {device: devices.find((d) => d.serial === serial)};
      case 'action':
        if (body.action === 'start') {
          devices.find((d) => d.serial === body.serial).service = 'running';
          return {stream: [...started.map((log) => ({log})),
            {done: true, ok: true, msg: 'Service is running.\nIt survives an app reinstall, and stays up until the device reboots.'}]};
        }
        return {stream: [{done: true, ok: true, msg: ''}]};
      default: return {};
    }
  };
}

const page = {page: 'settings', theme: 'light', presets, settings};
const strip = {
  page: 'quickbar', backdrop: 'board-midround.png', presets,
  // The backdrop capture has the host's floating bar (an older version) in its top
  // 48 px at native size; crop it and the letterbox below it off every shot.
  cropTop: 55,
  settings: presets[0].values, engine,
};
const onGapStatePaused = (h) => h.gapState({});

/** A settings close-up: the tab, then the band from one element to another. */
const closeUp = (id, tab, first, last) => ({
  id, ...page,
  async steps(h) {
    await h.tab(tab);
    return h.clipTo(first, last);
  },
});

export const scenes = [
  // --- Quick Bar --------------------------------------------------------
  {id: 'shot-quickbar-hero', ...strip, steps: onGapStatePaused},
  {
    id: 'shot-quickbar-bars', ...strip,
    banner: 'Applies at the next round',
    engine: {...engine, nextRound: 'skillType bubbleStrategy maxChainsPerScan'},
    steps: onGapStatePaused,
  },
  {
    id: 'shot-quickbar-page2', ...strip,
    async steps(h) {
      await h.gapState({});
      await h.click('.qb-page-toggle');
    },
  },
  {
    id: 'shot-bubbles-quickbar', ...strip, expandedPx: 215,
    async steps(h) {
      await h.gapState({});
      await h.click('[data-key="bubbleStrategy"]');
    },
  },
  {
    // The right-hand readout, as the strip alone along the bottom edge.
    id: 'shot-stats-quickbar-readout', ...strip,
    async steps(h) {
      await h.gapState({});
      return {x: 0, y: 960 / 1.5 - 62, width: 360, height: 62};
    },
  },

  // --- Settings page ----------------------------------------------------
  {
    id: 'shot-skills-type', ...page,
    async steps(h) {
      await h.tab('Skills');
      await h.click('#setting_skillType button');
    },
  },
  closeUp('shot-skills-timing', 'Skills', 'title:Timing', '#setting_skillReactivationTenths'),
  {
    id: 'shot-autoplay-round-tab', ...page,
    async steps(h) { await h.tab('Round'); },
  },
  closeUp('shot-autoplay-max-chain', 'Round', 'title:Chains', '#setting_maxChain'),
  closeUp('shot-items-switches', 'Round', 'title:Round bonuses', '#setting_bonusCombo'),
  {
    id: 'shot-bubbles-strategy', ...page,
    async steps(h) {
      await h.tab('Gameplay');
      await h.click('#setting_bubbleStrategy button');
    },
  },
  {
    id: 'shot-hearts-tab', ...page,
    async steps(h) {
      await h.tab('Hearts');
      return h.clipTo('title:Send hearts', '#setting_sendHeartsMinWait');
    },
  },
  closeUp('shot-mailbox-settings', 'Hearts', 'title:Mailbox, one by one', '#setting_mailMinWait'),
  closeUp('shot-boxes-settings', 'Chores', 'title:Boxes', '#setting_buyBoxMaxPurchases'),
  closeUp('shot-levels-settings', 'Chores', 'title:Level caps', '#setting_autoUnlockMyTsumLevel'),
  closeUp('shot-tsumlist-row', 'Chores', 'title:Tsum List', '#setting_exportTsumList'),
  closeUp('shot-stats-setting', 'General', '#setting_trackRoundStats', '#setting_shareRoundStats'),
  {
    id: 'shot-runcontrol-hero', ...page,
    async steps(h) {
      await h.tab('General');
      return h.clipTo('title:Running', '#setting_runOrder');
    },
  },
  closeUp('shot-runcontrol-order', 'General', 'title:Run order', '#setting_runOrder'),
  {
    id: 'shot-reports-debug', ...page,
    async steps(h) {
      await h.tab('Debug');
      return h.clipTo('title:Diagnostics', '#setting_reportIssue');
    },
  },

  // --- Presets and sharing ---------------------------------------------
  {
    id: 'shot-presets-hero', ...page,
    async steps(h) {
      await h.tab('General');
      await h.click('#presetSelect');
    },
  },
  {
    id: 'shot-presets-save', ...page,
    async steps(h) {
      await h.click('#presetSave');
      await h.type('#presetNameInput', 'Weekend farming');
    },
  },
  {
    id: 'shot-presets-share', ...page, noClipboard: true,
    async steps(h) {
      await h.tab('General');
      await h.clickText('#setting_shareSettings button', 'Copy');
      return h.clipTo('#setting_shareSettings', '.share-panel:not([hidden])');
    },
  },

  // --- The service starter (a desktop browser page) ---------------------
  {
    id: 'shot-starter-devices', page: 'starter', api: starterApi(),
    async steps() {},
  },
  {
    id: 'shot-starter-started', page: 'starter', api: starterApi(),
    async steps(h) {
      await h.click('#service-actions [data-action="start"]');
      await h.scrollTo('#device', 16);
    },
  },
];
