import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import FeltPage from '@site/src/components/felt/FeltPage';
import PageHead from '@site/src/components/felt/PageHead';
import Patch, {Kicker, type Tone} from '@site/src/components/felt/Patch';
import DiscordMark from '@site/src/components/felt/DiscordMark';
import Media from '@site/src/components/felt/Media';
import landing from '@site/src/data/landing';

const companionUrl = 'https://www.gapapp.app/companion/';
const pricingUrl = 'https://www.gapapp.app/companion/pricing.html';
const dashboardUrl = 'https://companion.gapapp.app/';

const shots = landing.companionShots;
const videos = landing.companionVideos;

/** What only Companion does, one patch each. */
const exclusives: {title: string; tone: Tone; body: React.ReactNode}[] = [
  {
    title: 'Change My Tsum',
    tone: 'rose',
    body: <>Swap the Tsum a device plays from your phone, or let a workflow switch it between loops. No walking to the device, no tapping through the collection.</>,
  },
  {
    title: 'Workflows',
    tone: 'jade',
    body: <>Chain restarts, Tsum changes, skills and rounds into a plan each device follows on its own, even while your phone is off.</>,
  },
  {
    title: 'Presets on every device',
    tone: 'marigold',
    body: <>Save a set of settings once and apply it to one device or all of them. Only the settings the preset holds change.</>,
  },
  {
    title: 'Currency after every round',
    tone: 'periwinkle',
    body: <>Medals, coins, rubies and hearts, read off the score screen after each round and shown on the device's Stats tab.</>,
  },
  {
    title: 'It asks you when it is stuck',
    tone: 'grape',
    body: (
      <>
        On a screen the script does not know, the device sends you a screenshot. Tap or drag on it to show the way, then
        Continue. Nobody answers within 10 minutes? The script handles it the usual way.
      </>
    ),
  },
  {
    title: 'Alerts on your phone',
    tone: 'surface',
    body: <>A device went offline, a run stopped after its round, a chore finished, a workflow ended. Turn each kind on or off.</>,
  },
];

/** The free script next to the script with Companion. */
const compare: {what: string; free: string; companion: string}[] = [
  {what: 'Auto-play, skills, bubbles, chores', free: 'Yes', companion: 'Yes'},
  {what: 'Settings and presets', free: 'On the device', companion: 'From your phone or browser, on every device at once'},
  {what: 'Round stats', free: 'A file on the device', companion: 'Totals, a coins chart and recent rounds, live'},
  {what: 'Medals, coins, rubies and hearts', free: '-', companion: 'After every round'},
  {what: 'Start, pause, stop after the round', free: 'The Quick Bar on the device', companion: 'Any device, or all of them'},
  {what: 'Change My Tsum', free: '-', companion: 'One tap, or on a schedule in a workflow'},
  {what: 'Workflows', free: '-', companion: 'Yes'},
  {what: 'Alerts and help on unknown screens', free: '-', companion: 'Yes'},
];

function Heading({tone, kicker, title, only}: {tone: Tone; kicker: string; title: string; only?: boolean}) {
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start'}}>
      <div style={{display: 'flex', gap: 10, flexWrap: 'wrap'}}>
        <Kicker tone={tone}>{kicker}</Kicker>
        {only && <OnlyBadge />}
      </div>
      <h2 style={{fontSize: 40}}>{title}</h2>
    </div>
  );
}

function OnlyBadge() {
  return <span className="kicker kicker--surface">Companion only</span>;
}

/** A section: heading, then words beside the pictures. */
function Feature({
  id,
  tone,
  kicker,
  title,
  only,
  children,
  media,
}: {
  id: string;
  tone: Tone;
  kicker: string;
  title: string;
  only?: boolean;
  children: React.ReactNode;
  media: React.ReactNode;
}) {
  return (
    <section id={id} style={{display: 'flex', flexDirection: 'column', gap: 28}}>
      <Heading tone={tone} kicker={kicker} title={title} only={only} />
      <div className="felt-grid" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', alignItems: 'start', gap: 36}}>
        <div style={{display: 'flex', flexDirection: 'column', gap: 14, fontSize: 17, lineHeight: 1.65}}>{children}</div>
        <div style={{display: 'flex', flexDirection: 'column', gap: 26}}>{media}</div>
      </div>
    </section>
  );
}

/** A desktop screenshot of the web dashboard. */
function Desk({shot, tone, tilt = 0}: {shot: {id: string; alt: string; capture: string}; tone: Tone; tilt?: number}) {
  return (
    <Patch tone={tone} radius="30px" inset={8} tilt={tilt} style={{padding: 14}}>
      <Media id={shot.id} alt={shot.alt} hint={shot.capture} />
    </Patch>
  );
}

/** A phone screenshot. */
function Phone({shot, tone, tilt = 0}: {shot: {id: string; alt: string; capture: string}; tone: Tone; tilt?: number}) {
  return (
    <Patch tone={tone} radius="40px" inset={6} tilt={tilt} className="phone" style={{width: 'min(100%, 280px)', justifySelf: 'center', alignSelf: 'center'}}>
      <Media id={shot.id} alt={shot.alt} hint={shot.capture} />
    </Patch>
  );
}

/** A how-to video, 9:16. */
function Howto({video, tone}: {video: {id: string; note: string; brief: string}; tone: Tone}) {
  return (
    <figure style={{margin: 0, display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center'}}>
      <Patch tone={tone} radius="40px" inset={6} className="phone" style={{width: 'min(100%, 300px)'}}>
        <Media id={video.id} alt={video.note} hint={video.brief} aspect="9 / 16" />
      </Patch>
      <figcaption style={{fontSize: 15, color: 'var(--ground-ink-soft)', textAlign: 'center'}}>How to: {video.note.replace(/\.$/, '').toLowerCase()}</figcaption>
    </figure>
  );
}

export default function Companion(): React.JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  const discord = siteConfig.customFields!.discordUrl as string;
  return (
    <FeltPage
      title="GAP Companion"
      description="Watch and steer every device running the Tsum Tsum script from your phone or browser: fleet controls, live stats, currency, presets and workflows.">
      <PageHead tone="jade" kicker="GAP Companion" title="Every device, from" accent="your pocket.">
        <p>
          GAP Companion is a phone app and web dashboard for the devices running the Tsum Tsum script. See which ones are
          playing, how many coins each round made, and change a run without walking over to the device. Make a preset
          once and send it everywhere, swap Tsums from the couch, and leave a workflow running overnight.
        </p>
        <p style={{marginTop: 12}}>
          The script and GAP stay free. Companion is the paid extra: try it free for 7 days, no card needed.
        </p>
        <div style={{display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 8}}>
          <Patch as="a" href={dashboardUrl} tone="marigold" className="fbtn">Start free trial</Patch>
          <Patch as="a" href={pricingUrl} tone="surface" className="fbtn">See pricing</Patch>
          <Patch as="a" href="#start" tone="jade" className="fbtn">How to connect</Patch>
        </div>
      </PageHead>

      <section id="only" style={{display: 'flex', flexDirection: 'column', gap: 28}}>
        <Heading tone="grape" kicker="Only with Companion" title="What the free script can't do" />
        <div className="felt-grid" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))'}}>
          {exclusives.map((e, i) => (
            <Patch key={e.title} tone={e.tone} radius="30px" inset={7} tilt={[-0.8, 0.6, -0.4][i % 3]} style={{padding: '24px 26px', display: 'flex', flexDirection: 'column', gap: 10}}>
              <h3 style={{fontSize: 22}}>{e.title}</h3>
              <p style={{fontSize: 16, lineHeight: 1.6}}>{e.body}</p>
            </Patch>
          ))}
        </div>
      </section>

      <Feature
        id="fleet"
        tone="jade"
        kicker="Fleet"
        title="Every device on one screen"
        only
        media={
          <>
            <Desk shot={shots.fleet} tone="jade" tilt={-0.6} />
            <div className="felt-grid" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: 26}}>
              <Phone shot={shots.bulk} tone="periwinkle" tilt={1} />
              <Howto video={videos.fleet} tone="marigold" />
            </div>
          </>
        }>
        <p>
          Phones, tablets and emulators side by side, each with what it is doing right now in plain words: "Playing
          Mickey Mouse · Round 12", "Sending hearts", "Round 31: 1,855 coins". Filter by Active, Idle or Offline.
        </p>
        <ul style={{margin: 0, paddingLeft: 22}}>
          <li>Pause, resume, stop, or <b>Stop after round</b> so the run ends on a finished score screen.</li>
          <li>Long-press to select several devices and send one command to all of them.</li>
          <li>Each device's speed, with a nudge when it is slower than after its last restart.</li>
          <li><b>Restart when slow</b> restarts a device for you, with a cooldown and a daily limit.</li>
          <li>On the web, a sortable table, and every device's rounds and coins added up.</li>
        </ul>
      </Feature>

      <Feature
        id="stats"
        tone="periwinkle"
        kicker="Stats"
        title="Every round, as it lands"
        only
        media={
          <>
            <Desk shot={shots.stats} tone="periwinkle" tilt={0.5} />
            <Phone shot={shots.device} tone="rose" tilt={-1} />
          </>
        }>
        <p>Each device's Stats tab fills in as rounds finish. You don't need to copy files or open a spreadsheet.</p>
        <ul style={{margin: 0, paddingLeft: 22}}>
          <li><b>Totals</b> since you last reset them: rounds, coins earned, medals, best round, average coins. Kept while the device is offline.</li>
          <li><b>This run</b>: rounds, run time, average round, average base and final coins.</li>
          <li><b>Coins per round</b>: a chart of the last 20 rounds, coins next to base coins.</li>
          <li><b>Recent rounds</b>: the last 10, with time, base and coins.</li>
          <li><b>My Tsum</b>: who is playing, with <b>Change My Tsum</b> right under it.</li>
        </ul>
        <p>
          For long-term charts on your own computer, <Link to="/stats-site">Tsum Tsum Stats</Link> reads the same rounds.
        </p>
      </Feature>

      <section id="currency">
        <Patch tone="marigold" radius="48px 120px 56px 140px" inset={11} style={{padding: 'clamp(30px, 5vw, 56px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 32, alignItems: 'start'}}>
          <div style={{display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-start'}}>
            <div style={{display: 'flex', gap: 10, flexWrap: 'wrap'}}>
              <span className="kicker kicker--surface">Currency</span>
              <OnlyBadge />
            </div>
            <h2 style={{fontSize: 38}}>Know what's in the wallet</h2>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', gap: 14, fontSize: 17, lineHeight: 1.65}}>
            <p>
              After every round the device reads your <b>medals</b>, <b>coins</b>, <b>rubies</b> and <b>hearts</b>,
              and the Stats tab shows them in a Currency card with how long ago they were read.
            </p>
            <p>
              Check how much you have before a box or a new Tsum without opening the game. Each day's readings are also
              saved on the device as a file you can keep.
            </p>
          </div>
        </Patch>
      </section>

      <Feature
        id="settings"
        tone="rose"
        kicker="Settings"
        title="Change a run without touching the device"
        only
        media={<Desk shot={shots.settings} tone="rose" tilt={-0.5} />}>
        <p>
          The Settings tab shows the script's own settings, grouped the way the script groups them. Flip a switch, step a
          number or pick a skill and it reaches the device straight away.
        </p>
        <ul style={{margin: 0, paddingLeft: 22}}>
          <li>A tag shows each change going through: Pending, Syncing, Synced.</li>
          <li>Round settings apply from the next round, just like the Quick Bar.</li>
          <li><b>Load settings</b> on an idle device opens its settings before you press Start.</li>
          <li><b>Last run settings</b> and <b>Change My Tsum</b> sit at the top.</li>
        </ul>
      </Feature>

      <Feature
        id="presets"
        tone="marigold"
        kicker="Presets"
        title="Set it once, send it everywhere"
        only
        media={
          <div className="felt-grid" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: 26}}>
            <Phone shot={shots.preset} tone="marigold" tilt={-1} />
            <Phone shot={shots.applied} tone="jade" tilt={1} />
            <Howto video={videos.presets} tone="periwinkle" />
          </div>
        }>
        <p>
          The script already saves presets on each device. Companion keeps them on your account, so every device with the
          Tsum script gets the same list.
        </p>
        <ul style={{margin: 0, paddingLeft: 22}}>
          <li>Set only what should change. Anything you leave unset stays as each device has it.</li>
          <li>Apply one to a single device from its Settings tab, or to every selected device at once.</li>
          <li>See the result per device: Applied, Offline, or running another script.</li>
          <li><b>Import</b> copies a device's own presets into your account.</li>
          <li>Workflows can switch presets between loops.</li>
        </ul>
      </Feature>

      <Feature
        id="workflows"
        tone="grape"
        kicker="Workflows"
        title="A plan each device follows on its own"
        only
        media={
          <>
            <Desk shot={shots.workflow} tone="grape" tilt={0.5} />
            <div className="felt-grid" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: 26}}>
              <Howto video={videos.workflow} tone="rose" />
              <Desk shot={shots.assign} tone="surface" tilt={-0.8} />
            </div>
          </>
        }>
        <p>
          Build a list of steps, assign it to your devices, press Start. Each device keeps its own copy, so it keeps going
          while your phone is asleep.
        </p>
        <ul style={{margin: 0, paddingLeft: 22}}>
          <li><b>Select Tsum</b>: a different Tsum on each loop, and on each device. Copy one device's picks to the rest.</li>
          <li><b>Skill</b>: a skill or one of your presets, per loop.</li>
          <li><b>Play rounds</b>, <b>Send hearts</b>, <b>Receive hearts</b>, <b>Restart app</b>, <b>Restart device</b>, <b>Restart if slow</b>.</li>
          <li><b>Loop</b> a set number of times, or forever. <b>Stop</b> ends it.</li>
          <li>Warnings before you save: a step that is never reached, a setting left empty, a device that can't run it.</li>
          <li>Each device card shows where it is, for example "Loop 2 · Step 4 of 5 · Play rounds · 4/10 rounds".</li>
        </ul>
      </Feature>

      <section id="compare" style={{display: 'flex', flexDirection: 'column', gap: 28}}>
        <Heading tone="periwinkle" kicker="Free or Companion" title="What you add" />
        <Patch tone="surface" radius="34px" inset={8} style={{padding: 'clamp(16px, 3vw, 28px)', ['--thread' as string]: '#6c6890', overflowX: 'auto'}}>
          <table className="felt-table" style={{width: '100%', borderCollapse: 'collapse', fontSize: 16, lineHeight: 1.5}}>
            <thead>
              <tr>
                <th scope="col" style={{textAlign: 'left', padding: '10px 12px'}}></th>
                <th scope="col" style={{textAlign: 'left', padding: '10px 12px'}}>Free script</th>
                <th scope="col" style={{textAlign: 'left', padding: '10px 12px'}}>With Companion</th>
              </tr>
            </thead>
            <tbody>
              {compare.map((r) => (
                <tr key={r.what} style={{borderTop: '1px solid var(--surface-rule)'}}>
                  <th scope="row" style={{textAlign: 'left', padding: '10px 12px', fontWeight: 700}}>{r.what}</th>
                  <td style={{padding: '10px 12px'}}>{r.free}</td>
                  <td style={{padding: '10px 12px'}}>{r.companion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Patch>
      </section>

      <Patch id="start" tone="surface" radius="34px" inset={8} style={{padding: '30px 32px', maxWidth: 820, ['--thread' as string]: '#6c6890'}}>
        <h2 style={{fontSize: 30, marginBottom: 14}}>Get started</h2>
        <ol style={{lineHeight: 1.8, fontSize: 17, margin: 0, paddingLeft: 22}}>
          <li>
            Set up the script as usual with the <Link to="/starter">starter tool</Link>. Companion connects to GAP and the
            script; it does not play on its own.
          </li>
          <li>
            Start your free trial at <a href={dashboardUrl}>companion.gapapp.app</a> and sign in with Google, Discord or
            your email. Use the Android app or the web dashboard: they show the same devices.
          </li>
          <li>
            On each device, open GAP's <b>Settings › GAP Companion › Link to GAP Companion</b>. It shows a QR code and a
            short code.
          </li>
          <li>
            In Companion, tap <b>+</b> and scan the QR code or type the code. GAP says <b>Linked</b>, and the device
            appears in your list.
          </li>
          <li>Start the script. Stats, controls and the Companion-only features show up on their own.</li>
        </ol>
        <p style={{marginTop: 18, color: 'var(--ground-ink-soft)'}}>
          7 days free with every feature, no card. Then $15 a month for up to 3 linked devices, cancel any time. Android
          app and web dashboard; the iOS app is on the way. Details on the <a href={companionUrl}>GAP Companion page</a>.
          Questions? Ask in the <a href={discord}><DiscordMark />Discord</a>.
        </p>
        <div style={{display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 20}}>
          <Patch as="a" href={dashboardUrl} tone="marigold" className="fbtn">Start free trial</Patch>
          <Patch as={Link} to="/features" tone="jade" className="fbtn">What the script does</Patch>
        </div>
      </Patch>
    </FeltPage>
  );
}
