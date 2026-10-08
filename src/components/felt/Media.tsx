import React, {useEffect, useRef, useState} from 'react';
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
  zoom = true,
  youtube,
}: {
  id: string;
  alt: string;
  /** What to capture, shown on the placeholder. */
  hint?: string;
  aspect?: string;
  loop?: boolean;
  /** Click a still to see it whole in a dialog. Turn off inside a link. */
  zoom?: boolean;
  /** A YouTube video id. Shown as a click-to-load player; nothing is requested from YouTube before the click. */
  youtube?: string;
}): React.JSX.Element {
  const file = index[id];
  const [playing, setPlaying] = useState(false);
  const src = useBaseUrl(file ?? '/');
  const posterSrc = useBaseUrl(`/img/video-posters/${id}.jpg`);
  const [open, setOpen] = useState(false);
  const style: React.CSSProperties = aspect ? {aspectRatio: aspect} : {};
  if (youtube) {
    return (
      <div className="media media--yt" style={style} data-media-id={id}>
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youtube}?autoplay=1&rel=0`}
            title={alt}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <button type="button" className="media-yt-play" aria-label={`Play video: ${alt}`} onClick={() => setPlaying(true)}>
            <img src={posterSrc} alt="" loading="lazy" />
            <span className="media-yt-badge" aria-hidden="true" />
          </button>
        )}
      </div>
    );
  }
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
      ) : zoom ? (
        <button type="button" className="media-zoom" aria-label={`Enlarge screenshot: ${alt}`} aria-haspopup="dialog" onClick={() => setOpen(true)}>
          <img src={src} alt="" loading="lazy" />
        </button>
      ) : (
        <img src={src} alt={alt} loading="lazy" />
      )}
      {open && <Lightbox src={src} alt={alt} onClose={() => setOpen(false)} />}
    </div>
  );
}

/** The whole screenshot in a modal dialog, over the page. Escape, the button or a click anywhere closes it. */
function Lightbox({src, alt, onClose}: {src: string; alt: string; onClose: () => void}): React.JSX.Element {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    ref.current?.showModal();
  }, []);
  // A modal dialog sits in the top layer, so the patch's tilt and overflow do not reach it.
  return (
    <dialog ref={ref} className="lightbox" aria-label={alt} onClose={onClose} onClick={() => ref.current?.close()}>
      <img src={src} alt={alt} />
      <button type="button" className="lightbox-close" autoFocus>Close</button>
    </dialog>
  );
}
