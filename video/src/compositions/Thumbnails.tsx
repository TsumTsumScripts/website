import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {Patch} from '../shared/Patch';
import {Tone, fonts, tones} from '../theme';

// YouTube thumbnails, 1280x720. The videos are vertical, so each thumbnail sets phone-shaped
// stills from the footage beside a big title. Keep the bottom-right corner clear: YouTube
// puts the duration badge there. Text is a patch's `ink` on its fill (CONTRAST.md).

const CARD_RATIO = 540 / 896;

const Chip: React.FC<{tone: Tone; children: React.ReactNode; size?: number}> = ({tone, children, size = 40}) => {
  const t = tones[tone];
  return (
    <div
      style={{
        background: t.fill,
        color: t.ink,
        border: `5px solid ${t.edge}`,
        borderRadius: 999,
        padding: '8px 28px',
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

/** A still from a cut in a felt-edged card, tilted, with an optional chip over its foot. */
const Card: React.FC<{
  /** A frame pulled from a cut by scripts/thumbs.mjs. */
  still: string;
  height: number;
  left: number;
  top: number;
  tilt: number;
  edge?: Tone;
  chip?: string;
  chipTone?: Tone;
}> = ({still, height, left, top, tilt, edge = 'marigold', chip, chipTone = 'jade'}) => {
  const width = Math.round(height * CARD_RATIO);
  return (
    <div style={{position: 'absolute', left, top, width, height, transform: `rotate(${tilt}deg)`}}>
      <div
        style={{
          width,
          height,
          border: `8px solid ${tones[edge].edge}`,
          borderRadius: 38,
          overflow: 'hidden',
          boxShadow: `0 12px 0 ${tones[edge].edge}, 0 18px 40px rgba(0,0,0,0.5)`,
          background: '#14131f',
          boxSizing: 'border-box',
        }}
      >
        <Img src={staticFile(`footage/${still}`)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      </div>
      {chip && (
        <div style={{position: 'absolute', left: 0, right: 0, bottom: -26, display: 'flex', justifyContent: 'center'}}>
          <Chip tone={chipTone}>{chip}</Chip>
        </div>
      )}
    </div>
  );
};

const Frame: React.FC<{title: string[]; subtitle: string; children: React.ReactNode}> = ({title, subtitle, children}) => (
  <AbsoluteFill style={{background: 'radial-gradient(circle at 25% 30%, #2e2d45 0%, #1c1b2b 70%)'}}>
    <div style={{position: 'absolute', left: 56, top: 52}}>
      <Chip tone="periwinkle" size={36}>Tsum Tsum Script</Chip>
    </div>
    <div style={{position: 'absolute', left: 56, top: 168, width: 560}}>
      <Patch tone="marigold" radius={44} style={{padding: '18px 40px 24px'}}>
        {title.map((line) => (
          <div key={line} style={{fontFamily: fonts.display, fontSize: 118, lineHeight: 1.04}}>
            {line}
          </div>
        ))}
      </Patch>
    </div>
    <div style={{position: 'absolute', left: 56, top: 470, width: 560}}>
      <Patch tone="rose" radius={36} style={{padding: '16px 34px'}}>
        <span style={{fontFamily: fonts.body, fontWeight: 800, fontSize: 48, lineHeight: 1.15}}>{subtitle}</span>
      </Patch>
    </div>
    {children}
  </AbsoluteFill>
);

export const ThumbSkills: React.FC = () => (
  <Frame title={['Skill', 'timing']} subtitle="Mickey Set, Elsa, Gaston">
    <Card still="thumb-burst.png" height={500} left={610} top={118} tilt={-5} edge="periwinkle" />
    <Card still="thumb-gaston.png" height={500} left={960} top={118} tilt={5} edge="rose" />
    <Card still="thumb-elsa.png" height={540} left={790} top={92} tilt={0} edge="marigold" />
  </Frame>
);

export const ThumbAutoplay: React.FC = () => (
  <Frame title={['Auto-', 'play']} subtitle="A whole round, hands off">
    <Card still="thumb-autoplay.png" height={620} left={800} top={50} tilt={4} edge="marigold" />
  </Frame>
);
