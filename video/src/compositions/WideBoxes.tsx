import React from 'react';
import {Sequence, interpolate, useCurrentFrame, Easing} from 'remotion';
import {Callout} from '../shared/Callout';
import {Counter} from '../shared/Counter';
import {RingPulse} from '../shared/RingPulse';
import {BORDER, CARD_LEFT, CARD_SCALE, CARD_TOP, Card, Chip, Headline, INNER_W, WideShell, toCard} from '../shared/Wide';
import {fonts, tones} from '../theme';

// yt-boxes: one box-buying sweep (boxes-sweep.mp4, 140.6 s) retimed to about 44 s. The
// footage is the test account's real sweep. Numbers on screen come from reading the game's
// currency bar at every store screen (capture/raw/cuts/cuts.json): coins fell from 57,738,150
// to 55,848,150, six 10-Time purchases at 300,000 and three 1-Time at 30,000, and the ruby
// count stayed at 1,463 throughout. The game's own bar is covered by a strip.

const FPS = 30;
const FILE = 'boxes-sweep.mp4';

type Seg = {
  from: number; // source seconds
  to?: number; // omitted for a freeze at `from`
  speed: number;
  frames: number;
  kicker?: string;
  title?: string;
};

const segs: Seg[] = [
  {from: 0.3, speed: 1, frames: 75, kicker: 'Setup', title: 'Pick the box'}, // frozen on the settings
  {from: 0.3, to: 2.5, speed: 1, frames: 66},
  {from: 2.5, to: 7.5, speed: 1, frames: 150, kicker: 'Sweep', title: 'Store and purchase'},
  {from: 7.5, to: 24.0, speed: 4, frames: 124, kicker: '4x', title: 'Opening the boxes'},
  {from: 24.0, to: 27.5, speed: 1, frames: 105, kicker: 'Result', title: 'Every box listed'},
  {from: 27.5, to: 113.0, speed: 10, frames: 257, kicker: '10x', title: 'Ten at a time'},
  {from: 113.0, to: 118.0, speed: 1, frames: 150, kicker: 'Then', title: 'One at a time'},
  {from: 118.0, to: 139.5, speed: 3, frames: 215, kicker: '3x', title: 'Until the sweep ends'},
  {from: 139.5, to: 140.5, speed: 1, frames: 30},
  {from: 140.5, speed: 1, frames: 150, kicker: 'Done', title: 'Sweep complete'}, // frozen on the last frame
];

const starts = segs.reduce<number[]>((a, s, i) => [...a, i === 0 ? 0 : a[i - 1] + segs[i - 1].frames], []);
export const BOXES_FRAMES = segs.reduce((n, s) => n + s.frames, 0);

/** Output frame at which source time `t` is on screen (sped-up segments only). */
const outFrameOf = (t: number): number => {
  const i = segs.findIndex((s) => s.to !== undefined && t >= s.from && t < s.to);
  return starts[i] + ((t - segs[i].from) / segs[i].speed) * FPS;
};

// Source time of each confirmed purchase (the dialog's OK) and what it cost.
const steps: [number, number][] = [
  [6.5, 300_000],
  [27.5, 300_000],
  [46.5, 300_000],
  [63.5, 300_000],
  [82.5, 300_000],
  [98.5, 300_000],
  [123.5, 30_000],
  [128.5, 30_000],
  [134.5, 30_000],
];
const stepFrames = steps.map(([t, coins]) => ({at: outFrameOf(t), coins}));
export const TOTAL_COINS = steps.reduce((n, [, c]) => n + c, 0);

const coinsSpentAt = (frame: number): number =>
  stepFrames.reduce(
    (n, s) =>
      n +
      s.coins *
        interpolate(frame, [s.at, s.at + 14], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: Easing.out(Easing.cubic),
        }),
    0,
  );

/** A pulsing frame round a settings row, in cut coordinates (540x896). */
const RowHighlight: React.FC<{x: number; y: number; w: number; h: number; from: number; to: number}> = ({x, y, w, h, from, to}) => {
  const frame = useCurrentFrame();
  if (frame < from || frame > to) {
    return null;
  }
  const a = toCard(x, y);
  const b = toCard(x + w, y + h);
  const pulse = 0.5 + 0.5 * Math.sin((frame - from) / 4);
  return (
    <div
      style={{
        position: 'absolute',
        left: a.x - 8,
        top: a.y - 8,
        width: b.x - a.x + 16,
        height: b.y - a.y + 16,
        border: `7px solid ${tones.marigold.fill}`,
        borderRadius: 26,
        boxShadow: `0 0 0 3px #14131f, 0 0 ${10 + pulse * 18}px ${tones.marigold.fill}`,
      }}
    />
  );
};

/** Covers the game's currency bar (level, tickets, coins, rubies) with our own reading. */
const Strip: React.FC = () => {
  const frame = useCurrentFrame();
  const coins = Math.round(coinsSpentAt(frame));
  return (
    <div
      style={{
        position: 'absolute',
        left: CARD_LEFT + BORDER,
        top: CARD_TOP + BORDER,
        width: INNER_W,
        height: 82,
        background: '#1c1b2b',
        borderBottom: `6px solid ${tones.marigold.edge}`,
        borderTopLeftRadius: 36,
        borderTopRightRadius: 36,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 14,
        fontFamily: fonts.body,
        fontWeight: 800,
        fontSize: 34,
        color: '#f4efe6',
      }}
    >
      <span>Coins spent</span>
      <span style={{color: tones.marigold.fill, fontVariantNumeric: 'tabular-nums'}}>{coins.toLocaleString('en-US')}</span>
    </div>
  );
};

/** Everything that follows the global clock: the strip over the game's bar and the counters. */
const Overlay: React.FC = () => {
  const frame = useCurrentFrame();
  const bStart = starts[2];
  const sStart = starts[segs.length - 1];
  if (frame < bStart) {
    return null;
  }
  return (
    <>
      <Strip />
      <div style={{position: 'absolute', left: 80, top: 720, width: 980}}>
        <Counter label="Coins spent" value={Math.round(coinsSpentAt(frame))} from={0} frames={1} tone="marigold" />
      </div>
      <div style={{position: 'absolute', left: 80, top: 920, display: 'flex', gap: 20}}>
        <Chip tone="jade" size={46}>
          Rubies spent: 0
        </Chip>
        {frame >= sStart && (
          <Chip tone="periwinkle" size={46}>
            63 boxes
          </Chip>
        )}
      </div>
    </>
  );
};

export const YtBoxes: React.FC = () => {
  return (
    <WideShell>
      {segs.map((s, i) => (
        <Sequence key={i} from={starts[i]} durationInFrames={s.frames}>
          <Card file={FILE} startFrom={Math.round(s.from * FPS)} playbackRate={s.speed} freeze={s.to === undefined || i === 0}>
            {i === 0 && (
              <>
                <RowHighlight x={315} y={481} w={187} h={36} from={6} to={40} />
                <RowHighlight x={180} y={641} w={323} h={36} from={40} to={75} />
              </>
            )}
            {i === 1 && <RingPulse x={toCard(463, 382).x} y={toCard(463, 382).y} at={33} radius={42} scale={CARD_SCALE} />}
          </Card>
          {s.title && i > 0 && <Headline kicker={s.kicker} title={s.title} durationInFrames={s.frames} />}
        </Sequence>
      ))}
      <Sequence from={6} durationInFrames={34}>
        <Callout x={570} y={800} from={0} to={34}>
          Box to buy: Premium Box
        </Callout>
      </Sequence>
      <Sequence from={40} durationInFrames={35}>
        <Callout x={570} y={800} from={0} to={35}>
          Ten, then one until sold out
        </Callout>
      </Sequence>
      <Sequence from={starts[1] + 20} durationInFrames={55}>
        <Callout x={570} y={800} from={0} to={55}>
          Press Now
        </Callout>
      </Sequence>
      <Sequence from={0} durationInFrames={segs[0].frames + segs[1].frames}>
        <Headline kicker={segs[0].kicker} title={segs[0].title!} durationInFrames={segs[0].frames + segs[1].frames} />
      </Sequence>
      <Overlay />
    </WideShell>
  );
};
