import React from 'react';
import {Composition, Still} from 'remotion';
import {AUTOPLAY_FRAMES, Autoplay} from './compositions/Autoplay';
import {SKILLS_FRAMES, Skills} from './compositions/Skills';
import {YtAutoplay, YtSkills} from './compositions/Wide';
import {BOXES_FRAMES, YtBoxes} from './compositions/WideBoxes';
import {ThumbAutoplay, ThumbBoxes, ThumbSkills} from './compositions/Thumbnails';
import {FPS, HEIGHT, WIDTH} from './theme';

// One composition per vid-* id (MEDIA_PLAN.md), named the same as the id.
export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="vid-skills" component={Skills} durationInFrames={SKILLS_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} />
    <Composition id="vid-autoplay" component={Autoplay} durationInFrames={AUTOPLAY_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} />
    {/* 16:9 for YouTube regular videos: same cuts, words in a left panel. Not used on the site. */}
    <Composition id="yt-skills" component={YtSkills} durationInFrames={SKILLS_FRAMES} fps={FPS} width={1920} height={1080} />
    <Composition id="yt-autoplay" component={YtAutoplay} durationInFrames={AUTOPLAY_FRAMES} fps={FPS} width={1920} height={1080} />
    <Composition id="yt-boxes" component={YtBoxes} durationInFrames={BOXES_FRAMES} fps={FPS} width={1920} height={1080} />
    {/* YouTube thumbnails (npm run thumbs), 1280x720. */}
    <Still id="thumb-vid-skills" component={ThumbSkills} width={1280} height={720} />
    <Still id="thumb-vid-autoplay" component={ThumbAutoplay} width={1280} height={720} />
    <Still id="thumb-vid-boxes" component={ThumbBoxes} width={1280} height={720} />
  </>
);
