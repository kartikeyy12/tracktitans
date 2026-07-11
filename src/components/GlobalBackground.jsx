// GlobalBackground.jsx — persistent racing background used on every page
// Drop this into src/components/GlobalBackground.jsx

const GOLD = '#AE822B'

const checkerDataUrl = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Crect width='16' height='16' fill='white' opacity='0.06'/%3E%3Crect x='16' y='16' width='16' height='16' fill='white' opacity='0.06'/%3E%3C/svg%3E`

export default function GlobalBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        background: '#0a0a0a',
      }}
    >
      {/* Fine grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(255,255,255,0.012) 79px, rgba(255,255,255,0.012) 80px),
          repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(255,255,255,0.012) 79px, rgba(255,255,255,0.012) 80px)
        `,
      }} />

      {/* Checkered flag bg — right side */}
      <div style={{
        position: 'absolute',
        top: 0, right: 0,
        width: '55%', height: '100%',
        backgroundImage: `url("${checkerDataUrl}")`,
        backgroundRepeat: 'repeat',
        opacity: 0.7,
        maskImage: 'radial-gradient(ellipse 70% 80% at 80% 40%, black 0%, transparent 75%)',
        WebkitMaskImage: 'radial-gradient(ellipse 70% 80% at 80% 40%, black 0%, transparent 75%)',
      }} />

      {/* SVG track / speed lines — right side */}
      <svg
        viewBox="0 0 520 900"
        preserveAspectRatio="xMaxYMid slice"
        style={{
          position: 'absolute',
          top: 0, right: 0,
          width: '52%', height: '100%',
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="bgVig" cx="70%" cy="45%" r="60%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="70%" stopColor="white" stopOpacity="0.4" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="bgVigMask">
            <rect width="520" height="900" fill="url(#bgVig)" />
          </mask>
          <linearGradient id="bgTrackGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={GOLD} stopOpacity="0.85" />
            <stop offset="50%" stopColor={GOLD} stopOpacity="0.3" />
            <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
          </linearGradient>
          <linearGradient id="bgTrackGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0.14" />
            <stop offset="50%" stopColor="white" stopOpacity="0.05" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <filter id="bgGoldGlow">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feFlood floodColor={GOLD} floodOpacity="0.6" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <g mask="url(#bgVigMask)">
          {/* Outer track curve */}
          <path
            d="M 520 0 C 440 140, 240 210, 280 420 C 320 620, 520 660, 480 900"
            fill="none" stroke="url(#bgTrackGrad)" strokeWidth="2.5"
          />
          {/* Inner track curve */}
          <path
            d="M 520 70 C 420 180, 310 250, 340 440 C 370 620, 520 700, 520 900"
            fill="none" stroke="url(#bgTrackGrad2)" strokeWidth="1.5"
          />
          {/* Track fill */}
          <path
            d="M 520 0 C 440 140, 240 210, 280 420 C 320 620, 520 660, 480 900
               L 520 900 C 520 700, 370 620, 340 440 C 310 250, 420 180, 520 70 Z"
            fill={GOLD} opacity="0.03"
          />
          {/* Apex glow dot */}
          <circle cx="282" cy="422" r="5" fill={GOLD} opacity="0.65" filter="url(#bgGoldGlow)" />
          <circle cx="342" cy="442" r="3" fill="white" opacity="0.28" />
          {/* Speed lines */}
          {[90,150,210,280,345,420,490,560,630,690,740,800].map((y, i) => (
            <line key={i}
              x1="0" y1={y} x2={60 + (i % 3) * 35} y2={y + 0.5}
              stroke="white" strokeWidth={i % 4 === 0 ? 1 : 0.6}
              opacity={0.06 + (i % 3) * 0.02}
            />
          ))}
          {/* Gold speed lines */}
          <line x1="0" y1="195" x2="110" y2="196" stroke={GOLD} strokeWidth="1.5" opacity="0.4" />
          <line x1="0" y1="320" x2="88" y2="321" stroke={GOLD} strokeWidth="1" opacity="0.28" />
          <line x1="0" y1="520" x2="130" y2="521" stroke={GOLD} strokeWidth="1.5" opacity="0.35" />
        </g>
      </svg>

      {/* Left ambient gold glow */}
      <div style={{
        position: 'absolute',
        left: '-10%', bottom: '10%',
        width: '40%', aspectRatio: '1',
        background: `radial-gradient(circle, rgba(174,130,43,0.08) 0%, transparent 65%)`,
      }} />

      {/* Top checkered strip */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
        background: 'repeating-linear-gradient(90deg, #fff 0, #fff 16px, #0a0a0a 16px, #0a0a0a 32px)',
        opacity: 0.15,
      }} />
    </div>
  )
}
