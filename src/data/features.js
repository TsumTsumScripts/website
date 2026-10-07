// Everything the Features page and the landing cards say, in one place.
//
// Media is declared where it is used: every `{id, alt, capture}` here is a
// screenshot to take, every `video` a clip to record or a Remotion composition
// to build. `npm run media:plan` reads this file (and landing.js) and writes
// MEDIA_PLAN.md, so the shopping list cannot drift from the pages.
//
// Copy follows app.gap.Tsum/README.md. A default is left out when the README
// does not state one -- better a missing pill than a wrong one.

/**
 * @typedef {{id: string, alt: string, capture: string}} Shot
 * @typedef {{id: string, kind: 'capture'|'remotion', seconds: number, brief: string, note: string}} Video
 * @typedef {{title: string, body: string, shot?: Shot}} Step
 * @typedef {{name: string, def?: string, desc: string}} Setting
 * @typedef {{key: string, title: string, category: string, summary: string, card: string,
 *   tone: string, hero: Shot, steps: Step[], settings: Setting[], tip: string, shots: Shot[], video: Video}} Feature
 */

/** @type {Feature[]} */
const features = [
  {
    key: 'autoplay',
    title: 'Auto-play',
    category: 'Gameplay',
    card: 'Finds the longest chains on the board and links them, round after round.',
    summary:
      'Reads the board, plans chains and draws them for you, then starts the next round. Tune how long a chain may be, how many it draws per look and whether the fan is used.',
    hero: {
      id: 'shot-autoplay-hero',
      alt: 'A board mid-round with the script drawing a long chain',
      capture: 'Mid-round, finger down on a chain of 8+ tsums, chain-count number visible. Crop to the board and score bar.',
    },
    steps: [
      {
        title: 'Open the Round tab',
        body: 'Open the script\'s settings and go to Round. Chain limits and bonus items live here, with Auto Play Game.',
        shot: { id: 'shot-autoplay-round-tab', alt: 'The Round tab of the settings page', capture: 'Settings page on the Round tab, scrolled to the top, light theme.' },
      },
      {
        title: 'Choose how long chains get',
        body: 'Maximum Chain Number caps a chain (3 to 15). Short caps play more, smaller chains, which suits Tsums that score on chain count.',
        shot: { id: 'shot-autoplay-max-chain', alt: 'Maximum Chain Number and Chains per board scan rows', capture: 'Close-up of the Maximum Chain Number and Chains per board scan rows.' },
      },
      {
        title: 'Press Play',
        body: 'Tap Play on the floating bar from the Tsum Tsum home screen. The script starts a round, plays it and carries on.',
      },
    ],
    settings: [
      { name: 'Auto Play Game', desc: 'Plays rounds whenever no other chore is due. Turn it off to run chores only.' },
      { name: 'Maximum Chain Number', def: '4', desc: 'Caps how many Tsums are linked in one chain (3 to 15). It also makes each board scan cheaper.' },
      { name: 'Use Fan?', desc: 'Shakes the remaining Tsums with the fan after some removals. Try it and compare your results.' },
      { name: 'Max round duration (min)', def: '0 (no limit)', desc: 'Gives up on a round that never ends, such as a stuck skill or an unrecognised screen.' },
    ],
    tip: 'Low-cap, many-chain play is the usual choice for Roxas, Maleficent and other count-scoring Tsums.',
    shots: [
      { id: 'shot-autoplay-board', alt: 'The board after a chain pops and new tsums drop in', capture: 'Board a moment after a pop, tsums falling.' },
    ],
    video: {
      id: 'vid-autoplay',
      kind: 'remotion',
      seconds: 25,
      brief: 'Raw gameplay (one full round, sped up 2x in the middle) with Remotion callouts: chain-length badge following the finger, "Max chain 4" label, then the score tally.',
      note: 'A full round played by the script.',
    },
  },
  {
    key: 'skills',
    title: 'Skill timing',
    category: 'Gameplay',
    card: 'Fires your Tsum\'s skill the moment the gauge fills, with choreography for the tricky ones.',
    summary:
      'Fires the skill when the gauge is full, waits for the board to settle, and has hand-tuned play for skills that need more than a tap: bubble-makers, Gaston, Elsa, Lorcana Aurora and more.',
    hero: {
      id: 'shot-skills-hero',
      alt: 'The skill gauge full and the skill button lit',
      capture: 'Board with the skill gauge just full, skill button glowing. Crop to include the gauge.',
    },
    steps: [
      {
        title: 'Pick your skill type',
        body: 'On the Skills tab choose the Skill Type that matches your Tsum. Burst suits most; named entries are tuned for that Tsum.',
        shot: { id: 'shot-skills-type', alt: 'The Skill Type dropdown open, showing its Burst, Bubble and Unique groups', capture: 'Skill Type dropdown open on the Skills tab, three groups visible.' },
      },
      {
        title: 'Set the skill level if asked',
        body: 'Cinderella, Cpt. Lightyear and Coronation Day Elsa read Skill Level. Every other skill ignores it.',
      },
      {
        title: 'Tune the timing',
        body: 'Wait for Settle holds the tap until the board stops falling. Delay Skill ReActivation stops a second tap restarting a skill that is still running.',
        shot: { id: 'shot-skills-timing', alt: 'Wait for Settle and Delay Skill ReActivation rows', capture: 'Close-up of Skill Waiting time, Wait for Settle and Delay Skill ReActivation rows.' },
      },
    ],
    settings: [
      { name: 'Skill Type', desc: 'Which skill the script performs. Grouped as Burst, Bubble (turns Tsums into bubbles it then sweeps) and Unique (changes how the board is played).' },
      { name: 'Skill Level', desc: 'Read only by Cinderella, Cpt. Lightyear and Coronation Day Elsa (her freeze window is 5s at level 1, 10s at level 6).' },
      { name: 'Skill Waiting time', desc: 'The longest the board is left alone after an activation. Play resumes as soon as the tsums stop falling.' },
      { name: 'Wait for Settle (s)', def: '0.0', desc: 'Holds the tap until the board settles (0.0 to 3.0 s). A generous value costs nothing on a board that has already refilled.' },
      { name: 'Delay Skill ReActivation (sec)', def: '0 (never hold)', desc: 'Holds a full gauge for this long after a skill fires. Set it to the skill\'s duration.' },
      { name: 'No skill last fever seconds', desc: 'Skips the skill when a fever ends within this many seconds, to make the most of fever time.' },
      { name: 'Lorcana Card', desc: 'For Lorcana Tsums: pops the ink-stone bubble after each skill and taps the transformation card when it appears.' },
    ],
    tip: 'If a skill leaves bubbles behind, set Skill Waiting time long enough to cover its effect.',
    shots: [
      { id: 'shot-skills-elsa', alt: 'Coronation Day Elsa\'s freeze bands across the board', capture: 'Coronation Day Elsa mid-window with two or three parallel ice bands visible.' },
      { id: 'shot-skills-gaston', alt: 'Gaston\'s antlers and a long chain', capture: 'Gaston window open, antlers in the chrome, a chain being drawn.' },
    ],
    video: {
      id: 'vid-skills',
      kind: 'remotion',
      seconds: 30,
      brief: 'Three short cuts (Burst, Coronation Day Elsa, Gaston), each with a lower-third naming the skill type and a "gauge full" ring pulse at the moment the tap lands.',
      note: 'Three skills, three different choreographies.',
    },
  },
  {
    key: 'bubbles',
    title: 'Bubble strategy',
    category: 'Gameplay',
    card: 'Spends the bubbles the board leaves lying about, or saves them for when they help most.',
    summary:
      'A bubble popped as a chain lands takes a bigger area with it. Pick how much of that to give up, and when to hold bubbles back, such as through a fever\'s last seconds.',
    hero: {
      id: 'shot-bubbles-hero',
      alt: 'A bubble popping as a chain clears',
      capture: 'The instant a bubble pops inside a clearing chain, big clear area visible.',
    },
    steps: [
      {
        title: 'Choose a strategy',
        body: 'On the Gameplay tab set Bubble Strategy. One Bubble Mid Chain is the default and keeps spare bubbles on the board for later chains.',
        shot: { id: 'shot-bubbles-strategy', alt: 'The Bubble Strategy dropdown', capture: 'Bubble Strategy dropdown open on the Gameplay tab, all five options visible.' },
      },
      {
        title: 'Hold bubbles for fevers',
        body: 'Hold bubbles last fever seconds leaves bubbles alone as a fever runs out, so they start the next fever fastest.',
      },
      {
        title: 'Change it between rounds',
        body: 'The Quick Bar has a Bubble chip that switches strategy without opening settings.',
        shot: { id: 'shot-bubbles-quickbar', alt: 'The Bubble chip on the Quick Bar', capture: 'Quick Bar strip with the Bubble chip highlighted.' },
      },
    ],
    settings: [
      { name: 'Bubble Strategy', def: 'One Bubble Mid Chain', desc: 'Options: One Bubble Mid Chain, All Bubbles Mid Chain, Save One Mid Chain, Save One, All Bubbles ASAP.' },
      { name: 'Hold bubbles last fever seconds', def: '0 (never hold)', desc: 'Leaves every bubble alone while a fever has at most this many seconds left.' },
    ],
    tip: 'Skills that turn Tsums into bubbles (Marie, Moana, Snow White and others) clear up after themselves whatever this is set to.',
    shots: [],
    video: {
      id: 'vid-bubbles',
      kind: 'remotion',
      seconds: 20,
      brief: 'Split screen: "One Bubble Mid Chain" against "All Bubbles ASAP" on the same kind of board, with a running coin counter under each.',
      note: 'Two strategies side by side.',
    },
  },
  {
    key: 'items',
    title: 'Bonus items',
    category: 'Gameplay',
    card: 'Sets the pre-round items you want, every round, without you touching the screen.',
    summary: 'Chooses +Score, +Coin, +Exp, +Time, +Bubble, 5>4 and +Combo on the pre-round screen before each round starts.',
    hero: {
      id: 'shot-items-hero',
      alt: 'The pre-round screen with bonus items selected',
      capture: 'The game\'s pre-round screen with +Coin and 5>4 lit.',
    },
    steps: [
      {
        title: 'Open the Round tab',
        body: 'Bonus items sit with the chain limits on Round. Each is a simple on or off switch.',
        shot: { id: 'shot-items-switches', alt: 'The bonus item switches on the Round tab', capture: 'Round tab scrolled to the seven bonus item switches.' },
      },
      {
        title: 'Switch on the ones you want',
        body: 'The script sets them on the pre-round screen before every round.',
      },
      {
        title: 'Change them from the Quick Bar',
        body: 'The Quick Bar has +Coin and 5>4 chips. A change applies from the next round.',
      },
    ],
    settings: [
      { name: '+Score', desc: 'Play with the +Score bonus active.' },
      { name: '+Coin', desc: 'Play with the +Coin bonus active.' },
      { name: '+Exp', desc: 'Play with the +Exp bonus active.' },
      { name: '+Time', desc: 'Play with the +Time bonus active.' },
      { name: '+Bubble', desc: 'Play with the +Bubble bonus active.' },
      { name: '5>4', desc: 'Play with the 5>4 bonus active.' },
      { name: '+Combo', desc: 'Play with the +Combo bonus active.' },
    ],
    tip: 'The round already committed to its items on the screen before, so a mid-round change lands on the next round.',
    shots: [],
    video: {
      id: 'vid-items',
      kind: 'capture',
      seconds: 10,
      brief: 'Screen capture of the pre-round screen: items tapped on by the script, then Start. Add a Remotion highlight ring on each item as it lights.',
      note: 'The script setting the items before a round.',
    },
  },
  {
    key: 'hearts',
    title: 'Heart sending',
    category: 'Social',
    card: 'Sends hearts to your friends on a timer, so nobody\'s waiting on you.',
    summary: 'Works down your friend list sending hearts, and stops where the list stops changing. Keeps a tally that survives a restart.',
    hero: {
      id: 'shot-hearts-hero',
      alt: 'The friend list with hearts being sent',
      capture: 'Friend list mid-sweep with several rows showing sent hearts. Blur or crop names.',
    },
    steps: [
      {
        title: 'Open the Hearts tab',
        body: 'Switch on Auto Send Hearts.',
        shot: { id: 'shot-hearts-tab', alt: 'The Hearts tab with Auto Send Hearts on', capture: 'Hearts tab, Auto Send Hearts on, Send to 0 score visible.' },
      },
      {
        title: 'Set how often and how long',
        body: 'Waiting time sets the repeat interval. Max run time caps a sweep, useful with 400+ friends.',
      },
      {
        title: 'Let it run',
        body: 'The sweep runs between rounds. Hearts are a higher priority than playing, so a very short interval can leave no time for rounds.',
      },
    ],
    settings: [
      { name: 'Auto Send Hearts', desc: 'Regularly sends hearts to your friends list.' },
      { name: 'Send to 0 score', desc: 'Also sends to players with no score. Useful for auto-senders, wasted on friends who have really stopped.' },
      { name: 'Max run time', desc: 'Limits how long a sweep runs, so you do not miss coins on incoming heart messages.' },
      { name: 'Waiting time (min) before repeat', desc: 'How long to wait before the next sweep.' },
    ],
    tip: 'The Quick Bar\'s Send chip adds or drops the heart chore straight away, mid-run.',
    shots: [],
    video: {
      id: 'vid-hearts',
      kind: 'remotion',
      seconds: 15,
      brief: 'Sped-up capture of one sweep down the friend list with a counter ticking "Hearts sent". Names blurred.',
      note: 'One sweep of the friend list.',
    },
  },
  {
    key: 'mailbox',
    title: 'Mailbox collection',
    category: 'Rewards',
    card: 'Collects heart mail and rewards, claiming all at once or one by one.',
    summary: 'Claims everything in one tap, or opens each message in turn so every sender gets a heart back. Skips the ad mail, and can skip ruby mail.',
    hero: {
      id: 'shot-mailbox-hero',
      alt: 'The mailbox with the Claim All button',
      capture: 'Mailbox list with heart mails and the Claim All button.',
    },
    steps: [
      {
        title: 'Choose a style',
        body: 'Receive All Hearts is fast. Receive Hearts One By One also returns a heart to each sender, even unknown ones.',
        shot: { id: 'shot-mailbox-settings', alt: 'The mailbox settings on the Chores tab', capture: 'Mailbox settings group on the Chores tab.' },
      },
      {
        title: 'Decide about rubies',
        body: 'Skip ruby leaves ruby mail unopened. Use it if your sending device runs the other platform\'s game, as rubies are not shared.',
      },
      {
        title: 'Set the interval',
        body: 'Waiting time before repeat sets how long the mailbox rests after it has been emptied.',
      },
    ],
    settings: [
      { name: 'Receive All Hearts', desc: 'Uses Claim All. Fast, but unknown senders do not get a heart back.' },
      { name: 'Receive Hearts One By One', desc: 'Opens each message so every sender gets a heart back. The pinned ad mail is always skipped.' },
      { name: 'Skip ruby', desc: 'Does not open messages containing rubies.' },
      { name: 'Claim All old mails', desc: 'Collects coin-bearing heart mails one by one, then finishes with Claim All.' },
      { name: 'Max Times to Open Mailbox', desc: 'Most consecutive openings before the next task starts. Ends early when the mailbox is empty.' },
      { name: 'Waiting time before repeat', desc: 'Minutes before the mailbox is opened again.' },
    ],
    tip: 'One By One is slower but encourages unknown players to send you hearts and coins later.',
    shots: [],
    video: {
      id: 'vid-mailbox',
      kind: 'capture',
      seconds: 12,
      brief: 'Capture of the mailbox being worked one by one. Highlight the skipped ad row with a Remotion label.',
      note: 'Working through the mailbox.',
    },
  },
  {
    key: 'boxes',
    title: 'Box buying',
    category: 'Rewards',
    card: 'Buys the box you picked on a schedule, and never spends rubies.',
    summary: 'Goes to the store on a timer and buys one kind of box until it sells out or the coins run out. Limits keep it from spending more than you meant.',
    hero: {
      id: 'shot-boxes-hero',
      alt: 'The Tsum Tsum store with a box selected',
      capture: 'Store screen with a Premium Box selected and the 10-Time Purchase button visible.',
    },
    steps: [
      {
        title: 'Pick the box',
        body: 'Box to buy: Premium Box+, Premium Box, Select Box, Pick-Up Capsule or Happiness Box. Only that one, never a fallback.',
        shot: { id: 'shot-boxes-settings', alt: 'Box buying settings on the Chores tab', capture: 'Box buying group on the Chores tab with all four rows.' },
      },
      {
        title: 'Choose how many at a time',
        body: 'One at a time, ten at a time, or ten then singles until the box sells out.',
      },
      {
        title: 'Set a schedule and a limit',
        body: 'Buy boxes every N hours, plus Purchases per sweep as a safety limit. Press Now to run one sweep straight away.',
      },
    ],
    settings: [
      { name: 'Buy boxes every (hours)', def: '0 (off)', desc: 'Schedule for a sweep. The Now button runs one whatever the schedule says.' },
      { name: 'Box to buy', desc: 'Which box. Select Box and Pick-Up Capsule share a limited-time slot, so most of the time neither is on sale.' },
      { name: 'Boxes per purchase', desc: 'One at a time, Ten at a time, or Ten then one until sold out.' },
      { name: 'Purchases per sweep', desc: 'Safety limit, 1 to 50. A 10-Time purchase counts as one.' },
    ],
    tip: 'Rubies are never spent: if the game offers to trade them for coins, the script cancels and ends the sweep.',
    shots: [],
    video: {
      id: 'vid-boxes',
      kind: 'remotion',
      seconds: 20,
      brief: 'Capture of a sweep: store, box tab, 10-Time purchase, reveals clearing. Remotion coin counter dropping, and a "rubies untouched" badge at the end.',
      note: 'One buying sweep.',
    },
  },
  {
    key: 'levels',
    title: 'Level unlocking',
    category: 'Rewards',
    card: 'Raises capped Tsum levels for you, either on a sweep or right after a round.',
    summary: 'Finds Tsums at their level cap and buys the raise, and can raise your MyTsum the moment a round shows it capped.',
    hero: {
      id: 'shot-levels-hero',
      alt: 'The level-up screen with Raise level cap on the MyTsum',
      capture: 'Post-round level-up panel with "Raise level cap!" on the first card.',
    },
    steps: [
      {
        title: 'Schedule a sweep',
        body: 'Unlock Level every N hours checks for capped Tsums, sorts them first and buys raises until it meets one that is not capped.',
        shot: { id: 'shot-levels-settings', alt: 'Unlock Level and Auto Unlock MyTsum Level rows', capture: 'Chores tab rows: Unlock Level every hours (with Now) and Auto Unlock MyTsum Level.' },
      },
      {
        title: 'Or just your MyTsum',
        body: 'Auto Unlock MyTsum Level buys one raise after a round, only when the game says the MyTsum is capped.',
      },
      {
        title: 'Run it on demand',
        body: 'The Now button, or the lock chip on the Quick Bar\'s second page, raises levels as soon as the current round ends.',
      },
    ],
    settings: [
      { name: 'Unlock Level every (hours)', def: '0 (off)', desc: 'Schedule for the sweep. Consumes coins. Your sort order is put back afterwards.' },
      { name: 'Auto Unlock MyTsum Level', desc: 'Raises the selected Tsum right after a round shows it capped. Retries after half an hour if it cannot afford it.' },
    ],
    tip: 'Both options consume coins. Keep a reserve if you also buy boxes.',
    shots: [],
    video: {
      id: 'vid-levels',
      kind: 'capture',
      seconds: 15,
      brief: 'Capture of a sweep sorted by Level Lock, raises bought one by one. Remotion "coins spent" ticker.',
      note: 'A level-cap sweep.',
    },
  },
  {
    key: 'tsumlist',
    title: 'Tsum List export',
    category: 'Data',
    card: 'Exports every Tsum you own to a spreadsheet, favourites marked.',
    summary: 'Walks your collection, taps each Tsum and writes its name, level, skill level, month acquired and favourite star to a CSV.',
    hero: {
      id: 'shot-tsumlist-hero',
      alt: 'The collection screen being walked card by card',
      capture: 'Collection screen sorted by Date acquired with one Tsum\'s detail panel open.',
    },
    steps: [
      {
        title: 'Open Chores',
        body: 'Find Export Tsum list on the Chores tab.',
        shot: { id: 'shot-tsumlist-row', alt: 'The Export Tsum list row with its Now button', capture: 'Chores tab: Export Tsum list row with the Now button.' },
      },
      {
        title: 'Press Now',
        body: 'It sorts by Date acquired, walks every owned Tsum and writes one row each. Expect a few seconds per Tsum.',
      },
      {
        title: 'Open the file',
        body: 'Look for stats/tsum_list_<stamp>.csv in the script\'s storage folder on the device. The starter tool can copy it to your computer.',
        shot: { id: 'shot-tsumlist-csv', alt: 'The exported CSV opened in a spreadsheet', capture: 'tsum_list CSV open in a spreadsheet, columns visible. Use a sample account.' },
      },
    ],
    settings: [
      { name: 'Export Tsum list (Now)', desc: 'Exports every owned Tsum: position, id, name, level and cap, skill level, month acquired, favourite, game build and device name.' },
    ],
    tip: 'With a run going, the export waits for the current round and the run carries on after it.',
    shots: [],
    video: {
      id: 'vid-tsumlist',
      kind: 'remotion',
      seconds: 20,
      brief: 'Sped-up walk of the collection, then a Remotion wipe to the CSV rows filling in.',
      note: 'Collection to spreadsheet.',
    },
  },
  {
    key: 'stats',
    title: 'Round stats',
    category: 'Data',
    card: 'Records every round it plays: score, coins, medals and the settings it was played under.',
    summary: 'One CSV row per round, one file per day, read off the score screen. Optionally shares new rows with a stats server.',
    hero: {
      id: 'shot-stats-hero',
      alt: 'A round results screen and its row in the stats CSV',
      capture: 'Score tally screen next to the matching stats CSV row (composite, or two captures).',
    },
    steps: [
      {
        title: 'Switch on Record round stats',
        body: 'It is on the General tab. Only rounds the script plays itself are recorded.',
        shot: { id: 'shot-stats-setting', alt: 'Record round stats on the General tab', capture: 'General tab with Record round stats and Share round stats rows.' },
      },
      {
        title: 'Find the files',
        body: 'stats/stats_<date>.csv in the script\'s storage folder, one per day. A field it could not read is left empty rather than guessed.',
      },
      {
        title: 'Optionally share',
        body: 'Share round stats (Beta) sends new rows to a server set on the script\'s Library card in GAP. Off by default.',
      },
    ],
    settings: [
      { name: 'Record round stats', desc: 'Appends a row per round: id, UTC time, skill, seconds, score, coins, medals and the gameplay settings used.' },
      { name: 'Share round stats (Beta)', def: 'Off', desc: 'Sends new rows at most once a minute. Needs Record round stats and a stats server set in GAP.' },
    ],
    tip: 'Each round has a unique id, so files from different devices can be merged without double counting.',
    shots: [
      { id: 'shot-stats-quickbar-readout', alt: 'The Quick Bar readout showing average coins', capture: 'Quick Bar right-hand readout with Base, Final and Medals rows filled.' },
    ],
    video: {
      id: 'vid-stats',
      kind: 'remotion',
      seconds: 15,
      brief: 'A round ending, score tally, then the CSV row appearing in a terminal-style overlay.',
      note: 'From the tally to the file.',
    },
  },
  {
    key: 'quickbar',
    title: 'Quick Bar',
    category: 'Control',
    card: 'A strip of live settings along the bottom edge, for changing things between rounds.',
    summary: 'Sits below the game\'s lowest button so it can stay up all run. Change skill, chain length, items, bubbles and presets, and see average coins per round.',
    hero: {
      id: 'shot-quickbar-hero',
      alt: 'The Quick Bar along the bottom of the screen',
      capture: 'Quick Bar page one over a paused round, every chip visible, readout filled.',
    },
    steps: [
      {
        title: 'Open it',
        body: 'Tap the sliders button on the floating bar.',
        shot: { id: 'shot-quickbar-open', alt: 'The floating bar with the sliders button', capture: 'Floating bar over the game, sliders button highlighted.' },
      },
      {
        title: 'Pause to edit',
        body: 'The controls work only while the script is paused, so a live strip never swallows the script\'s own taps. Pausing also presses the game\'s Pause.',
      },
      {
        title: 'Read the bars',
        body: 'Mid-round, a teal bar means a change lands this round, amber means the next one.',
        shot: { id: 'shot-quickbar-bars', alt: 'Quick Bar chips with teal and amber bars', capture: 'Quick Bar during a round with teal and amber bars visible, "Applies at the next round" banner up.' },
      },
      {
        title: 'Use page two',
        body: 'The page dots switch to page two: hearts, Unlock Level, Copy code, Last round, Games and Then.',
        shot: { id: 'shot-quickbar-page2', alt: 'Quick Bar page two', capture: 'Quick Bar page two, readout showing times.' },
      },
    ],
    settings: [
      { name: 'Skill, Lv, Scan, Chain', desc: 'Skill type, skill level, chains per board scan and maximum chain.' },
      { name: '+Coin, 5>4, Bubble', desc: 'Two bonus items and the bubble strategy.' },
      { name: 'Preset', desc: 'Loads a saved configuration.' },
      { name: 'Last round', desc: 'Stops the script once the round in progress is over. This run only.' },
      { name: 'Games, Then', desc: 'Stop after games and what happens afterwards.' },
      { name: 'Readout', desc: 'Average base coins, final coins and medals per round. Tap it to copy the run\'s figures.' },
    ],
    tip: 'Tap the readout to copy base and final coins, medals, per-second rates and round durations to the clipboard.',
    shots: [],
    video: {
      id: 'vid-quickbar',
      kind: 'remotion',
      seconds: 25,
      brief: 'Pause, open the Quick Bar, switch Bubble and Preset, resume. Remotion arrows and step badges (1 Pause, 2 Change, 3 Resume).',
      note: 'Changing settings without ending the run.',
    },
  },
  {
    key: 'presets',
    title: 'Presets and sharing',
    category: 'Control',
    card: 'Save a setup under a name, swap it in two taps, or share it as a short code or QR.',
    summary: 'A preset is how a round is played, under a name. Share it as a one-line code that fits in a chat message, or scan it from another phone.',
    hero: {
      id: 'shot-presets-hero',
      alt: 'The preset dropdown and the share code with its QR',
      capture: 'Settings top bar with the preset dropdown open, the Share settings card with code and QR below.',
    },
    steps: [
      {
        title: 'Save a preset',
        body: 'Tune your setup, tap the save button beside the dropdown, name it and choose Save as new.',
        shot: { id: 'shot-presets-save', alt: 'The save preset panel', capture: 'Save panel open with a name typed, Save as new / Update / Delete visible.' },
      },
      {
        title: 'Switch presets',
        body: 'Pick one from the dropdown, or from the Quick Bar between two rounds.',
      },
      {
        title: 'Share a code',
        body: 'Share settings → Copy puts a code on the clipboard and draws a QR. Another player pastes it, or scans the QR.',
        shot: { id: 'shot-presets-share', alt: 'The share code and QR', capture: 'Share settings card with a code and QR.' },
      },
    ],
    settings: [
      { name: 'Preset dropdown', desc: 'Names the preset your settings currently match, or No preset.' },
      { name: 'Share settings', desc: 'Copy, Paste and a QR. A code carries how a round is played and nothing about your account.' },
      { name: 'Export presets', desc: 'Writes one line per preset to presets.txt beside the round stats.' },
    ],
    tip: 'A code is a whole configuration, not a patch: anything it does not mention returns to its default.',
    shots: [],
    video: {
      id: 'vid-presets',
      kind: 'remotion',
      seconds: 20,
      brief: 'Two phones side by side: copy a code on one, scan the QR with the other, settings change. Remotion connector line between them.',
      note: 'Sharing a setup between two phones.',
    },
  },
  {
    key: 'runcontrol',
    title: 'Schedules and limits',
    category: 'Control',
    card: 'Rests between rounds, stops after a set number of games, and gives up on stuck rounds.',
    summary: 'Decide how a run starts, rests and ends: auto launch, delay between rounds, stop or pause after N games, and a round time limit.',
    hero: {
      id: 'shot-runcontrol-hero',
      alt: 'The General tab with the Run order card',
      capture: 'General tab with the Run order card showing the jobs a run will do, in order.',
    },
    steps: [
      {
        title: 'Look at the Run order card',
        body: 'It lists every job your settings add up to, in the order they run, so you can check before pressing Play.',
        shot: { id: 'shot-runcontrol-order', alt: 'The Run order card close up', capture: 'Run order card close up with 5-6 jobs listed.' },
      },
      {
        title: 'Set your limits',
        body: 'Delay between rounds, Max round duration, or Stop after games with an action of Turn off Auto Play, Pause or Stop.',
      },
      {
        title: 'Stop after this one',
        body: 'The Quick Bar\'s Last round button ends the run after the round in progress.',
      },
    ],
    settings: [
      { name: 'Auto Launch Tsum App', desc: 'Starts the game when the script starts.' },
      { name: 'Delay between rounds (min)', def: '0', desc: 'How long to rest after a round (0 to 120). Chores keep their own clocks. Now ends a rest.' },
      { name: 'Max round duration (min)', def: '0 (no limit)', desc: 'Gives up on a round that never ends (0 to 60).' },
      { name: 'When a round runs long', desc: 'Stop playing and let the clock run out, or stop the script.' },
      { name: 'Stop after games', def: '0 (never)', desc: 'Rounds to play before the action below (0 to 999).' },
      { name: 'When the games are played', desc: 'Turn off Auto Play, Pause the script, or Stop the script.' },
      { name: 'Device frame rate', def: '60', desc: 'Set to your emulator\'s frame rate; some screens dismiss after a fixed number of frames.' },
    ],
    tip: 'Changing Stop after games mid-run starts the count again from there.',
    shots: [],
    video: {
      id: 'vid-runcontrol',
      kind: 'remotion',
      seconds: 15,
      brief: 'Settings with Stop after games set to 3, then a time-lapse of three rounds and the run pausing. Remotion round counter 1/3, 2/3, 3/3.',
      note: 'A run that stops itself.',
    },
  },
  {
    key: 'companion',
    title: 'GAP Companion',
    category: 'Control',
    card: 'Watch and steer a run from your phone, with notifications when it finishes.',
    summary: 'Works with GAP Companion: live readouts and stats, remote start, workflows that chain jobs together, and Change My Tsum from the phone.',
    hero: {
      id: 'shot-companion-hero',
      alt: 'GAP Companion showing a run in progress',
      capture: 'GAP Companion Stats tab on a phone: this run, coins-per-round chart, recent rounds.',
    },
    steps: [
      {
        title: 'Pair the Companion',
        body: 'Follow GAP Companion\'s own setup, then open the Tsum Tsum script from it.',
      },
      {
        title: 'Watch the run',
        body: 'The Stats tab shows this run, a coins-per-round chart and recent rounds. Notifications arrive when a run wraps up.',
        shot: { id: 'shot-companion-stats', alt: 'The Companion Stats tab', capture: 'Companion Stats tab with a run in progress.' },
      },
      {
        title: 'Steer it',
        body: 'Change My Tsum, Stop after this round, and workflows that cycle jobs, all from the phone.',
      },
    ],
    settings: [
      { name: 'Change My Tsum', desc: 'Pick the Tsum from the phone. It is applied between rounds. Needs a Tsum List export first.' },
      { name: 'Workflows', desc: 'Chain chores and rounds into a loop, with Select Tsum, Skill and other nodes.' },
    ],
    tip: 'Select Tsum needs the Tsum List export, so run that once first.',
    shots: [],
    video: {
      id: 'vid-companion',
      kind: 'remotion',
      seconds: 20,
      brief: 'Phone (Companion) and emulator side by side: tap Change My Tsum on the phone, the emulator switches Tsum between rounds.',
      note: 'Changing the Tsum from the phone.',
    },
  },
  {
    key: 'reports',
    title: 'Problem reports',
    category: 'Support',
    card: 'Sends in everything needed to fix a problem: the screen, the frames before it and the log.',
    summary: 'When something goes wrong, one tap saves a folder with the screen, the router\'s recent frames and the last few hundred log records.',
    hero: {
      id: 'shot-reports-hero',
      alt: 'A problem report folder with its screen and log',
      capture: 'A reports/<id> folder open in a file manager: screen, trail frames, manifest, log excerpt.',
    },
    steps: [
      {
        title: 'Long-press Log',
        body: 'Long-press the Log chip on the floating bar, or use the Debug tab\'s Report row, and add a note.',
        shot: { id: 'shot-reports-debug', alt: 'The Debug tab Report row', capture: 'Debug tab with the Report row and note field.' },
      },
      {
        title: 'Share it',
        body: 'Share report or Save to device from Run History in the app.',
      },
      {
        title: 'Post in Discord',
        body: 'Share the folder in the support channel with a line on what you expected.',
      },
    ],
    settings: [
      { name: 'Report', desc: 'Writes the report folder, including debug records the normal log never gets.' },
    ],
    tip: 'A screen that will not capture is itself useful, so reports record that too.',
    shots: [],
    video: {
      id: 'vid-reports',
      kind: 'capture',
      seconds: 12,
      brief: 'Capture: long-press Log, type a note, the report saved banner, then the folder on a computer.',
      note: 'Filing a report.',
    },
  },
];

const tones = ['marigold', 'jade', 'rose', 'periwinkle'];
features.forEach((f, i) => {
  f.tone = tones[i % tones.length];
});

module.exports = {features};
