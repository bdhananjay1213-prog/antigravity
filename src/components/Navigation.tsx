import { Link, useLocation } from 'react-router-dom'
import { Home, Map, CheckSquare, Bot } from 'lucide-react'

export default function Navigation() {
  const location = useLocation()
  const isActive = (path: string) => location.pathname === path

  const links = [
    { to: '/home',      icon: Home,        label: 'Home'      },
    { to: '/plan',      icon: Map,         label: 'Plan Trip' },
    { to: '/todo',      icon: CheckSquare, label: 'To-Do'     },
    { to: '/assistant', icon: Bot,         label: 'AI'        },
  ]

  return (
    <nav
      className="sticky top-0 z-50"
      style={{
        background: 'rgba(5,5,5,0.75)',
        backdropFilter: 'blur(40px)',
        WebkitBackdropFilter: 'blur(40px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/home" className="flex items-center gap-3 group">
          <span
            className="text-xl font-display"
            style={{ fontFamily: 'Cabinet Grotesk', fontWeight: 900, letterSpacing: '-0.05em' }}
          >
            <span className="vibrant-text">GodsOwn</span>
            <span className="text-white">Route</span>
          </span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-1">
          {links.map(({ to, icon: Icon, label }) => {
            const active = isActive(to)
            return (
              <Link
                key={to}
                to={to}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-body font-medium transition-all duration-300"
                style={{
                  fontWeight: 500,
                  color: active ? '#050505' : 'rgba(255,255,255,0.55)',
                  background: active
                    ? '#ffffff'
                    : 'transparent',
                  border: active ? 'none' : '1px solid transparent',
                  transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
                }}
                onMouseEnter={e => {
                  if (!active) {
                    (e.currentTarget as HTMLAnchorElement).style.color = '#ffffff'
                    ;(e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.2)'
                  }
                }}
                onMouseLeave={e => {
                  if (!active) {
                    (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.55)'
                    ;(e.currentTarget as HTMLAnchorElement).style.borderColor = 'transparent'
                  }
                }}
              >
                <Icon size={15} />
                <span>{label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
