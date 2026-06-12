import { motion } from 'framer-motion'
import { useState } from 'react'
import rosesBg from '@assets/background/red-roses-red-flowers-rose-flowers-3840x2160-8930.jpg'
import gif1 from '@assets/gif-emojis/4d21146420614e8b5a75763e55d6ae97.gif'
import gif2 from '@assets/gif-emojis/e35235a3fe7479b377ce9185012ba676.gif'
import gif3 from '@assets/gif-emojis/fe147d50726aec3bb72205c00faebb57.gif'

const GIFS = [gif1, gif2, gif3]
const FLOATERS = ['🌹', '💕', '🌸', '💝', '🌺', '💗', '🌹', '✨']

interface Props { onNext: () => void }

export default function Opening({ onNext }: Props) {
  const [exiting, setExiting] = useState(false)

  const handleStart = () => {
    if (exiting) return
    setExiting(true)
    setTimeout(onNext, 900)
  }

  return (
    <motion.div
      style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${rosesBg})`,
        backgroundSize: 'cover', backgroundPosition: 'bottom center',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden', zIndex: 1,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      transition={{ duration: 0.8 }}
    >
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.35) 100%)',
      }} />

      {/* floating GIFs */}
      {GIFS.map((gif, i) => (
        <motion.img
          key={`gif-${i}`}
          src={gif} alt=""
          style={{
            position: 'absolute',
            width: 'clamp(90px, 13vw, 150px)',
            left: `${12 + i * 32}%`,
            top: `${8 + (i % 2) * 52}%`,
            pointerEvents: 'none', zIndex: 2,
          }}
          animate={exiting
            ? { rotate: i % 2 === 0 ? 720 : -720, scale: 0, opacity: 0, y: -250 }
            : { y: [0, -18, 0] }
          }
          transition={exiting
            ? { duration: 0.55, delay: i * 0.07, ease: 'easeIn' }
            : { duration: 3.5 + i, repeat: Infinity, delay: i * 0.6, ease: 'easeInOut' }
          }
        />
      ))}

      {/* floating emojis */}
      {FLOATERS.map((emoji, i) => (
        <motion.span
          key={`fl-${i}`}
          style={{
            position: 'absolute',
            fontSize: `clamp(32px, 4.5vw, 58px)`,
            left: `${4 + i * 12}%`,
            top: `${15 + (i % 4) * 20}%`,
            zIndex: 2, userSelect: 'none',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
          }}
          animate={exiting
            ? { rotate: i % 2 === 0 ? 540 : -540, scale: 0, opacity: 0, y: -180, x: (i % 3 - 1) * 100 }
            : { y: [0, -12, 0], rotate: [0, 8, -8, 0] }
          }
          transition={exiting
            ? { duration: 0.5, delay: i * 0.05, ease: 'easeIn' }
            : { duration: 3.5 + i * 0.4, repeat: Infinity, delay: i * 0.25, ease: 'easeInOut' }
          }
        >
          {emoji}
        </motion.span>
      ))}

      {/* Internet Explorer window */}
      <motion.div
        style={{
          position: 'relative', zIndex: 3,
          width: 'min(500px, 92vw)',
          border: '2px solid #0a246a',
          borderRadius: '8px 8px 5px 5px',
          overflow: 'hidden',
          boxShadow: '5px 5px 24px rgba(0,0,0,0.45)',
        }}
        animate={exiting ? { scale: 0, rotate: 360, opacity: 0 } : { scale: 1, rotate: 0, opacity: 1 }}
        transition={exiting ? { duration: 0.65, ease: 'easeIn' } : {}}
        initial={{ scale: 0.85, opacity: 0, y: 30 }}
      >
        {/* title bar */}
        <div style={{
          background: 'linear-gradient(to right, #0a246a, #2f5fb8 35%, #4477cc 50%, #2f5fb8 65%, #0a246a)',
          padding: '5px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          userSelect: 'none',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 14 }}>💕</span>
            <span style={{ fontFamily: "'Tahoma','Arial',sans-serif", fontSize: 12, fontWeight: 700, color: '#fff', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
              Mensagem Especial — Internet Explorer
            </span>
          </div>
          <div style={{ display: 'flex', gap: 2 }}>
            {['−', '□'].map(s => (
              <button key={s} style={{
                width: 21, height: 21,
                background: 'linear-gradient(to bottom, #7ba2d4, #4e7bb5)',
                border: '1px solid #1a3a7a', borderRadius: 2,
                color: '#fff', fontSize: 12, cursor: 'default',
                fontFamily: "'Tahoma',sans-serif", fontWeight: 700, lineHeight: 1,
              }}>{s}</button>
            ))}
            <button style={{
              width: 21, height: 21,
              background: 'linear-gradient(to bottom, #f08070, #cc3a2a)',
              border: '1px solid #7a1a1a', borderRadius: 2,
              color: '#fff', fontSize: 11, cursor: 'default',
              fontFamily: "'Tahoma',sans-serif", fontWeight: 700, lineHeight: 1,
            }}>✕</button>
          </div>
        </div>

        {/* IE address bar */}
        <div style={{
          background: '#ece9d8', borderBottom: '1px solid #c8c4b4',
          padding: '3px 8px', display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <span style={{ fontFamily: "'Tahoma',sans-serif", fontSize: 10, color: '#555', whiteSpace: 'nowrap' }}>Endereço:</span>
          <div style={{ flex: 1, background: '#fff', border: '1px inset #aaa', borderRadius: 2, padding: '1px 6px', overflow: 'hidden' }}>
            <span style={{ fontFamily: "'Courier New',monospace", fontSize: 10, color: '#0000cc' }}>
              http://miguel-ama-mariana.com.br/surpresa
            </span>
          </div>
          <button style={{
            fontFamily: "'Tahoma',sans-serif", fontSize: 10,
            padding: '1px 8px', background: 'linear-gradient(to bottom, #f6f6f6, #e0e0e0)',
            border: '1px solid #999', borderRadius: 2, cursor: 'default',
          }}>Ir</button>
        </div>

        {/* content */}
        <div style={{
          background: 'rgba(255,255,255,0.22)', backdropFilter: 'blur(14px)',
          padding: 'clamp(16px, 3vw, 28px) clamp(20px, 4.5vw, 44px)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
          textAlign: 'center',
        }}>
          <motion.h1
            style={{
              fontFamily: "'Pacifico',cursive",
              fontSize: 'clamp(22px, 5vw, 56px)',
              color: '#fff', textShadow: '2px 4px 12px rgba(140,20,40,0.6)',
              lineHeight: 1.25,
            }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            Feliz dia dos<br />namorados
          </motion.h1>

          <motion.div
            style={{ fontSize: 'clamp(22px, 3.2vw, 38px)', lineHeight: 1 }}
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            initial={{ opacity: 0 }}
          >
            💕
          </motion.div>

          <motion.button
            onClick={handleStart}
            style={{
              fontFamily: "'Fredoka One',cursive",
              fontSize: 'clamp(15px, 2.4vw, 24px)',
              padding: '11px 40px',
              background: 'linear-gradient(135deg, #e8537a, #f4847a)',
              border: 'none', borderRadius: 50, color: '#fff',
              cursor: 'pointer', letterSpacing: '0.04em',
              boxShadow: '0 8px 24px rgba(232,83,122,0.5)', outline: 'none',
            }}
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            whileHover={{ scale: 1.08, boxShadow: '0 12px 32px rgba(232,83,122,0.7)' }}
            whileTap={{ scale: 0.94 }}
          >
            Começar 🌹
          </motion.button>
        </div>

        {/* IE status bar */}
        <div style={{
          background: '#ece9d8', borderTop: '1px solid #c8c4b4',
          padding: '2px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span style={{ fontFamily: "'Tahoma',sans-serif", fontSize: 10, color: '#555' }}>Concluído</span>
          <span style={{ fontFamily: "'Tahoma',sans-serif", fontSize: 10, color: '#555' }}>🌐 Internet</span>
        </div>
      </motion.div>
    </motion.div>
  )
}
