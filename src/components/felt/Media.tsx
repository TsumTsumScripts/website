import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import files from '@site/src/data/mediaFiles.generated.json';

const index = files as Record<string, string>;

/**
 * A screenshot or clip by id. Shows the real file once static/media/<id>.<ext>
 * exists (MEDIA_PLAN.md lists every id), and a labelled placeholder until then.
 */
export default function Media({
  id,
  alt,
  hint,
  aspect,
  loop = true,
}: {
  id: string;
  alt: string;
  /** What to capture, shown on the placeholder. */
  hint?: string;
  aspect?: string;
  loop?: boolean;
}): React.JSX.Element {
  const file = index[id];
  const src = useBaseUrl(file ?? '/');
  const style: React.CSSProperties = aspect ? {aspectRatio: aspect} : {};
  if (!file) {
    return (
      <div className="media media--missing" style={style} role="img" aria-label={alt} data-media-id={id}>
        <b>{id.startsWith('shot') ? 'Screenshot' : id.startsWith('clip') ? 'Clip' : 'Video'} needed</b>
        <code>{id}</code>
        {hint && <span>{hint}</span>}
      </div>
    );
  }
  const isVideo = /\.(mp4|webm)$/.test(file);
  // A still is shown whole, at its own proportions; only a video keeps the slot's aspect.
  return (
    <div className={isVideo ? 'media' : 'media media--shot'} style={isVideo ? style : undefined} data-media-id={id}>
      {isVideo ? (
        <video src={src} aria-label={alt} controls={id.startsWith('vid')} autoPlay={!id.startsWith('vid')} muted={!id.startsWith('vid')} loop={loop && !id.startsWith('vid')} playsInline preload="metadata" />
      ) : (
        <img src={src} alt={alt} loading="lazy" />
      )}
    </div>
  );
}
