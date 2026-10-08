import React from 'react';
import {AbsoluteFill, OffthreadVideo, staticFile} from 'remotion';
import {HEIGHT, WIDTH} from '../theme';

// The cuts are 540x896 (host bar cropped). They fill the 1080x1920 frame like the site's
// object-fit: cover, so a little of each side is trimmed.
const SRC_W = 540;
const SRC_H = 896;
const SCALE = HEIGHT / SRC_H;
const OFFSET_X = (WIDTH - SRC_W * SCALE) / 2;

/** A point in a cut (x, y in the 540x896 crop) as a point in the composition. */
export const toComp = (x: number, y: number): {x: number; y: number} => ({
  x: x * SCALE + OFFSET_X,
  y: y * SCALE,
});

/** Where the skill button sits in every cut (bottom left of the board). */
export const SKILL_BUTTON = toComp(82, 753);

export const Footage: React.FC<{
  file: string;
  /** First source frame (30 fps) to show. */
  startFrom?: number;
  playbackRate?: number;
}> = ({file, startFrom = 0, playbackRate = 1}) => (
  <AbsoluteFill style={{background: '#14131f'}}>
    <OffthreadVideo
      src={staticFile(`footage/${file}`)}
      startFrom={startFrom}
      playbackRate={playbackRate}
      muted
      style={{width: WIDTH, height: HEIGHT, objectFit: 'cover'}}
    />
  </AbsoluteFill>
);
