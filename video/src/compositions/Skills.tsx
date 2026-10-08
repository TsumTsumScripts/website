import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {Callout} from '../shared/Callout';
import {Footage, SKILL_BUTTON} from '../shared/Footage';
import {LowerThird} from '../shared/LowerThird';
import {RingPulse} from '../shared/RingPulse';
import {FPS} from '../theme';

// vid-skills: three cuts, each named by a lower-third, with a ring where the tap lands.
// `tapAt` is seconds into the cut (see capture/raw/cuts/cuts.json). Elsa's cut opens mid-skill,
// so her tap is at 0.
const cuts = [
  {file: 'skill-burst.mp4', seconds: 8, tapAt: 1.7, kicker: 'Burst', title: 'Colorful Mickey Set'},
  {file: 'skill-elsa.mp4', seconds: 11, tapAt: 0, kicker: 'Unique', title: 'Coronation Day Elsa'},
  {file: 'skill-gaston.mp4', seconds: 10, tapAt: 1.0, kicker: 'Unique', title: 'Gaston'},
] as const;

export const SKILLS_FRAMES = cuts.reduce((n, c) => n + c.seconds * FPS, 0);

export const Skills: React.FC = () => {
  let from = 0;
  return (
    <AbsoluteFill style={{background: '#14131f'}}>
      {cuts.map((c) => {
        const length = c.seconds * FPS;
        const at = Math.round(c.tapAt * FPS);
        const start = from;
        from += length;
        return (
          <Sequence key={c.file} from={start} durationInFrames={length}>
            <Footage file={c.file} />
            <RingPulse x={SKILL_BUTTON.x} y={SKILL_BUTTON.y} at={at} />
            <Callout x={330} y={SKILL_BUTTON.y - 230} from={Math.max(0, at - 18)} to={at + 40}>
              Gauge full: tap
            </Callout>
            <LowerThird kicker={c.kicker} title={c.title} durationInFrames={length} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
