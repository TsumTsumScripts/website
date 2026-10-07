// Which part of the Features page a changelog line belongs to.
//
// A bullet is matched against `rules` in order and links to the first hit;
// otherwise its *Area* heading is looked up in `areas`. Add a rule when a new
// kind of line has no link, or points at the wrong feature.

/** [pattern, feature key, optional tab] */
const rules = [
  [/change my tsum|workflow|companion|notification/i, 'companion'],
  [/tsum list|select my tsum/i, 'tsumlist'],
  [/quick bar|readout/i, 'quickbar'],
  [/preset|settings code|share (settings|code)|qr/i, 'presets'],
  [/round stats|stats column|csv/i, 'stats'],
  [/unlock (my)?\s?(tsum )?level|level cap|raise level/i, 'levels'],
  [/box|capsule/i, 'boxes'],
  [/receiv\w+ hearts|mailbox|\bmail\b|ruby/i, 'mailbox'],
  [/send\w* hearts|\bhearts?\b/i, 'hearts'],
  [/bubble/i, 'bubbles'],
  [/stop after|delay between|max round|round duration|auto launch|app restart|pause|last round|auto play/i, 'runcontrol'],
  [/report|log\b/i, 'reports'],
  [/skill|elsa|gaston|lorcana|villains|nightmare|fever|burst|rapunzel|moana|cinderella|tiara|formal beast/i, 'skills'],
  [/bonus|\+score|\+coin|\+exp|\+time|5>4|combo/i, 'items'],
  [/chain|large tsums|board|tsums?\b/i, 'autoplay'],
];

/** Lower-cased *Area* heading -> feature key. */
const areas = {
  skills: 'skills',
  bubbles: 'bubbles',
  'run control': 'runcontrol',
  'quick bar and settings': 'quickbar',
  'tsum list': 'tsumlist',
  'platform and data': 'stats',
  hearts: 'hearts',
  mailbox: 'mailbox',
  boxes: 'boxes',
  chores: 'levels',
  stats: 'stats',
};

/** The feature key a changelog line links to, or null. */
function featureFor(text, area) {
  for (const [re, key] of rules) if (re.test(text)) return key;
  return (area && areas[area.toLowerCase()]) || null;
}

module.exports = {featureFor, rules, areas};
