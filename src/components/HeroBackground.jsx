import React from 'react';

/**
 * HeroBackground — layered design:
 *  Layer 1: Large blurred color bands (thick lines, low opacity, CSS blur)
 *  Layer 2: Fine dot grid overlay
 *  Layer 3: Precision SVG elements (brackets, ruler, crosshairs, accent lines)
 *
 * No concentric circles. Uses #176B52 (forest green) and #4FB08C (accent-light).
 * aria-hidden, pointer-events-none.
 */
export function HeroBackground() {
  const VW = 1440;
  const VH = 800;
  const BRACKET = 36;

  const corners = [
    { x: 28,      y: 28,      rx:  1, ry:  1 },
    { x: VW - 28, y: 28,      rx: -1, ry:  1 },
    { x: 28,      y: VH - 28, rx:  1, ry: -1 },
    { x: VW - 28, y: VH - 28, rx: -1, ry: -1 },
  ];

  const rulerY = VH - 20;
  const rulerTicks = [];
  for (let x = 80; x <= VW - 80; x += 24) {
    rulerTicks.push({ x, major: (x / 24) % 5 === 0 });
  }

  // Strategic crosshair positions
  const crosshairs = [
    { x: 180,       y: 140  },
    { x: VW - 180,  y: VH - 140 },
    { x: VW * 0.62, y: VH * 0.38 },
  ];

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0"
    >
      {/* ── LAYER 1: Blurred thick color bands ── */}

      {/* Band A — diagonal, upper-right, deep forest green */}
      <div
        style={{
          position: 'absolute',
          width: '820px',
          height: '160px',
          background: '#176B52',
          opacity: 0.22,
          filter: 'blur(72px)',
          transform: 'rotate(-38deg)',
          top: '-30px',
          right: '-160px',
          borderRadius: '50%',
        }}
      />

      {/* Band B — diagonal, lower-left, accent-light green */}
      <div
        style={{
          position: 'absolute',
          width: '720px',
          height: '140px',
          background: '#4FB08C',
          opacity: 0.18,
          filter: 'blur(90px)',
          transform: 'rotate(22deg)',
          bottom: '40px',
          left: '-120px',
          borderRadius: '50%',
        }}
      />

      {/* Band C — horizontal accent, mid-left, forest green */}
      <div
        style={{
          position: 'absolute',
          width: '500px',
          height: '120px',
          background: '#176B52',
          opacity: 0.14,
          filter: 'blur(110px)',
          transform: 'rotate(-12deg)',
          top: '38%',
          left: '-60px',
          borderRadius: '50%',
        }}
      />

      {/* Band D — small accent dot upper-left for balance */}
      <div
        style={{
          position: 'absolute',
          width: '280px',
          height: '280px',
          background: '#4FB08C',
          opacity: 0.13,
          filter: 'blur(100px)',
          top: '10%',
          left: '8%',
          borderRadius: '50%',
        }}
      />

      {/* ── LAYER 2: Fine dot grid SVG (desktop only) ── */}
      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        style={{ mixBlendMode: 'multiply' }}
      >
        <defs>
          <pattern id="bg-dot" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="14" cy="14" r="0.9" fill="#176B52" fillOpacity="0.25" />
          </pattern>
          <radialGradient id="dot-fade" cx="50%" cy="45%" r="55%">
            <stop offset="20%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="dot-fade-mask">
            <rect width={VW} height={VH} fill="url(#dot-fade)" />
          </mask>
          <style>{`
            @media (max-width: 767px) {
              .bg-dot-grid  { display: none; }
              .bg-ruler     { display: none; }
            }
          `}</style>
        </defs>

        <rect
          className="bg-dot-grid"
          width={VW} height={VH}
          fill="url(#bg-dot)"
          mask="url(#dot-fade-mask)"
        />
      </svg>

      {/* ── LAYER 3: Precision SVG elements ── */}
      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Corner brackets — green, prominent */}
        <g stroke="#176B52" strokeWidth="1.25" strokeOpacity="0.55" fill="none">
          {corners.map((c, i) => (
            <path
              key={i}
              d={`M ${c.x} ${c.y + c.ry * BRACKET} L ${c.x} ${c.y} L ${c.x + c.rx * BRACKET} ${c.y}`}
            />
          ))}
        </g>

        {/* Horizontal accent hairline — upper third */}
        <line
          x1="0" y1={VH * 0.28}
          x2={VW * 0.35} y2={VH * 0.28}
          stroke="#176B52" strokeWidth="0.75" strokeOpacity="0.25"
        />
        {/* Right side vertical accent hairline */}
        <line
          x1={VW * 0.78} y1="0"
          x2={VW * 0.78} y2={VH * 0.55}
          stroke="#4FB08C" strokeWidth="0.75" strokeOpacity="0.22"
        />

        {/* Strategic crosshairs */}
        <g stroke="#176B52" strokeOpacity="0.35">
          {crosshairs.map((c, i) => (
            <g key={i}>
              <line x1={c.x - 14} y1={c.y} x2={c.x + 14} y2={c.y} strokeWidth="0.85" />
              <line x1={c.x} y1={c.y - 14} x2={c.x} y2={c.y + 14} strokeWidth="0.85" />
              <circle cx={c.x} cy={c.y} r="4.5" fill="none" strokeWidth="0.6" strokeOpacity="0.20" />
            </g>
          ))}
        </g>

        {/* Small green tick marks along the right edge */}
        <g stroke="#4FB08C" strokeOpacity="0.30" strokeWidth="0.75" className="bg-dot-grid">
          {[0.2, 0.35, 0.5, 0.65, 0.8].map((frac, i) => (
            <line
              key={i}
              x1={VW - 28} y1={VH * frac}
              x2={VW - 12} y2={VH * frac}
            />
          ))}
        </g>

        {/* Bottom ruler — desktop only */}
        <g className="bg-ruler" stroke="#176B52" strokeOpacity="0.28">
          <line x1="80" y1={rulerY} x2={VW - 80} y2={rulerY} strokeWidth="0.6" />
          {rulerTicks.map((t, i) => (
            <line
              key={i}
              x1={t.x} y1={rulerY}
              x2={t.x} y2={rulerY - (t.major ? 10 : 5)}
              strokeWidth={t.major ? 0.9 : 0.5}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
