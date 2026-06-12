import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

interface Props { onRestart: () => void }

const LINES = [
  '> Iniciando análise...',
  '> Carregando memórias...',
  '> Analisando conversas...',
  '> Calculando quilômetros percorridos na linha 1987...',
  '> Analisando treinos juntos...',
  '> Analisando filmes assistidos...',
  '> Analisando músicas compartilhadas...',
  '> Contando mudanças de casa ajudadas...',
  '> Processando piadas internas...',
  '> ...',
  '> ANÁLISE COMPLETA.',
]

export default function ChapterFinal({ onRestart }: Props) {
  const [visibleLines, setVisibleLines] = useState<string[]>([])
  const [showResult, setShowResult] = useState(false)
  const [showHearts, setShowHearts] = useState(false)

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i < LINES.length) {
        setVisibleLines(prev => [...prev, LINES[i]])
        i++
      } else {
        clearInterval(interval)
        setTimeout(() => setShowResult(true), 600)
        setTimeout(() => setShowHearts(true), 1400)
      }
    }, 380)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="chapter-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      style={{
        zIndex: 1, background: 'rgba(0,0,0,0.7)',
        justifyContent: 'center', gap: 0, backdropFilter: 'blur(4px)',
      }}
    >
      {/* floating hearts when result shows */}
      {showHearts && Array.from({ length: 12 }).map((_, i) => (
        <motion.span
          key={i}
          style={{
            position: 'absolute',
            fontSize: `${14 + Math.random() * 18}px`,
            color: i % 2 === 0 ? '#ff6b9d' : '#4fc3f7',
            left: `${Math.random() * 90 + 5}%`,
            top: `${Math.random() * 80 + 10}%`,
            pointerEvents: 'none',
            zIndex: 0,
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: [0, 0.6, 0], y: -80 }}
          transition={{ duration: 3 + Math.random() * 2, delay: Math.random() * 2, repeat: Infinity, repeatDelay: Math.random() * 4 }}
        >
          ♡
        </motion.span>
      ))}

      <div style={{ width: '100%', maxWidth: 580, zIndex: 2 }}>
        {/* terminal log */}
        <div className="glass" style={{
          borderRadius: 10, padding: '16px 20px',
          fontFamily: "'VT323', monospace",
          fontSize: 'clamp(15px, 3vw, 19px)',
          lineHeight: 1.7,
          marginBottom: 20,
          borderColor: 'rgba(79,195,247,0.2)',
        }}>
          <div style={{ color: 'rgba(79,195,247,0.5)', fontSize: 12, fontFamily: "'Press Start 2P', monospace", marginBottom: 10 }}>
            SISTEMA · RELATÓRIO FINAL
          </div>
          {visibleLines.map((line, i) => (
            <motion.div
              key={i}
              style={{
                color: line.includes('COMPLETA') ? '#4fc3f7' : 'rgba(224,232,240,0.7)',
              }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              {line}
            </motion.div>
          ))}
          {visibleLines.length < LINES.length && (
            <span className="blink" style={{ color: 'rgba(79,195,247,0.6)' }}>_</span>
          )}
        </div>

        {/* result */}
        <AnimatePresence>
          {showResult && (
            <motion.div
              style={{ textAlign: 'center' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: 'clamp(13px, 3.5vw, 22px)',
                  lineHeight: 1.8,
                  marginBottom: 24,
                  padding: '20px 16px',
                  borderRadius: 12,
                  background: 'linear-gradient(135deg, rgba(255,107,157,0.1), rgba(79,195,247,0.1))',
                  border: '1px solid rgba(255,107,157,0.35)',
                }}
                className="glow-pink"
                animate={{ boxShadow: [
                  '0 0 20px rgba(255,107,157,0.3)',
                  '0 0 50px rgba(255,107,157,0.6)',
                  '0 0 20px rgba(255,107,157,0.3)',
                ]}}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                <span className="text-gradient-aurora">EU ESCOLHERIA VOCÊ DE NOVO.</span>
              </motion.div>

              <motion.div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(18px, 4vw, 28px)',
                  fontStyle: 'italic',
                  fontWeight: 300,
                  color: 'rgba(224,232,240,0.75)',
                  lineHeight: 2.2,
                  marginBottom: 28,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Ontem.
                <br />Hoje.
                <br />Daqui a dez anos.
                <br />
                <br />
                <span style={{ color: '#ffb3cc' }}>Na linha 1987.</span>
                <br />Ou em qualquer outra.
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0 }}
              >
                <button className="btn-primary" onClick={onRestart}>
                  <span>[ REINICIAR VIAGEM ]</span>
                </button>
              </motion.div>

              <motion.p
                style={{
                  marginTop: 16, fontFamily: "'VT323', monospace",
                  fontSize: 16, color: 'rgba(255,255,255,0.2)',
                  letterSpacing: '0.15em',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                feliz dia dos namorados, minha flor ♡
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
