// Everything the Features page and the landing cards say, in one place.
//
// Media is declared where it is used: every `{id, alt, capture}` here is a
// screenshot to take, every `video` a clip to record or a Remotion composition
// to build. `npm run media:plan` reads this file (and landing.js) and writes
// MEDIA_PLAN.md, so the shopping list cannot drift from the pages.
//
// Copy follows app.gap.Tsum/README.md and the settings page's own help text.
// Defaults come from app.gap.Tsum/src/settingDefaults.ts. Every visible row on
// the settings page appears under some feature; a dropdown lists its options.

/**
 * @typedef {{id: string, alt: string, capture: string}} Shot
 * @typedef {{id: string, kind: 'capture'|'remotion', seconds: number, brief: string, note: string, youtube?: string}} Video
 * @typedef {{x: number, label: string, desc: string}} BarButton  x: the button's centre, as a share of the image width (0-1)
 * @typedef {{shot: Shot, buttons: BarButton[]}} Annotated  a screenshot with a numbered marker under each button
 * @typedef {{title: string, body: string, shot?: Shot, annotated?: Annotated}} Step
 * @typedef {{name: string, desc: string, group?: string}} SettingOption
 * @typedef {{name: string, def?: string, desc: string, options?: SettingOption[]}} Setting
 * @typedef {{to: string, label: string, text: string}} SeeAlso  a page elsewhere on the site that builds on the feature
 * @typedef {{key: string, title: string, category: string, summary: string, card: string,
 *   tone: string, hero?: Shot, steps: Step[], settings: Setting[], tip: string, shots: Shot[], video?: Video, see?: SeeAlso}} Feature
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
        body: 'Tap Play on the floating bar from the Tsum Tsum home screen. The script starts a round, plays it and carries on. Every button on the bar is explained below.',
        annotated: {
          shot: {id: 'shot-floating-bar', alt: 'The floating bar with six numbered buttons: Pause, Stop, Log, Quick Bar, Settings and Close', capture: 'Floating bar close up, running.'},
          buttons: [
            {x: 0.094, label: 'Pause / Play', desc: 'Pauses the script, and presses the game\'s Pause too. Tap again to carry on. Shows Play while the script is not running.'},
            {x: 0.252, label: 'Stop', desc: 'Ends the run.'},
            {x: 0.409, label: 'Log', desc: 'Opens the live log. Long-press to send a problem report.'},
            {x: 0.567, label: 'Quick Bar', desc: 'Shows or hides the Quick Bar along the bottom of the screen.'},
            {x: 0.724, label: 'Settings', desc: 'Opens the settings page over the game.'},
            {x: 0.882, label: 'Close', desc: 'Hides the floating bar.'},
          ],
        },
      },
    ],
    settings: [
      { name: 'Auto Play Game', def: 'On', desc: 'Plays rounds whenever no other chore is due. Hearts and mailbox chores go first, so very frequent chores can leave no time for rounds. Turn it off to run chores only.' },
      { name: 'Chains per board scan', def: '6', desc: 'How many chains are drawn before the board is read again (1 to 12). Fewer keeps each chain fresh; more plays faster.' },
      { name: 'Maximum Chain Number', def: '4', desc: 'Caps how many Tsums are linked in one chain (3 to 15). A low cap plays more, shorter chains, which suits Tsums that score on chain count. It also makes each board scan cheaper.' },
      { name: 'Link reach (% of a tsum)', def: '190', desc: 'The largest gap allowed between two linked Tsums, as a share of one Tsum\'s width (150 to 350). Too low and chains come out short; too high and the game refuses the drag.' },
      { name: 'Link MyTsum first', def: 'On', desc: 'Prefers chains of your own Tsum, so the skill gauge fills faster.' },
      { name: 'Use Fan?', def: 'Off', desc: 'Shakes the board with the fan every few scans. Opinions differ on whether it helps, so try it and compare your results.' },
      { name: 'Max round duration (min)', def: '0 (no limit)', desc: 'Gives up on a round that never ends, such as a stuck skill or an unrecognised screen. Set what happens next under Schedules and limits.' },
    ],
    tip: 'Low-cap, many-chain play is the usual choice for Roxas, Maleficent and other count-scoring Tsums.',
    shots: [],
    video: {
      id: 'vid-autoplay',
      youtube: '1HmHhnLJcUE',
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
      {
        name: 'Skill Type',
        def: 'Burst',
        desc: 'Which skill the script performs. Grouped by what the skill leaves behind. Pick the entry named after your Tsum if there is one, otherwise Burst or Burst + clear bubbles.',
        options: [
          { group: 'Burst', name: 'Burst', desc: 'The general-purpose entry. Fires, waits for the board to settle (up to Skill Waiting time), then plays on.' },
          { group: 'Burst', name: 'Cabbage Mickey', desc: 'Searches the cabbages for Mickey and taps him. If he is never found, it sweeps the bubbles instead.' },
          { group: 'Burst', name: 'Cpt. Lightyear', desc: 'Randomises, lands timed aiming taps (more at a higher Skill Level), then sweeps the bubbles.' },
          { group: 'Burst', name: 'Cpt. Lightyear 120', desc: 'The same as Cpt. Lightyear, timed for an emulator running at 120 fps.' },
          { group: 'Burst', name: 'Donald', desc: 'Taps the whole play area on a grid, three times over, to hit the targets the skill scatters.' },
          { group: 'Burst', name: 'Holiday Donald', desc: 'The same choreography as Donald.' },
          { group: 'Burst', name: 'Jedi Luke', desc: 'Taps four spots before and after the skill, and flies it with five upward drags.' },
          { group: 'Burst', name: 'Lightning McQueen+', desc: 'Waits for the car to reach top speed before the follow-up tap, so it clears the most.' },
          { group: 'Burst', name: 'Nightmare Before Christmas (Set)', desc: 'Plays through each character\'s cut-in, and keeps reading the board as Oogie Boogie\'s rolls shrink the tsums.' },
          { group: 'Burst', name: 'Disney Villains (Set) (Beta)', desc: 'Fires like Burst, and reads the neon villain tsums by colour so more of them can be chained.' },
          { group: 'Burst', name: 'Pair Tsum', desc: 'Like Burst, but watches both skill buttons and fires whichever is ready the moment it is.' },
          { group: 'Burst', name: 'Sheriff Woody', desc: 'Swings the lasso with three left-and-right drags across the board.' },
          { group: 'Bubble', name: 'Burst + clear bubbles', desc: 'Burst, then a sweep of the whole play area for a skill that leaves the board covered in bubbles. The rest of the round still follows Bubble Strategy.' },
          { group: 'Bubble', name: 'Cinderella', desc: 'Draws serpentine passes over the whole board, then clears the bubbles left behind.' },
          { group: 'Bubble', name: 'Horn Hat Mickey', desc: 'Sweeps the bubbles the skill makes, after the shortest intro of the bubble skills.' },
          { group: 'Bubble', name: 'Marie', desc: 'Sweeps the bubbles the skill turns tsums into.' },
          { group: 'Bubble', name: 'Miss Bunny', desc: 'The same sweep as Marie.' },
          { group: 'Bubble', name: 'Moana', desc: 'Sweeps the bubbles, after a slightly longer intro than Marie\'s.' },
          { group: 'Bubble', name: 'Rabbit', desc: 'The same sweep as Marie.' },
          { group: 'Bubble', name: 'Snow White', desc: 'Sweeps once the animation ends, then again from halfway down for bubbles that drifted.' },
          { group: 'Unique', name: 'Coronation Day Elsa', desc: 'Freezes parallel bands from the bottom of the board up while her window is open, then breaks the pile before it closes. Skill Level sets the window\'s length.' },
          { group: 'Unique', name: 'Formal Beast', desc: 'Fires like Burst, then picks chains by colour so the Beast and Belle halves of the gauge fill evenly.' },
          { group: 'Unique', name: 'Gaston', desc: 'Chains the Gaston tsums through his window, cancels with bubbles, and times the closing chain off his antlers.' },
          { group: 'Unique', name: 'Lorcana Aurora', desc: 'Plays as Burst + clear bubbles until she transforms, then chains every bubble on the board the long way round. Turns Lorcana Card on.' },
          { group: 'Unique', name: 'Rapunzel+', desc: 'Draws one chain through tsums of any colour while the board is colour-blind. Skill Level sets how many it may take (9 to 24).' },
          { group: 'Unique', name: 'Tiara Minnie+', desc: 'Finds the present shown in Minnie\'s thought bubble and taps its match.' },
          { name: 'No Skill', desc: 'Never fires the skill, so you can tap it yourself.' },
        ],
      },
      { name: 'Skill Level', def: '6', desc: 'Read only by Cinderella, Cpt. Lightyear, Coronation Day Elsa (her freeze window is 5s at level 1, 10s at level 6) and Rapunzel+. Every other skill ignores it.' },
      { name: 'Lorcana Card', def: 'Off', desc: 'For Lorcana Tsums: pops the ink-stone bubble after each skill and taps the transformation card when it appears. Works with any Skill Type.' },
      { name: 'Auto Tap Skill', def: 'On', desc: 'Fires the skill the moment the gauge fills, even in the middle of a chain.' },
      { name: 'Wait for Settle (s)', def: '0.0', desc: 'Holds the tap until the board settles (0.0 to 3.0 s). A generous value costs nothing on a board that has already refilled.' },
      { name: 'No skill last fever seconds', def: '0 (off)', desc: 'Holds the skill when a fever ends within this many seconds (0 to 10), so it starts the next fever instead.' },
      { name: 'Skill Waiting time (sec)', def: '0', desc: 'The longest the board is left alone after an activation (0 to 15). Play resumes as soon as the tsums stop falling.' },
      { name: 'Delay Skill ReActivation (sec)', def: '0 (never hold)', desc: 'Holds a full gauge for this long after a skill fires (0 to 30). Set it to the skill\'s duration so a second tap does not restart it.' },
    ],
    tip: 'If a skill leaves bubbles behind, set Skill Waiting time long enough to cover its effect.',
    shots: [
      { id: 'shot-skills-elsa', alt: 'Coronation Day Elsa\'s freeze bands across the board', capture: 'Coronation Day Elsa mid-window with two or three parallel ice bands visible.' },
      { id: 'shot-skills-gaston', alt: 'Gaston\'s antlers and a long chain', capture: 'Gaston window open, antlers in the chrome, a chain being drawn.' },
    ],
    video: {
      id: 'vid-skills',
      youtube: '6LaCN7cpbnw',
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
      {
        name: 'Bubble Strategy',
        def: 'One Bubble Mid Chain',
        desc: 'What to do with the bubbles on the board. A bubble popped as a chain lands clears a bigger area, so each option is a trade between that and clearing bubbles quickly. Skills that make bubbles themselves clear up after their own, whatever this says.',
        options: [
          { name: 'One Bubble Mid Chain', desc: 'Pops exactly one bubble as each chain lands, keeping the rest for later chains.' },
          { name: 'All Bubbles Mid Chain', desc: 'Pops every bubble the last scan found, still only as a chain lands.' },
          { name: 'Save One Mid Chain', desc: 'Pops every bubble but the best-placed one as a chain lands, so one is always left on the board.' },
          { name: 'Save One', desc: 'Pops bubbles as soon as they are seen except the best-placed one, which is saved for the next long chain.' },
          { name: 'All Bubbles ASAP', desc: 'Pops every bubble as soon as it is seen, without waiting for a chain, and taps across the bottom of the board when a pile builds up.' },
        ],
      },
      { name: 'Hold bubbles last fever seconds', def: '0 (never hold)', desc: 'Leaves every bubble alone while a fever has at most this many seconds left (0 to 10), so they start the next fever fastest.' },
    ],
    tip: 'Skills that turn Tsums into bubbles (Marie, Moana, Snow White and others) clear up after themselves whatever this is set to.',
    shots: [],
  },
  {
    key: 'items',
    title: 'Bonus items',
    category: 'Gameplay',
    card: 'Sets the pre-round items you want, every round, without you touching the screen.',
    summary: 'Chooses +Score, +Coin, +Exp, +Time, +Bubble, 5>4 and +Combo on the pre-round screen before each round starts.',
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
      { name: '+Score', def: 'Off', desc: 'Buys the score bonus before each round.' },
      { name: '+Coin', def: 'Off', desc: 'Buys the bonus that earns more Coins from the round.' },
      { name: '+Exp', def: 'Off', desc: 'Buys the bonus that earns more experience from the round.' },
      { name: '+Time', def: 'Off', desc: 'Buys a few more seconds of play.' },
      { name: '+Bubble', def: 'Off', desc: 'Buys more bubbles on the board.' },
      { name: '5>4', def: 'Off', desc: 'Buys one Tsum colour fewer, so chains come easier.' },
      { name: '+Combo', def: 'Off', desc: 'Buys more time to keep a combo going.' },
    ],
    tip: 'The round already committed to its items on the screen before, so a mid-round change lands on the next round.',
    shots: [],
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
      { name: 'Auto Send Hearts', def: 'Off', desc: 'Regularly works down your friends list sending hearts.' },
      { name: 'Send to 0 score', def: 'Off', desc: 'Also sends to players with no score. Useful for auto-senders, wasted on friends who have really stopped.' },
      { name: 'Max run time (min)', def: '0 (no limit)', desc: 'Limits how long one pass down the list runs (0 to 80), so you do not miss coins on incoming heart mail. With a limit, the next pass carries on where this one stopped; at 0 every pass starts from the top.' },
      { name: 'Waiting time (min) before repeat', def: '26', desc: 'How long to wait before the next pass down the friends list (1 to 60).' },
    ],
    tip: 'The Quick Bar\'s Send chip adds or drops the heart chore straight away, mid-run.',
    shots: [],
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
      { name: 'Receive All Hearts', def: 'Off', desc: 'Uses Claim All. Fast, but unknown senders do not get a heart back.' },
      { name: 'Waiting time (min) before repeat', def: '25', desc: 'How long to wait before the next Claim All (5 to 60).' },
      { name: 'Receive Hearts One By One', def: 'Off', desc: 'Opens each message so every sender gets a heart back. Slower than Claim All. The pinned ad mail is always skipped.' },
      { name: 'Skip Ruby', def: 'Off', desc: 'Leaves messages containing rubies in the mailbox. Useful when your main device is on iOS and your sender on Android, since rubies do not carry across.' },
      { name: 'Skip Medals', def: 'Off', desc: 'Leaves Mission Clear medals in the mailbox.' },
      { name: 'Claim All old mails', def: 'Off', desc: 'Collects coin-bearing heart mails one by one, then finishes with Claim All.' },
      { name: 'Max Times to Open Mailbox', def: '5', desc: 'Most consecutive openings before the next task starts (1 to 20). Ends early when the mailbox is empty.' },
      { name: 'Waiting time (min) before repeat', def: '5', desc: 'Minutes before the mailbox is opened again, once it is empty or the limit above is reached (1 to 60).' },
    ],
    tip: 'One By One is slower but encourages unknown players to send you hearts and coins later.',
    shots: [],
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
      { name: 'Buy boxes every hours', def: '0 (off)', desc: 'Hours between sweeps (0 to 24). A sweep buys until the box sells out or you run out of Coins. The Now button runs one whatever the schedule says. Rubies are never spent.' },
      {
        name: 'Box to buy',
        def: 'Premium Box',
        desc: 'Only ever this box: the script never falls back to another one.',
        options: [
          { name: 'Premium Box+', desc: 'The Premium Box+ in the store.' },
          { name: 'Premium Box', desc: 'The standard Premium Box.' },
          { name: 'Select Box', desc: 'Shares the limited-time slot with Pick-Up Capsule, so most of the time it is not on sale and the sweep buys nothing.' },
          { name: 'Pick-Up Capsule', desc: 'Shares the limited-time slot with Select Box, with the same caveat.' },
          { name: 'Happiness Box', desc: 'Always bought one at a time, since it has no 10-Time button.' },
        ],
      },
      {
        name: 'Boxes per purchase',
        def: 'One at a time',
        desc: 'Which purchase button the sweep presses.',
        options: [
          { name: 'One at a time', desc: 'Never presses 10-Time.' },
          { name: 'Ten at a time', desc: 'Uses 10-Time Purchase where the box offers it, and ends the sweep when the store refuses ten because the box is almost sold out.' },
          { name: 'Ten, then one until sold out', desc: 'The same until that refusal, then carries on one at a time until the box sells out, emptying it in one sweep.' },
        ],
      },
      { name: 'Purchases per sweep', def: '10', desc: 'Safety limit, 1 to 50. A 10-Time purchase counts as one.' },
    ],
    tip: 'Rubies are never spent: if the game offers to trade them for coins, the script cancels and ends the sweep.',
    shots: [],
    video: {
      id: 'vid-boxes',
      youtube: 'tLmZvj7onv4',
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
      { name: 'Unlock Level every hours', def: '0 (off)', desc: 'Hours between sweeps (0 to 24). Consumes coins. The Now button runs one whatever the schedule says. Your sort order is put back afterwards.' },
      { name: 'Auto Unlock MyTsum Level', def: 'Off', desc: 'Raises the selected Tsum right after a round shows it capped. Retries after half an hour if it cannot afford it.' },
    ],
    tip: 'Both options consume coins. Keep a reserve if you also buy boxes.',
    shots: [],
    video: {
      id: 'vid-levels',
      kind: 'capture',
      seconds: 21,
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
      },
    ],
    settings: [
      { name: 'Export Tsum list (Now)', desc: 'Exports every owned Tsum: position, id, name, level and cap, skill level, month acquired, favourite, game build and device name.' },
    ],
    tip: 'With a run going, the export waits for the current round and the run carries on after it.',
    see: {to: '/stats-site', label: 'Tsum Tsum Stats', text: 'shows the export as a catalog of every Tsum, with what it costs to max the rest.'},
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
      { name: 'Record round stats', def: 'On', desc: 'Appends a row per round: id, UTC time, skill, seconds, score, coins, medals and the gameplay settings used.' },
      { name: 'Share round stats (Beta)', def: 'Off', desc: 'Sends new rows at most once a minute. Needs Record round stats and a stats server set in GAP.' },
    ],
    tip: 'Each round has a unique id, so files from different devices can be merged without double counting.',
    see: {to: '/stats-site', label: 'Tsum Tsum Stats', text: 'turns these files into coin efficiency, charts and a table of every round, on your own computer.'},
    shots: [
      { id: 'shot-stats-quickbar-readout', alt: 'The Quick Bar readout showing average coins', capture: 'Quick Bar right-hand readout with Base, Final and Medals rows filled.' },
    ],
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
      {
        name: 'What a code or preset carries',
        desc: 'Codes and presets hold the same settings: how a round is played, off the Skills, Round and Gameplay tabs. Loading one sets every setting below, and one it does not mention goes back to its default.',
        options: [
          { group: 'Skills tab', name: 'Skill Type', desc: 'A skill your version does not list is skipped.' },
          { group: 'Skills tab', name: 'Skill Level', desc: '' },
          { group: 'Skills tab', name: 'Lorcana Card', desc: '' },
          { group: 'Skills tab', name: 'Auto Tap Skill', desc: '' },
          { group: 'Skills tab', name: 'Wait for Settle (s)', desc: '' },
          { group: 'Skills tab', name: 'No skill last fever seconds', desc: '' },
          { group: 'Skills tab', name: 'Skill Waiting time (sec)', desc: '' },
          { group: 'Skills tab', name: 'Delay Skill ReActivation (sec)', desc: '' },
          { group: 'Round tab', name: 'Chains per board scan', desc: '' },
          { group: 'Round tab', name: 'Maximum Chain Number', desc: '' },
          { group: 'Round tab', name: 'Items', desc: '+Score, +Coin, +Exp, +Time, +Bubble, 5>4 and +Combo, each on or off.' },
          { group: 'Gameplay tab', name: 'Link reach (% of a tsum)', desc: '' },
          { group: 'Gameplay tab', name: 'Link MyTsum first', desc: '' },
          { group: 'Gameplay tab', name: 'Bubble Strategy', desc: '' },
          { group: 'Gameplay tab', name: 'Hold bubbles last fever seconds', desc: '' },
          { group: 'Gameplay tab', name: 'Use Fan?', desc: '' },
        ],
      },
      {
        name: 'What they leave alone',
        desc: 'Loading a code or preset never changes these settings. They stay as you set them.',
        options: [
          { name: 'Auto Play Game', desc: 'On the Round tab, but it is about the run, not the round.' },
          { name: 'General tab', desc: 'Language, the device settings, Auto Launch Tsum App, Delay between rounds, Max round duration and its action, Stop after games and its action, Record round stats and Share round stats.' },
          { name: 'Hearts and Chores tabs', desc: 'Receiving and sending hearts, the mailbox, level caps, box buying and the Tsum List.' },
          { name: 'Debug tab', desc: 'Logging and diagnostics.' },
        ],
      },
    ],
    tip: 'A code is a whole round configuration, not a patch: a round setting it does not mention returns to its default. Settings outside that list are never touched.',
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
      { name: 'Special Screen Ratio (Long Screen)', def: 'Off', desc: 'For long screens with uneven black bars above and below the game. Try it if hearts or the mailbox misbehave. Start the game yourself first: it does not work with Auto Launch.' },
      { name: 'Tsum app restart frequency (min)', def: '0 (off)', desc: 'Restarts the game this often on long runs (0 to 7200). Needs Auto Launch Tsum App.' },
      { name: 'Auto Launch Tsum App', def: 'Off', desc: 'Starts the game when the script starts. Leave it off with Special Screen Ratio.' },
      { name: 'Delay between rounds (min)', def: '0', desc: 'How long to rest after a round (0 to 120). Chores keep their own clocks. Now ends a rest.' },
      { name: 'Max round duration (min)', def: '0 (no limit)', desc: 'Gives up on a round that never ends (0 to 60).' },
      {
        name: 'When a round runs long',
        def: 'Stop playing, let the clock run out',
        desc: 'What happens when Max round duration is up. Either way the script stops playing and never presses the game\'s Pause.',
        options: [
          { name: 'Stop playing, let the clock run out', desc: 'Waits for the round to time out, then carries on as normal with the score screen, stats and the next round.' },
          { name: 'Stop the script', desc: 'Stops at once, like the Stop button. The round times out unwatched and is not recorded.' },
        ],
      },
      { name: 'Stop after games', def: '0 (never)', desc: 'Rounds to play before the action below (0 to 999). The last round is always played out.' },
      {
        name: 'When the games are played',
        def: 'Turn off Auto Play',
        desc: 'What happens once Stop after games is reached.',
        options: [
          { name: 'Turn off Auto Play', desc: 'Stops starting rounds; mailbox, hearts and other chores carry on.' },
          { name: 'Pause the script', desc: 'Pauses like the overlay\'s Pause button. Resume plays that many rounds again.' },
          { name: 'Stop the script', desc: 'Stops like the Stop button.' },
        ],
      },
    ],
    tip: 'Changing Stop after games mid-run starts the count again from there.',
    shots: [],
  },
  {
    key: 'reports',
    title: 'Problem reports',
    category: 'Support',
    card: 'Sends in everything needed to fix a problem: the screen, the frames before it and the log.',
    summary: 'When something goes wrong, one tap saves a folder with the screen, the router\'s recent frames and the last few hundred log records.',
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
      { name: 'Debug logs', def: 'Off', desc: 'Adds more detail to the log file. A report carries those lines either way.' },
      { name: 'Debug game', def: 'Off', desc: 'Saves working screenshots while playing, and a picture of every screen visited. For development.' },
      { name: 'Walkthrough recorder', def: 'Off', desc: 'Records instead of playing: you drive the game by hand and each screen and tap is written to walkthrough/. Nothing else runs. Turn it off again to play.' },
      { name: 'Collect unknown screens', def: 'Off', desc: 'Saves screens the script cannot recognise to corpus/, so they can be sent in for a fix.' },
      { name: 'Page history depth', def: '20', desc: 'How many recent screens are remembered for a report (0 to 100). 0 turns the history off.' },
    ],
    tip: 'A screen that will not capture is itself useful, so reports record that too.',
    shots: [],
  },
];

const tones = ['marigold', 'jade', 'rose', 'periwinkle'];
features.forEach((f, i) => {
  f.tone = tones[i % tones.length];
});

module.exports = {features};
