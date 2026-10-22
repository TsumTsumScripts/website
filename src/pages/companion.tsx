import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import FeltPage from '@site/src/components/felt/FeltPage';
import PageHead from '@site/src/components/felt/PageHead';
import Patch, {Kicker, type Tone} from '@site/src/components/felt/Patch';
import DiscordMark from '@site/src/components/felt/DiscordMark';
import Media from '@site/src/components/felt/Media';
import landing from '@site/src/data/landing';


const shots = landing.companionShots;
const videos = landing.companionVideos;

/** What only Companion does, one patch each. */
const exclusives: {title: string; tone: Tone; body: React.ReactNode}[] = [
  {
    title: 'Change My Tsum',
    tone: 'rose',
    body: <>Switch the Tsum a device plays without leaving your seat, or have a workflow switch it between loops. No walking over, no scrolling through your collection.</>,
  },
  {
    title: 'Workflows',
    tone: 'jade',
    body: <>Combine restarts, Tsum changes, skills and rounds into a routine that each device follows on its own, even while your phone is off.</>,
  },
  {
    title: 'Presets on every device',
    tone: 'marigold',
    body: <>Save a set of settings once and apply it to one device or all of them. Settings the preset doesn't include stay as they are.</>,
  },
  {
    title: 'Your balance after every round',
    tone: 'periwinkle',
    body: <>Your medals, coins, rubies and hearts, checked after every round and shown on the device's Stats tab.</>,
  },
  {
    title: 'Help when it gets stuck',
    tone: 'grape',
    body: (
      <>
        When the script reaches a screen it doesn't recognize, you get a screenshot of it. Tap or drag on the screenshot
        to show what to do, then tap Continue. If nobody answers within 10 minutes, the script handles the screen as usual.
      </>
    ),
  },
  {
    title: 'Alerts on your phone',
    tone: 'surface',
    body: <>Get notified when a device goes offline, a run stops, a chore finishes or a workflow ends. Choose which alerts you want.</>,
  },
];

/** The free script next to the script with Companion. */
const compare: {what: string; free: string; companion: string}[] = [
  {what: 'Auto-play, skills, bubbles, chores', free: 'Yes', companion: 'Yes'},
  {what: 'Settings and presets', free: 'On the device', companion: 'From your phone or browser, on every device at once'},
  {what: 'Round stats', free: 'A file on the device', companion: 'Live totals, a coins chart and recent rounds'},
  {what: 'Balance (medals, coins, rubies, hearts)', free: 'No', companion: 'Checked after every round'},
  {what: 'Start, pause and stop', free: 'From the Quick Bar on the device', companion: 'Any device, or all of them at once'},
  {what: 'Change My Tsum', free: 'No', companion: 'One tap, or automatically in a workflow'},
  {what: 'Workflows', free: 'No', companion: 'Yes'},
  {what: 'Alerts on your phone', free: 'No', companion: 'Yes'},
  {what: 'Help on screens the script doesn\'t recognize', free: 'No', companion: 'Yes'},
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
      <Patch tone={tone} radius="36px" inset={6} style={{width: 'min(100%, 300px)', padding: 12}}>
        <Media id={video.id} alt={`How to: ${video.note}`} hint={video.brief} aspect="9 / 16" poster />
      </Patch>
      <figcaption style={{fontSize: 15, color: 'var(--ground-ink-soft)', textAlign: 'center'}}>How to: {video.note}</figcaption>
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
      <PageHead tone="jade" kicker="GAP Companion · Coming soon" title="Run every device from" accent="your pocket.">
        <p>
          GAP Companion is a phone app and web dashboard for every device running the Tsum Tsum script. See which ones
          are playing and how many coins each round earned, and change settings without walking over to the device. Make
          a preset once and apply it everywhere, switch Tsums from the couch, and leave a workflow running overnight.
        </p>
        <p style={{marginTop: 12}}>
          <b>Coming soon.</b> GAP Companion isn't available to everyone yet. The script and GAP will stay free;
          Companion will be a paid add-on, with pricing announced at launch.
        </p>
        <div style={{display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 8}}>
          <Patch as="a" href={discord} tone="grape" className="fbtn"><DiscordMark />Hear when it launches</Patch>
          <Patch as={Link} to="/guides/companion/connect" tone="jade" className="fbtn">How to connect</Patch>
        </div>
      </PageHead>

      <section id="only" style={{display: 'flex', flexDirection: 'column', gap: 28}}>
        <Heading tone="grape" kicker="Highlights" title="Only with Companion" />
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
          See all your phones, tablets and emulators in one list, each showing what it's doing right now: "Playing
          Mickey Mouse · Round 12", "Sending hearts", "Round 31: 1,855 coins". Filter the list by Active, Idle or
          Offline.
        </p>
        <ul style={{margin: 0, paddingLeft: 22}}>
          <li>Pause, resume or stop a device, or use <b>Stop after round</b> to let the current round finish first.</li>
          <li>Long-press to select several devices and control them all at once.</li>
          <li>See each device's speed, with a warning when it's slower than it was after its last restart.</li>
          <li><b>Restart when slow</b> restarts a slow device for you, with a cooldown and a daily limit.</li>
          <li>On the web dashboard, switch to a sortable table and see rounds and coins totalled across all devices.</li>
        </ul>
      </Feature>

      <Feature
        id="stats"
        tone="periwinkle"
        kicker="Stats"
        title="Stats the moment a round ends"
        only
        media={
          <>
            <Desk shot={shots.stats} tone="periwinkle" tilt={0.5} />
            <Phone shot={shots.device} tone="rose" tilt={-1} />
          </>
        }>
        <p>Each device's Stats tab updates as soon as a round ends. No copying files, no spreadsheets.</p>
        <ul style={{margin: 0, paddingLeft: 22}}>
          <li><b>Totals</b>: rounds, coins earned, medals, best round and average coins since you last reset them. Still there when the device is offline.</li>
          <li><b>This run</b>: rounds played, run time, average round length, and average coins before and after bonuses.</li>
          <li><b>Coins per round</b>: a chart of the last 20 rounds, with coins before and after bonuses side by side.</li>
          <li><b>Recent rounds</b>: the last 10 rounds, with each one's length, base coins and total coins.</li>
          <li><b>My Tsum</b>: which Tsum is playing, with a <b>Change My Tsum</b> button right below.</li>
        </ul>
        <p>
          For long-term charts on your own computer, <Link to="/stats-site">Tsum Tsum Stats</Link> uses the same round data.
        </p>
      </Feature>

      <section id="currency">
        <Patch tone="marigold" radius="48px 120px 56px 140px" inset={11} style={{padding: 'clamp(30px, 5vw, 56px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 32, alignItems: 'start'}}>
          <div style={{display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-start'}}>
            <div style={{display: 'flex', gap: 10, flexWrap: 'wrap'}}>
              <span className="kicker kicker--surface">Currency</span>
              <OnlyBadge />
            </div>
            <h2 style={{fontSize: 38}}>Know your balance</h2>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', gap: 14, fontSize: 17, lineHeight: 1.65}}>
            <p>
              After every round, the device checks your <b>medals</b>, <b>coins</b>, <b>rubies</b> and <b>hearts</b>.
              The Stats tab shows them in a Currency card, along with when they were last checked.
            </p>
            <p>
              See whether you can afford a box or a new Tsum without opening the game. Each day's balances are also
              saved to a file on the device.
            </p>
          </div>
        </Patch>
      </section>

      <Feature
        id="settings"
        tone="rose"
        kicker="Settings"
        title="Change settings without touching the device"
        only
        media={<Desk shot={shots.settings} tone="rose" tilt={-0.5} />}>
        <p>
          The Settings tab has the same settings as the script, in the same groups. Flip a switch, change a number or
          pick a skill, and the change reaches the device right away.
        </p>
        <ul style={{margin: 0, paddingLeft: 22}}>
          <li>A label shows each change's progress: Pending, Syncing, then Synced.</li>
          <li>Changes to round settings take effect from the next round, just like with the Quick Bar.</li>
          <li>On an idle device, <b>Load settings</b> lets you change its settings before you press Start.</li>
          <li><b>Last run settings</b> shows what the device's last run started with.</li>
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
          The script already lets you save presets on each device. Companion stores them in your account instead, so every
          device running the Tsum script shares the same list.
        </p>
        <ul style={{margin: 0, paddingLeft: 22}}>
          <li>Include only the settings you want to change. Everything else stays as it is on each device.</li>
          <li>Apply a preset to one device from its Settings tab, or to several selected devices at once.</li>
          <li>See whether it worked on each device: Applied, Offline, or Runs another script.</li>
          <li><b>Import</b> copies presets you've already saved on a device into your account.</li>
          <li>Workflows can switch presets between loops.</li>
        </ul>
      </Feature>

      <Feature
        id="workflows"
        tone="grape"
        kicker="Workflows"
        title="Routines that run themselves"
        only
        media={
          <>
            <Desk shot={shots.workflow} tone="grape" tilt={0.5} />
            <Desk shot={shots.assign} tone="surface" tilt={-0.8} />
            <Howto video={videos.workflow} tone="rose" />
          </>
        }>
        <p>
          Build a list of steps, assign it to your devices and press Start. Each device keeps its own copy, so it carries
          on even when your phone is off.
        </p>
        <ul style={{margin: 0, paddingLeft: 22}}>
          <li><b>Select Tsum</b>: play a different Tsum on each loop, and on each device. Copy one device's choices to the others.</li>
          <li><b>Skill</b>: use a skill or one of your presets, and change it from loop to loop.</li>
          <li>Other steps: <b>Play rounds</b>, <b>Send hearts</b>, <b>Receive hearts</b>, <b>Restart app</b>, <b>Restart device</b> and <b>Restart if slow</b>.</li>
          <li><b>Loop</b> repeats the steps a set number of times, or forever. <b>Stop</b> ends the workflow.</li>
          <li>Before you save, warnings point out steps that will never run, settings left empty, and devices that can't run the workflow.</li>
          <li>Each device card shows its progress, for example "Loop 2 · Step 4 of 5 · Play rounds · 4/10 rounds".</li>
        </ul>
        <p>
          Every step explained, with four ready-made workflows to copy:{' '}
          <Link to="/guides/companion/workflows">Workflows, step by step</Link>.
        </p>
      </Feature>

      <section id="compare" style={{display: 'flex', flexDirection: 'column', gap: 28}}>
        <Heading tone="periwinkle" kicker="Compare" title="The free script vs. the script with Companion" />
        <Patch tone="surface" radius="34px" inset={8} style={{padding: 'clamp(16px, 3vw, 28px)', ['--thread' as string]: '#6c6890', overflowX: 'auto'}}>
          <table className="felt-table" style={{display: 'table', width: '100%', borderCollapse: 'collapse', fontSize: 16, lineHeight: 1.5}}>
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
            Set up GAP and the script as usual with the <Link to="/starter">starter tool</Link>. Companion works alongside
            them; it doesn't play the game itself.
          </li>
          <li>
            Once Companion opens, sign in with Google, Discord or your email. Use the Android app or the web dashboard:
            they show the same devices.
          </li>
          <li>
            On each device, open GAP's <b>Settings › GAP Companion › Link to GAP Companion</b>. It shows a QR code and a
            short code.
          </li>
          <li>
            In Companion, tap <b>+</b> and scan the QR code or type in the code. GAP confirms it's linked, and the
            device appears in your list.
          </li>
          <li>Start the script. Its stats, controls and Companion-only features appear automatically.</li>
        </ol>
        <p style={{marginTop: 18}}>
          For screenshots of each step, and help if a device won't link, see{' '}
          <Link to="/guides/companion/connect">Connect GAP to GAP Companion</Link>.
        </p>
        <p style={{marginTop: 18, color: 'var(--ground-ink-soft)'}}>
          GAP Companion is coming soon as an Android app and a web dashboard, with iOS to follow. Pricing will be
          announced at launch. For launch news or questions, join the <a href={discord}><DiscordMark />Discord</a>.
        </p>
        <div style={{display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 20}}>
          <Patch as="a" href={discord} tone="grape" className="fbtn"><DiscordMark />Hear when it launches</Patch>
          <Patch as={Link} to="/features" tone="jade" className="fbtn">What the script does</Patch>
        </div>
      </Patch>
    </FeltPage>
  );
}
