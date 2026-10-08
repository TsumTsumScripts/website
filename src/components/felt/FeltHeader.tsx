import React from 'react';
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
        <header className="felt-wrap felt-header">
          <Link to="/" className="felt-brand" aria-label="Tsum Tsum Script, home">
            <span className="felt-brand__coin">
              <FeltAccent kind="coin" width={54} />
            </span>
            <span className="felt-brand__name">Tsum Tsum Script</span>
          </Link>
          <nav aria-label="Main" className="felt-nav">
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
