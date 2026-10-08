import React from 'react';
import {Composition} from 'remotion';
import {AUTOPLAY_FRAMES, Autoplay} from './compositions/Autoplay';
import {SKILLS_FRAMES, Skills} from './compositions/Skills';
import {FPS, HEIGHT, WIDTH} from './theme';

// One composition per vid-* id (MEDIA_PLAN.md), named the same as the id.
export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="vid-skills" component={Skills} durationInFrames={SKILLS_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} />
    <Composition id="vid-autoplay" component={Autoplay} durationInFrames={AUTOPLAY_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} />
  </>
);
