import { motion } from 'framer-motion'
import PageWrapper from '../components/PageWrapper'

const GOLD = '#AE822B'

const milestones = [
  { date: 'Sep 2024', title: 'Team Formation',         desc: 'Track Titans officially formed at NIT Goa. Core leadership assembled, mission defined.',                                  done: true },
  { date: 'Oct 2024', title: 'Conceptual Design',      desc: 'Initial CAD models, load calculations, and chassis concept finalised in SolidWorks.',                                    done: true },
  { date: 'Nov 2024', title: 'GKDC Registration',      desc: 'Official registration submitted to SAE India for GKDC 2025. Team eligibility confirmed.',                                 done: true },
  { date: 'Jan 2025', title: 'Design Report Submitted', desc: 'Full design report with FEA simulations, cost report, and CAD package delivered to GKDC.',                              done: true },
  { date: 'Mar 2025', title: 'Virtual Technical Round', desc: 'Live presentation to GKDC judges covering design decisions, FEA analysis, and innovation points.', done: false, active: true },
  { date: 'Apr 2025', title: 'Fabrication Begins',      desc: 'Frame cutting, welding, and component sourcing begins in the NIT Goa workshop.',                                        done: false },
  { date: 'Jun 2025', title: 'Race Day',                desc: 'Track Titans takes the kart to the event, scrutineering, track sessions, and the results that matter.',                done: false },
]

export default function Journey() {
  return (
    <PageWrapper>
      <div className="relative pt-28 pb-12 px-5 sm:px-8 overflow-hidden" style={{ background: '#0a0a0a' }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `repeating-linear-gradient(-45deg, ${GOLD} 0px, ${GOLD} 1px, transparent 1px, transparent 60px)`,
          opacity: 0.025,
        }} />
        <div className="max-w-6xl mx-auto relative z-10">
          <p className="font-body tracking-[0.2em] uppercase mb-3" style={{ fontSize: '0.65rem', color: GOLD }}>
            Season Log
          </p>
          <h1 className="font-display font-bold uppercase text-white leading-none"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}>
            Our<br />Journey
          </h1>
          <p className="mt-4 font-body text-white/40 max-w-lg leading-relaxed" style={{ fontSize: '0.85rem' }}>
            Every milestone from day one to race day.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-5 sm:px-8 py-14">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute top-0 bottom-0 pointer-events-none" style={{
            left: '0.4rem', width: '1px',
            background: `linear-gradient(to bottom, ${GOLD}, rgba(174,130,43,0.06))`,
          }} />

          <div className="flex flex-col gap-9 pl-8">
            {milestones.map(({ date, title, desc, done, active }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.38 }}
                className="relative"
                style={{ opacity: !done && !active ? 0.38 : 1 }}
              >
                {/* Dot */}
                <div
                  className="absolute rounded-full"
                  style={{
                    left: '-2.2rem', top: '0.25rem',
                    width: '0.85rem', height: '0.85rem',
                    background: done ? GOLD : active ? 'rgba(174,130,43,0.4)' : '#1c1c1c',
                    border: `2px solid ${done ? GOLD : active ? 'rgba(174,130,43,,0.6)' : 'rgba(174,130,43,0.25)'}`,
                    boxShadow: active ? `0 0 10px rgba(174,130,43,0.3)` : 'none',
                  }}
                >
                  {active && (
                    <span className="absolute inset-0 rounded-full animate-ping"
                      style={{ background: 'rgba(174,130,43,0.35)' }} />
                  )}
                </div>

                <div className="font-display font-bold tracking-[0.18em] uppercase mb-1.5 flex items-center gap-2"
                  style={{ fontSize: '0.6rem', color: GOLD }}>
                  {date}
                  {active && (
                    <span className="px-1.5 py-0.5 rounded font-display font-bold tracking-widest uppercase"
                      style={{ fontSize: '0.5rem', background: 'rgba(174,130,43,0.15)', border: `1px solid rgba(174,130,43,0.4)`, color: GOLD }}>
                      Now
                    </span>
                  )}
                </div>
                <div className="font-display font-bold tracking-wide uppercase text-white mb-2"
                  style={{ fontSize: '0.88rem' }}>
                  {title}
                </div>
                <p className="font-body text-white/38 leading-relaxed" style={{ fontSize: '0.8rem' }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
