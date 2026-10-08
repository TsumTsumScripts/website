import React from 'react';
import Link from '@docusaurus/Link';
import {useThemeConfig} from '@docusaurus/theme-common';
import Patch from './Patch';
import FeltAccent from './FeltAccent';
import '@site/src/css/felt.css';

/** A stitched felt footer built from the links in the theme config. */
export default function FeltFooter(): React.JSX.Element | null {
  const {footer} = useThemeConfig();
  if (!footer) return null;
  const columns = (footer.links ?? []).filter((c) => 'items' in c) as {
    title?: string | null;
    items: {label?: string; to?: string; href?: string}[];
  }[];

  return (
    <div className="felt felt-foot">
      <div className="felt-wrap felt-footer-wrap">
        <Patch tone="grape" radius="48px 120px 56px 100px" inset={10} className="felt-footer" style={{padding: 'clamp(28px, 4vw, 48px)'}}>
          <FeltAccent kind="medal" width={70} top={-34} left={48} rotate={-12} />
          <FeltAccent kind="coin" width={60} top={-26} right={64} rotate={14} />
          <div className="felt-footer__cols">
            {columns.map((col) => (
              <div key={col.title} className="felt-footer__col">
                <h3>{col.title}</h3>
                <ul>
                  {col.items.map((it) => (
                    <li key={it.label}>{it.to ? <Link to={it.to}>{it.label}</Link> : <a href={it.href}>{it.label}</a>}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {footer.copyright && (
            <p className="felt-footer__copy" dangerouslySetInnerHTML={{__html: footer.copyright}} />
          )}
        </Patch>
      </div>
    </div>
  );
}
