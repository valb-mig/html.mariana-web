import { motion } from 'framer-motion'
import { useState } from 'react'
import busUrl from '@assets/background/onibus.jpg'
import rotaUrl from '@assets/background/rota-riodoce.png'

interface Props { onNext: () => void }

export default function Chapter01Bus({ onNext }: Props) {
  const [entering, setEntering] = useState(false)

  const handleClick = () => {
    if (entering) return
    setEntering(true)
    setTimeout(onNext, 1300)
  }

  return (
    <motion.div
      style={{
        position: 'absolute', inset: 0, zIndex: 1,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'flex-start',
        background: 'linear-gradient(180deg, #a8d8f0 0%, #c8e8f8 25%, #f5e8c0 55%, #e8d080 100%)',
        overflow: 'hidden',
        paddingTop: 'clamp(12px, 3vw, 24px)',
        paddingBottom: 12,
        gap: 'clamp(8px, 1.8vw, 16px)',
        cursor: entering ? 'default' : 'pointer',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      transition={{ duration: 0.6 }}
      onClick={handleClick}
    >
      {/* IE security bar — the CTA */}
      <motion.div
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, zIndex: 5,
          background: '#fffacc',
          borderBottom: '1px solid #c8b800',
          padding: '5px 12px',
          display: 'flex', alignItems: 'center', gap: 8,
          cursor: 'pointer',
        }}
        animate={entering ? { opacity: 0, y: -30 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <span style={{ fontSize: 16, flexShrink: 0 }}>🛡</span>
        <span style={{ fontFamily: "'Tahoma','Arial',sans-serif", fontSize: 11, color: '#333', flex: 1 }}>
          O <strong>Internet Explorer</strong> bloqueou a entrada neste busão por sua segurança.{' '}
          <span style={{ color: '#0000cc', textDecoration: 'underline', cursor: 'pointer' }}>
            Clique aqui para embarcar
          </span>
          {' '}ou clique no ônibus.
        </span>
        <button style={{
          fontFamily: "'Tahoma',sans-serif", fontSize: 10, padding: '2px 8px',
          background: 'linear-gradient(to bottom, #f6f6f6, #e0e0e0)',
          border: '1px solid #999', borderRadius: 2, cursor: 'pointer', flexShrink: 0,
        }}>
          ✕
        </button>
      </motion.div>

      {/* destination board */}
      <motion.div
        style={{
          background: '#0e0e0e', border: '3px solid #2a2a2a', borderRadius: 6,
          padding: 'clamp(7px, 1.2vw, 12px) clamp(18px, 3.5vw, 44px)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.4), inset 0 0 30px rgba(255,160,0,0.06)',
          textAlign: 'center', position: 'relative', zIndex: 3,
          marginTop: 'clamp(30px, 5vw, 42px)',
        }}
        animate={entering ? { opacity: 0, y: -30 } : { opacity: 1 }}
        transition={{ duration: 0.35 }}
      >
        <div style={{
          fontFamily: "'Fredoka One',cursive",
          fontSize: 'clamp(8px, 1.4vw, 12px)',
          color: '#ff9900', letterSpacing: '0.3em', marginBottom: 3,
          textShadow: '0 0 8px rgba(255,153,0,0.7)',
        }}>
          ◀ LINHA RIO DOCE → RECIFE ▶
        </div>
        <div style={{
          fontFamily: "'Pacifico',cursive",
          fontSize: 'clamp(26px, 5.5vw, 56px)',
          color: '#ffe066', letterSpacing: '0.06em',
          textShadow: '0 0 16px rgba(255,220,80,0.8), 0 0 40px rgba(255,180,0,0.4)',
          lineHeight: 1.1,
        }}>
          pegar busão
        </div>
      </motion.div>

      {/* bus photo */}
      <motion.img
        src={busUrl}
        alt="ônibus"
        style={{
          width: 'clamp(220px, 66vw, 560px)',
          borderRadius: 14,
          boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
          display: 'block', transformOrigin: 'center center', zIndex: 2,
        }}
        animate={entering ? { scale: 9, opacity: 0 } : { scale: 1 }}
        transition={entering ? { duration: 1.1, ease: [0.4, 0, 1, 1] } : {}}
      />

      {/* route map */}
      <motion.div
        style={{ zIndex: 2 }}
        animate={entering ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        initial={{ opacity: 0, y: 16 }}
      >
        <div style={{
          background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(6px)',
          borderRadius: 8, padding: '6px 8px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
          border: '1px solid rgba(255,255,255,0.9)',
        }}>
          <img
            src={rotaUrl}
            alt="rota Rio Doce → Recife"
            style={{ height: 'clamp(42px, 6vw, 70px)', width: 'auto', display: 'block', borderRadius: 4 }}
          />
        </div>
      </motion.div>

      {/* white flash */}
      <motion.div
        style={{ position: 'absolute', inset: 0, zIndex: 10, background: '#fff', pointerEvents: 'none' }}
        initial={{ opacity: 0 }}
        animate={entering ? { opacity: [0, 0, 1] } : { opacity: 0 }}
        transition={entering ? { duration: 1.1, times: [0, 0.65, 1] } : {}}
      />
    </motion.div>
  )
}
