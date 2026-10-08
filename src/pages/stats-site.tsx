import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import FeltPage from '@site/src/components/felt/FeltPage';
import PageHead from '@site/src/components/felt/PageHead';
import Patch, {type Tone} from '@site/src/components/felt/Patch';
import DiscordMark from '@site/src/components/felt/DiscordMark';
import Media from '@site/src/components/felt/Media';
import landing from '@site/src/data/landing';

const statsRepo = 'https://github.com/TsumTsumScripts/tsum-stats';
const installCmd = `curl -fsSL https://raw.githubusercontent.com/TsumTsumScripts/tsum-stats/main/install.sh | sh`;

/** What the site does, one patch each. */
const parts: {title: string; tone: Tone; body: React.ReactNode}[] = [
  {
    title: 'Coin efficiency',
    tone: 'marigold',
    body: (
      <>
        Coins per second of play, per Tsum and overall, with averages, medians and the spread. Count base coins, final
        coins or medals, and tick <b>Less item costs</b> to take what each round's boost items cost off its coins.
      </>
    ),
  },
  {
    title: 'Charts and tables',
    tone: 'jade',
    body: (
      <>
        Coins per day, where the coins come from, results by hour and by items used, and a histogram of coins per round.
        A Tsums table with every figure per Tsum, and a table of every round. Filter by Tsum, device, dates, game build
        and outliers.
      </>
    ),
  },
  {
    title: 'Head to head',
    tone: 'rose',
    body: (
      <>
        Pick two or more Tsums to get a scorecard that marks the best in each row, and a line per Tsum per day. A quick
        way to settle which Tsum earns more for you.
      </>
    ),
  },
  {
    title: 'Catalog and cost to max',
    tone: 'periwinkle',
    body: (
      <>
        Every Tsum in the game, INTL or JP, with what your latest Tsum List says: owned, level, skill level and
        favourites. <b>Cost to max</b> totals the boxes still to buy and, at your recent pace, how many days that takes.
      </>
    ),
  },
  {
    title: 'Share a page',
    tone: 'grape',
    body: (
      <>
        Optional. <b>Share</b> publishes a read-only copy to your own GitHub Pages site. Device names are hidden by
        default, and you choose whether your collection goes on it. Nothing leaves your computer unless you do this.
      </>
    ),
  },
  {
    title: 'Themes',
    tone: 'surface',
    body: (
      <>
        Tsum Night, the default, plus Midnight and Daylight Felt in this site's look, and a few more. You can add your
        own as a small CSS file.
      </>
    ),
  },
];

export default function StatsSite(): React.JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  const discord = siteConfig.customFields!.discordUrl as string;
  return (
    <FeltPage title="Tsum Tsum Stats" description="A website on your own computer for your Tsum Tsum rounds and collection: coin efficiency, charts and a catalog of every Tsum.">
      <PageHead tone="periwinkle" kicker="Tsum Tsum Stats" title="Every round," accent="charted.">
        <p>
          Tsum Tsum Stats is a small program that turns the script's{' '}
          <Link to="/features/stats">round stats</Link> and <Link to="/features/tsumlist">Tsum List</Link> into a website
          on your own computer. See which Tsum earns the most coins per second, how your days compare, and what it will cost
          to max the rest of your collection. One download, no install, and your data stays on your computer.
        </p>
        <div style={{display: 'flex', gap: 16, flexWrap: 'wrap'}}>
          <Patch as="a" href={`${statsRepo}/releases/latest/download/tsum-stats.cmd`} tone="marigold" className="fbtn">Windows download</Patch>
          <Patch as="a" href={`${statsRepo}/releases/latest`} tone="jade" className="fbtn">All downloads</Patch>
          <Patch as="a" href={statsRepo} tone="surface" className="fbtn">Read the source</Patch>
        </div>
      </PageHead>

      <div className="felt-grid" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))'}}>
        {landing.statsShots.map((s, i) => (
          <Patch key={s.id} tone={(['periwinkle', 'rose', 'jade'] as Tone[])[i % 3]} radius="34px" inset={9} tilt={[-1.2, 1, -0.6][i % 3]} style={{padding: 18}}>
            <Media id={s.id} alt={s.alt} hint={s.capture} aspect="16 / 10" />
          </Patch>
        ))}
      </div>

      <Patch tone="surface" radius="34px" inset={8} style={{padding: '30px 32px', maxWidth: 820, ['--thread' as string]: '#6c6890'}}>
        <h2 style={{fontSize: 30, marginBottom: 14}}>What it needs</h2>
        <ul style={{lineHeight: 1.8, fontSize: 17, margin: 0, paddingLeft: 22}}>
          <li>A computer running Windows, macOS or Linux. The site runs there and opens in your browser.</li>
          <li>
            The Tsum script with <b>Record round stats</b> on, on the General tab. It is on by default; without it the
            script does not read the score screen, so there are no coins to chart.
          </li>
          <li>
            For the Catalog, a <Link to="/features/tsumlist">Tsum List export</Link> from the Chores tab.
          </li>
          <li>
            For live updates, the GAP app on an emulator on the same computer. A phone or another computer works too, with a
            setting explained in the program's Help.
          </li>
          <li>
            Nothing else. It finds <code>adb</code> on your computer, or fetches Google's own copy when there is none, to
            copy files off your devices.
          </li>
        </ul>
      </Patch>

      <div>
        <h2 style={{fontSize: 34, marginBottom: 22}}>What it does</h2>
        <div className="felt-grid" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))'}}>
          {parts.map((p, i) => (
            <Patch key={p.title} tone={p.tone} radius="30px" inset={7} tilt={[-0.8, 0.6, -0.4][i % 3]} style={{padding: '24px 26px', display: 'flex', flexDirection: 'column', gap: 10}}>
              <h3 style={{fontSize: 22}}>{p.title}</h3>
              <p style={{fontSize: 16, lineHeight: 1.6, margin: 0}}>{p.body}</p>
            </Patch>
          ))}
        </div>
      </div>

      <Patch tone="surface" radius="34px" inset={8} style={{padding: '30px 32px', maxWidth: 820, ['--thread' as string]: '#6c6890'}}>
        <h2 style={{fontSize: 30, marginBottom: 14}}>Get started</h2>
        <ol style={{lineHeight: 1.8, fontSize: 17, margin: 0, paddingLeft: 22}}>
          <li>
            <b>Windows:</b> download <code>tsum-stats.cmd</code> and double-click it. It is a short text file you can read
            first; if Windows asks, choose Run (or More info, then Run anyway).
          </li>
          <li>
            <b>macOS and Linux:</b> paste this into a terminal. It downloads the right file, checks it and starts it.
            <pre style={{margin: '10px 0', padding: '10px 14px', borderRadius: 10, background: 'rgba(0,0,0,.28)', color: 'var(--ink)', whiteSpace: 'pre-wrap', wordBreak: 'break-all'}}>
              <code style={{background: 'none', padding: 0}}>{installCmd}</code>
            </pre>
            Next time, run <code>tsum-stats</code>.
          </li>
          <li>
            It opens in your browser at <code>http://127.0.0.1:8090</code>. Keep its window open; Ctrl+C there stops it.
            Already using the <Link to="/starter">starter tool</Link>? It runs Tsum Tsum Stats for you, and each page links
            to the other.
          </li>
          <li>
            Open <b>Help</b> and connect the GAP app: copy the address it shows, paste it into the app's{' '}
            <b>Settings › Script events</b>, and tap <b>Apply</b>. Each round now appears as it finishes.
          </li>
          <li>
            Bring in older rounds with <b>Help › Import from devices</b>, or drop <code>stats_*.csv</code> files on the page.
            MuMu Player's shared folder is read by itself. A round already recorded live is updated, not counted twice.
          </li>
          <li>Run a Tsum List export, then import it the same way to fill in the Catalog.</li>
        </ol>
        <p style={{marginTop: 18, color: 'var(--ground-ink-soft)'}}>
          It keeps itself up to date, checking each new version before replacing itself. Questions? Ask in the{' '}
          <a href={discord}><DiscordMark />Discord</a>.
        </p>
      </Patch>
    </FeltPage>
  );
}
