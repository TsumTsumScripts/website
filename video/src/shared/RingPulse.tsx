import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';

/**
 * Rings that spread from a point, the moment of a tap. `at` is the frame (in the enclosing
 * Sequence) the tap lands. A steady ring holds on the target for a beat before the tap so the
 * eye is already there.
 */
export const RingPulse: React.FC<{
  x: number;
  y: number;
  at: number;
  color?: string;
  /** Radius of the steady ring, which the spreading rings start from. */
  radius?: number;
  /** Scales the spread and line widths for a smaller frame (1 at 1080x1920). */
  scale?: number;
}> = ({x, y, at, color = '#fff3e0', radius = 78, scale = 1}) => {
  const frame = useCurrentFrame();
  const lead = interpolate(frame, [at - 24, at - 16, at + 6, at + 14], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const rings = [0, 7, 14].map((delay) => {
    const p = interpolate(frame, [at + delay, at + delay + 24], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    return {p, active: frame >= at + delay && p < 1};
  });
  return (
    <>
      <div
        style={{
          position: 'absolute',
          left: x - radius,
          top: y - radius,
          width: radius * 2,
          height: radius * 2,
          borderRadius: '50%',
          border: `${10 * scale}px solid ${color}`,
          boxShadow: `0 0 0 ${4 * scale}px #14131f`,
          opacity: lead,
        }}
      />
      {rings.map(
        (r, i) =>
          r.active && (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: x - radius - r.p * 150 * scale,
                top: y - radius - r.p * 150 * scale,
                width: (radius + r.p * 150 * scale) * 2,
                height: (radius + r.p * 150 * scale) * 2,
                borderRadius: '50%',
                border: `${(12 - r.p * 8) * scale}px solid ${color}`,
                opacity: 1 - r.p,
              }}
            />
          ),
      )}
    </>
  );
};
