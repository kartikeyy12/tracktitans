// IntroLoader.jsx — first-visit loading animation
// Drop into src/components/IntroLoader.jsx

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import logo from '../assets/logo.png'

const GOLD = '#AE822B'

const checker = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Crect width='16' height='16' fill='white' opacity='0.2'/%3E%3Crect x='16' y='16' width='16' height='16' fill='white' opacity='0.2'/%3E%3C/svg%3E`

export default function IntroLoader({ onDone }) {
  const [phase, setPhase] = useState('logo')  // 'logo' → 'wipe' → 'done'

  useEffect(() => {
    // Show logo for 1.4s, then wipe out
    const t1 = setTimeout(() => setPhase('wipe'), 1400)
    // Tell parent we're done after wipe completes (~0.55s)
    const t2 = setTimeout(() => { setPhase('done'); onDone?.() }, 1950)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          key="intro"
          exit={{ opacity: 0 }}
          transition={{ duration: 0 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            background: '#0a0a0a',
            overflow: 'hidden',
          }}
        >
          {/* Checkered bg */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url("${checker}")`,
            backgroundRepeat: 'repeat',
            opacity: 0.04,
          }} />

          {/* Logo + text */}
          <AnimatePresence>
            {phase === 'logo' && (
              <motion.div
                key="logo-content"
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.06 }}
                transition={{ duration: 0.42, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.2rem' }}
              >
                <img
                  src={logo}
                  alt="Track Titans"
                  style={{ width: 'clamp(100px, 22vw, 160px)', userSelect: 'none' }}
                />
                {/* Animated progress line */}
                <motion.div
                  style={{
                    width: '120px', height: '2px',
                    background: 'rgba(255,255,255,0.08)',
                    borderRadius: '2px',
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: '0%' }}
                    transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.2 }}
                    style={{
                      position: 'absolute', inset: 0,
                      background: `linear-gradient(90deg, ${GOLD}, rgba(174,130,43,0.4))`,
                    }}
                  />
                </motion.div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  style={{
                    fontFamily: 'Syncopate, sans-serif',
                    fontWeight: 700,
                    fontSize: '0.55rem',
                    letterSpacing: '0.3em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.28)',
                  }}
                >
                  NIT Goa · GKDC 2027
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Exit wipe — two panels sweep right */}
          {phase === 'wipe' && (
            <>
              {/* Black panel */}
              <motion.div
                key="wipe-black"
                initial={{ x: 0 }}
                animate={{ x: '100%' }}
                transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                style={{ position: 'absolute', inset: 0, background: '#0a0a0a', zIndex: 2 }}
              />
              {/* Gold checker panel slightly behind */}
              <motion.div
                key="wipe-gold"
                initial={{ x: 0 }}
                animate={{ x: '100%' }}
                transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
                style={{
                  position: 'absolute', inset: 0, zIndex: 1,
                  background: '#1a1005',
                  backgroundImage: `url("${checker}")`,
                  backgroundRepeat: 'repeat',
                }}
              />
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
