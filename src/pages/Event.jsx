import { motion } from 'framer-motion'
import PageWrapper from '../components/PageWrapper'

const GOLD = '#AE822B'

const phases = [
  { num: '01', name: 'Registration & Eligibility', desc: 'Team registration with GKDC governing body and document verification.', status: 'done' },
  { num: '02', name: 'Design Submission',           desc: 'CAD models, FEA analysis reports, and cost report submission.', status: 'done' },
  { num: '03', name: 'Virtual Technical Round',     desc: 'Online design presentation and judging panel evaluation.', status: 'active' },
  { num: '04', name: 'Physical Scrutineering',      desc: 'On-site safety inspection, weight check, and technical compliance.', status: 'upcoming' },
  { num: '05', name: 'Race Day',                    desc: 'Endurance run, acceleration, skid pad, and autocross events.', status: 'upcoming' },
]

const statusMap = {
  done:     { label: 'Complete',    bg: 'rgba(34,197,94,0.08)',   color: '#4ade80',        border: 'rgba(34,197,94,0.2)' },
  active:   { label: 'In Progress', bg: 'rgba(174,130,43,0.1)',   color: GOLD,             border: 'rgba(174,130,43,0.35)' },
  upcoming: { label: 'Upcoming',    bg: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.25)', border: 'rgba(255,255,255,0.1)' },
}

const diagonalBg = {
  backgroundImage: `repeating-linear-gradient(-45deg, ${GOLD} 0px, ${GOLD} 1px, transparent 1px, transparent 60px)`,
  opacity: 0.025,
}

export default function Event() {
  return (
    <PageWrapper>
      {/* Header */}
      <div className="relative pt-28 pb-12 px-5 sm:px-8 overflow-hidden" style={{ background: '#0a0a0a' }}>
        <div className="absolute inset-0 pointer-events-none" style={diagonalBg} />
        <div className="max-w-6xl mx-auto relative z-10">
          <p className="font-body tracking-[0.2em] uppercase mb-3" style={{ fontSize: '0.65rem', color: GOLD }}>
            The Competition
          </p>
          <h1 className="font-display font-bold uppercase text-white leading-none"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}>
            GKDC<br />2025
          </h1>
          <p className="mt-4 font-body text-white/40 max-w-lg leading-relaxed" style={{ fontSize: '0.85rem' }}>
            Go Kart Design Challenge,India's most rigorous student motorsport competition.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start mb-16">
          {/* Left: what is GKDC */}
          <motion.div
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
          >
            <h2 className="font-display font-bold uppercase text-white leading-tight tracking-tight mb-5"
              style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}>
              What is<br /><span style={{ color: GOLD }}>GKDC?</span>
            </h2>
            <p className="font-body text-white/45 leading-relaxed mb-4" style={{ fontSize: '0.85rem' }}>
              The Go Kart Design Challenge is an SAE India initiative that tasks student teams with designing, fabricating, and racing a single-seater go-kart from scratch. Teams are evaluated across engineering design, cost efficiency, and on-track performance.
            </p>
            <p className="font-body text-white/45 leading-relaxed mb-6" style={{ fontSize: '0.85rem' }}>
              For Track Titans, GKDC 2025 marks NIT Goa's first-ever entry into competitive collegiate motorsport, built entirely by students.
            </p>
            <div className="pl-4 py-2 rounded-r-lg" style={{
              borderLeft: `2px solid ${GOLD}`, background: 'rgba(174,130,43,0.06)',
            }}>
              <p className="font-body text-white/60 leading-relaxed" style={{ fontSize: '0.8rem' }}>
                <span style={{ color: GOLD, fontWeight: 600 }}>Organised by SAE India</span>, the same body behind BAJA SAE and Formula Bharat.
              </p>
            </div>
          </motion.div>

          {/* Right: phases */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="flex flex-col gap-2.5"
          >
            {phases.map(({ num, name, desc, status }, i) => {
              const s = statusMap[status]
              return (
                <motion.div
                  key={num}
                  initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.35 }}
                  className="flex items-start gap-3 p-3.5 rounded-xl"
                  style={{ background: '#1c1c1c', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: 'rgba(174,130,43,0.1)', border: `1px solid rgba(174,130,43,0.28)` }}>
                    <span className="font-display font-bold" style={{ fontSize: '0.58rem', color: GOLD }}>{num}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
                      <span className="font-display font-bold tracking-wide uppercase text-white" style={{ fontSize: '0.72rem' }}>
                        {name}
                      </span>
                      <span className="font-display font-bold tracking-widest uppercase px-2 py-0.5 rounded-sm"
                        style={{ fontSize: '0.52rem', background: s.bg, color: s.color, border: `1px solid ${s.border}` }}>
                        {s.label}
                      </span>
                    </div>
                    <p className="font-body text-white/32 leading-relaxed" style={{ fontSize: '0.72rem' }}>{desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* Snapshot */}
        <div className="pt-12" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="font-body tracking-[0.2em] uppercase text-white/25 mb-5" style={{ fontSize: '0.6rem' }}>
            Competition Snapshot
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Organiser', value: 'SAE India' },
              { label: 'Format',    value: 'Design + Race' },
              { label: 'Venue',     value: 'TBA' },
              { label: 'Category',  value: 'Collegiate' },
            ].map(({ label, value }) => (
              <div key={label} className="p-4 rounded-xl"
                style={{ background: '#1c1c1c', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="font-body tracking-widest uppercase text-white/22 mb-2" style={{ fontSize: '0.58rem' }}>{label}</div>
                <div className="font-display font-bold uppercase tracking-wide text-white" style={{ fontSize: '0.82rem' }}>{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
