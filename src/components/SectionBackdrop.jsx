import React from 'react';

/**
 * SectionBackdrop — reusable background component matching the hero's visual language.
 * Renders sage-green washes, a faint dot grid, crosshairs, guide lines and edge ticks.
 *
 * Props:
 *   variant: "light" | "surface" | "dark"
 *   seed: number — controls positions so each section looks different, never tiled
 *
 * aria-hidden, pointer-events-none, z-index 0. No text, no animation (respects
 * prefers-reduced-motion). Content sits above via z-10.
 */
export function SectionBackdrop({ variant = 'light', seed = 0 }) {
  const VW = 1440;
  const VH = 800;

  // Deterministic pseudo-random based on seed
  const rng = (offset) => {
    const x = Math.sin(seed * 9301 + offset * 49297 + 233) * 1000;
    return x - Math.floor(x); // 0..1
  };

  const isDark = variant === 'dark';

  // Color tokens
  const washColor    = isDark ? '#176B52' : '#176B52';
  const washColor2   = isDark ? '#176B52' : '#4FB08C';
  const washOpacity1 = isDark ? 0.20 : 0.08;
  const washOpacity2 = isDark ? 0.18 : 0.07;
  const washOpacity3 = isDark ? 0.16 : 0.06;
  const dotColor     = isDark ? '#F7F6F0' : '#172522';
  const dotOpacity   = isDark ? 0.08 : 0.10;
  const lineColor    = isDark ? '#F7F6F0' : '#176B52';
  const lineOpacity  = isDark ? 0.18 : 0.20;
  const crossColor   = isDark ? '#F7F6F0' : '#176B52';
  const crossOpacity = isDark ? 0.20 : 0.35;
  const tickColor    = isDark ? '#F7F6F0' : '#4FB08C';

  // Generate 3 wash blobs with different positions per seed
  const washes = [
    {
      width:  `${600 + rng(1) * 400}px`,
      height: `${120 + rng(2) * 80}px`,
      bg: washColor,
      opacity: washOpacity1,
      rotation: -20 + rng(3) * 40,
      top:  `${-40 + rng(4) * 60}%`,
      left: `${-10 + rng(5) * 80}%`,
    },
    {
      width:  `${500 + rng(6) * 300}px`,
      height: `${100 + rng(7) * 80}px`,
      bg: washColor2,
      opacity: washOpacity2,
      rotation: 10 + rng(8) * 40,
      top:  `${30 + rng(9) * 50}%`,
      left: `${-15 + rng(10) * 70}%`,
    },
    {
      width:  `${280 + rng(11) * 200}px`,
      height: `${280 + rng(12) * 120}px`,
      bg: washColor,
      opacity: washOpacity3,
      rotation: rng(13) * 360,
      top:  `${rng(14) * 60}%`,
      left: `${rng(15) * 80}%`,
    },
  ];

  // Crosshairs at different positions per seed
  const crosshairs = [
    { x: 100 + rng(16) * 400,  y: 80  + rng(17) * 300 },
    { x: 800 + rng(18) * 500,  y: 300 + rng(19) * 400 },
    { x: 300 + rng(20) * 900,  y: 150 + rng(21) * 500 },
  ];

  // Guide lines
  const hLine = { y: VH * (0.2 + rng(22) * 0.5), x2: VW * (0.2 + rng(23) * 0.5) };
  const vLine = { x: VW * (0.5 + rng(24) * 0.4), y2: VH * (0.3 + rng(25) * 0.5) };

  // Corner brackets offset
  const BRACKET = 36;
  const cornerOffset = 28;
  const corners = [
    { x: cornerOffset,      y: cornerOffset,      rx:  1, ry:  1 },
    { x: VW - cornerOffset, y: cornerOffset,      rx: -1, ry:  1 },
    { x: cornerOffset,      y: VH - cornerOffset, rx:  1, ry: -1 },
    { x: VW - cornerOffset, y: VH - cornerOffset, rx: -1, ry: -1 },
  ];

  // Tick fractions per seed
  const tickFracs = [0.2, 0.35, 0.5, 0.65, 0.8].map(
    (f, i) => f + (rng(30 + i) - 0.5) * 0.08
  );

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none select-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {/* ── LAYER 1: Blurred sage-green washes ── */}
      {washes.map((w, i) => (
        <div
          key={i}
          style={{
            position:     'absolute',
            width:        w.width,
            height:       w.height,
            background:   w.bg,
            opacity:      w.opacity,
            filter:       'blur(80px)',
            transform:    `rotate(${w.rotation}deg)`,
            top:          w.top,
            left:         w.left,
            borderRadius: '50%',
          }}
        />
      ))}

      {/* ── LAYER 2: Dot grid SVG (hidden on mobile) ── */}
      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        style={{ mixBlendMode: isDark ? 'screen' : 'multiply' }}
      >
        <defs>
          <pattern id={`dot-${seed}`} width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="14" cy="14" r="0.9" fill={dotColor} fillOpacity={dotOpacity} />
          </pattern>
          <radialGradient id={`dot-fade-${seed}`} cx="50%" cy="45%" r="55%">
            <stop offset="20%"  stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id={`dot-mask-${seed}`}>
            <rect width={VW} height={VH} fill={`url(#dot-fade-${seed})`} />
          </mask>
          <style>{`
            @media (max-width: 767px) {
              .bd-dot-${seed} { display: none; }
            }
          `}</style>
        </defs>
        <rect
          className={`bd-dot-${seed}`}
          width={VW} height={VH}
          fill={`url(#dot-${seed})`}
          mask={`url(#dot-mask-${seed})`}
        />
      </svg>

      {/* ── LAYER 3: Precision SVG geometry ── */}
      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Corner brackets */}
        <g stroke={lineColor} strokeWidth="1.25" strokeOpacity={lineOpacity * 0.8} fill="none">
          {corners.map((c, i) => (
            <path
              key={i}
              d={`M ${c.x} ${c.y + c.ry * BRACKET} L ${c.x} ${c.y} L ${c.x + c.rx * BRACKET} ${c.y}`}
            />
          ))}
        </g>

        {/* Horizontal accent guide line */}
        <line
          x1="0"       y1={hLine.y}
          x2={hLine.x2} y2={hLine.y}
          stroke={lineColor} strokeWidth="0.75" strokeOpacity={lineOpacity * 0.6}
        />

        {/* Vertical accent guide line */}
        <line
          x1={vLine.x} y1="0"
          x2={vLine.x} y2={vLine.y2}
          stroke={tickColor} strokeWidth="0.75" strokeOpacity={lineOpacity * 0.5}
        />

        {/* Crosshairs */}
        <g stroke={crossColor} strokeOpacity={crossOpacity}>
          {crosshairs.map((c, i) => (
            <g key={i}>
              <line x1={c.x - 14} y1={c.y}      x2={c.x + 14} y2={c.y}      strokeWidth="0.85" />
              <line x1={c.x}      y1={c.y - 14}  x2={c.x}      y2={c.y + 14} strokeWidth="0.85" />
              <circle cx={c.x} cy={c.y} r="4.5" fill="none" strokeWidth="0.6" strokeOpacity={crossOpacity * 0.55} />
            </g>
          ))}
        </g>

        {/* Right-edge tick marks (desktop only) */}
        <g stroke={tickColor} strokeOpacity="0.30" strokeWidth="0.75" className={`bd-dot-${seed}`}>
          {tickFracs.map((frac, i) => (
            <line
              key={i}
              x1={VW - 28} y1={VH * frac}
              x2={VW - 12} y2={VH * frac}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
