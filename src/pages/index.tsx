import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import FeltPage from '@site/src/components/felt/FeltPage';
import Patch, {Kicker, type Tone} from '@site/src/components/felt/Patch';
import FeltAccent from '@site/src/components/felt/FeltAccent';
import Media from '@site/src/components/felt/Media';
import {features} from '@site/src/data/features';
import landing from '@site/src/data/landing';

const steps: {title: string; body: React.ReactNode; tone: Tone}[] = [
  {title: 'Install GAP', body: 'Get the General Automation Platform app for your phone or emulator.', tone: 'marigold'},
  {
    title: 'Start the service',
    body: (
      <>
        Android only lets a computer start GAP's helper. The <Link to="/starter">starter tool</Link> does it in a few
        steps.
      </>
    ),
    tone: 'jade',
  },
  {title: 'Add the script', body: "Open GAP's Library, find Tsum Tsum and tap Add.", tone: 'rose'},
  {
    title: 'Set it and start',
    body: 'Pick a skill, a chain length and your chores, open Tsum Tsum, then tap Play on the floating bar.',
    tone: 'periwinkle',
  },
];

const tilts = ['felt-tilt-a', 'felt-tilt-b', 'felt-tilt-c', 'felt-tilt-d', 'felt-tilt-e', 'felt-tilt-f'];
const cardTones: Tone[] = ['grape', 'rose', 'jade', 'marigold', 'periwinkle', 'grape'];

function Heading({tone, kicker, title}: {tone: Tone; kicker: string; title: string}) {
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start'}}>
      <Kicker tone={tone}>{kicker}</Kicker>
      <h2 style={{fontSize: 40}}>{title}</h2>
    </div>
  );
}

const section = {display: 'flex', flexDirection: 'column', gap: 32} as const;

export default function Home(): React.JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  const discord = siteConfig.customFields!.discordUrl as string;
  const cards = landing.landingFeatureKeys.map((k) => features.find((f) => f.key === k)!);

  return (
    <FeltPage description="An auto-player for Disney Tsum Tsum: chains, skills, bubbles, hearts, boxes and stats.">
      <section
        style={{
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
          gap: 56,
          alignItems: 'center',
          paddingTop: 24,
        }}>
        <div style={{display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'flex-start'}}>
          <Patch tone="jade" radius="999px" inset={4} tilt={-2} lift={3} style={{padding: '7px 18px', fontWeight: 700, fontSize: 14}}>
            Runs on GAP · General Automation Platform
          </Patch>
          <h1 style={{fontSize: 'clamp(44px, 6.4vw, 72px)'}}>
            Let the Tsums play{' '}
            <Patch as="span" tone="rose" radius="22px 40px 26px 44px" inset={3} tilt={-2.5} lift={4} style={{display: 'inline-block', padding: '2px 18px 10px'}}>
              themselves.
            </Patch>
          </h1>
          <p style={{fontSize: 19, lineHeight: 1.6, maxWidth: '32em', color: 'var(--ground-ink-soft)'}}>
            Draws long chains, fires skills on cue, pops bubbles with a plan, sends hearts, opens the mailbox and buys
            boxes. Round after round, while you do something else.
          </p>
          <div style={{display: 'flex', gap: 16, flexWrap: 'wrap'}}>
            <Patch as="a" href="#start" tone="marigold" className="fbtn">Get started</Patch>
            <Patch as="a" href="#video" tone="grape" className="fbtn">Watch the trailer</Patch>
          </div>
        </div>
        <Patch tone="periwinkle" radius="36px 48px 32px 52px" inset={10} tilt={2} style={{padding: 22, justifySelf: 'center'}}>
          <Media id={landing.hero.id} alt={landing.hero.alt} hint={landing.hero.capture} />
        </Patch>
        <FeltAccent kind="medal" width={118} top={-10} right={-6} rotate={12} />
      </section>

      <Patch
        as="section"
        tone="jade"
        radius="48px 120px 56px 140px"
        inset={11}
        style={{maxWidth: 960, padding: 'clamp(32px, 5vw, 60px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32, alignItems: 'start'}}>
        <FeltAccent kind="medal" width={84} top={-38} right={64} rotate={-10} />
        <div style={{display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-start'}}>
          <span className="kicker kicker--surface">What it does</span>
          <h2 style={{fontSize: 40}}>An auto-player that keeps score.</h2>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', gap: 14, fontSize: 17, lineHeight: 1.65}}>
          <p>
            It runs inside the GAP app. It watches the board, plans and draws chains, fires your Tsum's skill when the
            gauge fills, and repeats for as many rounds as you set.
          </p>
          <p>
            Between rounds it does the chores: sending hearts, collecting the mailbox, opening boxes and raising level
            caps. Every round's score and coins are written to a file you can keep.
          </p>
        </div>
      </Patch>

      <section id="play" style={section}>
        <Heading tone="rose" kicker="Watch it play" title="Hands off the screen" />
        <div className="felt-grid" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))'}}>
          {landing.playClips.map((c, i) => (
            <Patch key={c.id} tone={cardTones[(i + 1) % cardTones.length]} radius="30px" inset={7} tilt={[-1.4, 1, -0.6, 1.2][i]} hover style={{padding: 14}}>
              <Media id={c.id} alt={c.alt} hint={c.capture} aspect="9 / 16" />
            </Patch>
          ))}
        </div>
      </section>

      <section id="start" style={section}>
        <Heading tone="marigold" kicker="How to get started" title="Running in four steps" />
        <ol className="felt-grid" style={{listStyle: 'none', margin: 0, padding: 0, gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: 26}}>
          {steps.map((s, i) => (
            <Patch as="li" key={s.title} tone={s.tone} radius="32px" inset={9} tilt={[-1.6, 1.2, -0.8, 1.8][i]} style={{padding: '30px 26px', display: 'flex', flexDirection: 'column', gap: 14}}>
              <span style={{width: 52, height: 52, borderRadius: '50%', background: 'var(--surface)', color: 'var(--ground-ink)', boxShadow: '0 3px 0 var(--edge)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 24}}>
                {i + 1}
              </span>
              <h3 style={{fontSize: 23}}>{s.title}</h3>
              <p style={{fontSize: 16, lineHeight: 1.6}}>{s.body}</p>
            </Patch>
          ))}
        </ol>
      </section>

      <section id="features" style={section}>
        <Heading tone="rose" kicker="Features" title="What's in the sewing box" />
        <div className="felt-grid" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))'}}>
          {cards.map((f, i) => (
            <Patch key={f.key} as={Link} to={`/features/${f.key}`} tone={cardTones[i]} radius="34px" inset={9} hover className={tilts[i]} style={{padding: '18px 18px 28px', display: 'flex', flexDirection: 'column', gap: 18, textDecoration: 'none'}}>
              {f.hero && <Media id={f.hero.id} alt={f.hero.alt} hint={f.hero.capture} aspect="16 / 10" zoom={false} />}
              <div style={{padding: '0 10px', display: 'flex', flexDirection: 'column', gap: 8}}>
                <h3 style={{fontSize: 23}}>{f.title}</h3>
                <p style={{fontSize: 16, lineHeight: 1.6}}>{f.card}</p>
              </div>
            </Patch>
          ))}
        </div>
        <div>
          <Patch as={Link} to="/features" tone="surface" className="fbtn">All {features.length} features</Patch>
        </div>
      </section>

      <section id="video" style={section}>
        <Heading tone="grape" kicker="Trailer" title="The script in 45 seconds" />
        <Patch tone="grape" radius="48px" inset={9} style={{padding: 22}}>
          <Media id={landing.trailer.id} alt="The Tsum Tsum script trailer" hint={landing.trailer.brief} aspect="16 / 9" />
        </Patch>
      </section>

      <Patch
        as="section"
        tone="marigold"
        radius="120px 56px 140px 48px"
        inset={11}
        tilt={-1}
        style={{maxWidth: 880, padding: 'clamp(36px, 5vw, 64px)', display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'flex-start'}}>
        <FeltAccent kind="coin" width={96} top={-30} right={40} rotate={14} />
        <FeltAccent kind="medal" width={58} bottom={30} right={24} rotate={-12} />
        <h2 style={{fontSize: 38}}>Questions? Come and chat.</h2>
        <p style={{fontSize: 18, lineHeight: 1.6, maxWidth: '34em'}}>
          Support, settings advice and new-feature talk all happen in the GAP Discord. Say hello, share a preset, or
          send in a problem report.
        </p>
        <div style={{display: 'flex', gap: 16, flexWrap: 'wrap'}}>
          <Patch as="a" href={discord} tone="grape" className="fbtn">Join the Discord</Patch>
          <Patch as={Link} to="/features" tone="jade" className="fbtn">Explore all features</Patch>
          <Patch as={Link} to="/changelog" tone="surface" className="fbtn">What's new</Patch>
        </div>
      </Patch>
    </FeltPage>
  );
}
