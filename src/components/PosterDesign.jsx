import React, { useState, useEffect, useCallback, useRef } from 'react';
import { postersContent } from '../data/content';
import { SectionBackdrop } from './SectionBackdrop';

/* ─── Accessible Lightbox ─────────────────────────────────────────────────── */
function Lightbox({ posters, initialIndex, onClose }) {
  const [idx, setIdx] = useState(initialIndex);
  const closeRef = useRef(null);
  const dialogRef = useRef(null);

  const poster = posters[idx];

  const prev = useCallback(() => {
    setIdx((i) => (i - 1 + posters.length) % posters.length);
  }, [posters.length]);

  const next = useCallback(() => {
    setIdx((i) => (i + 1) % posters.length);
  }, [posters.length]);

  // Key handling
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape')       onClose();
      if (e.key === 'ArrowLeft')    prev();
      if (e.key === 'ArrowRight')   next();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, prev, next]);

  // Focus trap
  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    const focusable = el.querySelectorAll(
      'button, [href], [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];

    const trap = (e) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
      }
    };
    el.addEventListener('keydown', trap);
    closeRef.current?.focus();
    return () => el.removeEventListener('keydown', trap);
  }, []);

  // Lock scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  const alt = poster.title
    ? `${poster.title}, poster designed by Akshat Srivastava`
    : 'Poster designed by Akshat Srivastava';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Poster lightbox"
      ref={dialogRef}
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ background: 'rgba(23,37,34,0.92)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Close button */}
      <button
        ref={closeRef}
        onClick={onClose}
        aria-label="Close lightbox"
        className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center border border-white/30 text-[#F7F6F0] hover:border-[#4FB08C] hover:text-[#4FB08C] transition-colors text-xl font-light focus-visible:outline-2 focus-visible:outline-[#F7F6F0] focus-visible:outline-offset-2"
        style={{ fontFamily: 'monospace' }}
      >
        ✕
      </button>

      {/* Left arrow */}
      {posters.length > 1 && (
        <button
          onClick={prev}
          aria-label="Previous poster"
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-white/30 text-[#F7F6F0] hover:border-[#4FB08C] hover:text-[#4FB08C] transition-colors focus-visible:outline-2 focus-visible:outline-[#F7F6F0] focus-visible:outline-offset-2"
        >
          ←
        </button>
      )}

      {/* Poster image */}
      <div className="max-w-[90vw] max-h-[90vh] flex items-center justify-center">
        <img
          src={poster.image}
          alt={alt}
          style={{
            maxWidth:  '90vw',
            maxHeight: '90vh',
            objectFit: 'contain',
            display:   'block',
          }}
        />
      </div>

      {/* Right arrow */}
      {posters.length > 1 && (
        <button
          onClick={next}
          aria-label="Next poster"
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-white/30 text-[#F7F6F0] hover:border-[#4FB08C] hover:text-[#4FB08C] transition-colors focus-visible:outline-2 focus-visible:outline-[#F7F6F0] focus-visible:outline-offset-2"
        >
          →
        </button>
      )}
    </div>
  );
}

/* ─── Single Poster Frame ─────────────────────────────────────────────────── */
function PosterFrame({ poster, onOpen }) {
  const [exists, setExists] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!poster.image) { setChecked(true); return; }
    const img = new window.Image();
    // Try the given extension first; accept webp/png/jpg/jpeg
    img.onload  = () => { setExists(true);  setChecked(true); };
    img.onerror = () => {
      // Try alternate extensions
      const base = poster.image.replace(/\.[^.]+$/, '');
      const exts = ['webp', 'png', 'jpg', 'jpeg'].filter(
        (e) => !poster.image.endsWith(`.${e}`)
      );
      let found = false;
      let remaining = exts.length;
      if (remaining === 0) { setChecked(true); return; }
      exts.forEach((ext) => {
        const alt = new window.Image();
        alt.onload = () => {
          if (!found) { found = true; setExists(true); setChecked(true); }
        };
        alt.onerror = () => {
          remaining--;
          if (remaining === 0 && !found) setChecked(true);
        };
        alt.src = `${base}.${ext}`;
      });
    };
    img.src = poster.image;
  }, [poster.image]);

  if (!checked) return null; // wait for check
  if (!exists)  return null; // hide if missing

  const hasTitle = poster.title && poster.title.trim();
  const hasDesc  = poster.description && poster.description.trim();
  const alt      = hasTitle
    ? `${poster.title}, poster designed by Akshat Srivastava`
    : 'Poster designed by Akshat Srivastava';

  return (
    <div
      className="group relative flex flex-col gap-4 cursor-pointer"
      onClick={onOpen}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(); }}}
      tabIndex={0}
      role="button"
      aria-label={`Open poster: ${hasTitle ? poster.title : 'poster'} in lightbox`}
    >
      {/* Frame */}
      <div
        className="relative border border-[#DCDDD4] bg-[#EFEFE7] rounded-[2px] transition-colors duration-200 group-hover:border-[#176B52] group-focus-visible:border-[#176B52]"
        style={{ padding: '12px' }}
      >
        <img
          src={poster.image}
          alt={alt}
          loading="lazy"
          width={800}
          height={1130}
          style={{
            width:      '100%',
            height:     'auto',
            display:    'block',
            objectFit:  'contain',
          }}
        />

        {/* "View larger ↗" label — appears on hover */}
        <span
          aria-hidden="true"
          className="absolute bottom-4 right-4 px-2.5 py-1 bg-[#172522] text-[#F7F6F0] font-sans text-[13px] font-medium rounded-[2px] opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-200 pointer-events-none"
        >
          View larger ↗
        </span>
      </div>

      {/* Caption — only if non-empty */}
      {(hasTitle || hasDesc) && (
        <div className="flex flex-col gap-1">
          {hasTitle && (
            <p className="font-serif font-normal text-[24px] text-[#172522] leading-snug">
              {poster.title}
            </p>
          )}
          {hasDesc && (
            <p className="font-sans text-[16px] text-[#5C6662] leading-relaxed">
              {poster.description}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── Poster Design Section ──────────────────────────────────────────────── */
export function PosterDesign() {
  const { sectionTitle, sectionSubtitle, posters } = postersContent;
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [visiblePosters, setVisiblePosters] = useState([]);

  // Track which posters actually exist
  useEffect(() => {
    let mounted = true;
    const checks = posters.map(
      (p) =>
        new Promise((resolve) => {
          if (!p.image) { resolve(false); return; }
          const img = new window.Image();
          img.onload  = () => resolve(true);
          img.onerror = () => {
            const base = p.image.replace(/\.[^.]+$/, '');
            const exts = ['webp', 'png', 'jpg', 'jpeg'].filter(
              (e) => !p.image.endsWith(`.${e}`)
            );
            if (exts.length === 0) { resolve(false); return; }
            let found = false;
            let rem = exts.length;
            exts.forEach((ext) => {
              const a = new window.Image();
              a.onload  = () => { if (!found) { found = true; resolve(true); } };
              a.onerror = () => { rem--; if (rem === 0 && !found) resolve(false); };
              a.src = `${base}.${ext}`;
            });
          };
          img.src = p.image;
        })
    );
    Promise.all(checks).then((results) => {
      if (!mounted) return;
      setVisiblePosters(posters.filter((_, i) => results[i]));
    });
    return () => { mounted = false; };
  }, [posters]);

  // If no posters exist, hide the whole section
  if (visiblePosters.length === 0) return null;

  const openLightbox = (i) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);

  return (
    <>
      <section
        id="posters"
        className="relative w-full bg-[#F7F6F0] border-b border-[#DCDDD4] py-20 md:py-28 overflow-hidden"
      >
        <SectionBackdrop variant="light" seed={3} />

        <div className="relative z-10 max-w-[1200px] mx-auto px-6">
          {/* Section Header */}
          <div className="mb-14 md:mb-16">
            <h2
              style={{ letterSpacing: '-0.01em', lineHeight: 1.05 }}
              className="font-serif font-normal text-[#172522] text-[clamp(40px,5.5vw,72px)] mb-3"
            >
              {sectionTitle}
            </h2>
            {sectionSubtitle && (
              <p className="text-[#5C6662] text-[15px] sm:text-base md:text-lg">
                {sectionSubtitle}
              </p>
            )}
          </div>

          {/* Poster grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-start">
            {visiblePosters.map((poster, i) => {
              const originalIndex = posters.findIndex((p) => p.id === poster.id);
              return (
                <div
                  key={poster.id}
                  className={i === 1 ? "md:col-span-5 md:col-start-8" : "md:col-span-5"}
                  style={
                    i === 1
                      ? { marginTop: '48px' }
                      : undefined
                  }
                >
                  <PosterFrame
                    poster={poster}
                    onOpen={() => openLightbox(originalIndex)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          posters={posters}
          initialIndex={lightboxIndex}
          onClose={closeLightbox}
        />
      )}
    </>
  );
}
