import React, {useEffect, useRef, useState} from 'react';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useLocation} from '@docusaurus/router';
import Patch, {type Tone} from './Patch';
import FeltAccent from './FeltAccent';
import DiscordMark from './DiscordMark';
import '@site/src/css/felt.css';

type Item = {label: string; to?: string; href?: string; tone: Tone; match?: string; icon?: React.ReactNode};

/** The felt site header: coin logo, display-type title and a row of coloured pill links. */
export default function FeltHeader(): React.JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  const {pathname} = useLocation();
  const {discordUrl, repoUrl} = siteConfig.customFields as {discordUrl: string; repoUrl: string};
  // On a phone the links fold behind one Menu button; they close again on a new page, Escape or a tap outside.
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    const onPointer = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [open]);

  const items: Item[] = [
    {label: 'Features', to: '/features', tone: 'rose', match: '/features'},
    {label: 'Changelog', to: '/changelog', tone: 'jade', match: '/changelog'},
    {label: 'Starter tool', to: '/starter', tone: 'marigold', match: '/starter'},
    {label: 'Docs', to: '/docs', tone: 'periwinkle'},
    {label: 'Discord', href: discordUrl, tone: 'grape', icon: <DiscordMark />},
    {label: 'GitHub', href: repoUrl, tone: 'surface'},
  ];

  return (
    <>
      <Head>
        <body className="felt-body" />
      </Head>
      <div className="felt felt-head">
        <header ref={headerRef} className={`felt-wrap felt-header${open ? ' felt-header--open' : ''}`}>
          <Link to="/" className="felt-brand" aria-label="Tsum Tsum Script, home">
            <span className="felt-brand__coin">
              <FeltAccent kind="coin" width={54} />
            </span>
            <span className="felt-brand__name">Tsum Tsum Script</span>
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="felt-menu-toggle"
            aria-expanded={open}
            aria-controls="felt-nav"
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}>
            <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
          <nav id="felt-nav" aria-label="Main" className="felt-nav">
            {items.map((it, i) => {
              const active = !!it.match && (pathname === it.match || pathname.startsWith(`${it.match}/`));
              const cls = `felt-pill ${i % 2 ? 'felt-pill--r' : 'felt-pill--l'}${active ? ' felt-pill--on' : ''}`;
              return it.to ? (
                <Patch key={it.label} as={Link} to={it.to} tone={it.tone} className={cls} aria-current={active ? 'page' : undefined}>
                  {it.label}
                </Patch>
              ) : (
                <Patch key={it.label} as="a" href={it.href} tone={it.tone} className={cls}>
                  {it.icon}
                  {it.label}
                </Patch>
              );
            })}
          </nav>
        </header>
      </div>
    </>
  );
}
