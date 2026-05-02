import { useAuth } from '../context/AuthContext'
import { LogOut, MapPin, Cloud, Hotel, Navigation as NavIcon, Calendar, Camera, Zap, Search, ArrowRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import WeatherCard from '../components/WeatherCard'

export default function Home() {
  const { logout } = useAuth()
  const [destination, setDestination] = useState('')
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | undefined>(undefined)
  const navigate = useNavigate()

  const handleLogout = async () => { await logout() }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
        () => setUserLocation({ lat: 9.9312, lon: 76.2673 })
      )
    }
  }, [])

  const handleSearch = () => {
    if (destination.trim()) navigate('/plan', { state: { destination } })
  }

  const features = [
    { icon: NavIcon,  title: 'Route Planning',     desc: 'Find the optimal route to any Kerala destination.',   action: () => navigate('/plan') },
    { icon: Cloud,    title: 'Live Weather',        desc: "Real-time forecasts for wherever you're headed.",      action: () => navigate('/plan') },
    { icon: Hotel,    title: 'Hotel Finder',        desc: 'Curated hotels within 5 km of your destination.',     action: () => navigate('/plan') },
    { icon: MapPin,   title: 'Nearby Places',       desc: 'Discover hidden gems and famous attractions.',        action: () => navigate('/plan') },
    { icon: Calendar, title: 'Trip Planning',       desc: 'Build day-by-day itineraries with ease.',             action: () => navigate('/plan') },
    { icon: Camera,   title: 'Destination Photos',  desc: 'Stunning visuals before you even step foot there.',   action: () => navigate('/plan') },
    { icon: Zap,      title: 'AI Travel Assistant', desc: 'Let our AI craft your perfect Kerala journey.',       action: () => navigate('/assistant') },
  ]

  const cardV = {
    hidden:  { opacity: 0, y: 28, scale: 0.95, filter: 'blur(12px)' },
    visible: { opacity: 1, y: 0,  scale: 1,    filter: 'blur(0px)',
      transition: { duration: 0.6 } },
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{ minHeight: '100vh' }}
    >
      {/* Logout */}
      <div className="absolute top-20 right-6 z-50">
        <button id="logout-btn" onClick={handleLogout} className="btn-outline" style={{ padding: '0.5rem 1.25rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <LogOut size={14} /> Logout
        </button>
      </div>

      {/* ── HERO ── */}
      <div style={{ minHeight: '92vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="absolute inset-0 vibrant-bg" style={{ opacity: 0.15 }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(124,58,237,0.22) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-48" style={{ background: 'linear-gradient(to bottom, transparent, rgba(3,2,12,0.85))' }} />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(20px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs uppercase tracking-widest mb-8"
              style={{ border: '1px solid rgba(255,255,255,0.18)', background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.7)', fontFamily: 'Satoshi, sans-serif', fontWeight: 500 }}>
              <span className="w-1.5 h-1.5 rounded-full vibrant-bg inline-block" />
              God's Own Country
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32, scale: 0.95, filter: 'blur(30px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ fontFamily: 'Cabinet Grotesk, sans-serif', fontWeight: 900, letterSpacing: '-0.05em', fontSize: 'clamp(3.5rem, 10vw, 8rem)', lineHeight: 1, color: '#fff', marginBottom: '1.5rem' }}
          >
            Unlock <span className="vibrant-text">Kerala</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20, filter: 'blur(20px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ fontFamily: 'Satoshi, sans-serif', fontSize: '1.2rem', color: 'rgba(255,255,255,0.55)', maxWidth: '520px', margin: '0 auto 3rem', lineHeight: 1.6 }}
          >
            Your intelligent cinematic companion for God's Own Country.
          </motion.p>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, filter: 'blur(20px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="glass-card-hi max-w-2xl mx-auto p-2 flex gap-2"
            style={{ borderRadius: '9999px' }}
          >
            <div style={{ flex: 1, position: 'relative' }}>
              <MapPin size={18} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)' }} />
              <input
                id="destination-search"
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Where in Kerala?"
                style={{ width: '100%', paddingLeft: '3rem', paddingRight: '1rem', paddingTop: '1rem', paddingBottom: '1rem', background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontFamily: 'Satoshi, sans-serif', fontSize: '1rem' }}
              />
            </div>
            <button id="search-btn" onClick={handleSearch} className="btn-solid" style={{ borderRadius: '9999px', padding: '0.875rem 1.75rem', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Search size={16} /> Explore
            </button>
          </motion.div>

          {/* Quick pills */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-2 mt-6"
          >
            {['Munnar', 'Alleppey', 'Wayanad', 'Kovalam', 'Thekkady'].map((place) => (
              <button key={place} id={`quick-${place.toLowerCase()}`}
                onClick={() => { setDestination(place); navigate('/plan', { state: { destination: place } }) }}
                className="px-4 py-1.5 rounded-full text-xs"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.6)', fontFamily: 'Satoshi, sans-serif', cursor: 'pointer', transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.12)'; (e.currentTarget as HTMLButtonElement).style.color = '#fff' }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.06)'; (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.6)' }}
              >{place}</button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Weather */}
      <div className="max-w-5xl mx-auto px-6 -mt-8 relative z-10">
        {userLocation && (
          <motion.div
            initial={{ opacity: 0, y: 24, filter: 'blur(20px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.6, delay: 0.55 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Zap size={14} style={{ color: '#f59e0b' }} />
              <span style={{ fontFamily: 'Satoshi, sans-serif', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>Live Forecast</span>
            </div>
            <WeatherCard coordinates={userLocation} />
          </motion.div>
        )}
      </div>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 py-28">
        <div className="mb-16 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ fontFamily: 'Satoshi, sans-serif', fontSize: '0.7rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '1rem' }}
          >
            Everything you need
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20, scale: 0.96, filter: 'blur(16px)' }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ fontFamily: 'Cabinet Grotesk, sans-serif', fontWeight: 900, letterSpacing: '-0.05em', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: '#fff', lineHeight: 1 }}
          >
            Travel, redefined.
          </motion.h2>
        </div>

        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {features.map((feature, i) => (
            <motion.button
              key={i}
              id={`feature-${feature.title.replace(/\s+/g, '-').toLowerCase()}`}
              variants={cardV}
              onClick={feature.action}
              whileHover={{ y: -6, transition: { duration: 0.6 } }}
              className="glass-card text-left group"
              style={{ padding: '1.75rem', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
            >
              <div className="mb-5 inline-flex items-center justify-center w-12 h-12 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
                <feature.icon size={20} style={{ color: 'rgba(255,255,255,0.8)' }} />
              </div>
              <h3 style={{ fontFamily: 'Cabinet Grotesk, sans-serif', fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.02em', color: '#fff', marginBottom: '0.5rem' }}>
                {feature.title}
              </h3>
              <p style={{ fontFamily: 'Satoshi, sans-serif', fontSize: '0.875rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>
                {feature.desc}
              </p>
              <div className="flex items-center gap-1 mt-4" style={{ fontFamily: 'Satoshi, sans-serif', fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.05em' }}>
                <span>Explore</span><ArrowRight size={12} />
              </div>
            </motion.button>
          ))}
        </motion.div>
      </section>

      {/* AI FAB */}
      <button
        id="ai-fab"
        onClick={() => navigate('/assistant')}
        className="btn-gradient fixed bottom-8 right-8 z-50 shadow-2xl"
        style={{ borderRadius: '9999px', padding: '0.875rem 1.5rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
      >
        <Zap size={16} /> Ask AI
      </button>
    </motion.div>
  )
}
