import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Event from './pages/Event'
import Team from './pages/Team'
import Journey from './pages/Journey'
import Join from './pages/Join'

const GOLD = '#AE822B'
const checkerDataUrl = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Crect width='16' height='16' fill='white' opacity='0.15'/%3E%3Crect x='16' y='16' width='16' height='16' fill='white' opacity='0.15'/%3E%3C/svg%3E`

// The wipe animation: dark panel then gold checker slides in → then both slide out right
// Total duration felt: ~0.6s. Fast enough to feel snappy, slow enough to feel intentional.
function CheckeredWipe({ isVisible }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="wipe-overlay"
          className="fixed inset-0 z-[200] pointer-events-none overflow-hidden"
        >
          {/* Panel 1 — black base */}
          <motion.div
            className="absolute inset-0"
            style={{ background: '#0a0a0a', originX: 0 }}
            initial={{ x: '-100%' }}
            animate={{ x: ['−100%', '0%', '0%', '100%'] }}
            transition={{
              times: [0, 0.35, 0.65, 1],
              duration: 0.68,
              ease: [0.76, 0, 0.24, 1],
            }}
          />
          {/* Panel 2 — gold checker, offset by 50ms */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: GOLD,
              backgroundImage: `url("${checkerDataUrl}")`,
              backgroundRepeat: 'repeat',
            }}
            initial={{ x: '-100%' }}
            animate={{ x: ['-100%', '0%', '0%', '100%'] }}
            transition={{
              times: [0, 0.38, 0.62, 1],
              duration: 0.68,
              delay: 0.055,
              ease: [0.76, 0, 0.24, 1],
            }}
          />
          {/* Speed lines for motion feel */}
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(
                90deg,
                transparent 0px, transparent 46px,
                rgba(0,0,0,0.25) 46px, rgba(0,0,0,0.25) 48px
              )`,
            }}
            initial={{ x: '-100%' }}
            animate={{ x: ['-100%', '0%', '0%', '100%'] }}
            transition={{
              times: [0, 0.38, 0.62, 1],
              duration: 0.68,
              delay: 0.055,
              ease: [0.76, 0, 0.24, 1],
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  const [wiping, setWiping] = useState(false)
  const [pendingPath, setPendingPath] = useState(null)
  const [displayLocation, setDisplayLocation] = useState(location)

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setWiping(true)
      setPendingPath(location)
      // Swap the page at the midpoint (panels fully covering screen)
      const t = setTimeout(() => {
        setDisplayLocation(location)
      }, 340)
      // Remove wipe after animation completes
      const t2 = setTimeout(() => {
        setWiping(false)
        setPendingPath(null)
      }, 750)
      return () => { clearTimeout(t); clearTimeout(t2) }
    }
  }, [location.pathname])

  return (
    <>
      <CheckeredWipe isVisible={wiping} />
      <AnimatePresence mode="wait">
        <Routes location={displayLocation} key={displayLocation.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/event" element={<Event />} />
          <Route path="/team" element={<Team />} />
          <Route path="/journey" element={<Journey />} />
          <Route path="/join" element={<Join />} />
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AnimatedRoutes />
      <Footer />
    </BrowserRouter>
  )
}