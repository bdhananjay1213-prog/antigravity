import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LogOut, Truck, BarChart2, GitBranch } from 'lucide-react'

export default function AdminDashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => { logout(); navigate('/login') }

  const cards = [
    { icon: Truck,     title: 'Transport Management', desc: 'Add or edit bus, train, and taxi information.', action: 'Manage Transport' },
    { icon: BarChart2, title: 'User Analytics',        desc: 'View user activity and travel trends.',         action: 'View Reports'     },
    { icon: GitBranch, title: 'Route Approvals',       desc: 'Pending route suggestions needing review.',     action: 'Review Routes'    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      style={{ minHeight: '100vh', padding: '2rem' }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 40% at 50% 0%, rgba(79,70,229,0.12) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <p style={{ fontFamily: 'Satoshi, sans-serif', fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '0.5rem' }}>
              Admin Panel
            </p>
            <h1 style={{ fontFamily: 'Cabinet Grotesk, sans-serif', fontWeight: 900, letterSpacing: '-0.05em', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#fff', lineHeight: 1 }}>
              Dashboard
            </h1>
            <p style={{ fontFamily: 'Satoshi, sans-serif', fontSize: '0.875rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.5rem' }}>
              {user?.email}
            </p>
          </div>
          <button id="admin-logout-btn" onClick={handleLogout} className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', padding: '0.6rem 1.25rem' }}>
            <LogOut size={15} /> Logout
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24, scale: 0.95, filter: 'blur(12px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.4, 0, 0.2, 1] }}
              className="glass-card"
              style={{ padding: '1.75rem' }}
            >
              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '44px', height: '44px', borderRadius: '0.875rem', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '1.25rem' }}>
                <card.icon size={20} style={{ color: 'rgba(255,255,255,0.75)' }} />
              </div>
              <h3 style={{ fontFamily: 'Cabinet Grotesk, sans-serif', fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.02em', color: '#fff', marginBottom: '0.5rem' }}>
                {card.title}
              </h3>
              <p style={{ fontFamily: 'Satoshi, sans-serif', fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                {card.desc}
              </p>
              <button
                id={`admin-${card.action.replace(/\s+/g, '-').toLowerCase()}`}
                className="btn-outline"
                style={{ padding: '0.5rem 1.25rem', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
              >
                {card.action} →
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
