import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

interface Props { onNext: () => void }

interface Song {
  id: string; title: string; artist: string
  color: string; glow: string; emoji: string
  memory: string
  orbitR: number; orbitSpeed: number; orbitDelay: number
}

const SONGS: Song[] = [
  {
    id: 's1', title: 'Melhor Que Ontem', artist: 'Djonga',
    color: '#ff6b35', glow: 'rgba(255,107,53,0.5)',
    emoji: '🌅', memory: 'porque cada dia com você é melhor que o anterior.',
    orbitR: 90, orbitSpeed: 18, orbitDelay: 0,
  },
  {
    id: 's2', title: 'Best Part', artist: 'Daniel Caesar ft. H.E.R.',
    color: '#ffd700', glow: 'rgba(255,215,0,0.5)',
    emoji: '✨', memory: '"você é a melhor parte" — não precisa traduzir.',
    orbitR: 130, orbitSpeed: 26, orbitDelay: 3,
  },
  {
    id: 's3', title: 'Gatinha Comunista', artist: 'Vitroles',
    color: '#ef5350', glow: 'rgba(239,83,80,0.5)',
    emoji: '🌹', memory: 'educação física, musculação e filosofia — claro que essa música é sua.',
    orbitR: 170, orbitSpeed: 34, orbitDelay: 6,
  },
  {
    id: 's4', title: 'Mania de Você', artist: 'Rita Lee',
    color: '#ff6b9d', glow: 'rgba(255,107,157,0.6)',
    emoji: '💗', memory: 'mania — é exatamente isso.',
    orbitR: 60, orbitSpeed: 12, orbitDelay: 1,
  },
  {
    id: 's5', title: 'Um Amor Puro', artist: 'Djavan',
    color: '#4fc3f7', glow: 'rgba(79,195,247,0.6)',
    emoji: '💎', memory: 'puro. sem mais.',
    orbitR: 210, orbitSpeed: 42, orbitDelay: 9,
  },
]

const PLAYLIST_ID = '4GG2SIbtNdv1yWoz8Jo2v8'

export default function Chapter03Galaxy({ onNext }: Props) {
  const [selected, setSelected] = useState<Song | null>(null)
  const [showPlayer, setShowPlayer] = useState(false)

  return (
    <motion.div
      className="chapter-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      style={{ zIndex: 1, justifyContent: 'flex-start', paddingTop: 40, gap: 0 }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', marginBottom: 10 }}
      >
        <div className="chapter-tag">CAPÍTULO 03</div>
        <h2 style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: 'clamp(11px, 2.8vw, 22px)',
        }} className="text-gradient-aurora">
          GALÁXIA MUSICAL
        </h2>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic', fontSize: 18,
          color: 'rgba(224,232,240,0.5)', marginTop: 4,
        }}>
          nossa trilha sonora
        </p>
      </motion.div>

      {/* solar system */}
      <div style={{ position: 'relative', width: '100%', maxWidth: 440, height: 'clamp(240px, 45vw, 340px)', margin: '0 auto 16px' }}>
        {/* center star = us */}
        <motion.div
          style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 44, height: 44,
            borderRadius: '50%',
            background: 'radial-gradient(circle, #fffde7 0%, #ffd700 40%, #ff6b9d 80%, transparent 100%)',
            zIndex: 5,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18,
          }}
          animate={{ boxShadow: [
            '0 0 20px rgba(255,215,0,0.6), 0 0 50px rgba(255,107,157,0.3)',
            '0 0 35px rgba(255,215,0,0.9), 0 0 80px rgba(255,107,157,0.5)',
            '0 0 20px rgba(255,215,0,0.6), 0 0 50px rgba(255,107,157,0.3)',
          ]}}
          transition={{ duration: 3, repeat: Infinity }}
        >
          ♡
        </motion.div>

        {/* orbit rings */}
        {[60, 90, 130, 170, 210].map((r, i) => (
          <div key={i} style={{
            position: 'absolute', top: '50%', left: '50%',
            width: r * 2, height: r * 2,
            marginTop: -r, marginLeft: -r,
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.05)',
            pointerEvents: 'none',
          }} />
        ))}

        {/* planets */}
        {SONGS.map((song) => {
          const r = song.orbitR
          const containerSize = Math.min(440, window.innerWidth)
          const scale = containerSize / 440
          const scaledR = r * scale
          return (
            <motion.button
              key={song.id}
              onClick={() => setSelected(selected?.id === song.id ? null : song)}
              style={{
                position: 'absolute', top: '50%', left: '50%',
                width: 32, height: 32,
                marginTop: -16, marginLeft: -16,
                borderRadius: '50%',
                background: `radial-gradient(circle at 35% 35%, white, ${song.color})`,
                border: `2px solid ${song.color}`,
                cursor: 'pointer',
                zIndex: 3,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14,
              }}
              animate={{
                boxShadow: selected?.id === song.id
                  ? [`0 0 25px ${song.glow}`, `0 0 50px ${song.glow}`, `0 0 25px ${song.glow}`]
                  : `0 0 12px ${song.glow}`,
                rotate: [0, 360],
                x: [scaledR, 0, -scaledR, 0, scaledR],
                y: [0, -scaledR, 0, scaledR, 0],
              }}
              transition={{
                x: { duration: song.orbitSpeed, repeat: Infinity, ease: 'linear', delay: song.orbitDelay },
                y: { duration: song.orbitSpeed, repeat: Infinity, ease: 'linear', delay: song.orbitDelay },
                rotate: { duration: song.orbitSpeed * 0.8, repeat: Infinity, ease: 'linear' },
                boxShadow: { duration: 2, repeat: Infinity },
              }}
              whileHover={{ scale: 1.4 }}
            >
              {song.emoji}
            </motion.button>
          )
        })}
      </div>

      {/* selected song card */}
      <AnimatePresence mode="wait">
        {selected && (
          <motion.div
            key={selected.id}
            className="glass-pink"
            style={{
              maxWidth: 480, width: '100%', borderRadius: 12,
              padding: '14px 18px', marginBottom: 10, textAlign: 'center',
            }}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <div style={{ fontSize: 28, marginBottom: 4 }}>{selected.emoji}</div>
            <div style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: 'clamp(7px, 1.8vw, 10px)',
              color: '#ffb3cc', marginBottom: 2,
            }}>
              {selected.title}
            </div>
            <div style={{
              fontFamily: "'VT323', monospace", fontSize: 16,
              color: 'rgba(224,232,240,0.6)', marginBottom: 8,
            }}>
              {selected.artist}
            </div>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic', fontSize: 'clamp(15px, 3vw, 18px)',
              color: 'rgba(224,232,240,0.85)', lineHeight: 1.5,
            }}>
              "{selected.memory}"
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* song list compact */}
      {!selected && (
        <motion.div
          style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center', maxWidth: 480, marginBottom: 10 }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        >
          {SONGS.map(s => (
            <button key={s.id} onClick={() => setSelected(s)} style={{
              fontFamily: "'VT323', monospace", fontSize: 15,
              background: 'transparent',
              border: `1px solid ${s.color}40`,
              color: s.color,
              padding: '3px 10px', borderRadius: 20, cursor: 'pointer',
            }}>
              {s.emoji} {s.title}
            </button>
          ))}
        </motion.div>
      )}

      {/* player toggle */}
      <motion.div
        style={{ width: '100%', maxWidth: 480 }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
      >
        <button
          onClick={() => setShowPlayer(!showPlayer)}
          style={{
            width: '100%', fontFamily: "'Press Start 2P', monospace", fontSize: 8,
            background: 'rgba(30, 20, 60, 0.8)',
            border: '1px solid rgba(79,195,247,0.3)',
            color: 'rgba(79,195,247,0.8)', padding: '10px',
            borderRadius: '6px 6px 0 0', cursor: 'pointer',
            letterSpacing: '0.1em',
          }}
        >
          ♫ {showPlayer ? '▲ FECHAR PLAYER' : '▼ ABRIR PLAYER'}
        </button>

        <AnimatePresence>
          {showPlayer && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4 }}
              style={{ overflow: 'hidden' }}
            >
              <iframe
                src={`https://open.spotify.com/embed/playlist/${PLAYLIST_ID}?utm_source=generator&theme=0`}
                width="100%"
                height="200"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                style={{ display: 'block', borderRadius: '0 0 6px 6px' }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div style={{ marginTop: 12 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
        <button className="btn-primary" onClick={onNext}><span>continuar →</span></button>
      </motion.div>
    </motion.div>
  )
}
