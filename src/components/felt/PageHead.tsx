import React from 'react';
import Patch, {type Tone} from './Patch';
import FeltAccent from './FeltAccent';

/** The opening block of a felt sub-page: tilted kicker patch, title, intro and a pair of stickers. */
export default function PageHead({
  tone,
  kicker,
  title,
  accent,
  children,
  maxWidth = 760,
}: {
  tone: Tone;
  kicker: string;
  title: React.ReactNode;
  /** The last word(s) of the title, sewn on as a patch. */
  accent?: string;
  children?: React.ReactNode;
  maxWidth?: number;
}): React.JSX.Element {
  return (
    <div className="felt-pagehead">
      <Patch tone={tone} radius="999px" inset={4} tilt={-2} lift={3} className="kicker" style={{padding: '8px 18px'}}>
        {kicker}
      </Patch>
      <h1 style={{fontSize: 'clamp(40px, 5.6vw, 60px)'}}>
        {title}
        {accent && (
          <>
            {' '}
            <Patch as="span" tone={tone} radius="22px 40px 26px 44px" inset={3} tilt={-2} lift={4} style={{display: 'inline-block', padding: '2px 16px 8px'}}>
              {accent}
            </Patch>
          </>
        )}
      </h1>
      {children && <div className="felt-pagehead__body" style={{maxWidth}}>{children}</div>}
      <FeltAccent kind="coin" width={74} top={-6} right={24} rotate={14} />
      <FeltAccent kind="medal" width={46} top={92} right={110} rotate={-12} />
    </div>
  );
}
