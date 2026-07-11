import { motion } from 'framer-motion'
import PageWrapper from '../components/PageWrapper'

// Updated to a brighter yellow as requested
const GOLD = '#FACC15' 

const leaders = [
  { name: 'Vivaan Wagle', role: 'Team Leader', year: '3rd Year, ME' },
  { name: 'Prince Pal', role: 'Team Leader', year: '3rd Year, ME' },
  { name: 'Sanchita Mahale', role: 'Team Leader', year: '2nd Year, ME' },
  { name: 'Chaitanya Vundru', role: 'Faculty Advisor', year: 'Professor, ME' },
]

const subTeams = [
  { 
    icon: '⚙️', 
    name: 'Chassis', 
    lead: 'Prince Pal', 
    members: [], 
    desc: 'Chassis design and fabrication.' 
  },
  { 
    icon: '🎯', 
    name: 'Steering', 
    lead: 'Vivaan Wagle', 
    members: [], 
    desc: 'Steering geometry and assembly.' 
  },
  { 
    icon: '🔧', 
    name: 'Transmission', 
    lead: 'Piyush Mehra', 
    members: [], 
    desc: 'Drivetrain, gearing, and tuning.' 
  },
  { 
    icon: '🛑', 
    name: 'Braking System', 
    lead: 'Lav Gupta', 
    members: [], 
    desc: 'Brake design and stopping performance.' 
  },
  { 
    icon: '📊', 
    name: 'Data & Strategy', 
    lead: 'Vivaan Wagle, Prince Pal', 
    members: [], 
    desc: 'Race strategy and documentation.' 
  },
  { 
    icon: '📱', 
    name: 'Social Media', 
    lead: 'Utkarsha Gupta', 
    members: [], 
    desc: 'Content, design, and online presence.' 
  },
]

const initials = (name) => name.split(' ').map(n => n[0]).join('')

export default function Team() {
  return (
    <PageWrapper>
      <div className="relative pt-28 pb-12 px-5 sm:px-8 overflow-hidden" style={{ background: 'transparent' }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `repeating-linear-gradient(-45deg, ${GOLD} 0px, ${GOLD} 1px, transparent 1px, transparent 60px)`,
          opacity: 0.025,
        }} />
        <div className="max-w-6xl mx-auto relative z-10">
          <p className="font-body tracking-[0.2em] uppercase mb-3" style={{ fontSize: '0.65rem', color: GOLD }}>
            The People
          </p>
          <h1 className="font-display font-bold uppercase text-white leading-none"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}>
            The<br />Team
          </h1>
          <p className="mt-4 font-body text-white/40 max-w-lg leading-relaxed" style={{ fontSize: '0.85rem' }}>
            <span style={{ color: GOLD }}>25+ students</span> across six specialist sub-teams, all from NIT Goa.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14">
        {/* Leadership */}
        <div className="mb-14">
          <p className="font-body tracking-[0.2em] uppercase text-white/22 mb-5" style={{ fontSize: '0.62rem' }}>
            Leadership
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {leaders.map(({ name, role, year }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.4 }}
                className="p-5 rounded-xl text-center"
                style={{
                  background: 'rgba(28,28,28,0.75)', backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderTop: `2px solid ${GOLD}`,
                }}
              >
                <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
                  style={{ background: `${GOLD}1A`, border: `1px solid ${GOLD}38` }}>
                  <span className="font-display font-bold" style={{ color: GOLD, fontSize: '0.8rem' }}>
                    {initials(name)}
                  </span>
                </div>
                <div className="font-body tracking-[0.14em] uppercase mb-1" style={{ fontSize: '0.58rem', color: GOLD }}>
                  {role}
                </div>
                <div className="font-display font-bold uppercase tracking-wide text-white" style={{ fontSize: '0.78rem' }}>
                  {name}
                </div>
                <div className="mt-1 font-body text-white/22" style={{ fontSize: '0.6rem' }}>{year}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sub-teams */}
        <div>
          <p className="font-body tracking-[0.2em] uppercase text-white/22 mb-5" style={{ fontSize: '0.62rem' }}>
            Sub-teams
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {subTeams.map(({ icon, name, lead, members, desc }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.35 }}
                className="p-5 rounded-xl transition-colors"
                style={{ background: 'rgba(28,28,28,0.75)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.06)' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = `${GOLD}4D`}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg mb-4"
                  style={{ background: `${GOLD}1A` }}>
                  {icon}
                </div>
                <div className="font-display font-bold tracking-[0.06em] uppercase text-white mb-1.5"
                  style={{ fontSize: '0.8rem' }}>
                  {name}
                </div>
                <p className="font-body text-white/32 leading-relaxed mb-4" style={{ fontSize: '0.72rem' }}>{desc}</p>
                <div className="pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <div className="font-body tracking-widest uppercase mb-1" style={{ fontSize: '0.58rem', color: GOLD }}>Lead</div>
                  <div className="font-body text-white/55" style={{ fontSize: '0.72rem' }}>{lead}</div>
                  {members.length > 0 && (
                    <>
                      <div className="mt-2 font-body tracking-widest uppercase text-white/18 mb-1" style={{ fontSize: '0.58rem' }}>Members</div>
                      <div className="font-body text-white/38" style={{ fontSize: '0.72rem' }}>{members.join(', ')}</div>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
