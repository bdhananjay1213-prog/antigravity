import { useState, useEffect } from 'react'
import { Car, Train as TrainIcon, ArrowRight, Clock } from 'lucide-react'
import { getAvailableCabs, CabOption } from '../services/CabService'
import { getTrainSchedules, Train } from '../services/TrainService'
import { motion, AnimatePresence } from 'framer-motion'

export default function TransportOptions({ mode, onModeChange, destination }: { mode: 'own' | 'train' | 'cab', onModeChange: (m: 'own' | 'train' | 'cab') => void, destination: string }) {
  const [cabs, setCabs] = useState<CabOption[]>([])
  const [trains, setTrains] = useState<Train[]>([])

  useEffect(() => {
    if (mode === 'cab') setCabs(getAvailableCabs())
    else if (mode === 'train') setTrains(getTrainSchedules('Current Location', destination))
  }, [mode, destination])

  const modes = [
    { id: 'own' as const, icon: Car, label: 'Own Vehicle', color: '#4f46e5' },
    { id: 'train' as const, icon: TrainIcon, label: 'Train', color: '#7c3aed' },
    { id: 'cab' as const, icon: Car, label: 'RedTaxi', color: '#db2777' },
  ]

  return (
    <div className="glass-card" style={{ padding: '2rem', marginBottom: '1.25rem' }}>
      <div className="flex items-center gap-3 mb-8">
        <div style={{ background: 'rgba(255,255,255,0.06)', padding: '0.6rem', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.1)' }}>
          <Car size={20} className="text-pink-400" />
        </div>
        <h2 style={{ fontFamily: 'Cabinet Grotesk, sans-serif', fontWeight: 700, fontSize: '1.35rem', color: '#fff' }}>Transport Mode</h2>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-8">
        {modes.map((m) => {
          const active = mode === m.id
          return (
            <button
              key={m.id}
              onClick={() => onModeChange(m.id)}
              className="glass-card transition-all duration-300"
              style={{
                padding: '1.5rem 1rem',
                borderWidth: '1px',
                borderColor: active ? m.color : 'rgba(255,255,255,0.08)',
                background: active ? `${m.color}15` : 'rgba(255,255,255,0.04)',
              }}
            >
              <m.icon size={28} style={{ color: active ? m.color : 'rgba(255,255,255,0.2)', margin: '0 auto 0.75rem' }} />
              <p style={{ fontFamily: 'Satoshi', fontSize: '0.85rem', fontWeight: 700, color: active ? '#fff' : 'rgba(255,255,255,0.4)', textAlign: 'center' }}>
                {m.label}
              </p>
            </button>
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        {mode === 'train' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
            {trains.map((t, i) => (
              <div key={i} className="glass-card" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h4 style={{ fontFamily: 'Cabinet Grotesk', fontWeight: 700, color: '#fff', fontSize: '1.1rem' }}>{t.name}</h4>
                    <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', fontFamily: 'Satoshi', background: 'rgba(255,255,255,0.05)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>#{t.number}</span>
                  </div>
                  <div style={{ fontSize: '0.7rem', fontWeight: 800, background: t.status === 'On Time' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', color: t.status === 'On Time' ? '#10b981' : '#ef4444', padding: '0.4rem 0.8rem', borderRadius: '9999px', border: `1px solid ${t.status === 'On Time' ? '#10b98130' : '#ef444430'}` }}>
                    {t.status}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>{t.departure}</div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)' }}>Source</div>
                  </div>
                  <div className="flex-1 px-8 flex flex-col items-center">
                    <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', marginBottom: '4px' }}>{t.duration}</div>
                    <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.1)', position: 'relative' }}>
                      <ArrowRight size={12} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'rgba(255,255,255,0.2)' }} />
                    </div>
                  </div>
                  <div className="text-center">
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>{t.arrival}</div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)' }}>{destination}</div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {mode === 'cab' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
            {cabs.map((c, i) => (
              <div key={i} className="glass-card flex items-center justify-between" style={{ padding: '1.25rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="flex items-center gap-4">
                  <div style={{ width: '64px', height: '64px', borderRadius: '1rem', background: 'rgba(255,255,255,0.06)', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <img src={c.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div>
                    <h4 style={{ fontFamily: 'Cabinet Grotesk', fontWeight: 700, color: '#fff', fontSize: '1.1rem' }}>{c.type}</h4>
                    <div className="flex items-center gap-3 mt-1">
                      <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)' }}>{c.capacity}</span>
                      <div className="flex items-center gap-1" style={{ color: '#10b981', fontSize: '0.75rem', fontWeight: 700 }}>
                        <Clock size={12} /> {c.eta}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#fff', fontFamily: 'Cabinet Grotesk' }}>{c.price}</div>
                  <button className="btn-solid" style={{ padding: '0.5rem 1rem', fontSize: '0.75rem', marginTop: '0.5rem', borderRadius: '8px' }}>Book</button>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
