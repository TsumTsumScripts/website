import React from 'react';
import Media from '@site/src/components/felt/Media';
import {guideShots} from '@site/src/data/guides';
import styles from './Shot.module.css';

const byId = new Map(guideShots.map((s: {id: string}) => [s.id, s]));

/**
 * A guide screenshot by id, from src/data/guides.js: a phone shot at phone size, a
 * dashboard page at the column's width, a dashboard panel at its own size. A placeholder
 * until static/media/<id> exists.
 * Registered globally (src/theme/MDXComponents.tsx), so pages need no import.
 */
export function Shot({id, caption}: {id: string; caption?: React.ReactNode}): React.JSX.Element {
  const shot = byId.get(id) as {id: string; alt: string; capture: string; frame: 'phone' | 'desk' | 'panel'} | undefined;
  if (!shot) throw new Error(`Shot: ${id} is not declared in src/data/guides.js`);
  return (
    <figure className={`${styles.figure} ${styles[shot.frame]}`}>
      <Media id={shot.id} alt={shot.alt} hint={shot.capture} aspect={shot.frame === 'phone' ? '9 / 16' : undefined} />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

/** Phone shots side by side, wrapping on a narrow screen. */
export function ShotRow({children}: {children: React.ReactNode}): React.JSX.Element {
  return <div className={styles.row}>{children}</div>;
}
