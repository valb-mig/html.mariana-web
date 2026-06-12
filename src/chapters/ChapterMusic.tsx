import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import bestPartImg from '@assets/musicas/best-part.png'
import maniaImg from '@assets/musicas/mania-de-voce.png'
import comoNossosImg from '@assets/musicas/como-nossos-pais.png'
import melhorImg from '@assets/musicas/melhro-que-ontem.png'
import novaDeImg from '@assets/musicas/nova-demais-para-mim.png'
import soSickImg from '@assets/musicas/so-sick.png'
import loveImg from '@assets/musicas/love.png'
import queNemImg from '@assets/musicas/que-nem-mare.png'
import marianaImg from '@assets/musicas/mariana.png'

interface Song { id: number; title: string; artist: string; cover: string; spotifyUrl: string }

const SONGS: Song[] = [
  { id: 1, title: 'Melhor que Ontem', artist: '', cover: melhorImg, spotifyUrl: 'https://open.spotify.com/intl-pt/track/7kwjhB3KqfvjVrQPBawEmq' },
  { id: 4, title: 'Best Part', artist: 'Daniel Caesar ft. H.E.R.', cover: bestPartImg, spotifyUrl: 'https://open.spotify.com/intl-pt/track/1Q7EgiMOuwDcB0PJC6AzON' },
  { id: 2, title: 'Mania de Você', artist: 'Seu Jorge', cover: maniaImg, spotifyUrl: 'https://open.spotify.com/intl-pt/track/6owwZC8gUvrBuygvOHaYXb' },
  { id: 3, title: 'Como Nossos Pais', artist: 'Elis Regina', cover: comoNossosImg, spotifyUrl: 'https://open.spotify.com/intl-pt/track/2ZC8sdv4Kvuql7Q9T8Agzv' },
  { id: 5, title: 'Nova Demais pra Mim', artist: '', cover: novaDeImg, spotifyUrl: 'https://open.spotify.com/intl-pt/track/32OHYqaoYlB7Sho4z6W2MU' },
  { id: 6, title: 'So Sick', artist: 'Ne-Yo', cover: soSickImg, spotifyUrl: 'https://open.spotify.com/intl-pt/track/6brl7bwOHmGFkNw3MBqssT' },
  { id: 7, title: 'Love', artist: 'Keyshia Cole', cover: loveImg, spotifyUrl: 'https://open.spotify.com/intl-pt/track/0W4NhJhcqKCqEP2GIpDCDq' },
  { id: 8, title: 'Que Nem Maré', artist: '', cover: queNemImg, spotifyUrl: 'https://open.spotify.com/intl-pt/track/5F4SvW0GTQVlTUMstJEOyG' },
  { id: 9, title: 'Mariana (Me Faz Voltar)', artist: '', cover: marianaImg, spotifyUrl: 'https://open.spotify.com/intl-pt/track/22MKQEdhetQ0zKVS0JTjt9' },
]

const ALERT_DATA = [
  {
    id: 1, title: '⚠ Sistema de Amor v1.0', icon: '⚠️',
    message: 'Excesso de amor detectado\nno sistema!\n\nImpossível fechar\neste sentimento.',
    delay: 1200, style: { right: 16, bottom: 8 } as React.CSSProperties,
  },
  {
    id: 2, title: '💕 Notificação Importante', icon: '💕',
    message: 'Miguel ama Mariana ♡\n\nEsse processo não\npode ser encerrado.',
    delay: 3000, style: { right: 16, top: 8 } as React.CSSProperties,
  },
]

function WinAlert({ title, icon, message, delay, style, onClose }: {
  title: string; icon: string; message: string
  delay: number; style: React.CSSProperties; onClose: () => void
}) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          style={{ position: 'absolute', zIndex: 85, width: 230, ...style }}
          initial={{ scale: 0.7, opacity: 0, y: 12 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.7, opacity: 0 }}
          transition={{ type: 'spring', damping: 18, stiffness: 260 }}
        >
          <div style={{ border: '2px solid #0a246a', borderRadius: '5px 5px 4px 4px', boxShadow: '4px 4px 14px rgba(0,0,0,0.55)', overflow: 'hidden' }}>
            <div style={{ background: 'linear-gradient(to right, #0a246a, #2f5fb8 35%, #4477cc 50%, #2f5fb8 65%, #0a246a)', padding: '4px 6px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', userSelect: 'none' }}>
              <span style={{ fontFamily: "'Tahoma',sans-serif", fontSize: 11, fontWeight: 700, color: '#fff', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>{title}</span>
              <button onClick={onClose} style={{ width: 20, height: 20, background: 'linear-gradient(to bottom, #f08070, #cc3a2a)', border: '1px solid #7a1a1a', borderRadius: 2, color: '#fff', fontSize: 10, cursor: 'pointer', fontFamily: "'Tahoma',sans-serif", fontWeight: 700, lineHeight: 1 }}>✕</button>
            </div>
            <div style={{ background: '#ece9d8', padding: '10px 12px', display: 'flex', gap: 9, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 24, flexShrink: 0, lineHeight: 1.1 }}>{icon}</span>
              <p style={{ fontFamily: "'Tahoma','Arial',sans-serif", fontSize: 11, color: '#222', lineHeight: 1.6, whiteSpace: 'pre-line' }}>{message}</p>
            </div>
            <div style={{ background: '#ece9d8', borderTop: '1px solid #bbb', padding: '5px 10px', display: 'flex', justifyContent: 'center' }}>
              <button onClick={onClose} style={{ fontFamily: "'Tahoma','Arial',sans-serif", fontSize: 12, padding: '3px 22px', background: 'linear-gradient(to bottom, #f6f6f6, #e0e0e0)', border: '1px solid #999', borderRadius: 3, cursor: 'pointer', minWidth: 70 }}>OK</button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

interface Props { onRestart: () => void }

export default function ChapterMusic({ onRestart }: Props) {
  const [dismissed, setDismissed] = useState<Set<number>>(new Set())

  return (
    <motion.div
      style={{
        position: 'absolute', inset: 0, zIndex: 1, overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 12,
        background: 'linear-gradient(to bottom, #3e96d4 0%, #72b8e4 35%, #96cc76 60%, #4a9a38 100%)',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      transition={{ duration: 0.7 }}
    >
      {/* WinXP Media Player window */}
      <motion.div
        style={{
          width: '100%', maxWidth: 580, maxHeight: '100%',
          border: '2px solid #0a246a', borderRadius: '8px 8px 5px 5px',
          overflow: 'hidden', boxShadow: '5px 5px 24px rgba(0,0,0,0.45)',
          display: 'flex', flexDirection: 'column',
        }}
        initial={{ scale: 0.88, y: 24, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', damping: 20 }}
      >
        {/* title bar */}
        <div style={{ background: 'linear-gradient(to right, #0a246a, #2f5fb8 35%, #4477cc 50%, #2f5fb8 65%, #0a246a)', padding: '5px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', userSelect: 'none', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 14 }}>🎵</span>
            <span style={{ fontFamily: "'Tahoma','Arial',sans-serif", fontSize: 12, fontWeight: 700, color: '#fff', textShadow: '1px 1px 2px rgba(0,0,0,0.6)' }}>
              Windows Media Player — Nossa Trilha Sonora
            </span>
          </div>
          <div style={{ display: 'flex', gap: 2 }}>
            {['−', '□'].map(s => <button key={s} style={{ width: 21, height: 21, background: 'linear-gradient(to bottom, #7ba2d4, #4e7bb5)', border: '1px solid #1a3a7a', borderRadius: 2, color: '#fff', fontSize: 12, cursor: 'default', fontFamily: "'Tahoma',sans-serif", fontWeight: 700, lineHeight: 1 }}>{s}</button>)}
            <button style={{ width: 21, height: 21, background: 'linear-gradient(to bottom, #f08070, #cc3a2a)', border: '1px solid #7a1a1a', borderRadius: 2, color: '#fff', fontSize: 11, cursor: 'default', fontFamily: "'Tahoma',sans-serif", fontWeight: 700, lineHeight: 1 }}>✕</button>
          </div>
        </div>

        {/* menu bar */}
        <div style={{ background: '#ece9d8', borderBottom: '1px solid #c8c4b4', padding: '2px 8px', display: 'flex', flexShrink: 0 }}>
          {['Arquivo', 'Exibir', 'Reprodução', 'Favoritos', 'Ajuda'].map(item => (
            <span key={item} style={{ fontFamily: "'Tahoma','Arial',sans-serif", fontSize: 11, color: '#222', padding: '2px 8px', cursor: 'default' }}>{item}</span>
          ))}
        </div>

        {/* toolbar */}
        <div style={{ background: '#d4d0c8', borderBottom: '1px solid #b8b4a8', padding: '3px 10px', display: 'flex', gap: 4, alignItems: 'center', flexShrink: 0 }}>
          {['⏮', '▶', '⏸', '⏹', '⏭'].map(btn => (
            <button key={btn} style={{ background: 'linear-gradient(to bottom, #f0ede4, #d8d4c8)', border: '1px solid #aaa', borderRadius: 3, padding: '2px 8px', fontSize: 12, cursor: 'default', fontFamily: 'system-ui' }}>{btn}</button>
          ))}
          <div style={{ flex: 1, marginLeft: 8, height: 6, background: '#bbb', borderRadius: 3, border: '1px inset #aaa', position: 'relative' }}>
            <div style={{ width: '35%', height: '100%', background: '#316ac5', borderRadius: 3 }} />
          </div>
          <span style={{ fontFamily: "'Tahoma',sans-serif", fontSize: 10, color: '#444', marginLeft: 6 }}>0:00 / ∞</span>
        </div>

        {/* songs list */}
        <div style={{ background: '#fff', flex: 1, overflowY: 'auto', minHeight: 0 }}>
          {/* header */}
          <div style={{ padding: '10px 14px 8px', borderBottom: '1px solid #e8e8e8', textAlign: 'center' }}>
            <h2 style={{ fontFamily: "'Pacifico',cursive", fontSize: 'clamp(14px, 2.5vw, 20px)', color: '#0a246a', marginBottom: 2 }}>
              🎶 nossa trilha sonora
            </h2>
            <p style={{ fontFamily: "'Tahoma','Arial',sans-serif", fontSize: 10, color: '#888' }}>
              as músicas que contam a nossa história
            </p>
          </div>

          {SONGS.map((song, i) => (
            <motion.a
              key={song.id}
              href={song.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center',
                borderBottom: '1px solid #f0f0f0',
                textDecoration: 'none',
                background: i % 2 === 0 ? '#ffffff' : '#f8f8f8',
              }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.07 }}
              whileHover={{ backgroundColor: '#ddeeff' }}
            >
              {/* track number */}
              <span style={{ fontFamily: "'Tahoma',sans-serif", fontSize: 10, color: '#999', padding: '8px 8px', width: 28, flexShrink: 0, textAlign: 'right' }}>
                {i + 1}
              </span>
              {/* cover */}
              <img src={song.cover} alt={song.title} style={{ width: 36, height: 36, objectFit: 'cover', flexShrink: 0, borderRadius: 2, margin: '4px 8px 4px 0' }} />
              {/* info */}
              <div style={{ flex: 1, minWidth: 0, padding: '0 8px 0 0' }}>
                <div style={{ fontFamily: "'Tahoma','Arial',sans-serif", fontSize: 12, fontWeight: 700, color: '#111', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {song.title}
                </div>
                {song.artist && (
                  <div style={{ fontFamily: "'Tahoma','Arial',sans-serif", fontSize: 10, color: '#888', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {song.artist}
                  </div>
                )}
              </div>
              <span style={{ fontFamily: "'Tahoma',sans-serif", fontSize: 10, color: '#1DB954', padding: '0 10px', flexShrink: 0, whiteSpace: 'nowrap' }}>
                ▶ Spotify
              </span>
            </motion.a>
          ))}

          {/* sign-off */}
          <div style={{ padding: '12px 14px', borderTop: '1px solid #eee', textAlign: 'center' }}>
            <p style={{ fontFamily: "'Pacifico',cursive", fontSize: 'clamp(12px, 2vw, 16px)', color: '#e8537a' }}>
              feliz dia dos namorados ♡
            </p>
          </div>
        </div>

        {/* status bar */}
        <div style={{ background: '#ece9d8', borderTop: '1px solid #bbb', padding: '3px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
          <span style={{ fontFamily: "'Tahoma','Arial',sans-serif", fontSize: 10, color: '#555' }}>
            {SONGS.length} faixas &nbsp;|&nbsp; muito amor detectado
          </span>
          <button onClick={onRestart} style={{ fontFamily: "'Tahoma','Arial',sans-serif", fontSize: 11, padding: '2px 14px', background: 'linear-gradient(to bottom, #f6f6f6, #e0e0e0)', border: '1px solid #999', borderRadius: 3, cursor: 'pointer' }}>
            🌹 Recomeçar
          </button>
        </div>
      </motion.div>

      {/* WinXP alerts */}
      {ALERT_DATA.map(a => (
        !dismissed.has(a.id) && (
          <WinAlert key={a.id} title={a.title} icon={a.icon} message={a.message} delay={a.delay} style={a.style} onClose={() => setDismissed(prev => new Set(prev).add(a.id))} />
        )
      ))}
    </motion.div>
  )
}
