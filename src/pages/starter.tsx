import React, {useEffect, useRef, useState} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import FeltPage from '@site/src/components/felt/FeltPage';
import PageHead from '@site/src/components/felt/PageHead';
import Patch, {Kicker} from '@site/src/components/felt/Patch';
import DiscordMark from '@site/src/components/felt/DiscordMark';
import Media from '@site/src/components/felt/Media';
import BestSetup from '@site/src/components/felt/BestSetup';
import landing from '@site/src/data/landing';

type Os = 'windows' | 'mac' | 'linux';
const osTabs: {id: Os; label: string}[] = [
  {id: 'windows', label: 'Windows'},
  {id: 'mac', label: 'macOS'},
  {id: 'linux', label: 'Linux'},
];

/** The release assets; every release in the repository is a starter release, so latest/download always has them. */
const zipName = 'TsumTsum-Starter.zip';
const tgzName = 'TsumTsum-Starter.tar.gz';
const pageUrl = 'http://127.0.0.1:8090/starter/';
const readmeUrl = (repo: string) => `${repo}/blob/main/starter/README.txt`;

function detectOs(): Os {
  const ua = navigator.userAgent;
  if (/Mac/.test(ua) && !/iPhone|iPad/.test(ua)) return 'mac';
  if (/Linux|X11|CrOS/.test(ua) && !/Android/.test(ua)) return 'linux';
  return 'windows';
}

/** A command to type or paste into a terminal, with a Copy button. */
function Cmd({children}: {children: string}): React.JSX.Element {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const copy = () => {
    navigator.clipboard?.writeText(children).then(() => {
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1600);
    }, () => {});
  };
  return (
    <div className="st-cmd">
      <pre><code>{children}</code></pre>
      <button type="button" className="st-copy" onClick={copy} aria-label="Copy the command">
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
}

function Step({n, title, children}: {n: number | string; title: string; children: React.ReactNode}): React.JSX.Element {
  return (
    <Patch tone="surface" radius="30px" inset={7} className="st-step" style={{['--thread' as string]: '#6c6890'}}>
      <h3 className="st-step__title">
        <span className="st-num" aria-hidden="true">{n}</span>
        {title}
      </h3>
      {children}
    </Patch>
  );
}

function Faq({title, children}: {title: string; children: React.ReactNode}): React.JSX.Element {
  return (
    <details className="st-faq">
      <summary>{title}</summary>
      <div className="st-faq__body">{children}</div>
    </details>
  );
}

function WindowsSteps(): React.JSX.Element {
  return (
    <>
      <Step n={2} title="Download">
        <p>
          Get <b>{zipName}</b> with the Windows button above. It lands in your <b>Downloads</b> folder. If the browser says the
          file is uncommon or may be harmful, see <a href="#antivirus">Antivirus and download warnings</a> below.
        </p>
      </Step>
      <Step n={3} title="Extract it">
        <ol>
          <li>Open <b>File Explorer</b> and go to <b>Downloads</b>.</li>
          <li>
            Right-click <b>{zipName}</b> and choose <b>Extract All…</b>, then <b>Extract</b>. (With 7-Zip or WinRAR, choose
            "Extract to TsumTsum-Starter\".)
          </li>
          <li>
            Open the new <b>TsumTsum-Starter</b> folder. If it holds another folder of the same name, open that one too,
            until you see <b>Start-Windows</b>, <b>README</b> and a <b>bin</b> folder.
          </li>
        </ol>
        <p className="st-note">
          Do not double-click into the zip and run Start-Windows from there. Windows then runs it on its own, without the
          files beside it, and the window closes straight away.
        </p>
        <p className="st-note">
          Keep the folder somewhere you will find again, such as <b>Documents</b>: you run it again every time the device
          restarts, and it updates itself, so you never need to download it again.
        </p>
      </Step>
      <Step n={4} title="Run Start-Windows">
        <ol>
          <li>
            Double-click <b>Start-Windows</b>. Windows may show it as <b>Start-Windows.cmd</b>, with the type "Windows
            Command Script".
          </li>
          <li>
            If a blue <b>Windows protected your PC</b> box appears, click <b>More info</b>, then <b>Run anyway</b>. It is a short
            text file, so you can open it in Notepad and read it first.
          </li>
          <li>
            A black console window opens. The first time, it asks to download the page's program, tsum-stats (about
            25 MB). Press <b>Enter</b> to say yes.
          </li>
          <li>
            Your browser opens the starter page at <code>{pageUrl}</code>. The first time, the page offers to download
            Google's <code>adb</code> (8 to 16 MB): accept it.
          </li>
        </ol>
        <p className="st-note">
          Leave the console window open while you use the page. Closing it, or pressing Ctrl+C in it, stops the page.
        </p>
      </Step>
    </>
  );
}

function MacSteps(): React.JSX.Element {
  return (
    <>
      <Step n={2} title="Download">
        <p>
          Get <b>{tgzName}</b> with the macOS button above, not the .zip: macOS blocks programs that come out of a downloaded
          zip, and files unpacked from the .tar.gz are never blocked. It lands in <b>Downloads</b>. Safari may unpack it
          for you into a <b>TsumTsum-Starter</b> folder; that is fine.
        </p>
      </Step>
      <Step n={3} title="Open Terminal and extract it">
        <p>
          There is no separate macOS file: you run <b>Start-Linux</b>, from Terminal. Double-clicking it in Finder only opens
          it in a text editor.
        </p>
        <ol>
          <li>
            Open <b>Terminal</b>: press <b>⌘ Space</b>, type <b>Terminal</b> and press <b>Return</b>.
          </li>
          <li>
            Paste these lines and press <b>Return</b>. Skip the <code>tar</code> line if Safari already made the
            TsumTsum-Starter folder.
            <Cmd>{`cd ~/Downloads\ntar -xzf ${tgzName}\ncd TsumTsum-Starter`}</Cmd>
          </li>
          <li>
            If macOS asks whether Terminal may access files in your Downloads folder, click <b>OK</b>.
          </li>
        </ol>
      </Step>
      <Step n={4} title="Run Start-Linux">
        <ol>
          <li>
            In the same Terminal window, run:
            <Cmd>./Start-Linux.sh</Cmd>
          </li>
          <li>
            The first time, it asks to download the page's program, tsum-stats (about 25 MB). Press <b>Return</b> to say
            yes.
          </li>
          <li>
            Your browser opens the starter page at <code>{pageUrl}</code>. The first time, the page offers to download
            Google's <code>adb</code> (8 to 16 MB): accept it.
          </li>
        </ol>
        <p className="st-note">
          Leave Terminal open while you use the page. Closing it, or pressing Ctrl+C in it, stops the page.
        </p>
        <p className="st-note">
          Next time, a quicker way: open Terminal, drag <b>Start-Linux.sh</b> from Finder onto the Terminal window and
          press <b>Return</b>.
        </p>
      </Step>
    </>
  );
}

function LinuxSteps(): React.JSX.Element {
  return (
    <>
      <Step n={2} title="Download">
        <p>
          Get <b>{tgzName}</b> with the Linux button above. The tool uses <code>curl</code> or <code>wget</code> for its own
          downloads, and <code>unzip</code>, <code>bsdtar</code> or <code>python3</code> to unpack adb; most systems have
          them already.
        </p>
      </Step>
      <Step n={3} title="Extract it">
        <p>Open a terminal and extract it into your home folder:</p>
        <Cmd>{`tar -xzf ~/Downloads/${tgzName} -C ~\ncd ~/TsumTsum-Starter`}</Cmd>
      </Step>
      <Step n={4} title="Run Start-Linux">
        <ol>
          <li>
            In the same terminal, run:
            <Cmd>./Start-Linux.sh</Cmd>
          </li>
          <li>
            The first time, it asks to download the page's program, tsum-stats (about 25 MB). Press <b>Enter</b> to say yes.
          </li>
          <li>
            Your browser opens the starter page at <code>{pageUrl}</code>. The first time, the page offers to download
            Google's <code>adb</code> (8 to 16 MB): accept it.
          </li>
        </ol>
        <p className="st-note">
          Keep the terminal open while you use the page; closing it stops the page. Run it from a terminal rather than
          by double-clicking in a file manager. On ARM Linux, such as a Raspberry Pi, Google has no adb: install your
          distribution's (<code>sudo apt install adb</code>) and set <code>GAP_ADB</code> to its full path.
        </p>
      </Step>
    </>
  );
}

export default function Starter(): React.JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  const repo = siteConfig.customFields!.repoUrl as string;
  const discord = siteConfig.customFields!.discordUrl as string;
  const download = `${repo}/releases/latest/download`;
  const [os, setOs] = useState<Os>('windows');
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  useEffect(() => setOs(detectOs()), []);
  const onTabKey = (e: React.KeyboardEvent, i: number) => {
    const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (i + dir + osTabs.length) % osTabs.length;
    setOs(osTabs[next].id);
    tabRefs.current[next]?.focus();
  };
  const runName = os === 'windows' ? 'Start-Windows' : 'Start-Linux';

  return (
    <FeltPage title="Starter tool" description="A small tool that opens in your browser and starts the GAP service on your phone or emulator.">
      <PageHead tone="jade" kicker="Starter tool" title="Start the service" accent="in one click.">
        <p>
          GAP needs a helper service on the phone or emulator. Android only lets a computer start it, and it stops when
          the device restarts. The starter tool opens a page in your browser: pick your device and press Start service. The
          same page installs the app, exports your logs and round stats as one zip, clears them off the device, and runs
          {' '}<Link to="/stats-site">Tsum Tsum Stats</Link> beside it. Rooted devices start the service themselves.
        </p>
        <div style={{display: 'flex', gap: 16, flexWrap: 'wrap'}}>
          <Patch as="a" href={`${download}/${zipName}`} tone="marigold" className="fbtn">Download for Windows</Patch>
          <Patch as="a" href={`${download}/${tgzName}`} tone="marigold" className="fbtn">Download for macOS or Linux</Patch>
          <Patch as="a" href={`${repo}/tree/main/starter`} tone="surface" className="fbtn">Read the source</Patch>
        </div>
        <p style={{fontSize: 15, marginTop: 6}}>
          Windows gets the <code>.zip</code>, macOS and Linux the <code>.tar.gz</code>. Both are under 100 KB of plain-text
          scripts. Every version is on the <a href={`${repo}/releases`}>releases page</a>.
        </p>
      </PageHead>

      <BestSetup />

      <div className="felt-grid" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))'}}>
        {landing.starterShots.map((s, i) => (
          <Patch key={s.id} tone={i ? 'rose' : 'periwinkle'} radius="34px" inset={9} tilt={i ? 1.2 : -1.2} style={{padding: 18}}>
            <Media id={s.id} alt={s.alt} hint={s.capture} aspect="16 / 10" />
          </Patch>
        ))}
      </div>

      <section className="st-guide" aria-labelledby="setup">
        <div className="st-intro">
          <h2 id="setup">Set it up, step by step</h2>
          <p>
            About five minutes the first time. After that, it is one double-click (or one command) each time the device
            restarts.
          </p>
        </div>

        <Step n={1} title="Before you start">
          <ul>
            <li>A computer running Windows 10 or 11, macOS, or Linux, with an internet connection for the first run.</li>
            <li>
              Your emulator started (MuMu, LDPlayer, Nox and MEmu are found by themselves), or your phone plugged in by USB
              with USB debugging on: <b>Settings › About phone</b>, tap <b>Build number</b> seven times, then{' '}
              <b>Settings › Developer options › USB debugging</b>.
            </li>
            <li>Nothing is installed on your computer: the tool lives in its own folder, and deleting that folder removes it.</li>
          </ul>
        </Step>

        <div className="st-tabs-row">
          <span className="st-tabs-label" id="os-label">Your computer:</span>
          <div role="tablist" aria-labelledby="os-label" className="st-tabs">
            {osTabs.map((t, i) => (
              <button
                key={t.id}
                ref={(el) => { tabRefs.current[i] = el; }}
                type="button"
                role="tab"
                id={`os-tab-${t.id}`}
                aria-selected={os === t.id}
                aria-controls="os-panel"
                tabIndex={os === t.id ? 0 : -1}
                className={'fg-tab' + (os === t.id ? ' fg-tab--on' : '')}
                onKeyDown={(e) => onTabKey(e, i)}
                onClick={() => setOs(t.id)}>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div role="tabpanel" id="os-panel" aria-labelledby={`os-tab-${os}`} className="st-panel">
          {os === 'windows' ? <WindowsSteps /> : os === 'mac' ? <MacSteps /> : <LinuxSteps />}
        </div>

        <Step n={5} title="Start the service">
          <ol>
            <li>
              The page lists every device adb can see. A phone shows as <b>unauthorized</b> until you tap <b>Allow</b> on the
              "Allow USB debugging?" prompt on its screen; then press <b>Refresh</b>.
            </li>
            <li>Click your device. It stays chosen next time.</li>
            <li>Press <b>Start service</b>. After a few seconds it says the service is running.</li>
          </ol>
        </Step>

        <Step n={6} title="Install the app and the script">
          <ol>
            <li>
              No GAP app yet? Press <b>Download &amp; install the latest APK</b>. It picks the build for your device's
              processor.
            </li>
            <li>GAP opens on the device and offers to add the Tsum Tsum library to its Sources: tap <b>Add</b>.</li>
            <li>In GAP, add the Tsum Tsum script from the <b>Library</b>, and press <b>Play</b>.</li>
          </ol>
        </Step>

        <Step n="↻" title="Every time after">
          <p>
            The service stops whenever the device restarts. Start the emulator, run <b>{runName}</b> again, and press{' '}
            <b>Start service</b>; your device is already chosen. Reinstalling the app does not stop it. A rooted emulator or
            phone starts the service from inside the app, so it needs none of this.
          </p>
          {os === 'windows' && (
            <p className="st-note">
              For a desktop shortcut, right-click Start-Windows and choose <b>Show more options › Send to › Desktop (create
              shortcut)</b>.
            </p>
          )}
          <p className="st-note">
            The tool updates itself: the page's <b>Updates</b> section checks every few hours, and <b>Update the starter</b>{' '}
            keeps your adb, app downloads and chosen device.
          </p>
        </Step>
      </section>

      <section className="st-guide" aria-labelledby="trouble">
        <div className="st-intro">
          <h2 id="trouble">If something goes wrong</h2>
          <p>
            Click a problem to open it. The starter's{' '}
            <a href={readmeUrl(repo)}>README</a> covers every message it prints.
          </p>
        </div>

        <Patch tone="surface" radius="30px" inset={7} className="st-step" id="antivirus" style={{['--thread' as string]: '#6c6890'}}>
          <Kicker tone="marigold">Most common</Kicker>
          <h3 className="st-step__title">Antivirus and download warnings</h3>
          <p>
            The starter is a handful of open-source scripts that download two programs and talk to your device over adb.
            Antivirus software sometimes flags that pattern, and the downloaded <code>tsum-stats</code> program is new and
            unsigned, so reputation checks have not seen it before. Every download is checked against a recorded checksum,
            and you can <a href={`${repo}/tree/main/starter`}>read all of the source</a>. Do not turn your antivirus off;
            allow just this folder.
          </p>
          <div className="st-faqs">
            <Faq title="The browser blocks the download">
              <ul>
                <li>
                  <b>Chrome</b>: open the downloads list (the arrow at the top right), and on the file choose <b>Keep</b>, and
                  confirm if Chrome asks again.
                </li>
                <li>
                  <b>Edge</b>: open Downloads, hover the file, click <b>…</b> then <b>Keep</b>, then <b>Show more</b> and{' '}
                  <b>Keep anyway</b>.
                </li>
                <li><b>Firefox</b>: in the downloads panel, right-click the file and choose <b>Allow download</b>.</li>
              </ul>
            </Faq>
            <Faq title={'"Windows protected your PC" (SmartScreen)'}>
              <p>
                Click <b>More info</b>, then <b>Run anyway</b>. It asks once for each new version of the file.
              </p>
            </Faq>
            <Faq title="Windows Security (Defender) removed or blocked a file">
              <ol>
                <li>Open <b>Windows Security</b> from the Start menu, then <b>Virus &amp; threat protection</b>.</li>
                <li>
                  Click <b>Protection history</b>, open the entry for the TsumTsum-Starter file, and choose{' '}
                  <b>Actions › Restore</b> (or <b>Allow on device</b>).
                </li>
                <li>
                  So it does not happen again: back in Virus &amp; threat protection, <b>Manage settings › Exclusions › Add or
                  remove exclusions › Add an exclusion › Folder</b>, and pick your TsumTsum-Starter folder. Only that folder.
                </li>
                <li>
                  Run Start-Windows again. If a file is still missing, extract the zip again over the same folder; the
                  tsum-stats program and adb are fetched again by themselves.
                </li>
              </ol>
            </Faq>
            <Faq title="Avast, AVG, Norton, McAfee, Bitdefender, Kaspersky or another antivirus">
              <p>
                The same two steps, under that program's own names: find the file in its <b>Quarantine</b> (Avast and AVG call
                it the <b>Virus Chest</b>) and restore it, then add the TsumTsum-Starter folder to its <b>Exceptions</b> or{' '}
                <b>Exclusions</b>. Then run the starter again.
              </p>
            </Faq>
          </div>
        </Patch>

        <Patch tone="surface" radius="30px" inset={7} className="st-step" style={{['--thread' as string]: '#6c6890'}}>
          <h3 className="st-step__title">Starting it</h3>
          <div className="st-faqs">
            <Faq title="Windows: the window flashes and closes, or nothing happens">
              <ul>
                <li>
                  Most often the zip was not extracted. Close it, right-click the zip, <b>Extract All…</b>, and run
                  Start-Windows from the extracted folder.
                </li>
                <li>
                  To see the message: in the TsumTsum-Starter folder, click the address bar, type <code>cmd</code> and press{' '}
                  <b>Enter</b>. In the window that opens, type <code>Start-Windows.cmd</code> and press <b>Enter</b>. The
                  window stays open, so you can copy the error into the <a href={discord}><DiscordMark />Discord</a>.
                </li>
                <li>
                  A work computer that locks PowerShell down may not run it at all. The README's{' '}
                  <a href={readmeUrl(repo)}>"Doing it by hand"</a> section has the two adb commands it boils down to.
                </li>
              </ul>
            </Faq>
            <Faq title="macOS: double-clicking Start-Linux.sh opens a text editor">
              <p>Expected: macOS opens .sh files in an editor. Run it from Terminal, as in step 4 above.</p>
            </Faq>
            <Faq title={'macOS or Linux: "No such file or directory"'}>
              <p>
                Terminal is not in the folder you extracted. Type <code>cd </code> (with a space), drag the TsumTsum-Starter
                folder from Finder or your file manager onto the window, press <b>Return</b>, then run{' '}
                <code>./Start-Linux.sh</code> again.
              </p>
            </Faq>
            <Faq title={'macOS or Linux: "Permission denied"'}>
              <p>The extraction tool dropped the scripts' run permission. In the TsumTsum-Starter folder, run this once:</p>
              <Cmd>chmod +x Start-Linux.sh bin/posix/*.sh</Cmd>
            </Faq>
            <Faq title="macOS: I extracted the .zip and nothing works">
              <p>macOS has blocked the files. Use the .tar.gz instead, or unblock the folder once:</p>
              <Cmd>xattr -dr com.apple.quarantine ~/Downloads/TsumTsum-Starter</Cmd>
              <p>Change the path if the folder is somewhere else.</p>
            </Faq>
            <Faq title="The browser page does not open">
              <p>
                Open <a href={pageUrl}>{pageUrl}</a> yourself while the window is open. If the window shows an error instead, run
                with <code>--menu</code> (on Windows, <code>-Menu</code>) for a menu in the terminal that does the same
                service and app tasks.
              </p>
            </Faq>
            <Faq title={'"Could not download it", or "did not match its checksum"'}>
              <p>
                The first run needs the internet: adb comes from dl.google.com and tsum-stats from GitHub. A firewall,
                VPN or school network can block either; try another network. A checksum mismatch means the file changed
                in transit: try again. Without internet at all, the README explains how to place adb by hand or point{' '}
                <code>GAP_ADB</code> at an adb you have.
              </p>
            </Faq>
            <Faq title={'"already running ... without the starter"'}>
              <p>
                Tsum Tsum Stats is already open on its own. Stop it (Ctrl+C in its window) and run the starter again, which
                brings the Stats site with it.
              </p>
            </Faq>
          </div>
        </Patch>

        <Patch tone="surface" radius="30px" inset={7} className="st-step" style={{['--thread' as string]: '#6c6890'}}>
          <h3 className="st-step__title">Finding the device</h3>
          <div className="st-faqs">
            <Faq title="No device is listed">
              <ul>
                <li>Start the emulator first, and wait for its home screen. Then press <b>Refresh</b>.</li>
                <li>A phone needs USB debugging on (step 1) and a USB cable that carries data, not only charge.</li>
                <li>Still missing, or shown as offline? Press <b>Restart adb</b>, next to Refresh.</li>
                <li>
                  An emulator on an unusual port, or a fifth instance: set <code>GAP_EXTRA_PORTS</code> to its port before
                  starting. MuMu shows the port under <b>Settings › Other</b>.
                </li>
              </ul>
            </Faq>
            <Faq title={'The phone shows "unauthorized"'}>
              <p>
                Look at the phone's screen and tap <b>Allow</b> on the USB debugging prompt, then press <b>Refresh</b>. No
                prompt? Unplug the cable and plug it back in.
              </p>
            </Faq>
            <Faq title="The service was running, now it is not">
              <p>
                The device restarted: Android stops the service on every restart. Run the starter and press{' '}
                <b>Start service</b> again.
              </p>
            </Faq>
            <Faq title={'"wrong ABI" or "The installed APK carries ... only"'}>
              <p>
                The app was built for another processor. Press <b>Download &amp; install the latest APK</b>: it fetches the
                build for the processor shown in the device list.
              </p>
            </Faq>
          </div>
        </Patch>

        <p className="st-help">
          Still stuck? Press <b>Export logs &amp; stats</b> on the page and share the zip in the{' '}
          <a href={discord}><DiscordMark />Discord</a>. If the page will not open, copy the text in the terminal window
          instead.
        </p>
      </section>
    </FeltPage>
  );
}
