import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

interface Props { onNext: () => void }

const MISSION_STEPS = [
  { id: 1, icon: '🔍', text: 'perfil encontrado', detail: '@mariana' },
  { id: 2, icon: '👤', text: 'seguiu', detail: 'missão iniciada' },
  { id: 3, icon: '💬', text: 'ela respondeu', detail: 'STATUS: sucesso inesperado' },
  { id: 4, icon: '📱', text: 'conversamos', detail: 'horas e horas' },
  { id: 5, icon: '📍', text: 'encontro marcado', detail: 'na praça ♡' },
]

const SCREENSHOTS = [
  '/fotos/instagram-1.png',
  '/fotos/instagram-2.png',
  '/fotos/instagram-3.png',
]

export default function Chapter02Instagram({ onNext }: Props) {
  const [revealed, setRevealed] = useState(0)
  const [activeShot, setActiveShot] = useState<number | null>(null)

  const next = () => {
    if (revealed < MISSION_STEPS.length) setRevealed(r => r + 1)
  }

  return (
    <motion.div
      className="chapter-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      style={{ zIndex: 1, justifyContent: 'flex-start', paddingTop: 50, gap: 16 }}
    >
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center' }}>
        <div className="chapter-tag">CAPÍTULO 02</div>
        <h2 style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: 'clamp(12px, 3vw, 24px)',
        }} className="text-gradient-blue">
          COMO EU ACHEI VOCÊ
        </h2>
        <p style={{
          fontFamily: "'VT323', monospace", fontSize: 18,
          color: 'rgba(255,107,157,0.6)', marginTop: 6, letterSpacing: '0.15em',
        }}>
          MISSÃO: FALAR COM ELA
        </p>
      </motion.div>

      {/* mission log */}
      <div style={{ width: '100%', maxWidth: 500 }}>
        <div className="glass" style={{
          borderRadius: 10, padding: '12px 16px',
          fontFamily: "'VT323', monospace",
        }}>
          <div style={{ fontSize: 13, color: 'rgba(79,195,247,0.5)', letterSpacing: '0.2em', marginBottom: 10 }}>
            &gt;&gt; LOG DE MISSÃO_
          </div>

          {MISSION_STEPS.map((s, i) => (
            <AnimatePresence key={s.id}>
              {revealed > i && (
                <motion.div
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '6px 4px',
                    borderBottom: i < MISSION_STEPS.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <span style={{ fontSize: 18 }}>{s.icon}</span>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: 18, color: '#e0e8f0' }}>{s.text}</span>
                    <span style={{ fontSize: 15, color: 'rgba(255,107,157,0.6)', marginLeft: 10 }}>// {s.detail}</span>
                  </div>
                  <span style={{ color: 'rgba(79,195,247,0.8)', fontSize: 16 }}>✓</span>
                </motion.div>
              )}
            </AnimatePresence>
          ))}

          {revealed < MISSION_STEPS.length && (
            <motion.div
              style={{ paddingTop: 8, display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.3)', fontSize: 16 }}
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <span>▶</span>
              <span>aguardando próxima ação...</span>
              <span className="blink">_</span>
            </motion.div>
          )}
        </div>

        {revealed < MISSION_STEPS.length && (
          <motion.div style={{ textAlign: 'center', marginTop: 10 }}>
            <button
              className="btn-primary"
              onClick={next}
              style={{ fontSize: 9 }}
            >
              <span>[ PRÓXIMO ]</span>
            </button>
          </motion.div>
        )}
      </div>

      {/* mission complete */}
      <AnimatePresence>
        {revealed >= MISSION_STEPS.length && (
          <motion.div
            style={{ width: '100%', maxWidth: 500, textAlign: 'center' }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: 'clamp(9px, 2vw, 13px)',
              padding: '10px 20px',
              borderRadius: 6,
              marginBottom: 14,
              background: 'linear-gradient(135deg, rgba(255,107,157,0.15), rgba(79,195,247,0.15))',
              border: '1px solid rgba(255,107,157,0.4)',
            }} className="glow-pink">
              ✦ MISSÃO CONCLUÍDA ✦
            </div>

            {/* screenshots in phone frames */}
            <p style={{
              fontFamily: "'VT323', monospace", fontSize: 17,
              color: 'rgba(255,255,255,0.4)', marginBottom: 10, letterSpacing: '0.1em',
            }}>
              evidências do crime ▼
            </p>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 14 }}>
              {SCREENSHOTS.map((src, i) => (
                <motion.div
                  key={i}
                  style={{
                    width: 'clamp(80px, 22vw, 110px)',
                    borderRadius: 8,
                    overflow: 'hidden',
                    border: '2px solid rgba(255,107,157,0.3)',
                    cursor: 'pointer',
                    flexShrink: 0,
                  }}
                  whileHover={{ scale: 1.05, borderColor: 'rgba(255,107,157,0.8)' }}
                  onClick={() => setActiveShot(activeShot === i ? null : i)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                >
                  <img src={src} alt={`screenshot ${i + 1}`} style={{ width: '100%', display: 'block' }} />
                </motion.div>
              ))}
            </div>

            {/* enlarged screenshot */}
            <AnimatePresence>
              {activeShot !== null && (
                <motion.div
                  style={{
                    position: 'fixed', inset: 0, zIndex: 50,
                    background: 'rgba(5,5,26,0.92)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backdropFilter: 'blur(8px)',
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setActiveShot(null)}
                >
                  <motion.img
                    src={SCREENSHOTS[activeShot]}
                    alt="screenshot"
                    style={{
                      maxWidth: 'min(380px, 90vw)',
                      maxHeight: '80vh',
                      borderRadius: 12,
                      border: '2px solid rgba(255,107,157,0.5)',
                      objectFit: 'contain',
                    }}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.8 }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <button className="btn-primary" onClick={onNext}>
              <span>continuar →</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
