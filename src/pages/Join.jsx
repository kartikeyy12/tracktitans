import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Mail, Send } from 'lucide-react'
import PageWrapper from '../components/PageWrapper'

const GOLD = '#AE822B'

const roles = [
  { value: 'chassis',     label: 'Chassis & Fabrication' },
  { value: 'engine',      label: 'Engine & Drivetrain' },
  { value: 'suspension',  label: 'Suspension & Brakes' },
  { value: 'electronics', label: 'Electronics & Safety' },
  { value: 'business',    label: 'Business & Finance' },
  { value: 'media',       label: 'Marketing & Media' },
]

const inputStyle = {
  width: '100%',
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '0.5rem',
  padding: '0.75rem 1rem',
  color: 'white',
  fontFamily: 'Inter, sans-serif',
  fontSize: '0.85rem',
  outline: 'none',
  colorScheme: 'dark',
}

export default function Join() {
  const [form, setForm] = useState({ name: '', email: '', role: '' })
  const [submitted, setSubmitted] = useState(false)

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = () => {
    if (!form.name || !form.email) return
    setSubmitted(true)
  }

  return (
    <PageWrapper>
      <div className="relative pt-28 pb-12 px-5 sm:px-8 overflow-hidden" style={{ background: 'transparent' }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `repeating-linear-gradient(-45deg, ${GOLD} 0px, ${GOLD} 1px, transparent 1px, transparent 60px)`,
          opacity: 0.025,
        }} />
        <div className="max-w-6xl mx-auto relative z-10">
          <p className="font-body tracking-[0.2em] uppercase mb-3" style={{ fontSize: '0.65rem', color: GOLD }}>
            Get Involved
          </p>
          <h1 className="font-display font-bold uppercase text-white leading-none"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}>
            Join<br />The Team
          </h1>
          <p className="mt-4 font-body text-white/40 max-w-lg leading-relaxed" style={{ fontSize: '0.85rem' }}>
            We're looking for students serious about motorsport engineering, business, or media.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
          {/* Form */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {!submitted ? (
              <div>
                <h2 className="font-display font-bold uppercase text-white tracking-tight mb-6" style={{ fontSize: '1.1rem' }}>
                  Express Interest
                </h2>
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="block font-body tracking-widest uppercase text-white/28 mb-1.5" style={{ fontSize: '0.58rem' }}>
                      Your Name
                    </label>
                    <input type="text" value={form.name} onChange={set('name')}
                      placeholder="Raj Kumar" style={inputStyle}
                      onFocus={e => e.target.style.borderColor = 'rgba(174,130,43,0.5)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                    />
                  </div>
                  <div>
                    <label className="block font-body tracking-widest uppercase text-white/28 mb-1.5" style={{ fontSize: '0.58rem' }}>
                      College Email
                    </label>
                    <input type="email" value={form.email} onChange={set('email')}
                      placeholder="you@nitgoa.ac.in" style={inputStyle}
                      onFocus={e => e.target.style.borderColor = 'rgba(174,130,43,0.5)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                    />
                  </div>
                  <div>
                    <label className="block font-body tracking-widest uppercase text-white/28 mb-1.5" style={{ fontSize: '0.58rem' }}>
                      Area of Interest
                    </label>
                    <select value={form.role} onChange={set('role')} style={inputStyle}
                      onFocus={e => e.target.style.borderColor = 'rgba(174,130,43,0.5)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                    >
                      <option value="" style={{ background: '#1c1c1c' }}>Select a role...</option>
                      {roles.map(r => (
                        <option key={r.value} value={r.value} style={{ background: '#1c1c1c' }}>{r.label}</option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={handleSubmit}
                    className="mt-2 w-full flex items-center justify-center gap-2 rounded-full font-display font-bold tracking-[0.1em] uppercase transition-opacity hover:opacity-90"
                    style={{ background: GOLD, color: '#0a0a0a', padding: '0.9rem', fontSize: '0.75rem' }}
                  >
                    Submit Interest <Send size={13} />
                  </button>
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-14"
              >
                <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                  style={{ background: 'rgba(174,130,43,0.1)', border: `1px solid rgba(174,130,43,0.3)` }}>
                  <span className="text-2xl">🏁</span>
                </div>
                <div className="font-display font-bold uppercase text-white tracking-wide mb-2" style={{ fontSize: '1.1rem' }}>
                  You're in!
                </div>
                <p className="font-body text-white/38 leading-relaxed max-w-xs" style={{ fontSize: '0.8rem' }}>
                  We'll reach out to {form.name.split(' ')[0]} at {form.email} shortly.
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Right panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="flex flex-col gap-4"
          >
            <div className="p-5 rounded-xl" style={{ border: `1px solid rgba(174,130,43,0.22)`, background: 'rgba(174,130,43,0.05)' }}>
              <div className="font-display font-bold uppercase tracking-wide mb-2" style={{ fontSize: '0.85rem', color: GOLD }}>
                NIT Goa Students Only
              </div>
              <p className="font-body text-white/38 leading-relaxed" style={{ fontSize: '0.78rem' }}>
                Membership is currently open to students enrolled at NIT Goa. Sponsors and industry partners, reach us via email directly.
              </p>
            </div>

            <div>
              <p className="font-body tracking-[0.2em] uppercase text-white/18 mb-3" style={{ fontSize: '0.58rem' }}>Follow Us</p>
              <div className="flex flex-col gap-2.5">
                {[
                  { icon: <Instagram size={15} />, text: '@tracktitans.nitgoa', href: '#' },
                  { icon: <Mail size={15} />, text: 'tracktitans@nitgoa.ac.in', href: 'mailto:tracktitans@nitgoa.ac.in' },
                ].map(({ icon, text, href }) => (
                  <a key={text} href={href}
                    className="flex items-center gap-3 p-3.5 rounded-xl transition-colors"
                    style={{ background: 'rgba(28,28,28,0.75)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.06)' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(174,130,43,0.3)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}
                  >
                    <span style={{ color: GOLD }}>{icon}</span>
                    <span className="font-body text-white/50" style={{ fontSize: '0.78rem' }}>{text}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-xl" style={{ background: '#1c1c1c', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="font-display font-bold uppercase tracking-wide text-white mb-2" style={{ fontSize: '0.85rem' }}>
                Sponsorship
              </div>
              <p className="font-body text-white/38 leading-relaxed mb-3" style={{ fontSize: '0.78rem' }}>
                Interested in sponsoring Track Titans? We offer branding, technical partnership, and event visibility.
              </p>
              <a href="mailto:tracktitans@nitgoa.ac.in"
                className="inline-flex items-center gap-1.5 font-body font-semibold tracking-widest uppercase transition-all hover:gap-2.5"
                style={{ fontSize: '0.7rem', color: GOLD }}>
                Get in touch <Mail size={11} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  )
}
