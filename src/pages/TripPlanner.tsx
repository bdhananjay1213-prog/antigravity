import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { MapPin, Navigation } from 'lucide-react'
import { motion } from 'framer-motion'
import WeatherCard from '../components/WeatherCard'
import RouteMap from '../components/RouteMap'
import NearbyPlaces from '../components/NearbyPlaces'
import HotelRecommendations from '../components/HotelRecommendations'
import TransportOptions from '../components/TransportOptions'
import DestinationPhotos from '../components/DestinationPhotos'
import TripDuration from '../components/TripDuration'
import TrafficInfo from '../components/TrafficInfo'

const sectionStyle = {
  background: 'rgba(255,255,255,0.04)',
  backdropFilter: 'blur(40px)',
  WebkitBackdropFilter: 'blur(40px)',
  border: '1px solid rgba(255,255,255,0.09)',
  borderRadius: '1.25rem',
  padding: '1.75rem',
  marginBottom: '1.25rem',
}

const labelStyle = {
  fontFamily: 'Satoshi, sans-serif',
  fontSize: '0.72rem',
  letterSpacing: '0.1em',
  textTransform: 'uppercase' as const,
  color: 'rgba(255,255,255,0.35)',
  marginBottom: '0.5rem',
  display: 'block',
}

const h2Style = {
  fontFamily: 'Cabinet Grotesk, sans-serif',
  fontWeight: 700,
  letterSpacing: '-0.03em',
  fontSize: '1.35rem',
  color: '#fff',
}

export default function TripPlanner() {
  const location = useLocation()
  const [destination, setDestination] = useState(location.state?.destination || '')
  const [currentLocation, setCurrentLocation] = useState('')
  const [tripDays, setTripDays] = useState(1)
  const [transportMode, setTransportMode] = useState<'own' | 'train' | 'cab'>('own')
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        (err) => console.error('Location error:', err)
      )
    }
  }, [])

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  }
  const item = {
    hidden:  { opacity: 0, y: 20, filter: 'blur(8px)' },
    visible: { opacity: 1, y: 0,  filter: 'blur(0px)', transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] } },
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      style={{ minHeight: '100vh', paddingBottom: '4rem' }}
    >
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 40% at 50% 0%, rgba(79,70,229,0.1) 0%, transparent 60%)' }} />

      {/* Header */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '2rem 1.5rem 1.5rem' }}>
        <div className="max-w-5xl mx-auto">
          <p style={labelStyle}>Plan Your Journey</p>
          <h1 style={{ fontFamily: 'Cabinet Grotesk, sans-serif', fontWeight: 900, letterSpacing: '-0.05em', fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: '#fff', lineHeight: 1, marginBottom: '1.5rem' }}>
            {destination ? <><span className="vibrant-text">{destination}</span></> : 'Trip Planner'}
          </h1>

          {/* Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="current-location" style={labelStyle}>Your Location</label>
              <div style={{ position: 'relative' }}>
                <MapPin size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.35)' }} />
                <input
                  id="current-location"
                  type="text"
                  value={currentLocation}
                  onChange={(e) => setCurrentLocation(e.target.value)}
                  placeholder="Current location"
                  className="cin-input"
                  style={{ paddingLeft: '2.75rem' }}
                />
              </div>
            </div>
            <div>
              <label htmlFor="destination-input" style={labelStyle}>Destination</label>
              <div style={{ position: 'relative' }}>
                <Navigation size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.35)' }} />
                <input
                  id="destination-input"
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Where do you want to go?"
                  className="cin-input"
                  style={{ paddingLeft: '2.75rem' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 mt-8">
        {destination ? (
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.div variants={item}><TripDuration days={tripDays} onDaysChange={setTripDays} /></motion.div>
            <motion.div variants={item}><TransportOptions mode={transportMode} onModeChange={setTransportMode} destination={destination} /></motion.div>

            <motion.div variants={item} style={sectionStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.25rem' }}>
                <Navigation size={18} style={{ color: 'rgba(255,255,255,0.6)' }} />
                <h2 style={h2Style}>Route to {destination}</h2>
              </div>
              <RouteMap
                origin={currentLocation || (userLocation ? `${userLocation.lat},${userLocation.lng}` : '')}
                destination={destination}
              />
            </motion.div>

            <motion.div variants={item}><TrafficInfo destination={destination} /></motion.div>
            <motion.div variants={item}><WeatherCard destination={destination} /></motion.div>
            <motion.div variants={item}><DestinationPhotos destination={destination} /></motion.div>
            <motion.div variants={item}><NearbyPlaces destination={destination} /></motion.div>
            <motion.div variants={item}>
              <HotelRecommendations
                destination={destination}
                currentLocation={currentLocation || (userLocation ? `${userLocation.lat},${userLocation.lng}` : '')}
              />
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="glass-card"
            style={{ padding: '4rem', textAlign: 'center' }}
          >
            <MapPin size={48} style={{ color: 'rgba(255,255,255,0.2)', margin: '0 auto 1.25rem' }} />
            <h2 style={{ fontFamily: 'Cabinet Grotesk, sans-serif', fontWeight: 900, fontSize: '1.75rem', letterSpacing: '-0.04em', color: '#fff', marginBottom: '0.5rem' }}>
              Where to?
            </h2>
            <p style={{ fontFamily: 'Satoshi, sans-serif', fontSize: '0.9rem', color: 'rgba(255,255,255,0.4)' }}>
              Enter a destination above to start planning your Kerala trip.
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
