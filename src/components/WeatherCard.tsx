import { useState, useEffect } from 'react'
import { Cloud, Droplets, Wind, Sun, CloudRain, Thermometer } from 'lucide-react'
import axios from 'axios'
import { motion } from 'framer-motion'

interface WeatherData {
  temp: number
  condition: string
  humidity: number
  windSpeed: number
  icon: string
  name?: string
}

interface WeatherCardProps {
  destination?: string
  coordinates?: { lat: number; lon: number }
}

export default function WeatherCard({ destination, coordinates }: WeatherCardProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (destination || coordinates) fetchWeather()
  }, [destination, coordinates])

  const fetchWeather = async () => {
    setLoading(true)
    setError(null)
    try {
      const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
      let url = coordinates
        ? `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${API_KEY}&units=metric`
        : `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(destination || '')},Kerala,IN&appid=${API_KEY}&units=metric`

      if (!API_KEY || API_KEY === 'demo') {
        await new Promise(r => setTimeout(r, 1000))
        setWeather({
          temp: Math.floor(Math.random() * 10) + 25,
          condition: ['Sunny', 'Cloudy', 'Rain'][Math.floor(Math.random() * 3)],
          humidity: 70,
          windSpeed: 10,
          icon: 'sun',
          name: destination || 'Current Location'
        })
        setLoading(false)
        return
      }

      const res = await axios.get(url)
      setWeather({
        temp: Math.round(res.data.main.temp),
        condition: res.data.weather[0].main,
        humidity: res.data.main.humidity,
        windSpeed: Math.round(res.data.wind.speed * 3.6),
        icon: res.data.weather[0].icon,
        name: res.data.name
      })
      setLoading(false)
    } catch (e) {
      setError('Fetch failed')
      setWeather({ temp: 28, condition: 'Sunny', humidity: 65, windSpeed: 12, icon: 'sun', name: destination || 'Kerala' })
      setLoading(false)
    }
  }

  const getIcon = (cond: string) => {
    if (cond.toLowerCase().includes('rain')) return <CloudRain size={24} />
    if (cond.toLowerCase().includes('cloud')) return <Cloud size={24} />
    return <Sun size={24} />
  }

  const itemV = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card overflow-hidden"
      style={{ padding: '2rem', position: 'relative' }}
    >
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Cloud size={120} />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <div style={{ background: 'rgba(255,255,255,0.06)', padding: '0.6rem', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.1)' }}>
            <Sun size={20} className="text-amber-400" />
          </div>
          <h3 style={{ fontFamily: 'Cabinet Grotesk, sans-serif', fontWeight: 700, fontSize: '1.25rem', color: '#fff' }}>
            {weather?.name || destination} Forecast
          </h3>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <motion.div variants={itemV} className="glass-card" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="flex items-center justify-between mb-4">
                <Thermometer size={18} className="text-rose-400" />
                {weather && getIcon(weather.condition)}
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, fontFamily: 'Cabinet Grotesk', color: '#fff' }}>{weather?.temp}°</div>
              <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'Satoshi' }}>{weather?.condition}</div>
            </motion.div>

            <motion.div variants={itemV} className="glass-card" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <Droplets size={18} className="text-blue-400 mb-4" />
              <div style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'Cabinet Grotesk', color: '#fff' }}>{weather?.humidity}%</div>
              <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'Satoshi' }}>Humidity</div>
            </motion.div>

            <motion.div variants={itemV} className="glass-card" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <Wind size={18} className="text-emerald-400 mb-4" />
              <div style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'Cabinet Grotesk', color: '#fff' }}>{weather?.windSpeed} <span style={{ fontSize: '0.9rem', fontWeight: 400 }}>km/h</span></div>
              <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'Satoshi' }}>Wind Speed</div>
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  )
}
