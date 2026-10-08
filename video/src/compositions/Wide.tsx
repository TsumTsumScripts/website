import React from 'react';
import {Sequence} from 'remotion';
import {Callout} from '../shared/Callout';
import {Counter} from '../shared/Counter';
import {ResultMask} from '../shared/ResultMask';
import {RingPulse} from '../shared/RingPulse';
import {CARD_SCALE, Card, Headline, SKILL_BUTTON_CARD, WideShell} from '../shared/Wide';
import {FPS} from '../theme';
import {FINAL_SCORE, segments} from './Autoplay';
import {cuts} from './Skills';

// yt-skills and yt-autoplay: the same cuts as vid-skills and vid-autoplay, laid out 16:9 for
// YouTube (regular videos, which take a custom thumbnail). Not used on the site.

export const YtSkills: React.FC = () => {
  let from = 0;
  return (
    <WideShell>
      {cuts.map((c) => {
        const length = c.seconds * FPS;
        const at = Math.round(c.tapAt * FPS);
        const start = from;
        from += length;
        return (
          <Sequence key={c.file} from={start} durationInFrames={length}>
            <Card file={c.file}>
              <RingPulse x={SKILL_BUTTON_CARD.x} y={SKILL_BUTTON_CARD.y} at={at} radius={44} scale={CARD_SCALE} />
            </Card>
            <Headline kicker={c.kicker} title={c.title} durationInFrames={length} />
            <Callout x={570} y={800} from={Math.max(0, at - 18)} to={at + 50}>
              Gauge full: tap
            </Callout>
          </Sequence>
        );
      })}
    </WideShell>
  );
};

export const YtAutoplay: React.FC = () => {
  let at = 0;
  const total = segments.reduce((n, s) => n + s.frames, 0);
  return (
    <WideShell>
      {segments.map((s, i) => {
        const start = at;
        at += s.frames;
        return (
          <Sequence key={i} from={start} durationInFrames={s.frames}>
            <Card file="autoplay-round.mp4" startFrom={Math.round(s.from * FPS)} playbackRate={s.speed}>
              {i === segments.length - 1 && <ResultMask height={181} fontSize={52} />}
            </Card>
            {'title' in s && <Headline kicker={s.kicker} title={s.title} durationInFrames={s.frames} />}
          </Sequence>
        );
      })}
      <Sequence from={0} durationInFrames={segments[0].frames}>
        <Callout x={570} y={800} from={10} to={112}>
          Max chain 4
        </Callout>
      </Sequence>
      <Sequence from={total - segments[4].frames} durationInFrames={segments[4].frames}>
        <div style={{position: 'absolute', left: 80, top: 330, width: 980}}>
          <Counter label="Round score" value={FINAL_SCORE} from={2} frames={34} />
        </div>
      </Sequence>
    </WideShell>
  );
};
