import { useState, useEffect } from 'react'
import { Plus, Check, Trash2, ListChecks } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface TodoItem {
  id: string
  text: string
  completed: boolean
}

export default function TodoList() {
  const [todos, setTodos] = useState<TodoItem[]>([])
  const [newTodo, setNewTodo] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('kerala-guide-todos')
    if (saved) setTodos(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem('kerala-guide-todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = (text: string = newTodo) => {
    const finalTodo = text.trim()
    if (finalTodo) {
      setTodos([...todos, { id: Date.now().toString(), text: finalTodo, completed: false }])
      setNewTodo('')
    }
  }

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const completedCount = todos.filter(t => t.completed).length
  const totalCount = todos.length
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0

  const containerV = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.05 } }
  }
  const itemV = {
    hidden: { opacity: 0, y: 12, filter: 'blur(8px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: 'easeInOut' } }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ minHeight: '100vh', paddingBottom: '5rem' }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(59,130,246,0.12) 0%, transparent 70%)' }} />

      {/* Header */}
      <div className="relative z-10" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '3rem 1.5rem 2.5rem' }}>
        <div className="max-w-4xl mx-auto text-center">
          <p style={{ fontFamily: 'Satoshi, sans-serif', fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '0.75rem' }}>
            Checklist
          </p>
          <h1 style={{ fontFamily: 'Cabinet Grotesk, sans-serif', fontWeight: 900, letterSpacing: '-0.05em', fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: '#fff', lineHeight: 1, marginBottom: '1rem' }}>
            Trip <span className="vibrant-text">Essentials</span>
          </h1>
          <p style={{ fontFamily: 'Satoshi, sans-serif', fontSize: '1rem', color: 'rgba(255,255,255,0.45)', maxWidth: '500px', margin: '0 auto' }}>
            Curate your Kerala adventure. Make sure every detail is covered.
          </p>
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 mt-12">
        {/* Progress */}
        {totalCount > 0 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
            <div className="flex justify-between items-center mb-4">
              <span style={{ fontFamily: 'Satoshi, sans-serif', fontSize: '0.8rem', fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>Readiness</span>
              <span style={{ fontFamily: 'Satoshi, sans-serif', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>
                {completedCount} of {totalCount} items secured
              </span>
            </div>
            <div style={{ height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '9999px', overflow: 'hidden' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                style={{ height: '100%', background: 'linear-gradient(90deg, #4f46e5, #7c3aed)', borderRadius: '9999px' }}
                transition={{ duration: 0.8, ease: 'circOut' }}
              />
            </div>
          </motion.div>
        )}

        {/* Add Field */}
        <div className="glass-card-hi flex gap-3" style={{ padding: '0.5rem 0.5rem 0.5rem 1.5rem', borderRadius: '9999px', marginBottom: '2rem', alignItems: 'center' }}>
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTodo()}
            placeholder="Add an item to your list..."
            style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontFamily: 'Satoshi, sans-serif', fontSize: '1rem' }}
          />
          <button onClick={() => addTodo()} className="btn-solid" style={{ borderRadius: '9999px', padding: '0.75rem 1.5rem', fontSize: '0.8rem', gap: '0.4rem' }}>
            <Plus size={16} /> Add
          </button>
        </div>

        {/* List */}
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {todos.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card" style={{ padding: '4rem', textAlign: 'center' }}>
                <ListChecks size={40} style={{ color: 'rgba(255,255,255,0.15)', margin: '0 auto 1.25rem' }} />
                <p style={{ fontFamily: 'Satoshi, sans-serif', fontSize: '0.9rem', color: 'rgba(255,255,255,0.3)' }}>Your list is empty. Start packing!</p>
              </motion.div>
            ) : (
              <motion.div variants={containerV} initial="hidden" animate="visible" className="space-y-3">
                {todos.map((todo) => (
                  <motion.div
                    key={todo.id}
                    variants={itemV}
                    layout
                    exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                    className="glass-card group"
                    style={{
                      padding: '1rem 1.25rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      background: todo.completed ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.06)',
                      borderColor: todo.completed ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.12)'
                    }}
                  >
                    <button
                      onClick={() => toggleTodo(todo.id)}
                      style={{
                        width: '22px', height: '22px', borderRadius: '9999px',
                        border: '1px solid',
                        borderColor: todo.completed ? '#7c3aed' : 'rgba(255,255,255,0.2)',
                        background: todo.completed ? '#7c3aed' : 'transparent',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'all 0.3s ease',
                        flexShrink: 0
                      }}
                    >
                      {todo.completed && <Check size={12} color="#fff" strokeWidth={3} />}
                    </button>
                    <span style={{
                      flex: 1,
                      fontFamily: 'Satoshi, sans-serif',
                      fontSize: '1rem',
                      color: todo.completed ? 'rgba(255,255,255,0.25)' : '#fff',
                      textDecoration: todo.completed ? 'line-through' : 'none',
                      transition: 'all 0.3s ease'
                    }}>
                      {todo.text}
                    </span>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      style={{
                        opacity: 0,
                        color: 'rgba(239,68,68,0.5)',
                        transition: 'all 0.3s ease'
                      }}
                      className="group-hover:opacity-100 hover:text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Suggestions */}
        <div className="mt-12">
          <p style={{ fontFamily: 'Satoshi, sans-serif', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '1.25rem', textAlign: 'center' }}>
            Recommended Items
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {['Passport', 'Charger', 'Medicines', 'Umbrella', 'Camera', 'Sunscreen', 'Snacks', 'Power Bank'].map((s) => (
              <button
                key={s}
                onClick={() => addTodo(s)}
                className="px-4 py-2 rounded-full text-xs font-medium transition-all"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'rgba(255,255,255,0.4)',
                  fontFamily: 'Satoshi, sans-serif',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.08)'
                  ;(e.currentTarget as HTMLButtonElement).style.color = '#fff'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.04)'
                  ;(e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.4)'
                }}
              >
                + {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
