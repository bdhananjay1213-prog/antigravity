import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Bot, User, ArrowLeft, Sparkles, Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const SYSTEM_PROMPT = `You are Smart Kerala AI, an expert travel assistant specializing in Kerala, India — "God's Own Country". You help travelers plan trips, discover hidden gems, understand local culture, find the best food, navigate transport options, and get weather advice. Keep your answers concise, friendly, and packed with local insights. Use emojis sparingly but meaningfully. Always tailor suggestions to Kerala.`

const OLLAMA_URL = 'http://localhost:11434/api/chat'
const MODEL = 'tinyllama'

export default function AIAssistant() {
  const navigate = useNavigate()
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi! 👋 I'm your Smart Kerala AI, powered by TinyLlama running locally on your device. Ask me about places, routes, food, or trip ideas across Kerala!" }
  ])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    const text = input.trim()
    if (!text || isLoading) return

    const userMsg: Message = { role: 'user', content: text }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsLoading(true)

    // Placeholder for streaming assistant message
    const assistantPlaceholder: Message = { role: 'assistant', content: '' }
    setMessages(prev => [...prev, assistantPlaceholder])

    const controller = new AbortController()
    abortRef.current = controller

    try {
      const history = messages.map(m => ({ role: m.role, content: m.content }))
      history.push({ role: 'user', content: text })

      const response = await fetch(OLLAMA_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          model: MODEL,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...history,
          ],
          stream: true,
        }),
      })

      if (!response.ok) {
        throw new Error(`Ollama responded with ${response.status}. Make sure Ollama is running and TinyLlama is pulled.`)
      }

      const reader = response.body!.getReader()
      const decoder = new TextDecoder()
      let accumulated = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split('\n').filter(l => l.trim())

        for (const line of lines) {
          try {
            const json = JSON.parse(line)
            const delta = json?.message?.content ?? ''
            accumulated += delta
            // Live-update the last message (streaming effect)
            setMessages(prev => {
              const updated = [...prev]
              updated[updated.length - 1] = { role: 'assistant', content: accumulated }
              return updated
            })
          } catch {
            // ignore partial JSON chunks
          }
        }
      }

      if (!accumulated) {
        setMessages(prev => {
          const updated = [...prev]
          updated[updated.length - 1] = { role: 'assistant', content: "I couldn't generate a response. Please try again." }
          return updated
        })
      }
    } catch (err: unknown) {
      if ((err as Error).name === 'AbortError') return
      const errMsg = err instanceof Error ? err.message : 'Unknown error'
      setMessages(prev => {
        const updated = [...prev]
        updated[updated.length - 1] = {
          role: 'assistant',
          content: `⚠️ Connection error: ${errMsg}\n\nMake sure:\n1. Ollama is running (\`ollama serve\`)\n2. TinyLlama is downloaded (\`ollama pull tinyllama\`)\n3. Ollama CORS is enabled for localhost`
        }
        return updated
      })
    } finally {
      setIsLoading(false)
      abortRef.current = null
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(20px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      {/* Bg glow */}
      <div className="fixed inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(124,58,237,0.15) 0%, transparent 70%)' }} />

      {/* Header */}
      <div className="relative z-10" style={{ padding: '1.5rem 1.5rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <button id="back-btn" onClick={() => navigate('/home')} className="btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <ArrowLeft size={14} /> Back
          </button>
          <div>
            <h1 style={{ fontFamily: 'Cabinet Grotesk, sans-serif', fontWeight: 900, letterSpacing: '-0.04em', fontSize: '1.6rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span className="vibrant-text">Smart Kerala</span> AI
              <Sparkles size={16} color="#a78bfa" />
            </h1>
            <p style={{ fontFamily: 'Satoshi, sans-serif', fontSize: '0.82rem', color: 'rgba(255,255,255,0.4)' }}>
              Powered by TinyLlama · Running locally via Ollama
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="relative z-10 flex-1 overflow-y-auto" style={{ padding: '1.5rem' }}>
        <div className="max-w-3xl mx-auto" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <AnimatePresence initial={false}>
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 12, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', flexDirection: msg.role === 'user' ? 'row-reverse' : 'row', maxWidth: '80%' }}>
                  {/* Avatar */}
                  <div style={{
                    width: '32px', height: '32px', borderRadius: '9999px', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: msg.role === 'user' ? 'rgba(255,255,255,0.12)' : 'rgba(124,58,237,0.25)',
                    border: `1px solid ${msg.role === 'user' ? 'rgba(255,255,255,0.15)' : 'rgba(124,58,237,0.4)'}`,
                  }}>
                    {msg.role === 'user' ? <User size={14} color="rgba(255,255,255,0.8)" /> : <Bot size={14} color="#a78bfa" />}
                  </div>
                  {/* Bubble */}
                  <div style={{
                    padding: '0.875rem 1.125rem',
                    borderRadius: msg.role === 'user' ? '1.25rem 0.5rem 1.25rem 1.25rem' : '0.5rem 1.25rem 1.25rem 1.25rem',
                    background: msg.role === 'user' ? 'rgba(255,255,255,0.09)' : 'rgba(124,58,237,0.15)',
                    border: `1px solid ${msg.role === 'user' ? 'rgba(255,255,255,0.1)' : 'rgba(124,58,237,0.25)'}`,
                    fontFamily: 'Satoshi, sans-serif',
                    fontSize: '0.9rem',
                    color: '#fff',
                    lineHeight: 1.6,
                    whiteSpace: 'pre-wrap',
                  }}>
                    {/* Streaming cursor on last assistant message while loading */}
                    {msg.content || (index === messages.length - 1 && isLoading ? (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(167,139,250,0.7)' }}>
                        <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> Thinking...
                      </span>
                    ) : '')}
                    {msg.content && index === messages.length - 1 && isLoading && (
                      <span style={{ display: 'inline-block', width: '2px', height: '1em', background: '#a78bfa', marginLeft: '2px', animation: 'blink 1s step-end infinite', verticalAlign: 'text-bottom' }} />
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="relative z-10" style={{ padding: '1rem 1.5rem 1.5rem', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="max-w-3xl mx-auto">
          <div className="glass-card flex gap-3" style={{ borderRadius: '9999px', padding: '0.5rem 0.5rem 0.5rem 1.5rem', alignItems: 'center' }}>
            <input
              id="ai-chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
              placeholder="Ask about places, routes, weather..."
              disabled={isLoading}
              style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontFamily: 'Satoshi, sans-serif', fontSize: '0.9rem', padding: '0.5rem 0', opacity: isLoading ? 0.6 : 1 }}
            />
            <button
              id="ai-send-btn"
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="btn-gradient"
              style={{ borderRadius: '9999px', padding: '0.7rem 1.25rem', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.4rem', opacity: (isLoading || !input.trim()) ? 0.5 : 1, cursor: (isLoading || !input.trim()) ? 'not-allowed' : 'pointer' }}
            >
              {isLoading ? <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> : <Send size={14} />}
              {isLoading ? 'Thinking' : 'Send'}
            </button>
          </div>
          <p style={{ fontFamily: 'Satoshi, sans-serif', fontSize: '0.72rem', color: 'rgba(255,255,255,0.25)', textAlign: 'center', marginTop: '0.5rem' }}>
            TinyLlama runs 100% locally — no data leaves your device 🔒
          </p>
        </div>
      </div>

      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </motion.div>
  )
}
