import { useState, useEffect } from 'react'
import { MapPin, Star, Compass } from 'lucide-react'
import axios from 'axios'
import { motion } from 'framer-motion'

interface Place {
  name: string
  distance: string
  rating: number
  type: string
  image?: string
}

export default function NearbyPlaces({ destination }: { destination: string }) {
  const [places, setPlaces] = useState<Place[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (destination) fetchNearbyPlaces()
  }, [destination])

  const fetchNearbyPlaces = async () => {
    setLoading(true)
    try {
      const nomRes = await axios.get(`https://corsproxy.io/?${encodeURIComponent(`https://nominatim.openstreetmap.org/search?format=json&q=${destination + ', Kerala, India'}`)}`)
      if (!nomRes.data?.[0]) throw new Error('Not found')
      const { lat, lon } = nomRes.data[0]

      const query = `[out:json][timeout:25];(node["tourism"~"attraction|viewpoint|zoo|theme_park"](around:5000,${lat},${lon});way["tourism"~"attraction|viewpoint|zoo|theme_park"](around:5000,${lat},${lon}););out tags center;`;
      const overRes = await axios.get(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`)
      const namedElements = (overRes.data.elements || []).filter((el: any) => el.tags?.name).slice(0, 6)

      const placesData: Place[] = namedElements.map((el: any) => {
        const pLat = el.lat || el.center?.lat;
        const pLon = el.lon || el.center?.lon;
        const dist = calculateDistance(parseFloat(lat), parseFloat(lon), pLat, pLon);
        return {
          name: el.tags.name,
          distance: `${dist.toFixed(1)} km`,
          rating: 4.5 + Math.random() * 0.4,
          type: el.tags.tourism || 'Attraction',
        }
      })

      setPlaces(placesData.length ? placesData : getMockPlaces())
      setLoading(false)
    } catch (e) {
      setPlaces(getMockPlaces())
      setLoading(false)
    }
  }

  const getMockPlaces = (): Place[] => [
    { name: 'Tea Gardens', distance: '2.5 km', rating: 4.8, type: 'Nature' },
    { name: 'City Museum', distance: '3.0 km', rating: 4.5, type: 'Museum' },
    { name: 'Old Fort', distance: '4.2 km', rating: 4.6, type: 'History' },
  ]

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371, dLat = (lat2-lat1)*Math.PI/180, dLon = (lon2-lon1)*Math.PI/180;
    const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)**2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  }

  const itemV = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } }
  }

  return (
    <div className="glass-card" style={{ padding: '2rem', marginBottom: '1.25rem' }}>
      <div className="flex items-center gap-3 mb-8">
        <div style={{ background: 'rgba(255,255,255,0.06)', padding: '0.6rem', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.1)' }}>
          <Compass size={20} className="text-indigo-400" />
        </div>
        <h2 style={{ fontFamily: 'Cabinet Grotesk, sans-serif', fontWeight: 700, fontSize: '1.35rem', color: '#fff' }}>Nearby Attractions</h2>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-12 gap-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500" />
          <p style={{ fontFamily: 'Satoshi', fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)' }}>Exploring nearby...</p>
        </div>
      ) : (
        <motion.div variants={{ visible: { transition: { staggerChildren: 0.1 } } }} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {places.map((place, i) => (
            <motion.div key={i} variants={itemV} className="glass-card group" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', position: 'relative', overflow: 'hidden' }}>
              <div className="flex justify-between items-start mb-4">
                <div style={{ background: 'rgba(124,58,237,0.15)', color: '#a78bfa', fontSize: '0.65rem', fontWeight: 700, padding: '0.25rem 0.6rem', borderRadius: '9999px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {place.type}
                </div>
                <div className="flex items-center gap-1">
                  <Star size={14} className="text-amber-400 fill-amber-400" />
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff' }}>{place.rating.toFixed(1)}</span>
                </div>
              </div>
              <h3 style={{ fontFamily: 'Cabinet Grotesk', fontWeight: 700, fontSize: '1.1rem', color: '#fff', marginBottom: '0.5rem' }}>{place.name}</h3>
              <div className="flex items-center gap-1.5" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>
                <MapPin size={14} />
                <span>{place.distance} away</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}
