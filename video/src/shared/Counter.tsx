import React from 'react';
import {interpolate, useCurrentFrame, Easing} from 'remotion';
import {Patch} from './Patch';
import {Tone, fonts} from '../theme';

/** A label and a number that counts up to `value` over `frames`, starting at frame `from`. */
export const Counter: React.FC<{
  label: string;
  value: number;
  from: number;
  frames: number;
  tone?: Tone;
}> = ({label, value, from, frames, tone = 'jade'}) => {
  const frame = useCurrentFrame();
  const n = Math.round(
    interpolate(frame, [from, from + frames], [0, value], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.cubic),
    }),
  );
  return (
    <Patch tone={tone} style={{padding: '18px 40px', textAlign: 'center'}}>
      <div style={{fontFamily: fonts.body, fontWeight: 800, fontSize: 34}}>{label}</div>
      <div style={{fontFamily: fonts.display, fontSize: 84, lineHeight: 1.05, fontVariantNumeric: 'tabular-nums'}}>
        {n.toLocaleString('en-US')}
      </div>
    </Patch>
  );
};
