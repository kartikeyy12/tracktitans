import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FiMenu, FiX } from "react-icons/fi"
import { motion, AnimatePresence } from 'framer-motion'
import logo from '../assets/logo.png'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/event', label: 'Event' },
  { to: '/team', label: 'Team' },
  { to: '/journey', label: 'Journey' },
]

const GOLD = '#AE822B'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const close = () => setMenuOpen(false)

  return (
    <>
      <header
        className="fixed top-0 inset-x-0 z-50 h-16 flex items-center transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(10,10,10,0.96)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        }}
      >
        <div className="w-full max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          <Link to="/" onClick={close} className="flex items-center gap-2.5">
            <motion.img
              src={logo}
              alt="Track Titans"
              className="w-9 h-9 object-contain shrink-0"
              whileHover={{ rotate: -6, scale: 1.06 }}
              transition={{ type: 'spring', stiffness: 300, damping: 12 }}
            />
            <span className="font-display font-bold tracking-[0.12em] uppercase text-white"
              style={{ fontSize: '0.8rem' }}>
              Track<span style={{ color: GOLD }}>Titans</span>
              <span className="text-white/40">-NITGoa</span>
            </span>
          </Link>

          {/* Desktop */}
          <nav className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `font-body font-semibold tracking-[0.12em] uppercase transition-colors duration-200 ${
                    isActive ? 'text-[#AE822B]' : 'text-white/40 hover:text-white'
                  }`
                }
                style={{ fontSize: '0.7rem' }}
              >
                {label}
              </NavLink>
            ))}
            <Link
              to="/join"
              className="ml-2 inline-flex items-center rounded-full font-display font-bold tracking-[0.1em] uppercase transition-colors"
              style={{
                border: `1px solid ${GOLD}`,
                color: GOLD,
                background: 'rgba(174,130,43,0.1)',
                padding: '0.35rem 1rem',
                fontSize: '0.65rem',
              }}
            >
              Join Us
            </Link>
          </nav>

          {/* Burger */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-white transition-colors hover:bg-white/5"
            aria-label="Toggle navigation"
          >
            {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-40 md:hidden flex flex-col"
            style={{ background: 'rgba(10,10,10,0.98)', backdropFilter: 'blur(16px)' }}
          >
            <div className="pt-20 px-6 flex flex-col flex-1 items-center">
              <motion.img
                src={logo}
                alt="Track Titans"
                className="w-24 h-24 object-contain mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              />
              <nav className="flex flex-col w-full">
                {[...NAV_LINKS, { to: '/join', label: 'Join Us' }].map(({ to, label }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={to === '/'}
                    onClick={close}
                    className={({ isActive }) =>
                      `py-5 text-center font-display font-bold tracking-[0.15em] uppercase transition-colors border-b ${
                        isActive ? 'text-[#AE822B]' : 'text-white/60 hover:text-white'
                      }`
                    }
                    style={{ fontSize: '0.85rem', borderColor: 'rgba(255,255,255,0.05)' }}
                  >
                    {label}
                  </NavLink>
                ))}
              </nav>
              <div className="mt-auto pb-10 text-center font-body tracking-widest uppercase text-white/15"
                style={{ fontSize: '0.6rem' }}>
                NIT Goa · GKDC 2027
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}