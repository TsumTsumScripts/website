import React, {useMemo, useRef, useState} from 'react';
import {useHistory, useLocation} from '@docusaurus/router';
import FeltPage from '@site/src/components/felt/FeltPage';
import Patch, {type Tone} from '@site/src/components/felt/Patch';
import FeltAccent from '@site/src/components/felt/FeltAccent';
import Media from '@site/src/components/felt/Media';
import {features} from '@site/src/data/features';

const tabs = [
  {id: 'how', label: 'How to use'},
  {id: 'settings', label: 'Settings'},
  {id: 'shots', label: 'Screenshots'},
  {id: 'video', label: 'Video'},
] as const;
type TabId = (typeof tabs)[number]['id'];

const isTab = (v: string | null): v is TabId => tabs.some((t) => t.id === v);

type SettingOption = {name: string; desc: string; group?: string};

// A dropdown's options in runs under their group heading, in the page's order.
const groupOptions = (options: SettingOption[]) =>
  options.reduce<{group?: string; items: SettingOption[]}[]>((runs, o) => {
    const last = runs[runs.length - 1];
    if (last && last.group === o.group) last.items.push(o);
    else runs.push({group: o.group, items: [o]});
    return runs;
  }, []);

export default function FeaturesGuide(): React.JSX.Element {
  const {pathname, search} = useLocation();
  const history = useHistory();
  const [query, setQuery] = useState('');
  const heroRef = useRef<HTMLDivElement>(null);

  const key = pathname.replace(/\/$/, '').split('/')[2];
  const sel = Math.max(0, features.findIndex((f) => f.key === key));
  const f = features[sel];
  const tabParam = new URLSearchParams(search).get('tab');
  const tab: TabId = isTab(tabParam) ? tabParam : 'how';
  const tone = f.tone as Tone;

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return features;
    return features.filter((x) => `${x.title} ${x.category} ${x.summary}`.toLowerCase().includes(q));
  }, [query]);

  const go = (to: string) => {
    history.push(to);
    // On a narrow screen the sidebar is above the content; bring the hero into view.
    if (window.matchMedia('(max-width: 900px)').matches) {
      requestAnimationFrame(() => heroRef.current?.scrollIntoView({behavior: 'smooth', block: 'start'}));
    }
  };
  const prev = features[(sel + features.length - 1) % features.length];
  const next = features[(sel + 1) % features.length];

  const onTabKey = (e: React.KeyboardEvent, i: number) => {
    const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const t = tabs[(i + dir + tabs.length) % tabs.length];
    history.replace(`/features/${f.key}?tab=${t.id}`);
    document.getElementById(`tab-${t.id}`)?.focus();
  };

  const allShots = [f.hero, ...f.steps.flatMap((s) => (s.shot ? [s.shot] : [])), ...f.shots];

  return (
    <FeltPage
      wide
      title={`${f.title} · Features`}
      description={f.summary}>
      <div style={{display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-start'}}>
        <span className="kicker patch--jade" style={{background: 'var(--jade-fill)', color: 'var(--jade-ink)'}}>Feature guide</span>
        <h1 style={{fontSize: 'clamp(40px, 5.6vw, 60px)'}}>Every feature, stitch by stitch.</h1>
        <p style={{fontSize: 18, lineHeight: 1.6, maxWidth: 760, color: 'var(--ground-ink-soft)'}}>
          Pick a feature to see what it does, how to set it up, and what it looks like in the app.
        </p>
      </div>

      <div style={{display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'flex-start'}}>
        <aside className="fg-side">
          <label className="visually-hidden" htmlFor="fg-search">Search features</label>
          <input id="fg-search" className="fg-search" type="search" placeholder="Search features" value={query} onChange={(e) => setQuery(e.target.value)} />
          <nav aria-label="Features" style={{display: 'flex', flexDirection: 'column', gap: 10}}>
            {shown.length === 0 && <p style={{color: 'var(--ground-ink-soft)'}}>No features match “{query}”.</p>}
            {shown.map((x) => {
              const i = features.indexOf(x);
              const on = i === sel;
              return (
                <Patch
                  key={x.key}
                  as="a"
                  href={`/features/${x.key}`}
                  tone={on ? (x.tone as Tone) : 'surface'}
                  radius="22px"
                  inset={4}
                  lift={on ? 4 : 5}
                  aria-current={on ? 'true' : undefined}
                  className="fg-item"
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault();
                    go(`/features/${x.key}`);
                  }}>
                  <span className="fg-num" style={on ? {background: '#1c1b2b', color: '#f4efe6'} : {background: `var(--${x.tone}-fill)`, color: `var(--${x.tone}-ink)`}}>{i + 1}</span>
                  <span style={{display: 'flex', flexDirection: 'column'}}>
                    <b style={{fontSize: 16}}>{x.title}</b>
                    <small style={{fontSize: 13.5, opacity: 0.92}}>{x.category}</small>
                  </span>
                </Patch>
              );
            })}
          </nav>
        </aside>

        <main style={{flex: '999 1 560px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 28}}>
          <div ref={heroRef} />
          <Patch tone={tone} radius="40px 64px 44px 72px" inset={10} style={{padding: 'clamp(28px, 4vw, 44px)', display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start'}}>
            <FeltAccent kind={sel % 2 === 0 ? 'coin' : 'medal'} width={78} top={-30} right={28} rotate={10} />
            <div style={{display: 'flex', gap: 10, flexWrap: 'wrap'}}>
              <span className="chip">Feature {sel + 1} of {features.length}</span>
              <span className="chip">{f.category}</span>
            </div>
            <h2 style={{fontSize: 'clamp(34px, 4.4vw, 46px)'}}>{f.title}</h2>
            <p style={{fontSize: 18, lineHeight: 1.6, maxWidth: '40em'}}>{f.summary}</p>
          </Patch>

          <div role="tablist" aria-label={`${f.title} details`} style={{display: 'flex', gap: 10, flexWrap: 'wrap'}}>
            {tabs.map((t, i) => (
              <button
                key={t.id}
                id={`tab-${t.id}`}
                role="tab"
                aria-selected={tab === t.id}
                aria-controls={`panel-${t.id}`}
                tabIndex={tab === t.id ? 0 : -1}
                className={'fg-tab' + (tab === t.id ? ' fg-tab--on' : '')}
                onKeyDown={(e) => onTabKey(e, i)}
                onClick={() => history.replace(`/features/${f.key}${t.id === 'how' ? '' : `?tab=${t.id}`}`)}>
                {t.label}
              </button>
            ))}
          </div>

          <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} style={{display: 'flex', flexDirection: 'column', gap: 22}}>
            {tab === 'how' && (
              <>
                <ol style={{listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 22}}>
                  {f.steps.map((s, i) => (
                    <Patch as="li" key={s.title} tone="surface" radius="30px" inset={7} className="fg-step" style={{['--thread' as string]: '#6c6890'}}>
                      <div style={{display: 'flex', gap: 16, flex: '1 1 260px'}}>
                        <span className="fg-num fg-num--big" style={{background: `var(--${f.tone}-fill)`, color: `var(--${f.tone}-ink)`}}>{i + 1}</span>
                        <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
                          <h3 style={{fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 20}}>{s.title}</h3>
                          <p style={{fontSize: 16, lineHeight: 1.6, color: 'var(--ground-ink-soft)'}}>{s.body}</p>
                        </div>
                      </div>
                      {s.shot && (
                        <div style={{flex: '1 1 240px', maxWidth: 320}}>
                          <Media id={s.shot.id} alt={s.shot.alt} hint={s.shot.capture} aspect="16 / 10" />
                        </div>
                      )}
                    </Patch>
                  ))}
                </ol>
                <Patch tone="grape" radius="26px" inset={6} style={{padding: '22px 26px'}}>
                  <p style={{fontSize: 16, lineHeight: 1.6}}>
                    <span style={{fontFamily: 'var(--font-display)', fontSize: 20, marginRight: 10}}>Tip</span>
                    {f.tip}
                  </p>
                </Patch>
              </>
            )}

            {tab === 'settings' && (
              <Patch tone="surface" radius="30px" inset={7} style={{padding: '28px 30px', ['--thread' as string]: '#6c6890'}}>
                <dl style={{margin: 0, display: 'flex', flexDirection: 'column'}}>
                  {f.settings.map((s, i) => (
                    <div key={`${i}-${s.name}`} className="fg-setting" style={i ? {borderTop: '2px dashed #4a4766'} : undefined}>
                      <dt>
                        <b style={{fontSize: 17}}>{s.name}</b>
                        {s.def && <span className="chip chip--pw">Default: {s.def}</span>}
                      </dt>
                      <dd style={{margin: 0, color: 'var(--ground-ink-soft)', lineHeight: 1.6}}>
                        {s.desc}
                        {s.options && (
                          <div className="fg-opts">
                            {groupOptions(s.options).map((g, j) => (
                              <div key={j}>
                                {g.group && <p className="fg-opts-group">{g.group}</p>}
                                <ul>
                                  {g.items.map((o) => (
                                    <li key={o.name}>
                                      <b>{o.name}</b>
                                      {o.name === s.def && <span className="fg-opts-def">default</span>}
                                      <span>{o.desc}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Patch>
            )}

            {tab === 'shots' && (
              <div className="felt-grid" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))'}}>
                {allShots.map((s, i) => (
                  <figure key={s.id} style={{margin: 0, display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center'}}>
                    <Patch tone={tone} className="phone" tilt={[-1.4, 1, -0.6][i % 3]} style={{width: '100%'}}>
                      <Media id={s.id} alt={s.alt} hint={s.capture} />
                    </Patch>
                    <figcaption style={{fontSize: 14, textAlign: 'center', color: 'var(--ground-ink-soft)'}}>{s.alt}</figcaption>
                  </figure>
                ))}
              </div>
            )}

            {tab === 'video' && (
              <Patch tone="grape" radius="40px" inset={9} style={{padding: 22, display: 'flex', flexDirection: 'column', gap: 16}}>
                <Media id={f.video.id} alt={f.video.note} hint={f.video.brief} aspect="16 / 9" />
                <p style={{fontSize: 16}}>{f.video.note}</p>
              </Patch>
            )}
          </div>

          <div style={{display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'space-between'}}>
            <Patch as="a" href={`/features/${prev.key}`} tone="surface" className="fg-pager" onClick={(e: React.MouseEvent) => { e.preventDefault(); go(`/features/${prev.key}`); }}>
              <small>← Previous</small><b>{prev.title}</b>
            </Patch>
            <Patch as="a" href={`/features/${next.key}`} tone="marigold" className="fg-pager" style={{textAlign: 'right'}} onClick={(e: React.MouseEvent) => { e.preventDefault(); go(`/features/${next.key}`); }}>
              <small>Next →</small><b>{next.title}</b>
            </Patch>
          </div>
        </main>
      </div>
    </FeltPage>
  );
}
