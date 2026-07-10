import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import PageWrapper from '../components/PageWrapper'
import logo from '../assets/logo.png'

const GOLD = '#AE822B'

const cards = [
  { to: '/event',   icon: '🏁', title: 'The Event',   desc: "Competing in GKDC 2027, India's premier intercollegiate go-kart design and race challenge." },
  { to: '/team',    icon: '👥', title: 'The Team',    desc: '25+ students across six specialist sub-teams, all from NIT Goa Mechanical Engineering.' },
  { to: '/journey', icon: '📍', title: 'Our Journey', desc: 'From zero to race-ready: every milestone of our debut season, documented.' },
  { to: '/join',    icon: '⚡', title: 'Join Us',     desc: "Passionate about motorsport or engineering? We're always looking for driven people." },
]

const stats = [
  { num: '1',   suffix: '',    label: 'First-Time Participants' },
  { num: '100', suffix: '%',   label: 'Student Built' },
  { num: '25',  suffix: '+',   label: 'Team Members' },
  { num: '6',   suffix: '',    label: 'Sub-teams' },
]

const gridBg = {
  backgroundImage: `
    repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(255,255,255,0.015) 79px, rgba(255,255,255,0.015) 80px),
    repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(255,255,255,0.015) 79px, rgba(255,255,255,0.015) 80px)
  `,
}

// SVG racing graphic — track curves + speed lines + checkered flag bg
function RacingGraphic() {
  return (
    <motion.div
      className="absolute inset-y-0 right-0 pointer-events-none"
      style={{ width: '52%', overflow: 'hidden' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.9 }}
    >
      <svg
        viewBox="0 0 520 800"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Radial fade mask so the graphic vignettes into the dark bg */}
          <radialGradient id="vignette" cx="60%" cy="50%" r="65%">
            <stop offset="0%"   stopColor="white" stopOpacity="1" />
            <stop offset="75%"  stopColor="white" stopOpacity="0.55" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="vigMask">
            <rect width="520" height="800" fill="url(#vignette)" />
          </mask>

          {/* Checker pattern for flag background */}
          <pattern id="checker" x="0" y="0" width="36" height="36" patternUnits="userSpaceOnUse">
            <rect width="18" height="18" fill="white" opacity="0.045" />
            <rect x="18" y="18" width="18" height="18" fill="white" opacity="0.045" />
          </pattern>

          {/* Gold glow filter */}
          <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feFlood floodColor={GOLD} floodOpacity="0.5" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Speed lines gradient */}
          <linearGradient id="speedFade" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={GOLD} stopOpacity="0" />
            <stop offset="30%" stopColor={GOLD} stopOpacity="0.55" />
            <stop offset="100%" stopColor={GOLD} stopOpacity="0.08" />
          </linearGradient>

          <linearGradient id="speedFadeWhite" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="30%" stopColor="white" stopOpacity="0.2" />
            <stop offset="100%" stopColor="white" stopOpacity="0.03" />
          </linearGradient>

          {/* Track curve stroke gradient */}
          <linearGradient id="trackGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor={GOLD} stopOpacity="0.9" />
            <stop offset="60%"  stopColor={GOLD} stopOpacity="0.35" />
            <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
          </linearGradient>

          <linearGradient id="trackGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="white" stopOpacity="0.18" />
            <stop offset="60%"  stopColor="white" stopOpacity="0.06" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* === Waving checkered flag background === */}
        <g mask="url(#vigMask)" opacity="0.8">
          <rect width="520" height="800" fill="url(#checker)" />
        </g>

        {/* === Gold ambient glow === */}
        <ellipse cx="310" cy="420" rx="210" ry="240"
          fill={GOLD} opacity="0.07" />

        {/* === Racing track curves (the main visual) === */}
        <g mask="url(#vigMask)">

          {/* Outer track boundary — wide sweeping curve from top-right down */}
          <path
            d="M 520 0 C 440 120, 260 200, 300 380 C 340 560, 520 600, 480 800"
            fill="none"
            stroke="url(#trackGrad)"
            strokeWidth="2.5"
          />

          {/* Inner track boundary — tighter parallel curve */}
          <path
            d="M 520 60 C 430 160, 310 230, 340 400 C 370 570, 520 640, 520 800"
            fill="none"
            stroke="url(#trackGrad2)"
            strokeWidth="1.5"
          />

          {/* Track fill between curves */}
          <path
            d="M 520 0 C 440 120, 260 200, 300 380 C 340 560, 520 600, 480 800
               L 520 800 C 520 640, 370 570, 340 400 C 310 230, 430 160, 520 60 Z"
            fill={GOLD}
            opacity="0.035"
          />

          {/* Second inner track line for depth */}
          <path
            d="M 520 110 C 420 200, 360 260, 385 420 C 408 580, 520 680, 520 800"
            fill="none"
            stroke="white"
            strokeWidth="0.8"
            opacity="0.07"
          />

          {/* Small curved racing stripe at the top — like a hairpin */}
          <path
            d="M 380 30 C 340 80, 270 100, 280 160 C 290 220, 360 230, 380 290"
            fill="none"
            stroke={GOLD}
            strokeWidth="1.5"
            opacity="0.4"
          />

          {/* Track edge dashes (like road markings) */}
          {[0, 1, 2, 3, 4, 5, 6].map((i) => {
            const t = i / 7
            // Parametric points along the main curve
            const x = 520 + t * (300 - 520) + t * (1 - t) * 2 * (440 - 520)
            const y = t * 380 + t * (1 - t) * 2 * 120
            return (
              <rect
                key={i}
                x={x - 10}
                y={y}
                width="18"
                height="4"
                rx="2"
                fill="white"
                opacity={0.12 - i * 0.012}
                transform={`rotate(${-15 + i * 5}, ${x}, ${y + 2})`}
              />
            )
          })}

          {/* === Speed lines === */}
          {[100, 160, 220, 280, 340, 400, 460, 520, 560, 610, 655, 700].map((y, i) => (
            <line
              key={i}
              x1="0"
              y1={y}
              x2={80 + (i % 3) * 40}
              y2={y + 1}
              stroke="url(#speedFadeWhite)"
              strokeWidth={i % 4 === 0 ? 1.2 : 0.7}
            />
          ))}

          {/* A couple thicker gold speed lines for punch */}
          <line x1="0" y1="190" x2="120" y2="191"
            stroke="url(#speedFade)" strokeWidth="1.5" />
          <line x1="0" y1="310" x2="95" y2="311"
            stroke="url(#speedFade)" strokeWidth="1" />
          <line x1="0" y1="510" x2="140" y2="511"
            stroke="url(#speedFade)" strokeWidth="1.5" />

          {/* === Corner markers / apex dots === */}
          <circle cx="300" cy="382" r="4" fill={GOLD} opacity="0.7" filter="url(#goldGlow)" />
          <circle cx="340" cy="400" r="2.5" fill="white" opacity="0.35" />

          {/* Tire track marks near apex */}
          <path
            d="M 285 370 Q 295 378 300 382"
            fill="none"
            stroke={GOLD}
            strokeWidth="3"
            opacity="0.5"
            strokeLinecap="round"
          />
          <path
            d="M 292 367 Q 302 376 307 380"
            fill="none"
            stroke={GOLD}
            strokeWidth="2"
            opacity="0.28"
            strokeLinecap="round"
          />

        </g>

        {/* === Logo watermark (SVG embedded as image) === */}
        {/* We'll rely on the img tag below instead so the logo.png shows */}
      </svg>

      {/* Logo watermark as actual img — low opacity, large, right-center */}
      <motion.img
        src={logo}
        alt=""
        aria-hidden="true"
        className="absolute"
        style={{
          width: '72%',
          maxWidth: '420px',
          opacity: 0.13,
          bottom: '12%',
          right: '-4%',
          filter: 'grayscale(20%) brightness(1.15)',
          userSelect: 'none',
        }}
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 0.13, scale: 1 }}
        transition={{ delay: 0.7, duration: 1.1 }}
      />
    </motion.div>
  )
}

export default function Home() {
  return (
    <PageWrapper>
      {/* HERO */}
      <section className="relative min-h-screen flex flex-col justify-end overflow-hidden"
        style={{ background: '#0a0a0a' }}>

        {/* Grid */}
        <div className="absolute inset-0 pointer-events-none" style={gridBg} />

        {/* Left ambient glow */}
        <div className="absolute pointer-events-none" style={{
          left: '-10%', bottom: '-5%', width: '45%', aspectRatio: '1',
          background: `radial-gradient(circle, rgba(174,130,43,0.1) 0%, transparent 62%)`,
        }} />

        {/* Top checkered strip */}
        <div className="absolute top-0 inset-x-0 h-[3px] pointer-events-none" style={{
          background: 'repeating-linear-gradient(90deg, #fff 0, #fff 16px, #0a0a0a 16px, #0a0a0a 32px)',
          opacity: 0.2,
        }} />

        {/* Racing graphic — right half */}
        <RacingGraphic />

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto w-full px-5 sm:px-8 pb-14 pt-28 sm:pt-32">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 mb-8"
            style={{ borderColor: 'rgba(174,130,43,0.55)', background: 'rgba(174,130,43,0.09)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: GOLD }} />
            <span className="font-display font-bold tracking-[0.15em] uppercase"
              style={{ fontSize: '0.6rem', color: GOLD }}>
              First-Time Participants · GKDC 2027
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.55 }}
            className="font-display font-bold uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(3.2rem, 11vw, 7.5rem)' }}
          >
            <span className="block text-white">Track</span>
            <span className="block" style={{ color: GOLD }}>Titans</span>
            <span className="block text-white" style={{
              WebkitTextStroke: '1.5px rgba(255,255,255,0.18)',
              color: 'transparent',
            }}>On The Grid.</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.34, duration: 0.45 }}
            className="mt-4 font-body tracking-widest uppercase text-white/35"
            style={{ fontSize: '0.75rem' }}
          >
            Go Kart Design Challenge 2027 · <span style={{ color: GOLD }}>NIT Goa</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.45 }}
            className="mt-3 font-body text-white/45 max-w-sm leading-relaxed"
            style={{ fontSize: '0.85rem' }}
          >
            Full send. Building and racing a go-kart from scratch for GKDC 2027.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.45 }}
            className="flex flex-wrap gap-3 mt-8"
          >
            <Link to="/journey"
              className="inline-flex items-center gap-2 rounded-full font-display font-bold tracking-[0.1em] uppercase transition-colors hover:opacity-90"
              style={{ background: GOLD, color: '#0a0a0a', padding: '0.75rem 1.5rem', fontSize: '0.75rem' }}>
              Our Journey <ArrowRight size={14} />
            </Link>
            <Link to="/event"
              className="inline-flex items-center gap-2 rounded-full font-display font-bold tracking-[0.1em] uppercase transition-all hover:bg-white/5"
              style={{ border: '1px solid rgba(255,255,255,0.18)', color: 'white', padding: '0.75rem 1.5rem', fontSize: '0.75rem' }}>
              About GKDC
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.65, duration: 0.5 }}
            className="mt-12 pt-8 grid grid-cols-2 sm:grid-cols-4 gap-6"
            style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
          >
            {stats.map(({ num, suffix, label }) => (
              <div key={label}>
                <div className="font-display font-bold text-white leading-none"
                  style={{ fontSize: 'clamp(1.7rem, 4vw, 2.5rem)' }}>
                  {num}<span style={{ color: GOLD }}>{suffix}</span>
                </div>
                <div className="mt-2 font-body tracking-widest uppercase text-white/25"
                  style={{ fontSize: '0.6rem' }}>
                  {label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CARDS SECTION */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-20">
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-body tracking-[0.25em] uppercase text-white/25 mb-8"
          style={{ fontSize: '0.62rem' }}
        >
          Explore
        </motion.p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map(({ to, icon, title, desc }, i) => (
            <motion.div
              key={to}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.45 }}
            >
              <Link
                to={to}
                className="group flex flex-col h-full p-5 rounded-2xl transition-all duration-250"
                style={{
                  background: '#141414',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = `rgba(174,130,43,0.35)`
                  e.currentTarget.style.background = 'rgba(174,130,43,0.06)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                  e.currentTarget.style.background = '#141414'
                }}
              >
                <div className="text-2xl mb-4">{icon}</div>
                <div className="font-display font-bold uppercase tracking-wide text-white mb-2"
                  style={{ fontSize: '0.82rem' }}>
                  {title}
                </div>
                <p className="font-body text-white/38 leading-relaxed flex-1"
                  style={{ fontSize: '0.78rem' }}>
                  {desc}
                </p>
                <div className="mt-4 flex items-center gap-1.5 font-body font-semibold tracking-widest uppercase transition-all group-hover:gap-2.5"
                  style={{ fontSize: '0.62rem', color: GOLD }}>
                  Explore <ArrowRight size={11} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </PageWrapper>
  )
}