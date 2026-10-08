import React from 'react';
import {AbsoluteFill, OffthreadVideo, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Patch} from './Patch';
import {Tone, fonts, tones} from '../theme';

// The 16:9 layout for YouTube: the phone footage in a felt-edged card on the right, and the
// words (title, callouts, counter) in the left panel, so nothing covers the game.
export const WIDE_W = 1920;
export const WIDE_H = 1080;

const CARD_W = 603;
const CARD_H = 1000;
const CARD_LEFT = 1170;
const CARD_TOP = 40;
const BORDER = 8;
const INNER_W = CARD_W - BORDER * 2;
const INNER_H = CARD_H - BORDER * 2;
// The cuts are 540x896; the card shows them at this scale, trimmed a few px each side.
const SCALE = INNER_H / 896;

/** A point in a cut (x, y in the 540x896 crop) as a point inside the card. */
export const toCard = (x: number, y: number): {x: number; y: number} => ({
  x: x * SCALE - (540 * SCALE - INNER_W) / 2,
  y: y * SCALE,
});

export const SKILL_BUTTON_CARD = toCard(82, 753);
export const CARD_SCALE = SCALE / (1920 / 896);

export const WideShell: React.FC<{children: React.ReactNode}> = ({children}) => (
  <AbsoluteFill style={{background: 'radial-gradient(circle at 25% 30%, #2e2d45 0%, #1c1b2b 70%)'}}>
    <div style={{position: 'absolute', left: 80, top: 56}}>
      <Chip tone="periwinkle" size={36}>
        Tsum Tsum Script
      </Chip>
    </div>
    {children}
  </AbsoluteFill>
);

export const Chip: React.FC<{tone: Tone; size?: number; children: React.ReactNode}> = ({tone, size = 44, children}) => {
  const t = tones[tone];
  return (
    <div
      style={{
        display: 'inline-block',
        background: t.fill,
        color: t.ink,
        border: `5px solid ${t.edge}`,
        borderRadius: 999,
        padding: '8px 30px',
        fontFamily: fonts.body,
        fontWeight: 800,
        fontSize: size,
        boxShadow: `0 6px 0 ${t.edge}`,
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </div>
  );
};

/** The footage card. Children (rings, badges) are placed in card coordinates and clipped to it. */
export const Card: React.FC<{file: string; startFrom?: number; playbackRate?: number; children?: React.ReactNode}> = ({
  file,
  startFrom = 0,
  playbackRate = 1,
  children,
}) => (
  <div
    style={{
      position: 'absolute',
      left: CARD_LEFT,
      top: CARD_TOP,
      width: CARD_W,
      height: CARD_H,
      boxSizing: 'border-box',
      border: `${BORDER}px solid ${tones.marigold.edge}`,
      borderRadius: 44,
      overflow: 'hidden',
      boxShadow: `0 12px 0 ${tones.marigold.edge}, 0 18px 40px rgba(0,0,0,0.5)`,
      background: '#14131f',
    }}
  >
    <OffthreadVideo
      src={staticFile(`footage/${file}`)}
      startFrom={startFrom}
      playbackRate={playbackRate}
      muted
      style={{width: '100%', height: '100%', objectFit: 'cover'}}
    />
    {children}
  </div>
);

/** Kicker chip over a big title patch, in the left panel. Pops in, and out before its end. */
export const Headline: React.FC<{kicker?: string; title: string; durationInFrames: number; kickerTone?: Tone}> = ({
  kicker,
  title,
  durationInFrames,
  kickerTone = 'jade',
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({frame: frame - 3, fps, config: {damping: 16, stiffness: 140}});
  const exit = interpolate(frame, [durationInFrames - 12, durationInFrames - 3], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <div
      style={{
        position: 'absolute',
        left: 80,
        top: 250,
        width: 980,
        transform: `translateX(${(1 - enter) * -120 - exit * 120}px)`,
        opacity: enter * (1 - exit),
      }}
    >
      {kicker && (
        <div style={{marginBottom: 26}}>
          <Chip tone={kickerTone}>{kicker}</Chip>
        </div>
      )}
      <Patch tone="marigold" radius={52} style={{padding: '26px 52px 32px'}}>
        <span style={{fontFamily: fonts.display, fontSize: 128, lineHeight: 1.06}}>{title}</span>
      </Patch>
    </div>
  );
};
