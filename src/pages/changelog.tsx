import React from 'react';
import Link from '@docusaurus/Link';
import FeltPage from '@site/src/components/felt/FeltPage';
import Patch, {type Tone} from '@site/src/components/felt/Patch';
import {features} from '@site/src/data/features';
import releases from '@site/src/data/changelog.generated.json';

type Item = {text: string; feature: string | null};
type Release = {
  version: string;
  channel: 'Alpha' | 'Beta' | 'Production';
  additions: {area: string; items: Item[]}[];
  fixes: Item[];
  plain: Item[];
};

const channelTone: Record<string, Tone> = {Production: 'jade', Beta: 'marigold', Alpha: 'rose'};

/** A line, with a link to the part of the Features page that describes it. */
function Line({item}: {item: Item}) {
  const f = item.feature ? features.find((x) => x.key === item.feature) : undefined;
  return (
    <li className="cl-line">
      <span>{item.text}</span>
      {f && (
        <Link className="cl-link" to={`/features/${f.key}`} title={`About ${f.title}`}>
          {f.title} →
        </Link>
      )}
    </li>
  );
}

function ReleaseCard({r, open, tone}: {r: Release; open: boolean; tone: Tone}) {
  const lists = (
    <div style={{display: 'flex', flexDirection: 'column', gap: 22}}>
      {r.additions.length > 0 && (
        <div>
          <h3 className="cl-h">Additions</h3>
          {r.additions.map((a) => (
            <div key={a.area}>
              <h4 className="cl-area">{a.area}</h4>
              <ul className="cl-list">{a.items.map((i) => <Line key={i.text} item={i} />)}</ul>
            </div>
          ))}
        </div>
      )}
      {r.fixes.length > 0 && (
        <div>
          <h3 className="cl-h">Fixes</h3>
          <ul className="cl-list">{r.fixes.map((i) => <Line key={i.text} item={i} />)}</ul>
        </div>
      )}
      {r.plain.length > 0 && <ul className="cl-list">{r.plain.map((i) => <Line key={i.text} item={i} />)}</ul>}
    </div>
  );
  return (
    <Patch as="section" tone="surface" radius="34px" inset={8} id={`v${r.version}`} style={{padding: '28px 30px', ['--thread' as string]: '#6c6890'}}>
      <details open={open} className="cl-details">
        <summary className="cl-summary">
          <span style={{fontFamily: 'var(--font-display)', fontSize: 30}}>{r.version}</span>
          <span className="chip" style={{['--chip' as string]: `var(--${tone}-fill)`, ['--ink' as string]: `var(--${tone}-ink)`, ['--thread' as string]: `var(--${tone}-edge)`}}>{r.channel}</span>
        </summary>
        <div style={{marginTop: 20}}>{lists}</div>
      </details>
    </Patch>
  );
}

export default function Changelog(): React.JSX.Element {
  const list = releases as Release[];
  return (
    <FeltPage wide title="Changelog" description="What changed in each version of the Tsum Tsum script.">
      <div style={{display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-start'}}>
        <span className="kicker patch--periwinkle" style={{background: 'var(--periwinkle-fill)', color: 'var(--periwinkle-ink)'}}>Changelog</span>
        <h1 style={{fontSize: 'clamp(40px, 5.6vw, 60px)'}}>What's new, version by version.</h1>
        <p style={{fontSize: 18, lineHeight: 1.6, maxWidth: 760, color: 'var(--ground-ink-soft)'}}>
          One line per feature. Follow a link to read how that part of the script works.
        </p>
      </div>
      <div style={{display: 'flex', flexDirection: 'column', gap: 26, maxWidth: 900}}>
        {list.map((r, i) => (
          <ReleaseCard key={r.version} r={r} open={i === 0} tone={channelTone[r.channel]} />
        ))}
        {list.length === 0 && <p>No releases yet.</p>}
      </div>
    </FeltPage>
  );
}
