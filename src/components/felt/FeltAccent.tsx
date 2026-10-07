import React, {useId} from 'react';

/** A decorative felt coin or medal sticker (designs/website/Felt Accent). */
export default function FeltAccent({
  kind,
  width,
  top,
  right,
  bottom,
  left,
  rotate = 0,
}: {
  kind: 'coin' | 'medal';
  width: number;
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
  rotate?: number;
}): React.JSX.Element {
  // Filter ids must be unique per instance; React's ids carry colons.
  const fid = 'felt' + useId().replace(/[^a-zA-Z0-9]/g, '');
  const filter = (seed: number, spk: number) => (
    <filter id={fid} x="-15%" y="-15%" width="130%" height="130%">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" seed={seed} result="n" />
      <feDisplacementMap in="SourceGraphic" in2="n" scale="2.6" xChannelSelector="R" yChannelSelector="G" result="d" />
      <feColorMatrix in="n" type="matrix" values={`0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  ${spk} 0 0 0 -0.16`} result="sp" />
      <feComposite in="sp" in2="d" operator="in" result="spk" />
      <feColorMatrix in="n" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0.22 0 0 -0.1" result="hl" />
      <feComposite in="hl" in2="d" operator="in" result="hlk" />
      <feMerge>
        <feMergeNode in="d" />
        <feMergeNode in="spk" />
        <feMergeNode in="hlk" />
      </feMerge>
    </filter>
  );
  const style: React.CSSProperties = {
    width,
    height: width * 1.04,
    top,
    right,
    bottom,
    left,
    transform: `rotate(${rotate}deg)`,
  };
  return (
    <div className="felt-sticker" style={style} aria-hidden="true">
      {kind === 'coin' ? (
        <svg viewBox="0 0 100 104" style={{display: 'block', width: '100%', height: '100%', overflow: 'visible'}}>
          <defs>{filter(4, 0.55)}</defs>
          <g filter={`url(#${fid})`}>
            <circle cx="50" cy="54" r="46" fill="#a85f0c" />
            <circle cx="50" cy="50" r="46" fill="#e8900c" />
            <circle cx="50" cy="50" r="35" fill="#ffbb1a" />
            <circle cx="45" cy="45" r="22" fill="#ffd95a" opacity="0.5" />
            <g fill="#ffe07a">
              <circle cx="51" cy="59.5" r="15" />
              <circle cx="34" cy="38.5" r="9.5" />
              <circle cx="68" cy="38.5" r="9.5" />
            </g>
            <g fill="#e2700a">
              <circle cx="50" cy="58" r="15" />
              <circle cx="33" cy="37" r="9.5" />
              <circle cx="67" cy="37" r="9.5" />
            </g>
            <g fill="#c25604" opacity="0.55">
              <path d="M35 58a15 15 0 0 1 30 0a15 15 0 0 0 -30 0z" />
            </g>
          </g>
          <circle cx="50" cy="50" r="40.5" fill="none" stroke="#fff4cc" strokeWidth="2.4" strokeDasharray="4.2 3.2" strokeLinecap="round" />
          <circle cx="50" cy="51" r="40.5" fill="none" stroke="#a85f0c" strokeWidth="1.2" strokeDasharray="4.2 3.2" strokeLinecap="round" opacity="0.35" />
        </svg>
      ) : (
        <svg viewBox="0 0 100 104" style={{display: 'block', width: '100%', height: '100%', overflow: 'visible'}}>
          <defs>{filter(9, 0.5)}</defs>
          <g filter={`url(#${fid})`}>
            <polygon points="32.4,11.5 67.6,11.5 92.5,36.4 92.5,71.6 67.6,96.5 32.4,96.5 7.5,71.6 7.5,36.4" fill="#4f86b8" />
            <polygon points="32.4,7.5 67.6,7.5 92.5,32.4 92.5,67.6 67.6,92.5 32.4,92.5 7.5,67.6 7.5,32.4" fill="#6fb4e3" />
            <polygon points="35.5,15 64.5,15 85,35.5 85,64.5 64.5,85 35.5,85 15,64.5 15,35.5" fill="#bfe0f7" />
            <circle cx="50" cy="50" r="22" fill="#efc4ef" opacity="0.9" />
            <polygon points="50,18 55.5,40 72.6,27.4 60,44.5 82,50 60,55.5 72.6,72.6 55.5,60 50,82 44.5,60 27.4,72.6 40,55.5 18,50 40,44.5 27.4,27.4 44.5,40" fill="#6aa6d6" />
            <polygon points="50,21 54.6,41.2 70,30 58.8,45.4 79,50 58.8,54.6 70,70 54.6,58.8 50,79 45.4,58.8 30,70 41.2,54.6 21,50 41.2,45.4 30,30 45.4,41.2" fill="#ffffff" />
          </g>
          <polygon points="34.3,12 65.7,12 88,34.3 88,65.7 65.7,88 34.3,88 12,65.7 12,34.3" fill="none" stroke="#ffffff" strokeWidth="2.4" strokeDasharray="4.2 3.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  );
}
