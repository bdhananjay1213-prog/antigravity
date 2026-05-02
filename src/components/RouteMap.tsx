import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet'
import { Navigation, Clock, Route as RouteIcon, AlertCircle } from 'lucide-react'
import L from 'leaflet'
import axios from 'axios'
import 'leaflet/dist/leaflet.css'

// Fix for default marker icon
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface RouteInfo {
  distance: string
  duration: string
  routeType: string
}

function ChangeView({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

export default function RouteMap({ origin, destination }: { origin: string; destination: string }) {
  const [routeInfo, setRouteInfo] = useState<RouteInfo | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [waypoints, setWaypoints] = useState<[number, number][]>([])
  const [polylyinePositions, setPolylinePositions] = useState<[number, number][]>([])
  const [center, setCenter] = useState<[number, number]>([10.8505, 76.2711]) // Kerala Center
  const [zoom, setZoom] = useState(7)

  useEffect(() => {
    if (origin && destination) {
      calculateRoute()
    }
  }, [origin, destination])

  const geocode = async (query: string): Promise<[number, number] | null> => {
    // Check if query is already coordinates (lat,lng)
    const coordMatch = query.match(/^(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)$/)
    if (coordMatch) {
      return [parseFloat(coordMatch[1]), parseFloat(coordMatch[3])]
    }

    try {
      // enhanced search with limit and better query handling
      const searchQuery = query.toLowerCase().includes('kerala') ? query : `${query}, Kerala, India`

      const response = await axios.get(
        `https://corsproxy.io/?${encodeURIComponent(`https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`)}`,
        { headers: { 'Accept': 'application/json' } }
      )
      if (response.data && response.data.length > 0) {
        return [parseFloat(response.data[0].lat), parseFloat(response.data[0].lon)]
      }
      return null
    } catch (err) {
      console.error('Geocoding error:', err)
      return null
    }
  }

  const calculateRoute = async () => {
    setLoading(true)
    setError(null)
    setRouteInfo(null)
    setWaypoints([])
    setPolylinePositions([])

    try {
      // 1. Geocode Origin and Destination
      const startCoords = await geocode(origin)
      const endCoords = await geocode(destination)

      if (!startCoords || !endCoords) {
        throw new Error('Could not find location coordinates')
      }

      setWaypoints([startCoords, endCoords])
      setCenter(startCoords)
      setZoom(9)

      // 2. Get Route from OSRM
      const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${startCoords[1]},${startCoords[0]};${endCoords[1]},${endCoords[0]}?overview=full&geometries=geojson`

      const response = await axios.get(osrmUrl)

      if (response.data.code !== 'Ok' || !response.data.routes || response.data.routes.length === 0) {
        throw new Error('No route found')
      }

      const route = response.data.routes[0]
      const coordinates = route.geometry.coordinates.map((coord: [number, number]) => [coord[1], coord[0]] as [number, number])

      setPolylinePositions(coordinates)

      // 3. Format Info
      const distanceKm = (route.distance / 1000).toFixed(1)
      const durationMin = Math.round(route.duration / 60)
      const hours = Math.floor(durationMin / 60)
      const mins = durationMin % 60
      const durationStr = hours > 0 ? `${hours}h ${mins}min` : `${mins}min`

      setRouteInfo({
        distance: `${distanceKm} km`,
        duration: durationStr,
        routeType: 'Fastest Route'
      })

    } catch (err: any) {
      console.error('Routing error:', err)
      setError(err.message || 'Failed to calculate route')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Route Info Cards */}
      {routeInfo && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass-card" style={{ padding: '1.25rem', background: 'rgba(255,255,255,0.04)' }}>
            <div className="flex items-center gap-2 mb-2">
              <RouteIcon size={16} className="text-indigo-400" />
              <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Distance</span>
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', fontFamily: 'Cabinet Grotesk' }}>{routeInfo.distance}</div>
          </div>
          <div className="glass-card" style={{ padding: '1.25rem', background: 'rgba(255,255,255,0.04)' }}>
            <div className="flex items-center gap-2 mb-2">
              <Clock size={16} className="text-emerald-400" />
              <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Duration</span>
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', fontFamily: 'Cabinet Grotesk' }}>{routeInfo.duration}</div>
          </div>
          <div className="glass-card" style={{ padding: '1.25rem', background: 'rgba(255,255,255,0.04)' }}>
            <div className="flex items-center gap-2 mb-2">
              <Navigation size={16} className="text-pink-400" />
              <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Type</span>
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', fontFamily: 'Cabinet Grotesk' }}>{routeInfo.routeType}</div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', padding: '1rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#f87171', fontSize: '0.85rem' }}>
          <AlertCircle size={18} />
          <span>{error}. Try a major city name.</span>
        </div>
      )}

      {/* Map Container */}
      <div className="glass-card" style={{ padding: '0.5rem', height: '400px', position: 'relative', overflow: 'hidden' }}>
        {loading && (
          <div className="absolute inset-0 bg-black/40 z-20 flex items-center justify-center backdrop-blur-sm">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
          </div>
        )}

        <MapContainer
          center={center as any}
          zoom={zoom}
          scrollWheelZoom={false}
          className="h-full w-full"
          style={{ height: '100%', width: '100%' }}
        >
          <ChangeView center={center} zoom={zoom} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {waypoints.length > 0 && (
            <>
              <Marker position={waypoints[0]}>
                <Popup>Start: {origin}</Popup>
              </Marker>
              <Marker position={waypoints[1]}>
                <Popup>End: {destination}</Popup>
              </Marker>
            </>
          )}

          {polylyinePositions.length > 0 && (
            <Polyline
              positions={polylyinePositions}
              color="#2563eb"
              weight={6}
              opacity={0.8}
            />
          )}
        </MapContainer>
      </div>

      <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.2)', textAlign: 'center', marginTop: '1rem', fontFamily: 'Satoshi' }}>
        Map data © OpenStreetMap contributors | Routing by OSRM
      </div>
    </div>
  )
}
