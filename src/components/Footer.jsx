import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

const GOLD = '#AE822B'
const BG = '#0a0a0a'

const links = [
  { to: '/', label: 'Home' },
  { to: '/event', label: 'Event' },
  { to: '/team', label: 'Team' },
  { to: '/journey', label: 'Journey' },
  { to: '/join', label: 'Join Us' },
]

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: BG }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <img src={logo} alt="Track Titans" className="w-8 h-8 object-contain shrink-0" />
              <span className="font-display font-bold tracking-[0.12em] uppercase text-white"
                style={{ fontSize: '0.75rem' }}>
                Track<span style={{ color: GOLD }}>Titans</span>
              </span>
            </div>
            <p className="font-body tracking-widest uppercase text-white/20" style={{ fontSize: '0.6rem' }}>
              NIT Goa, GKDC 2027 Debut Season
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {links.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="font-body font-medium tracking-widest uppercase text-white/25 hover:text-white/60 transition-colors"
                style={{ fontSize: '0.65rem' }}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2"
          style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <p className="font-body text-white/20" style={{ fontSize: '0.6rem' }}>
            © 2027 Track Titans, NIT Goa. All rights reserved.
          </p>
          <p className="font-body text-white/20" style={{ fontSize: '0.6rem' }}>
            Built for <span style={{ color: 'rgba(174,130,43,0.6)' }}>GKDC 2027</span>
          </p>
        </div>
      </div>
    </footer>
  )
}