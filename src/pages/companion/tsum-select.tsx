import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import FeltPage from '@site/src/components/felt/FeltPage';
import PageHead from '@site/src/components/felt/PageHead';
import Patch, {Kicker, type Tone} from '@site/src/components/felt/Patch';
import DiscordMark from '@site/src/components/felt/DiscordMark';
import Media from '@site/src/components/felt/Media';
import landing from '@site/src/data/landing';

// Tsum Select, part of GAP Companion: Change My Tsum, presets for each Tsum, auto skill and the
// Select Tsum workflow step. The layout follows the Companion page (/companion).

const shots = landing.selectShots;
type Shot = {id: string; alt: string; capture: string};

function Heading({tone, kicker, title, badge}: {tone: Tone; kicker: string; title: string; badge?: string}) {
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start'}}>
      <div style={{display: 'flex', gap: 10, flexWrap: 'wrap'}}>
        <Kicker tone={tone}>{kicker}</Kicker>
        {badge && <span className="kicker kicker--surface">{badge}</span>}
      </div>
      <h2 style={{fontSize: 40}}>{title}</h2>
    </div>
  );
}

/** A section: heading, then words beside the pictures. */
function Feature({id, tone, kicker, title, badge, children, media}: {
  id: string; tone: Tone; kicker: string; title: string; badge?: string; children: React.ReactNode; media: React.ReactNode;
}) {
  return (
    <section id={id} style={{display: 'flex', flexDirection: 'column', gap: 28}}>
      <Heading tone={tone} kicker={kicker} title={title} badge={badge} />
      <div className="felt-grid" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', alignItems: 'start', gap: 36}}>
        <div style={{display: 'flex', flexDirection: 'column', gap: 14, fontSize: 17, lineHeight: 1.65}}>{children}</div>
        <div style={{display: 'flex', flexDirection: 'column', gap: 26}}>{media}</div>
      </div>
    </section>
  );
}

/** A web dashboard screenshot. */
function Desk({shot, tone, tilt = 0, width}: {shot: Shot; tone: Tone; tilt?: number; width?: string}) {
  return (
    <Patch tone={tone} radius="30px" inset={8} tilt={tilt} style={{padding: 14, width, justifySelf: 'center', alignSelf: 'center'}}>
      <Media id={shot.id} alt={shot.alt} hint={shot.capture} />
    </Patch>
  );
}

/** A phone screenshot. */
function Phone({shot, tone, tilt = 0}: {shot: Shot; tone: Tone; tilt?: number}) {
  return (
    <Patch tone={tone} radius="40px" inset={6} tilt={tilt} className="phone" style={{width: 'min(100%, 280px)', justifySelf: 'center', alignSelf: 'center'}}>
      <Media id={shot.id} alt={shot.alt} hint={shot.capture} />
    </Patch>
  );
}

/** A Quick Bar notice render, with a caption. */
function Strip({shot, tone, caption}: {shot: Shot; tone: Tone; caption: string}) {
  return (
    <figure style={{margin: 0, display: 'flex', flexDirection: 'column', gap: 10}}>
      <Patch tone={tone} radius="24px" inset={6} style={{padding: 10}}>
        <Media id={shot.id} alt={shot.alt} hint={shot.capture} />
      </Patch>
      <figcaption style={{fontSize: 15, color: 'var(--ground-ink-soft)'}}>{caption}</figcaption>
    </figure>
  );
}

/** The four steps, in order. */
const flow: {title: string; body: string; where: string}[] = [
  {title: 'Assign presets', body: 'Star a default preset for each Tsum on the Assign screen.', where: 'Phone or web'},
  {title: 'Presets sync', body: 'Each linked device gets your presets and the Tsums they belong to.', where: 'GAP Companion'},
  {title: 'A round is about to start', body: 'The script reads My Tsum on the screen before the round.', where: 'On the device'},
  {title: 'The skill switches', body: "If the Tsum has changed since the last round, or it's the run's first, the skill from its default preset goes on and a short notice says so.", where: 'On the device'},
];

/** Who wins when more than one thing wants to set the skill. */
const rules: {title: string; body: string}[] = [
  {title: 'If you pick a skill yourself', body: 'A skill you choose on the Quick Bar or the settings page stays until you change Tsums or restart the run.'},
  {title: 'If you pick a preset in Change My Tsum', body: 'The whole preset applies, skill included, and auto skill leaves that Tsum alone for the rest of the run.'},
  {title: 'If the default preset has no skill', body: 'Nothing changes. The skill you already have stays on.'},
];

/** What the app and the dashboard flag, and what to do about it. */
const conflicts: {title: string; says: string; warn: boolean; fix: string; tone: Tone}[] = [
  {
    title: 'Another preset uses a different skill', says: '"Coin farming" sets Burst, not Gaston', warn: true, tone: 'marigold',
    fix: 'Star the preset with the skill you want, or remove the skill from the other one. If you only ever pick that other preset by hand, leave it as it is.',
  },
  {
    title: 'The default preset has no skill', says: 'Auto: none', warn: false, tone: 'periwinkle',
    fix: 'Add a skill to that preset, or star a different one that has a skill. Until then, the Tsum keeps whatever skill is already on.',
  },
  {
    title: "A device doesn't have that skill", says: 'Snow White is not on Pixel 7', warn: true, tone: 'rose',
    fix: 'Update the script on that device. Until you do, it keeps its current skill and shows a notice about it once.',
  },
  {
    title: 'You pick a preset with a different skill', says: '"Coin farming" sets Burst. With No preset, it gets Gaston.', warn: false, tone: 'jade',
    fix: "Nothing, unless you wanted the default skill after all. Then pick No preset, or the default preset. The dialog is only telling you which skill you'll end up with.",
  },
];

export default function TsumSelect(): React.JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  const discord = siteConfig.customFields!.discordUrl as string;
  // The setup section is linked from the top of the page; Docusaurus only knows anchors it is told about.
  useBrokenLinks().collectAnchor('setup');
  return (
    <FeltPage
      title="Tsum Select"
      description="Tsum Select for GAP Companion: change My Tsum from your phone, give each Tsum its own presets, and have the script put on the right skill whenever the Tsum changes.">
      <PageHead tone="rose" kicker="GAP Companion add-on" title="Swap Tsums from your phone," accent="skill and all.">
        <p>
          Tsum Select lets you change My Tsum from the GAP Companion app and keep a few presets for each Tsum. The
          script then switches to the right skill for whichever Tsum you're playing.
        </p>
        <p style={{marginTop: 12}}>
          It's an add-on that comes with <Link to="/companion">GAP Companion</Link> (coming soon): it reaches your linked
          devices on its own and works the same in the phone app and on the web dashboard.
        </p>
        <div style={{display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 8}}>
          <Patch as={Link} to="#setup" tone="jade" className="fbtn">Set up auto skill</Patch>
          <Patch as={Link} to="/companion" tone="surface" className="fbtn">About GAP Companion</Patch>
        </div>
      </PageHead>

      <Feature
        id="change"
        tone="rose"
        kicker="Change My Tsum"
        title="Change My Tsum without getting up"
        media={
          <>
            <Desk shot={shots.device} tone="rose" tilt={-0.8} width="min(100%, 420px)" />
            <Phone shot={shots.dialog} tone="periwinkle" tilt={1} />
          </>
        }>
        <p>
          Tap <b>Change My Tsum</b> on a device's My Tsum card, pick a Tsum from that device's Tsum List, and the script
          switches to it between rounds. If nothing is running, it switches when the next run starts. You can also pick
          one of that Tsum's presets to apply along with it.
        </p>
        <ul style={{margin: 0, paddingLeft: 22}}>
          <li>It goes straight to the Tsum's card in the collection instead of hunting for it.</li>
          <li>You get a notification when it's done, with a Try again button if something went wrong.</li>
          <li>If the preset you picked sets a different skill from the Tsum's default, the dialog says so.</li>
        </ul>
      </Feature>

      <Feature
        id="presets"
        tone="marigold"
        kicker="Presets"
        title="Presets for each Tsum"
        media={<Phone shot={shots.assign} tone="marigold" tilt={-0.8} />}>
        <p>
          Give each Tsum its own presets and star one as its default. When you use Change My Tsum, you only see that
          Tsum's presets, and the default is already selected.
        </p>
        <ul style={{margin: 0, paddingLeft: 22}}>
          <li>Search, show only assigned or unassigned Tsums, or select a bunch and assign them in one go.</li>
          <li>Changes save right away, and you can undo them.</li>
          <li>Open a preset to see which Tsums use it.</li>
        </ul>
      </Feature>

      <Feature
        id="auto-skill"
        tone="jade"
        kicker="Auto skill"
        title="The skill follows the Tsum"
        badge="New"
        media={<Phone shot={shots.assignWeb} tone="jade" tilt={0.6} />}>
        <p>
          Before every round, the script checks which Tsum you're using. On the first round of a run, or when you've
          changed Tsums since the last round, it switches to the skill from that Tsum's default preset. Setup takes
          three steps, at the <Link to="#setup">bottom of this page</Link>.
        </p>
        <ul style={{margin: 0, paddingLeft: 22}}>
          <li>It only changes the skill. The rest of the preset stays out of it unless you load the preset yourself.</li>
          <li>It doesn't matter how you changed Tsums, in the game or with Change My Tsum.</li>
          <li>It's on by default. You can turn it off for a device from its My Tsum card.</li>
        </ul>
      </Feature>

      <Feature
        id="workflows"
        tone="grape"
        kicker="Workflows"
        title="Select Tsum in workflows"
        media={<Desk shot={shots.workflow} tone="grape" tilt={-0.5} />}>
        <p>
          Workflows get a <b>Select Tsum</b> step, so a long run can change Tsums partway through. For example, ten
          rounds with Mickey and then ten with Minnie. Each device picks from its own Tsum List.
        </p>
        <ul style={{margin: 0, paddingLeft: 22}}>
          <li>Add a <b>Skill</b> step after it if you want to change the skill too.</li>
          <li>Auto skill stays off during workflows, so the workflow's own steps decide the skill.</li>
        </ul>
        <p>
          More on workflows: <Link to="/guides/companion/workflows">Workflows, step by step</Link>.
        </p>
      </Feature>

      <section id="how" style={{display: 'flex', flexDirection: 'column', gap: 28}}>
        <Heading tone="periwinkle" kicker="How it works" title="Set it up once, then play as usual" />
        <p style={{fontSize: 17, lineHeight: 1.65, maxWidth: 760}}>
          Your presets are saved to your GAP Companion account and synced to all your devices. After that the device
          works on its own, so your phone doesn't have to be nearby.
        </p>
        <ol className="felt-grid" style={{listStyle: 'none', margin: 0, padding: 0, gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))'}}>
          {flow.map((f, i) => (
            <li key={f.title}>
              <Patch tone="surface" radius="26px" inset={7} tilt={[-0.5, 0.4, -0.3, 0.5][i]} style={{padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 8, height: '100%', ['--thread' as string]: '#6c6890'}}>
                <div style={{alignSelf: 'flex-start'}}><Kicker tone="marigold">Step {i + 1} · {f.where}</Kicker></div>
                <h3 style={{fontSize: 20}}>{f.title}</h3>
                <p style={{fontSize: 16, lineHeight: 1.6}}>{f.body}</p>
              </Patch>
            </li>
          ))}
        </ol>
        <div className="felt-grid" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))'}}>
          {rules.map((r) => (
            <div key={r.title} style={{display: 'flex', flexDirection: 'column', gap: 6, padding: '4px 4px'}}>
              <h3 style={{fontSize: 19}}>{r.title}</h3>
              <p style={{fontSize: 16, lineHeight: 1.6, color: 'var(--ground-ink-soft)'}}>{r.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="conflicts" style={{display: 'flex', flexDirection: 'column', gap: 28}}>
        <Heading tone="marigold" kicker="Conflicts" title="When presets disagree" />
        <p style={{fontSize: 17, lineHeight: 1.65, maxWidth: 760}}>
          If a Tsum's presets don't agree on a skill, or a device can't use one, the app and the dashboard flag it so
          you can fix it before you play.
        </p>
        <div className="felt-grid" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))'}}>
          {conflicts.map((c, i) => (
            <Patch key={c.title} tone={c.tone} radius="28px" inset={7} tilt={[-0.6, 0.5, -0.4, 0.6][i]} style={{padding: '22px 24px', display: 'flex', flexDirection: 'column', gap: 10}}>
              <h3 style={{fontSize: 21}}>{c.title}</h3>
              <p style={{fontSize: 15, fontWeight: 700}}>{c.warn ? '⚠ ' : ''}{c.says}</p>
              <p style={{fontSize: 16, lineHeight: 1.6}}><b>What to do:</b> {c.fix}</p>
            </Patch>
          ))}
        </div>
        <Desk shot={shots.linkCard} tone="surface" tilt={-0.4} width="min(100%, 440px)" />
      </section>

      <section id="notices" style={{display: 'flex', flexDirection: 'column', gap: 28}}>
        <Heading tone="jade" kicker="On the device" title="Notices on the Quick Bar" badge="New" />
        <p style={{fontSize: 17, lineHeight: 1.65, maxWidth: 760}}>
          When auto skill switches your skill or Change My Tsum finishes, a short message shows over the Quick Bar for a
          couple of seconds, in the style and theme you picked for your settings page.
        </p>
        <div className="felt-grid" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: 26}}>
          <Strip shot={shots.notice} tone="surface" caption="Accessible, dark" />
          <Strip shot={shots.noticeLight} tone="surface" caption="Accessible, light" />
          <Strip shot={shots.noticeFelt} tone="surface" caption="Felt" />
        </div>
        <div style={{maxWidth: 560}}>
          <Strip shot={shots.noticeMyTsum} tone="surface" caption="Change My Tsum also says what it did on the device" />
        </div>
      </section>

      <section id="setup">
      <Patch tone="surface" radius="34px" inset={8} style={{padding: '30px 32px', maxWidth: 820, ['--thread' as string]: '#6c6890'}}>
        <h2 style={{fontSize: 30, marginBottom: 14}}>Setting up auto skill</h2>
        <ol style={{lineHeight: 1.8, fontSize: 17, margin: 0, paddingLeft: 22}}>
          <li><b>Make a preset for each skill.</b> In Presets, create one called Gaston and only set its skill. Do the same for the other skills you use.</li>
          <li><b>Make it the default for your Tsums.</b> On the Assign screen, tap <b>Select</b>, choose the Tsums that should use Gaston, then tap <b>Add preset</b> and turn on <b>Make it their default</b>.</li>
          <li><b>Play.</b> Change Tsums however you like. The skill switches before the next round, and a notice lets you know.</li>
        </ol>
        <p style={{marginTop: 18, color: 'var(--ground-ink-soft)'}}>
          Tsum Select needs GAP Companion and the Tsum Tsum script 6.0. Auto skill and the Quick Bar notices come with
          an upcoming 6.0 update.
        </p>
        <p style={{marginTop: 12, color: 'var(--ground-ink-soft)'}}>
          Screenshots are from the GAP Companion app and the web dashboard with example Tsums and presets. The Quick Bar
          pictures are renders of the script's own Quick Bar.
        </p>
        <div style={{display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 20}}>
          <Patch as="a" href={discord} tone="grape" className="fbtn"><DiscordMark />Hear when it launches</Patch>
          <Patch as={Link} to="/companion" tone="jade" className="fbtn">Back to GAP Companion</Patch>
        </div>
      </Patch>
      </section>
    </FeltPage>
  );
}
