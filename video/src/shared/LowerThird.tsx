import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Patch} from './Patch';
import {Tone, fonts, tones} from '../theme';

/**
 * Name plate over the empty strip under the game's buttons. Slides up on entry and down before
 * the end of its Sequence. `kicker` is the small chip (the skill type, a step number).
 */
export const LowerThird: React.FC<{
  kicker?: string;
  title: string;
  tone?: Tone;
  kickerTone?: Tone;
  durationInFrames: number;
}> = ({kicker, title, tone = 'marigold', kickerTone = 'jade', durationInFrames}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({frame: frame - 4, fps, config: {damping: 16, stiffness: 140}});
  const exit = interpolate(frame, [durationInFrames - 14, durationInFrames - 4], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const lift = (1 - enter) * 220 + exit * 220;
  const k = tones[kickerTone];
  return (
    <div
      style={{
        position: 'absolute',
        left: 48,
        right: 48,
        bottom: 36,
        transform: `translateY(${lift}px)`,
        display: 'flex',
        alignItems: 'center',
        gap: 20,
      }}
    >
      <Patch tone={tone} style={{flex: 1, padding: '20px 36px'}}>
        <span style={{fontFamily: fonts.display, fontSize: 60, lineHeight: 1.1}}>{title}</span>
      </Patch>
      {kicker && (
        <div
          style={{
            background: k.fill,
            color: k.ink,
            border: `5px solid ${k.edge}`,
            borderRadius: 999,
            padding: '12px 30px',
            fontFamily: fonts.body,
            fontWeight: 800,
            fontSize: 40,
            boxShadow: `0 6px 0 ${k.edge}`,
          }}
        >
          {kicker}
        </div>
      )}
    </div>
  );
};
