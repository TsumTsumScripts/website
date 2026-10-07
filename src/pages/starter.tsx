import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import FeltPage from '@site/src/components/felt/FeltPage';
import Patch from '@site/src/components/felt/Patch';
import Media from '@site/src/components/felt/Media';
import landing from '@site/src/data/landing';

export default function Starter(): React.JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  const repo = siteConfig.customFields!.repoUrl as string;
  const discord = siteConfig.customFields!.discordUrl as string;
  return (
    <FeltPage title="Starter tool" description="A small menu-driven tool that starts the GAP service on your phone or emulator.">
      <div style={{display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-start', maxWidth: 760}}>
        <span className="kicker patch--jade" style={{background: 'var(--jade-fill)', color: 'var(--jade-ink)'}}>Starter tool</span>
        <h1 style={{fontSize: 'clamp(40px, 5.6vw, 60px)'}}>Start the service in a few taps.</h1>
        <p style={{fontSize: 18, lineHeight: 1.6, color: 'var(--ground-ink-soft)'}}>
          GAP needs a helper service on the phone or emulator. Android only lets a computer start it, and it stops when
          the device restarts. The starter tool is a small numbered menu that does it, and can also install the app and
          copy your round stats and Tsum list off the device. Rooted emulators do not need it.
        </p>
        <div style={{display: 'flex', gap: 16, flexWrap: 'wrap'}}>
          <Patch as="a" href={`${repo}/releases/latest`} tone="marigold" className="fbtn">Download</Patch>
          <Patch as="a" href={`${repo}/tree/main/starter`} tone="surface" className="fbtn">Read the source</Patch>
        </div>
      </div>

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
          <li>The first time, let it fetch Google's <code>adb</code> (about 8 to 16 MB, checked against a recorded checksum). Nothing else is installed.</li>
          <li>Pick your device, then choose <b>Start service</b>. It remembers the device next time.</li>
          <li>Open GAP, add the Tsum Tsum script from the Library, and press Play.</li>
        </ol>
        <p style={{marginTop: 18, color: 'var(--ground-ink-soft)'}}>
          Stuck? Ask in the <a href={discord}>Discord</a>.
        </p>
      </Patch>
    </FeltPage>
  );
}
