import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { MapPin, UserCircle, ShieldCheck, ArrowRight, Lock } from 'lucide-react'
import { UserRole, useAuth } from '../context/AuthContext'
import { auth } from '../services/firebase'
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth'

export default function Login() {
  const navigate = useNavigate()
  const { loginAsGuest } = useAuth()
  const [activeRole, setActiveRole] = useState<UserRole>('user')
  const [adminEmail, setAdminEmail] = useState('')
  const [adminPassword, setAdminPassword] = useState('')
  const [loginError, setLoginError] = useState<string>('')

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
      navigate('/home')
    } catch (error: any) {
      setLoginError('Google Login Failed: ' + error.message)
    }
  }

  const handleGuestLogin = () => {
    loginAsGuest()
    navigate('/home')
  }

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (adminEmail.toLowerCase() !== 'admin@test.com') {
      setLoginError('Access Denied. Incorrect Admin Email.')
      return
    }
    try {
      await signInWithEmailAndPassword(auth, adminEmail, adminPassword)
      navigate('/admin')
    } catch (error: any) {
      setLoginError('Login Failed: ' + error.message)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' }}>
      {/* Animated gradient bg */}
      <div className="absolute inset-0 vibrant-bg" style={{ opacity: 0.12 }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(124,58,237,0.3) 0%, transparent 70%)' }} />

      {/* Floating compass watermark */}
      <motion.div
        animate={{ y: [0, -18, 0], opacity: [0.04, 0.07, 0.04] }}
        transition={{ duration: 0.6, repeat: Infinity }}
        style={{ position: 'absolute', top: '10%', left: '8%', color: '#fff' }}
      >
        <MapPin size={140} />
      </motion.div>
      <motion.div
        animate={{ y: [0, 14, 0], opacity: [0.03, 0.05, 0.03] }}
        transition={{ duration: 0.6, repeat: Infinity, delay: 2 }}
        style={{ position: 'absolute', bottom: '12%', right: '10%', color: '#fff' }}
      >
        <MapPin size={100} />
      </motion.div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, filter: 'blur(40px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div className="glass-card-hi" style={{ padding: '2.5rem' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              style={{ display: 'inline-flex', padding: '1rem', borderRadius: '9999px', marginBottom: '1.25rem', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)' }}
            >
              <div className="vibrant-bg" style={{ borderRadius: '9999px', padding: '0.75rem' }}>
                <MapPin size={24} color="#fff" />
              </div>
            </motion.div>
            <h1 style={{ fontFamily: 'Cabinet Grotesk, sans-serif', fontWeight: 900, letterSpacing: '-0.05em', fontSize: '2.25rem', color: '#fff', marginBottom: '0.4rem' }}>
              GodsOwnRoute
            </h1>
            <p style={{ fontFamily: 'Satoshi, sans-serif', fontSize: '0.9rem', color: 'rgba(255,255,255,0.45)' }}>
              Your cinematic travel companion
            </p>
          </div>

          {/* Role toggle */}
          <div style={{ display: 'flex', background: 'rgba(0,0,0,0.3)', borderRadius: '9999px', padding: '4px', marginBottom: '2rem', position: 'relative' }}>
            <motion.div
              style={{ position: 'absolute', top: '4px', bottom: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '9999px', border: '1px solid rgba(255,255,255,0.15)' }}
              initial={false}
              animate={{ left: activeRole === 'user' ? '4px' : '50%', width: 'calc(50% - 4px)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
            {(['user', 'admin'] as UserRole[]).map((role) => (
              <button
                key={role}
                id={`role-${role}`}
                onClick={() => { setActiveRole(role); setLoginError('') }}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                  padding: '0.7rem',
                  borderRadius: '9999px',
                  fontSize: '0.85rem',
                  fontFamily: 'Satoshi, sans-serif',
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: 'transparent',
                  border: 'none',
                  color: activeRole === role ? '#fff' : 'rgba(255,255,255,0.45)',
                  position: 'relative',
                  zIndex: 1,
                  transition: 'color 0.3s ease',
                  textTransform: 'capitalize',
                }}
              >
                {role === 'user' ? <UserCircle size={16} /> : <ShieldCheck size={16} />}
                {role === 'user' ? 'Tourist' : 'Admin'}
              </button>
            ))}
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            {activeRole === 'user' ? (
              <motion.div
                key="user-login"
                initial={{ opacity: 0, x: -16, filter: 'blur(8px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: 16, filter: 'blur(8px)' }}
                transition={{ duration: 0.6 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}
              >
                <p style={{ textAlign: 'center', fontFamily: 'Satoshi, sans-serif', fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)', marginBottom: '0.5rem' }}>
                  Plan trips, find destinations, explore Kerala.
                </p>
                <button id="google-login-btn" onClick={handleGoogleLogin} className="btn-solid" style={{ width: '100%' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Sign in with Google
                </button>

                <div style={{ position: 'relative', textAlign: 'center', margin: '0.25rem 0' }}>
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center' }}>
                    <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.08)' }} />
                  </div>
                  <span style={{ position: 'relative', background: 'transparent', padding: '0 0.75rem', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)', fontFamily: 'Satoshi, sans-serif' }}>
                    or continue as
                  </span>
                </div>

                <button id="guest-login-btn" onClick={handleGuestLogin} className="btn-outline" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  Guest Traveler <ArrowRight size={15} />
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="admin-login"
                initial={{ opacity: 0, x: 16, filter: 'blur(8px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -16, filter: 'blur(8px)' }}
                transition={{ duration: 0.6 }}
              >
                <p style={{ textAlign: 'center', fontFamily: 'Satoshi, sans-serif', fontSize: '0.82rem', color: 'rgba(255,255,255,0.4)', marginBottom: '1.25rem' }}>
                  Restricted access. Use <strong style={{ color: 'rgba(255,255,255,0.7)' }}>admin@test.com</strong>
                </p>
                <form onSubmit={handleAdminLogin} style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                  <div style={{ position: 'relative' }}>
                    <UserCircle size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.35)' }} />
                    <input id="admin-email" type="email" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)}
                      placeholder="admin@test.com" required className="cin-input" style={{ paddingLeft: '2.75rem' }} />
                  </div>
                  <div style={{ position: 'relative' }}>
                    <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.35)' }} />
                    <input id="admin-password" type="password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)}
                      placeholder="••••••••" required className="cin-input" style={{ paddingLeft: '2.75rem' }} />
                  </div>
                  <button id="admin-login-btn" type="submit" className="btn-gradient" style={{ width: '100%' }}>
                    Access Dashboard
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {loginError && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ marginTop: '1.25rem', padding: '0.875rem', borderRadius: '0.75rem', background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)', fontFamily: 'Satoshi, sans-serif', fontSize: '0.82rem', color: '#fca5a5', textAlign: 'center' }}
            >
              {loginError}
            </motion.div>
          )}

          <div style={{ marginTop: '2rem', textAlign: 'center', fontFamily: 'Satoshi, sans-serif', fontSize: '0.72rem', color: 'rgba(255,255,255,0.2)' }}>
            &copy; {new Date().getFullYear()} GodsOwnRoute. All rights reserved.
          </div>
        </div>
      </motion.div>
    </div>
  )
}
