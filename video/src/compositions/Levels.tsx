import React from 'react';
import {AbsoluteFill, Easing, Sequence, interpolate, useCurrentFrame} from 'remotion';
import {Callout} from '../shared/Callout';
import {Footage} from '../shared/Footage';
import {LowerThird} from '../shared/LowerThird';
import {FPS, WIDTH, fonts, tones} from '../theme';

// vid-levels: one level-cap sweep (levels-sweep.mp4, 51 s) retimed to about 21 s. The footage is the
// test account's real sweep: nine raises at 10,000 coins each (coins 55,771,058 to 55,681,058,
// rubies untouched at 1,463). `raises` are the source times at which the game's own coin count
// starts rolling down (capture/raw/cuts/cuts.json). The game's currency bar is covered by a strip.

const FILE = 'levels-sweep.mp4';
const PER_RAISE = 10_000;

type Seg = {from: number; to?: number; speed: number; frames: number; kicker?: string; title?: string};

const segs: Seg[] = [
  {from: 0, to: 3.2, speed: 1, frames: 96, kicker: 'Setup', title: 'Press Now'},
  {from: 3.2, to: 50.0, speed: 3, frames: 468, kicker: '3x', title: 'Raising capped Tsums'},
  {from: 50.0, speed: 1, frames: 60}, // frozen on the last frame
];

const starts = segs.reduce<number[]>((a, _s, i) => [...a, i === 0 ? 0 : a[i - 1] + segs[i - 1].frames], []);
export const LEVELS_FRAMES = segs.reduce((n, s) => n + s.frames, 0);

const raises = [9.0, 14.1, 19.2, 24.0, 28.9, 33.7, 38.5, 43.5, 48.9];
const raiseFrames = raises.map((t) => starts[1] + ((t - segs[1].from) / segs[1].speed) * FPS);

const spentAt = (frame: number): number =>
  raiseFrames.reduce(
    (n, at) =>
      n +
      PER_RAISE *
        interpolate(frame, [at, at + 12], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: Easing.out(Easing.cubic),
        }),
    0,
  );

/** Covers the game's currency bar (level, tickets, coins, rubies) with our own reading. */
const Strip: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame < starts[1]) {
    return null;
  }
  const coins = Math.round(spentAt(frame));
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: WIDTH,
        height: 150,
        background: '#1c1b2b',
        borderBottom: `8px solid ${tones.marigold.edge}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        fontFamily: fonts.body,
        fontWeight: 800,
        fontSize: 52,
        color: '#f4efe6',
      }}
    >
      <span>Coins spent</span>
      <span style={{color: tones.marigold.fill, fontVariantNumeric: 'tabular-nums'}}>{coins.toLocaleString('en-US')}</span>
    </div>
  );
};

export const Levels: React.FC = () => (
  <AbsoluteFill style={{background: '#14131f'}}>
    {segs.map((s, i) => (
      <Sequence key={i} from={starts[i]} durationInFrames={s.frames}>
        <Footage file={FILE} startFrom={Math.round(s.from * FPS)} playbackRate={s.speed} />
        {s.title && <LowerThird kicker={s.kicker} title={s.title} durationInFrames={s.frames} />}
      </Sequence>
    ))}
    <Sequence from={10} durationInFrames={80}>
      <Callout x={540} y={1180} from={0} to={80}>
        Raises every capped Tsum
      </Callout>
    </Sequence>
    <Strip />
  </AbsoluteFill>
);
