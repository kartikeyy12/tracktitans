import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import GlobalBackground from './components/GlobalBackground'
import IntroLoader from './components/IntroLoader'
import Home from './pages/Home'
import Event from './pages/Event'
import Team from './pages/Team'
import Journey from './pages/Journey'
import Join from './pages/Join'

const CHECKER_BW = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Crect width='16' height='16' fill='%23ffffff'/%3E%3Crect x='16' y='0' width='16' height='16' fill='%23000000'/%3E%3Crect x='0' y='16' width='16' height='16' fill='%23000000'/%3E%3Crect x='16' y='16' width='16' height='16' fill='%23ffffff'/%3E%3C/svg%3E`

function CheckeredWipe({ isVisible }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="wipe"
          style={{ position: 'fixed', inset: 0, zIndex: 500, pointerEvents: 'none', overflow: 'hidden' }}
        >
          <motion.div
            style={{
              position: 'absolute', inset: 0,
              backgroundImage: `url("${CHECKER_BW}")`,
              backgroundRepeat: 'repeat',
              backgroundSize: '32px 32px',
            }}
            initial={{ x: '-100%' }}
            animate={{ x: ['-100%', '0%', '0%', '100%'] }}
            transition={{ times: [0, 0.36, 0.64, 1], duration: 0.62, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            style={{ position: 'absolute', inset: 0, background: '#000000' }}
            initial={{ x: '-100%' }}
            animate={{ x: ['-100%', '0%', '0%', '100%'] }}
            transition={{ times: [0, 0.38, 0.62, 1], duration: 0.62, delay: 0.06, ease: [0.76, 0, 0.24, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const contentVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut', delay: 0.08 } },
  exit:    { opacity: 0,       transition: { duration: 0.12, ease: 'easeIn' } },
}

function AnimatedRoutes() {
  const location = useLocation()
  const [wiping, setWiping] = useState(false)
  const [displayLocation, setDisplayLocation] = useState(location)

  useEffect(() => {
    if (location.pathname === displayLocation.pathname) return
    setWiping(true)
    const swap = setTimeout(() => setDisplayLocation(location), 310)
    const done = setTimeout(() => setWiping(false), 700)
    return () => { clearTimeout(swap); clearTimeout(done) }
  }, [location.pathname])

  return (
    <>
      <CheckeredWipe isVisible={wiping} />
      <AnimatePresence mode="wait">
        <motion.div
          key={displayLocation.pathname}
          variants={contentVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <Routes location={displayLocation} key={displayLocation.pathname}>
            <Route path="/"        element={<Home />} />
            <Route path="/event"   element={<Event />} />
            <Route path="/team"    element={<Team />} />
            <Route path="/journey" element={<Journey />} />
            <Route path="/join"    element={<Join />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </>
  )
}

export default function App() {
  const [showIntro, setShowIntro]       = useState(false)
  const [introComplete, setIntroComplete] = useState(false)

  useEffect(() => {
    const already = sessionStorage.getItem('tt_intro_shown')
    if (already) {
      setIntroComplete(true)
    } else {
      setShowIntro(true)
    }
  }, [])

  const handleIntroComplete = () => {
    sessionStorage.setItem('tt_intro_shown', '1')
    // Start fading in the homepage at the same moment IntroLoader starts fading out
    setIntroComplete(true)
  }

  return (
    <BrowserRouter>
      <GlobalBackground />

      {showIntro && (
        <IntroLoader onComplete={handleIntroComplete} />
      )}

      {/* Homepage fades in from black — matches the IntroLoader's black canvas exactly */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          opacity: introComplete ? 1 : 0,
          transition: introComplete ? 'opacity 0.45s ease-out' : 'none',
        }}
      >
        <Navbar />
        <AnimatedRoutes />
        <Footer />
      </div>
    </BrowserRouter>
  )
}