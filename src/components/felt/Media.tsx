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
  poster = false,
  seconds,
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
  /** Show static/img/video-posters/<id>.jpg on a local video until it plays. */
  poster?: boolean;
  /** A video's length, for its "Video · 0:19" label. A local video reads its own when it loads. */
  seconds?: number;
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
          <button type="button" className="media-play media-play--yt" aria-label={`Play video: ${alt}`} onClick={() => setPlaying(true)}>
            <img src={posterSrc} alt="" loading="lazy" />
            <PlayCue seconds={seconds} />
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
  if (isVideo) {
    return (
      <div className="media media--video" style={style} data-media-id={id}>
        {id.startsWith('vid') ? (
          <PlayableVideo src={src} alt={alt} poster={poster ? posterSrc : undefined} seconds={seconds} />
        ) : (
          <LoopingClip src={src} alt={alt} loop={loop} />
        )}
      </div>
    );
  }
  return (
    <div className="media media--shot" data-media-id={id}>
      {zoom ? (
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

const clock = (s: number): string => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, '0')}`;

/** What says "this is a video, press to play": a big play button and a "Video · 0:19" tag. */
function PlayCue({seconds, label = 'Video'}: {seconds?: number; label?: string}): React.JSX.Element {
  return (
    <>
      <span className="media-play-badge" aria-hidden="true" />
      <span className="media-play-tag" aria-hidden="true">
        <svg viewBox="0 0 12 12" width="12" height="12"><path d="M2 1l9 5-9 5z" fill="currentColor" /></svg>
        {label}
        {seconds ? ` · ${clock(seconds)}` : ''}
      </span>
    </>
  );
}

/**
 * A video to watch (vid-*): the poster under a play button and a "Video" tag until it is
 * pressed, then the browser's own controls. It never starts on its own.
 */
function PlayableVideo({src, alt, poster, seconds}: {src: string; alt: string; poster?: string; seconds?: number}): React.JSX.Element {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [length, setLength] = useState(seconds);
  return (
    <>
      <video
        ref={ref}
        src={src}
        aria-label={alt}
        controls={started}
        playsInline
        preload="metadata"
        poster={poster}
        onLoadedMetadata={(e) => Number.isFinite(e.currentTarget.duration) && setLength(e.currentTarget.duration)}
      />
      {!started && (
        <button
          type="button"
          className="media-play"
          aria-label={`Play video: ${alt}`}
          onClick={() => {
            setStarted(true);
            void ref.current?.play();
          }}>
          <PlayCue seconds={length} />
        </button>
      )}
    </>
  );
}

/**
 * A short looping clip (clip-*): plays muted on its own, except for people who ask for less
 * motion (or when the browser blocks it), who get the play button instead. A corner button
 * pauses and resumes it either way.
 */
function LoopingClip({src, alt, loop}: {src: string; alt: string; loop: boolean}): React.JSX.Element {
  const ref = useRef<HTMLVideoElement>(null);
  // Assume it plays, so the play button does not flash up on every page load.
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPaused(true);
      return;
    }
    v.muted = true;
    v.play().catch(() => setPaused(true));
  }, []);
  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    if (v.paused) void v.play();
    else v.pause();
  };
  return (
    <>
      <video ref={ref} src={src} aria-label={alt} muted loop={loop} playsInline preload="metadata" onPlay={() => setPaused(false)} onPause={() => setPaused(true)} />
      {paused && (
        <button type="button" className="media-play" aria-label={`Play clip: ${alt}`} onClick={toggle}>
          <PlayCue label="Clip" />
        </button>
      )}
      {!paused && (
        <button type="button" className="media-pause" aria-label={`Pause clip: ${alt}`} onClick={toggle}>
          <svg viewBox="0 0 12 12" width="14" height="14" aria-hidden="true"><path d="M2 1h3v10H2zM7 1h3v10H7z" fill="currentColor" /></svg>
        </button>
      )}
    </>
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
