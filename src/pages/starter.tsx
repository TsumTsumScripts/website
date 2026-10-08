import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import FeltPage from '@site/src/components/felt/FeltPage';
import PageHead from '@site/src/components/felt/PageHead';
import Patch from '@site/src/components/felt/Patch';
import DiscordMark from '@site/src/components/felt/DiscordMark';
import Media from '@site/src/components/felt/Media';
import landing from '@site/src/data/landing';

export default function Starter(): React.JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  const repo = siteConfig.customFields!.repoUrl as string;
  const discord = siteConfig.customFields!.discordUrl as string;
  return (
    <FeltPage title="Starter tool" description="A small tool that opens in your browser and starts the GAP service on your phone or emulator.">
      <PageHead tone="jade" kicker="Starter tool" title="Start the service" accent="in one click.">
        <p>
          GAP needs a helper service on the phone or emulator. Android only lets a computer start it, and it stops when
          the device restarts. The starter tool opens a page in your browser: pick your device and press Start service. The
          same page installs the app, exports your logs and round stats as one zip, clears them off the device, and runs
          Tsum Tsum Stats beside it. Rooted devices start the service themselves.
        </p>
        <div style={{display: 'flex', gap: 16, flexWrap: 'wrap'}}>
          <Patch as="a" href={`${repo}/releases/latest`} tone="marigold" className="fbtn">Download</Patch>
          <Patch as="a" href={`${repo}/tree/main/starter`} tone="surface" className="fbtn">Read the source</Patch>
        </div>
      </PageHead>

      <div className="felt-grid" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))'}}>
        {landing.starterShots.map((s, i) => (
          <Patch key={s.id} tone={i ? 'rose' : 'periwinkle'} radius="34px" inset={9} tilt={i ? 1.2 : -1.2} style={{padding: 18}}>
            <Media id={s.id} alt={s.alt} hint={s.capture} aspect="16 / 10" />
          </Patch>
        ))}
      </div>

      <Patch tone="surface" radius="34px" inset={8} style={{padding: '30px 32px', maxWidth: 820, ['--thread' as string]: '#6c6890'}}>
        <h2 style={{fontSize: 30, marginBottom: 14}}>How to use it</h2>
        <ol style={{lineHeight: 1.8, fontSize: 17, margin: 0, paddingLeft: 22}}>
          <li>Extract the download. On a Mac use the <code>.tar.gz</code> and run it from Terminal.</li>
          <li>Run <b>Start-Windows</b>, or <b>Start-Linux</b> on macOS and Linux.</li>
          <li>The first time, let it fetch the page's program and Google's <code>adb</code>, each checked against a recorded checksum. Nothing is installed.</li>
          <li>A page opens in your browser. Keep the terminal window open while you use it: closing it stops the page.</li>
          <li>Pick your device and press <b>Start service</b>. It stays chosen next time.</li>
          <li>No app yet? Press <b>Download &amp; install the latest APK</b>, then tap <b>Add</b> when GAP offers the Tsum Tsum library.</li>
          <li>Open GAP, add the Tsum Tsum script from the Library, and press Play.</li>
        </ol>
        <p style={{marginTop: 18, color: 'var(--ground-ink-soft)'}}>
          Stuck? Press <b>Export logs &amp; stats</b> and share the zip in the <a href={discord}><DiscordMark />Discord</a>.
        </p>
      </Patch>
    </FeltPage>
  );
}
