import React from 'react';
import {Tone, tones} from '../theme';

/** A felt patch: fill, hard edge, stitched inner thread. Text inside uses the tone's ink. */
export const Patch: React.FC<{
  tone: Tone;
  radius?: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({tone, radius = 36, style, children}) => {
  const t = tones[tone];
  return (
    <div
      style={{
        position: 'relative',
        background: t.fill,
        color: t.ink,
        border: `6px solid ${t.edge}`,
        borderRadius: radius,
        boxShadow: `0 8px 0 ${t.edge}`,
        padding: '22px 34px',
        ...style,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 8,
          border: `3px dashed ${t.thread}`,
          borderRadius: Math.max(radius - 10, 4),
          pointerEvents: 'none',
        }}
      />
      <div style={{position: 'relative'}}>{children}</div>
    </div>
  );
};
