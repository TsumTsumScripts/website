import React from 'react';
import {AbsoluteFill, OffthreadVideo, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Patch} from '../shared/Patch';
import {RingPulse} from '../shared/RingPulse';
import {FPS, HEIGHT, Tone, WIDTH, fonts, tones} from '../theme';

// vid-companion-*: a GAP Companion phone recording (OBS, 540x960 at 60 fps, capture/raw/companion/)
// on the felt ground, with the step being done written above it and a ring where each tap lands.
// Times in a Howto are seconds of the source recording; `segs` retime it (speed up the waits).

const SRC_W = 540;
const SRC_H = 960;
const TOP = 330;
const SCREEN_H = HEIGHT - TOP - 40;
const SCALE = SCREEN_H / SRC_H;
const SCREEN_W = SRC_W * SCALE;
const LEFT = (WIDTH - SCREEN_W) / 2;

export type Howto = {
  tone: Tone;
  /** Source seconds to keep, in order, each from its recording at its own speed. */
  segs: {file: string; from: number; to: number; speed: number}[];
  /** Where each tap lands: a recording, its second, and 540x960 source pixels. */
  taps: {file: string; at: number; x: number; y: number}[];
  /** The step text above the screen, from a recording's second until the next step. */
  steps: {file: string; at: number; text: string}[];
};

const frames = (h: Howto) => h.segs.map((s) => Math.round(((s.to - s.from) / s.speed) * FPS));
export const howtoFrames = (h: Howto): number => frames(h).reduce((a, b) => a + b, 0) + FPS; // a second's hold at the end

/** The output frame at which a source second plays (the first segment that holds it). */
const toFrame = (h: Howto, file: string, t: number): number => {
  let at = 0;
  const f = frames(h);
  for (let i = 0; i < h.segs.length; i++) {
    const s = h.segs[i];
    if (s.file === file && t >= s.from && t <= s.to) {
      return at + ((t - s.from) / s.speed) * FPS;
    }
    at += f[i];
  }
  return at;
};

const Step: React.FC<{text: string; n: number; tone: Tone}> = ({text, n, tone}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pop = spring({frame, fps, config: {damping: 15, stiffness: 170}});
  const t = tones[tone];
  return (
    <div style={{position: 'absolute', left: 56, right: 56, top: 70, display: 'flex', alignItems: 'center', gap: 26, transform: `scale(${0.92 + pop * 0.08})`, opacity: pop}}>
      <div
        style={{
          flex: 'none',
          width: 116,
          height: 116,
          borderRadius: '50%',
          background: t.fill,
          color: t.ink,
          border: `6px solid ${t.edge}`,
          boxShadow: `0 6px 0 ${t.edge}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: fonts.display,
          fontSize: 58,
        }}>
        {n}
      </div>
      <Patch tone="grape" radius={40} style={{flex: 1, padding: '22px 34px', minHeight: 150, display: 'flex', alignItems: 'center'}}>
        <span style={{fontFamily: fonts.body, fontWeight: 800, fontSize: 52, lineHeight: 1.15}}>{text}</span>
      </Patch>
    </div>
  );
};

export const CompanionHowto: React.FC<{howto: Howto}> = ({howto: h}) => {
  const f = frames(h);
  const starts = f.reduce<number[]>((a, _n, i) => [...a, i === 0 ? 0 : a[i - 1] + f[i - 1]], []);
  const total = howtoFrames(h);
  // Each step's words come up a beat before its first tap.
  const stepFrames = h.steps.map((s) => Math.max(0, Math.round(toFrame(h, s.file, s.at)) - 18));
  return (
    <AbsoluteFill style={{background: '#1c1b2b'}}>
      <div style={{position: 'absolute', left: LEFT, top: TOP, width: SCREEN_W, height: SCREEN_H, borderRadius: 44, overflow: 'hidden', boxShadow: `0 0 0 10px ${tones[h.tone].edge}, 0 18px 0 10px #14131f`}}>
        {h.segs.map((s, i) => (
          <Sequence key={i} from={starts[i]} durationInFrames={i === h.segs.length - 1 ? f[i] + FPS : f[i]}>
            <OffthreadVideo
              src={staticFile(`footage/${s.file}`)}
              startFrom={Math.round(s.from * FPS)}
              playbackRate={s.speed}
              muted
              style={{width: SCREEN_W, height: SCREEN_H}}
            />
          </Sequence>
        ))}
      </div>
      {h.taps.map((tp, i) => {
        const at = Math.round(toFrame(h, tp.file, tp.at));
        return (
          <Sequence key={`t${i}`} from={at - 30} durationInFrames={70}>
            <RingPulse x={LEFT + tp.x * SCALE} y={TOP + tp.y * SCALE} at={30} radius={44} scale={0.85} color={tones.marigold.fill} />
          </Sequence>
        );
      })}
      {h.steps.map((s, i) => (
        <Sequence key={`s${i}`} from={stepFrames[i]} durationInFrames={(i + 1 < h.steps.length ? stepFrames[i + 1] : total) - stepFrames[i]}>
          <Step text={s.text} n={i + 1} tone={h.tone} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
