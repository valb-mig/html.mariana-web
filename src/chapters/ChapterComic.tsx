import { motion } from 'framer-motion'
import { useRef } from 'react'
import comicUrl from '@assets/background/quadrinho.png'

interface Props { onNext: () => void }

export default function ChapterComic({ onNext }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <motion.div
      style={{
        position: 'absolute', inset: 0, zIndex: 1,
        display: 'flex', flexDirection: 'column',
        background: '#3a96d4',
        padding: 12,
        overflow: 'hidden',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      transition={{ duration: 0.5 }}
    >
      {/* Windows Picture Viewer window */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        border: '2px solid #0a246a',
        borderRadius: '8px 8px 5px 5px',
        overflow: 'hidden',
        boxShadow: '5px 5px 20px rgba(0,0,0,0.4)',
        minHeight: 0,
      }}>
        {/* title bar */}
        <div style={{
          background: 'linear-gradient(to right, #0a246a, #2f5fb8 35%, #4477cc 50%, #2f5fb8 65%, #0a246a)',
          padding: '5px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          userSelect: 'none', flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 14 }}>📷</span>
            <span style={{ fontFamily: "'Tahoma','Arial',sans-serif", fontSize: 12, fontWeight: 700, color: '#fff', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
              quadrinho.png — Visualizador de Fotos e Fax do Windows
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

        {/* menu bar */}
        <div style={{
          background: '#ece9d8', borderBottom: '1px solid #c8c4b4',
          padding: '2px 8px', display: 'flex', gap: 0, flexShrink: 0,
        }}>
          {['Arquivo', 'Exibir', 'Imagem', 'Ajuda'].map(item => (
            <span key={item} style={{ fontFamily: "'Tahoma','Arial',sans-serif", fontSize: 11, color: '#222', padding: '2px 8px', cursor: 'default' }}>
              {item}
            </span>
          ))}
        </div>

        {/* toolbar */}
        <div style={{
          background: '#d4d0c8', borderBottom: '1px solid #b8b4a8',
          padding: '3px 8px', display: 'flex', gap: 3, alignItems: 'center', flexShrink: 0,
        }}>
          {[['⬅', 'Anterior'], ['➡', 'Próxima'], ['|', ''], ['🔍', 'Zoom +'], ['🔍', 'Zoom −'], ['⟳', 'Girar'], ['🖨', 'Imprimir']].map(([icon, tip], i) =>
            icon === '|' ? (
              <div key={i} style={{ width: 1, height: 20, background: '#aaa', margin: '0 3px' }} />
            ) : (
              <button key={i} title={tip} style={{
                background: 'linear-gradient(to bottom, #f0ede4, #d8d4c8)',
                border: '1px solid #aaa', borderRadius: 2,
                padding: '2px 7px', fontSize: 12, cursor: 'default',
                fontFamily: 'system-ui',
              }}>{icon}</button>
            )
          )}
        </div>

        {/* image area — scrollable */}
        <div
          ref={containerRef}
          style={{
            flex: 1, background: '#6a6a6a', overflowY: 'auto',
            display: 'flex', justifyContent: 'center',
            padding: '16px', minHeight: 0,
          }}
        >
          <img
            src={comicUrl}
            alt="quadrinho de como nos conhecemos"
            style={{ maxWidth: '100%', height: 'auto', display: 'block', borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.4)' }}
          />
        </div>

        {/* status bar */}
        <div style={{
          background: '#ece9d8', borderTop: '1px solid #bbb',
          padding: '3px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexShrink: 0,
        }}>
          <span style={{ fontFamily: "'Tahoma','Arial',sans-serif", fontSize: 10, color: '#555' }}>
            quadrinho.png &nbsp;|&nbsp; PNG &nbsp;|&nbsp; Imagem 1 de 1
          </span>
          <button
            onClick={onNext}
            style={{
              fontFamily: "'Tahoma','Arial',sans-serif",
              fontSize: 11, padding: '3px 16px',
              background: 'linear-gradient(to bottom, #f6f6f6, #e0e0e0)',
              border: '1px solid #999', borderRadius: 3, cursor: 'pointer',
            }}
          >
            Próxima &gt;
          </button>
        </div>
      </div>
    </motion.div>
  )
}
