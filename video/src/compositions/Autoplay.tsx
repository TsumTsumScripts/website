import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {Callout} from '../shared/Callout';
import {Counter} from '../shared/Counter';
import {Footage} from '../shared/Footage';
import {LowerThird} from '../shared/LowerThird';
import {FPS} from '../theme';

// vid-autoplay: one full round (autoplay-round.mp4, 223.5 s at 1x) retimed to 25 s.
// A full round at 2x would run about 110 s, so the middle is a 16x timelapse instead.
// Times are seconds in the source; `frames` is the length in the composition.
const FINAL_SCORE = 38_510_024;

const segments = [
  {from: 0, to: 4, speed: 1, frames: 120, kicker: 'Play', title: 'The script takes over'},
  {from: 4, to: 200, speed: 16, frames: 368, kicker: '16x', title: 'A whole round, sped up'},
  {from: 200, to: 208, speed: 2, frames: 120, kicker: '2x', title: 'Slowing for the finish'},
  {from: 208, to: 211, speed: 1, frames: 90, kicker: 'Last Bonus', title: "Time's up"},
  {from: 221, to: 222.73, speed: 1, frames: 52},
] as const;

export const AUTOPLAY_FRAMES = segments.reduce((n, s) => n + s.frames, 0);

export const Autoplay: React.FC = () => {
  let at = 0;
  return (
    <AbsoluteFill style={{background: '#14131f'}}>
      {segments.map((s, i) => {
        const start = at;
        at += s.frames;
        return (
          <Sequence key={i} from={start} durationInFrames={s.frames}>
            <Footage file="autoplay-round.mp4" startFrom={Math.round(s.from * FPS)} playbackRate={s.speed} />
            {'title' in s && <LowerThird kicker={s.kicker} title={s.title} durationInFrames={s.frames} />}
          </Sequence>
        );
      })}
      <Sequence from={0} durationInFrames={segments[0].frames}>
        <Callout x={540} y={330} from={10} to={112}>
          Max chain 4
        </Callout>
      </Sequence>
      <Sequence from={AUTOPLAY_FRAMES - segments[4].frames} durationInFrames={segments[4].frames}>
        <div style={{position: 'absolute', left: 120, right: 120, bottom: 40}}>
          <Counter label="Round score" value={FINAL_SCORE} from={2} frames={34} />
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};
