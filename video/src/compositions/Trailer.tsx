import React from 'react';
import {AbsoluteFill, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Callout} from '../shared/Callout';
import {Patch} from '../shared/Patch';
import {RingPulse} from '../shared/RingPulse';
import {CARD_SCALE, CARD_W, Card, Chip, Headline, SKILL_BUTTON_CARD, WIDE_W, WideShell, toCard} from '../shared/Wide';
import {FPS, fonts, tones} from '../theme';

// vid-trailer: the script in about 38 s, 16:9. A cold open on a long chain, the title, five
// feature beats from the cuts the other videos use (clip-play-* are the landing clips), and a
// Discord end card. Words only, no voice. Times are seconds in each source; quickbar-cut.mp4 is
// quickbar-beats.mp4 trimmed like the others (capture/raw/cuts/cuts.json).

type Cut = {file: string; from: number; to: number; speed: number};

const framesOf = (c: Cut): number => Math.round(((c.to - c.from) / c.speed) * FPS);

/** Output frame (inside the cut) at which source time `t` is on screen. */
const at = (c: Cut, t: number): number => Math.round(((t - c.from) / c.speed) * FPS);

const COLD: Cut = {file: 'clip-play-fever.mp4', from: 3.7, to: 6.7, speed: 1};
const TITLE_FRAMES = 75;
const AUTOPLAY: Cut = {file: 'clip-play-chains.mp4', from: 0, to: 5, speed: 1};
const SKILL: Cut = {file: 'skill-burst.mp4', from: 0.8, to: 5.8, speed: 1};
const BUBBLES: Cut = {file: 'clip-play-bubbles.mp4', from: 0, to: 5, speed: 1};
// Chores: one 10-Time purchase from the dialog to the result list, then four level-cap raises.
const BOXES: Cut = {file: 'boxes-sweep.mp4', from: 5.0, to: 24.5, speed: 5};
const LEVELS: Cut = {file: 'levels-sweep.mp4', from: 6.5, to: 18.5, speed: 4};
// Quick Bar over a paused round: Skill set to Sheriff Woody (picked at 11.9), Bubble set to
// All Bubbles ASAP (21.1), then Continue (34.75) and the round runs on.
const QB_SKILL: Cut = {file: 'quickbar-cut.mp4', from: 9.6, to: 12.4, speed: 1.25};
const QB_BUBBLE: Cut = {file: 'quickbar-cut.mp4', from: 19.1, to: 21.5, speed: 1.25};
const QB_RESUME: Cut = {file: 'quickbar-cut.mp4', from: 34.6, to: 36.8, speed: 1};
const END_FRAMES = 120;

const timeline = [
  COLD,
  TITLE_FRAMES,
  AUTOPLAY,
  SKILL,
  BUBBLES,
  BOXES,
  LEVELS,
  QB_SKILL,
  QB_BUBBLE,
  QB_RESUME,
  END_FRAMES,
].map((x) => (typeof x === 'number' ? x : framesOf(x)));
const starts = timeline.reduce<number[]>((a, _n, i) => [...a, i === 0 ? 0 : a[i - 1] + timeline[i - 1]], []);
export const TRAILER_FRAMES = timeline.reduce((n, f) => n + f, 0);

const [T_COLD, T_TITLE, T_AUTOPLAY, T_SKILL, T_BUBBLES, T_BOXES, T_LEVELS, T_QB_SKILL, T_QB_BUBBLE, T_QB_RESUME, T_END] = starts;

const Clip: React.FC<{cut: Cut; left?: number; children?: React.ReactNode}> = ({cut, left, children}) => (
  <Card file={cut.file} startFrom={Math.round(cut.from * FPS)} playbackRate={cut.speed} left={left}>
    {children}
  </Card>
);

/** Covers the game's currency bar (level, tickets, coins, rubies) on the chores cuts. */
const BarCover: React.FC<{label: string}> = ({label}) => (
  <div
    style={{
      position: 'absolute',
      left: 0,
      top: 0,
      right: 0,
      height: 82,
      background: '#1c1b2b',
      borderBottom: `6px solid ${tones.marigold.edge}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: fonts.body,
      fontWeight: 800,
      fontSize: 34,
      color: '#f4efe6',
    }}
  >
    {label}
  </div>
);

const TitleCard: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pop = spring({frame, fps, config: {damping: 12, stiffness: 160}});
  const line = interpolate(frame, [14, 26], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const out = interpolate(frame, [TITLE_FRAMES - 8, TITLE_FRAMES], [1, 0], {extrapolateLeft: 'clamp'});
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', gap: 56, opacity: out}}>
      <div style={{transform: `scale(${pop}) rotate(-2deg)`}}>
        <Patch tone="marigold" radius={64} style={{padding: '34px 80px 44px'}}>
          <span style={{fontFamily: fonts.display, fontSize: 168, lineHeight: 1.04}}>Tsum Tsum Script</span>
        </Patch>
      </div>
      <div
        style={{
          fontFamily: fonts.body,
          fontWeight: 800,
          fontSize: 60,
          color: '#f4efe6',
          transform: `translateY(${(1 - line) * 30}px)`,
          opacity: line,
        }}
      >
        Let the Tsums play themselves.
      </div>
    </AbsoluteFill>
  );
};

const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pop = (delay: number) => spring({frame: frame - delay, fps, config: {damping: 13, stiffness: 170}});
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', gap: 48}}>
      <div style={{transform: `scale(${pop(0)}) rotate(-2deg)`}}>
        <Patch tone="marigold" radius={56} style={{padding: '26px 64px 34px'}}>
          <span style={{fontFamily: fonts.display, fontSize: 132, lineHeight: 1.04}}>Tsum Tsum Script</span>
        </Patch>
      </div>
      <div style={{transform: `scale(${pop(10)})`}}>
        <Patch tone="grape" radius={999} style={{padding: '20px 64px'}}>
          <span style={{fontFamily: fonts.body, fontWeight: 800, fontSize: 64}}>Join the GAP Discord</span>
        </Patch>
      </div>
      <div style={{display: 'flex', gap: 28, transform: `scale(${pop(18)})`}}>
        <Chip tone="periwinkle" size={44}>
          discord.gg/KH3MZWxaMU
        </Chip>
        <Chip tone="jade" size={44}>
          tsumtsum.gapapp.app
        </Chip>
      </div>
    </AbsoluteFill>
  );
};

const woody = toCard(350, 641);
const asap = toCard(155, 751);

export const Trailer: React.FC = () => (
  <WideShell>
    {/* Cold open: the card alone, centred, over the shell's chip. */}
    <Sequence from={T_COLD} durationInFrames={timeline[0]}>
      <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 40%, #2e2d45 0%, #1c1b2b 70%)'}} />
      <Clip cut={COLD} left={Math.round((WIDE_W - CARD_W) / 2)} />
    </Sequence>
    <Sequence from={T_TITLE} durationInFrames={TITLE_FRAMES}>
      <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 40%, #2e2d45 0%, #1c1b2b 70%)'}} />
      <TitleCard />
    </Sequence>

    <Sequence from={T_AUTOPLAY} durationInFrames={framesOf(AUTOPLAY)}>
      <Clip cut={AUTOPLAY} />
      <Headline kicker="Auto-play" title="Draws the long chains" durationInFrames={framesOf(AUTOPLAY)} />
    </Sequence>

    <Sequence from={T_SKILL} durationInFrames={framesOf(SKILL)}>
      <Clip cut={SKILL}>
        <RingPulse x={SKILL_BUTTON_CARD.x} y={SKILL_BUTTON_CARD.y} at={at(SKILL, 1.7)} radius={44} scale={CARD_SCALE} />
      </Clip>
      <Headline kicker="Skill timing" title="Fires skills on cue" durationInFrames={framesOf(SKILL)} />
      <Callout x={570} y={800} from={at(SKILL, 1.7) - 18} to={at(SKILL, 1.7) + 60}>
        Gauge full: tap
      </Callout>
    </Sequence>

    <Sequence from={T_BUBBLES} durationInFrames={framesOf(BUBBLES)}>
      <Clip cut={BUBBLES} />
      <Headline kicker="Bubble strategy" title="Pops bubbles with a plan" durationInFrames={framesOf(BUBBLES)} />
    </Sequence>

    <Sequence from={T_BOXES} durationInFrames={framesOf(BOXES)}>
      <Clip cut={BOXES}>
        <BarCover label="Box buying · 5x" />
      </Clip>
      <Headline kicker="Chores" title="Buys boxes" durationInFrames={framesOf(BOXES)} />
    </Sequence>
    <Sequence from={T_LEVELS} durationInFrames={framesOf(LEVELS)}>
      <Clip cut={LEVELS}>
        <BarCover label="Level unlocking · 4x" />
      </Clip>
      <Headline kicker="Chores" title="Raises level caps" durationInFrames={framesOf(LEVELS)} />
    </Sequence>

    <Sequence from={T_QB_SKILL} durationInFrames={framesOf(QB_SKILL)}>
      <Clip cut={QB_SKILL}>
        <RingPulse x={woody.x} y={woody.y} at={at(QB_SKILL, 11.9)} radius={42} scale={CARD_SCALE} />
      </Clip>
      <Callout x={570} y={800} from={6} to={framesOf(QB_SKILL)}>
        Skill: Sheriff Woody
      </Callout>
    </Sequence>
    <Sequence from={T_QB_BUBBLE} durationInFrames={framesOf(QB_BUBBLE)}>
      <Clip cut={QB_BUBBLE}>
        <RingPulse x={asap.x} y={asap.y} at={at(QB_BUBBLE, 21.1)} radius={42} scale={CARD_SCALE} />
      </Clip>
      <Callout x={570} y={800} from={6} to={framesOf(QB_BUBBLE)}>
        Bubbles: All ASAP
      </Callout>
    </Sequence>
    <Sequence from={T_QB_RESUME} durationInFrames={framesOf(QB_RESUME)}>
      <Clip cut={QB_RESUME} />
      <Callout x={570} y={800} from={6} to={framesOf(QB_RESUME)} tone="jade">
        Applies at the next round
      </Callout>
    </Sequence>
    <Sequence from={T_QB_SKILL} durationInFrames={T_END - T_QB_SKILL}>
      <Headline kicker="Quick Bar" title="Tweak it mid-run" durationInFrames={T_END - T_QB_SKILL} />
    </Sequence>

    <Sequence from={T_END} durationInFrames={END_FRAMES}>
      <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 40%, #2e2d45 0%, #1c1b2b 70%)'}} />
      <EndCard />
    </Sequence>
  </WideShell>
);
