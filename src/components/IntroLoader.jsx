// IntroLoader.jsx — premium logo reveal + B&W checkered flag wipe
// src/components/IntroLoader.jsx

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import logo from '../assets/logo.png'

const GOLD = '#AE822B'

// True black-and-white checker — alternating squares, NOT semi-transparent
const CHECKER_BW = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect width='20' height='20' fill='%23ffffff'/%3E%3Crect x='20' y='0' width='20' height='20' fill='%23000000'/%3E%3Crect x='0' y='20' width='20' height='20' fill='%23000000'/%3E%3Crect x='20' y='20' width='20' height='20' fill='%23ffffff'/%3E%3C/svg%3E`

export default function IntroLoader({ onDone }) {
  // phase: 'reveal' → 'hold' → 'wipe' → 'done'
  const [phase, setPhase] = useState('reveal')
  const [progress, setProgress] = useState(0)
  const rafRef = useRef(null)
  const startRef = useRef(null)

  // Animate progress bar: 0→100% over 1000ms with easeOut
  useEffect(() => {
    const duration = 1000
    const animate = (timestamp) => {
      if (!startRef.current) startRef.current = timestamp
      const elapsed = timestamp - startRef.current
      const t = Math.min(elapsed / duration, 1)
      // easeOut cubic
      const eased = 1 - Math.pow(1 - t, 3)
      setProgress(eased * 100)
      if (t < 1) {
        rafRef.current = requestAnimationFrame(animate)
      }
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  // Timeline
  useEffect(() => {
    // Logo fully visible at 0.3s
    // Progress bar completes at ~1.1s
    // Hold briefly, then wipe out
    const t1 = setTimeout(() => setPhase('hold'), 1300)
    const t2 = setTimeout(() => setPhase('wipe'), 1600)
    const t3 = setTimeout(() => { setPhase('done'); onDone?.() }, 2200)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  if (phase === 'done') return null

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: '#0a0a0a',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden',
    }}>

      {/* Subtle grid bg */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `
          repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(255,255,255,0.012) 79px, rgba(255,255,255,0.012) 80px),
          repeating-linear-gradient(0deg,  transparent, transparent 79px, rgba(255,255,255,0.012) 79px, rgba(255,255,255,0.012) 80px)
        `,
      }} />

      {/* Main content — logo + progress */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: phase === 'reveal' || phase === 'hold' ? 1 : 0, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: '2rem',
          position: 'relative', zIndex: 2,
        }}
      >
        {/* Logo */}
        <img
          src={logo}
          alt="Track Titans"
          style={{
            width: 'clamp(90px, 18vw, 140px)',
            userSelect: 'none',
            filter: 'drop-shadow(0 0 30px rgba(174,130,43,0.2))',
          }}
        />

        {/* Progress bar container */}
        <div style={{
          width: 'clamp(160px, 28vw, 240px)',
          display: 'flex', flexDirection: 'column', gap: '0.6rem',
          alignItems: 'center',
        }}>
          {/* Label */}
          <p style={{
            fontFamily: "'Syncopate', 'Rajdhani', sans-serif",
            fontSize: '0.5rem',
            fontWeight: 700,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.22)',
            margin: 0,
          }}>
            NIT Goa · GKDC 2027
          </p>

          {/* Track */}
          <div style={{
            width: '100%', height: '2px',
            background: 'rgba(255,255,255,0.07)',
            borderRadius: '2px',
            overflow: 'hidden',
            position: 'relative',
          }}>
            {/* Fill */}
            <div style={{
              position: 'absolute', left: 0, top: 0, bottom: 0,
              width: `${progress}%`,
              background: `linear-gradient(90deg, ${GOLD}, rgba(174,130,43,0.5))`,
              transition: 'width 16ms linear',
              borderRadius: '2px',
            }} />
            {/* Glint — tiny bright dot at leading edge */}
            <div style={{
              position: 'absolute', top: '-1px', bottom: '-1px',
              left: `calc(${progress}% - 3px)`,
              width: '6px',
              background: 'rgba(255,255,255,0.7)',
              borderRadius: '3px',
              filter: 'blur(1px)',
              transition: 'left 16ms linear',
              opacity: progress > 2 && progress < 99 ? 1 : 0,
            }} />
          </div>

          {/* Percentage */}
          <p style={{
            fontFamily: "'Syncopate', sans-serif",
            fontSize: '0.48rem',
            fontWeight: 700,
            letterSpacing: '0.2em',
            color: 'rgba(174,130,43,0.6)',
            margin: 0,
          }}>
            {Math.round(progress)}%
          </p>
        </div>
      </motion.div>

      {/* ── CHECKER FLAG WIPE ── */}
      {/* Phase 1: black panel sweeps from left, covering everything */}
      <AnimatePresence>
        {phase === 'wipe' && (
          <>
            {/* Checker tiles — front panel */}
            <motion.div
              key="checker-panel"
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              transition={{ duration: 0.32, ease: [0.76, 0, 0.24, 1] }}
              style={{
                position: 'absolute', inset: 0, zIndex: 10,
                backgroundImage: `url("${CHECKER_BW}")`,
                backgroundRepeat: 'repeat',
                backgroundSize: '40px 40px',
              }}
            />
            {/* Solid black — behind checker, exits later to wipe to site */}
            <motion.div
              key="black-panel"
              initial={{ x: '-100%' }}
              animate={{ x: ['−100%', '0%', '100%'] }}
              transition={{
                times: [0, 0.42, 1],
                duration: 0.58,
                delay: 0.05,
                ease: [0.76, 0, 0.24, 1],
              }}
              style={{
                position: 'absolute', inset: 0, zIndex: 9,
                background: '#0a0a0a',
              }}
            />
            {/* Checker exits right — flag waves off screen */}
            <motion.div
              key="checker-exit"
              initial={{ x: '0%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 0.34, delay: 0.28, ease: [0.76, 0, 0.24, 1] }}
              style={{
                position: 'absolute', inset: 0, zIndex: 11,
                backgroundImage: `url("${CHECKER_BW}")`,
                backgroundRepeat: 'repeat',
                backgroundSize: '40px 40px',
              }}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
