import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import PageWrapper from '../components/PageWrapper'
import logo from '../assets/logo.png'

const GOLD = '#C8960C'

const cards = [
  { to: '/event',   icon: '🏁', title: 'The Event',   desc: "Competing in GKDC 2027, India's premier intercollegiate go-kart design and race challenge." },
  { to: '/team',    icon: '👥', title: 'The Team',    desc: '25+ students across six specialist sub-teams, all from NIT Goa Mechanical Engineering.' },
  { to: '/journey', icon: '📍', title: 'Our Journey', desc: 'From zero to race-ready: every milestone of our debut season, documented.' },
  { to: '/join',    icon: '⚡', title: 'Join Us',     desc: "Passionate about motorsport or engineering? We're always looking for driven people." },
]

const stats = [
  { num: '1',   suffix: 'ST',  label: 'Best Hyperdrive' },
  { num: '1',   suffix: '',    label: 'Days to Build' },
  { num: '100', suffix: '%',   label: 'Student Built' },
  { num: '∞',   suffix: '',    label: 'Adrenaline' },
]

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export default function Home() {
  // True if this is NOT the first time Home is rendered this session
  const isReturn = useRef(!!sessionStorage.getItem('tt_home_visited'))

  useEffect(() => {
    sessionStorage.setItem('tt_home_visited', '1')
  }, [])

  // On return visits, skip all entry animations by jumping straight to final state
  const heroInitial    = isReturn.current ? 'show'   : 'hidden'
  const logoInitial    = isReturn.current ? { opacity: 0.32, scale: 1 } : { opacity: 0, scale: 0.92 }
  const logoAnimate    = { opacity: 0.32, scale: 1 }
  const logoTransition = isReturn.current ? { duration: 0 } : { delay: 0.5, duration: 1.0 }

  return (
    <PageWrapper>
      <section
        className="relative min-h-screen flex flex-col justify-end overflow-hidden"
        style={{ background: 'transparent' }}
      >
        <motion.img
          src={logo}
          alt=""
          aria-hidden="true"
          initial={logoInitial}
          animate={logoAnimate}
          transition={logoTransition}
          style={{
            position: 'absolute',
            right: '3%',
            bottom: '8%',
            width: 'clamp(200px, 32vw, 420px)',
            opacity: 0.32,
            filter: 'brightness(1.1) contrast(0.9)',
            userSelect: 'none',
            pointerEvents: 'none',
            zIndex: 1,
          }}
          className="logo-watermark"
        />

        <div style={{
          position: 'absolute',
          left: 0, top: '15%', bottom: '15%',
          width: '3px',
          background: `linear-gradient(to bottom, transparent, ${GOLD}, transparent)`,
          opacity: 0.5,
        }} />

        <svg
          viewBox="0 0 180 600"
          style={{
            position: 'absolute',
            left: 0, top: 0,
            width: 'clamp(80px, 12vw, 180px)',
            height: '100%',
            pointerEvents: 'none',
            opacity: 0.6,
          }}
          preserveAspectRatio="xMinYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="leftFade" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={GOLD} stopOpacity="0.45" />
              <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
            </linearGradient>
            <linearGradient id="leftFadeW" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="white" stopOpacity="0.15" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[80,140,200,270,340,420,490,530].map((y, i) => (
            <line key={i}
              x1="0" y1={y} x2={60 + (i % 3) * 25} y2={y + 0.5}
              stroke={i % 4 === 0 ? 'url(#leftFade)' : 'url(#leftFadeW)'}
              strokeWidth={i % 4 === 0 ? 1.5 : 0.8}
            />
          ))}
          {[100, 200, 310, 430].map((y, i) => (
            <rect key={i} x="0" y={y} width="12" height="2" rx="1"
              fill={GOLD} opacity={0.4 - i * 0.06} />
          ))}
        </svg>

        <motion.div
          className="relative z-10 max-w-6xl mx-auto w-full px-5 sm:px-8 pb-14 pt-28 sm:pt-32"
          variants={containerVariants}
          initial={heroInitial}
          animate="show"
        >
          <motion.div variants={itemVariants}
            className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 mb-8"
            style={{ borderColor: `${GOLD}88`, background: `${GOLD}17` }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: GOLD }} />
            <span className="font-display font-bold tracking-[0.15em] uppercase"
              style={{ fontSize: '0.6rem', color: GOLD }}>
              GKDC 2027 · First-Time Participants
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="font-display font-bold uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(3.2rem, 11vw, 7.5rem)' }}
          >
            <span className="block text-white">Track</span>
            <span className="block" style={{ color: GOLD }}>Titans</span>
            <span className="block" style={{
              WebkitTextStroke: '1.5px rgba(255,255,255,0.22)',
              color: 'transparent',
            }}>On The Grid.</span>
          </motion.h1>

          <motion.p variants={itemVariants}
            className="mt-4 font-body tracking-widest uppercase text-white/35"
            style={{ fontSize: '0.75rem' }}
          >
            Go Kart Design Challenge 2027 · <span style={{ color: GOLD }}>NIT Goa</span>
          </motion.p>

          <motion.p variants={itemVariants}
            className="mt-3 font-body text-white/45 max-w-sm leading-relaxed"
            style={{ fontSize: '0.85rem' }}
          >
            First-timers, full send. Building and racing through GKDC 2027.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mt-8">
            <Link to="/journey"
              className="inline-flex items-center gap-2 rounded-full font-display font-bold tracking-[0.1em] uppercase transition-all hover:opacity-90 hover:scale-[1.02]"
              style={{ background: GOLD, color: '#0a0a0a', padding: '0.75rem 1.5rem', fontSize: '0.75rem' }}>
              Follow Our Journey <FiArrowRight size={14} />
            </Link>
            <Link to="/event"
              className="inline-flex items-center gap-2 rounded-full font-display font-bold tracking-[0.1em] uppercase transition-all hover:bg-white/8"
              style={{ border: '1px solid rgba(255,255,255,0.18)', color: 'white', padding: '0.75rem 1.5rem', fontSize: '0.75rem' }}>
              About GKDC
            </Link>
          </motion.div>

          <motion.div
            variants={itemVariants}
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
        </motion.div>
      </section>

      <style>{`
        @media (max-width: 640px) {
          .logo-watermark {
            width: clamp(130px, 42vw, 220px) !important;
            right: -2% !important;
            bottom: 22% !important;
            opacity: 0.22 !important;
          }
        }
      `}</style>

      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-20" style={{ position: 'relative', zIndex: 1 }}>
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
                  background: 'rgba(20,20,20,0.75)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  backdropFilter: 'blur(8px)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = `${GOLD}61`
                  e.currentTarget.style.background = `${GOLD}14`
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                  e.currentTarget.style.background = 'rgba(20,20,20,0.75)'
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
                  Explore <FiArrowRight size={11} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </PageWrapper>
  )
}