import React from 'react';
import clsx from 'clsx';

export type Tone = 'marigold' | 'jade' | 'rose' | 'periwinkle' | 'grape' | 'surface';

/** A felt patch with stitching. Radius, inset and tilt are CSS variables. */
export default function Patch({
  tone = 'surface',
  as: Tag = 'div',
  radius,
  inset,
  tilt,
  lift,
  hover,
  className,
  style,
  children,
  ...rest
}: {
  tone?: Tone;
  as?: React.ElementType;
  radius?: string;
  inset?: number;
  tilt?: number;
  lift?: number;
  hover?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
} & Record<string, unknown>): React.JSX.Element {
  const vars: Record<string, string | number> = {};
  if (radius) vars['--r'] = radius;
  if (inset !== undefined) vars['--inset'] = `${inset}px`;
  if (tilt !== undefined) vars['--tilt'] = `${tilt}deg`;
  if (lift !== undefined) vars['--lift'] = `${lift}px`;
  return (
    <Tag className={clsx('patch', `patch--${tone}`, hover && 'patch--hover', className)} style={{...vars, ...style}} {...rest}>
      {children}
    </Tag>
  );
}

export function Kicker({tone = 'surface', children}: {tone?: Tone; children: React.ReactNode}): React.JSX.Element {
  return <span className={clsx('kicker', `patch--${tone}`)} style={{boxShadow: 'none', backgroundImage: 'none'}}>{children}</span>;
}
