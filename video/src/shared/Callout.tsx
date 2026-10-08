import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Patch} from './Patch';
import {Tone, fonts, tones} from '../theme';

/** A pill that pops in over the footage, optionally with a pointer toward what it names. */
export const Callout: React.FC<{
  /** Centre of the pill in the composition. */
  x: number;
  y: number;
  from: number;
  to: number;
  tone?: Tone;
  /** Which way the pointer aims; leave out for no pointer. */
  points?: 'down' | 'up';
  children: React.ReactNode;
}> = ({x, y, from, to, tone = 'marigold', points, children}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  if (frame < from || frame > to) {
    return null;
  }
  const pop = spring({frame: frame - from, fps, config: {damping: 13, stiffness: 190}});
  const out = interpolate(frame, [to - 6, to], [1, 0], {extrapolateLeft: 'clamp'});
  const t = tones[tone];
  const tip = {
    position: 'absolute' as const,
    left: '50%',
    marginLeft: -22,
    width: 0,
    height: 0,
    borderLeft: '22px solid transparent',
    borderRight: '22px solid transparent',
  };
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `translate(-50%, -50%) scale(${pop * out})`,
        transformOrigin: points === 'down' ? '50% 100%' : points === 'up' ? '50% 0%' : '50% 50%',
      }}
    >
      <Patch tone={tone} radius={999} style={{padding: '14px 40px', whiteSpace: 'nowrap'}}>
        <span style={{fontFamily: fonts.body, fontWeight: 800, fontSize: 52}}>{children}</span>
      </Patch>
      {points === 'down' && <div style={{...tip, top: '100%', marginTop: 8, borderTop: `28px solid ${t.edge}`}} />}
      {points === 'up' && <div style={{...tip, bottom: '100%', marginBottom: 8, borderBottom: `28px solid ${t.edge}`}} />}
    </div>
  );
};
