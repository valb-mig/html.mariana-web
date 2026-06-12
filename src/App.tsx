import { useState, useCallback, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import Opening from './chapters/Opening'
import Chapter01Bus from './chapters/Chapter01Bus'
import ChapterComic from './chapters/ChapterComic'
import ChapterLibrary from './chapters/ChapterLibrary'
import ChapterMusic from './chapters/ChapterMusic'

type Chapter = 'opening' | 'bus' | 'comic' | 'library' | 'music'
const CHAPTERS: Chapter[] = ['opening', 'bus', 'comic', 'library', 'music']

const WINDOW_TITLES: Record<Chapter, string> = {
  opening: '💕 Mensagem Especial - Internet Explorer',
  bus: '🚌 Rota Rio Doce → Recife - MapQuest',
  comic: '📷 quadrinho.png - Visualizador de Fotos',
  library: '📚 Biblioteca - Windows Explorer',
  music: '🎵 Nossa Trilha - Windows Media Player',
}

function WinXPTaskbar({ chapter }: { chapter: Chapter }) {
  const [time, setTime] = useState('')

  useEffect(() => {
    const update = () =>
      setTime(new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }))
    update()
    const id = setInterval(update, 10000)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{
      height: 30, flexShrink: 0,
      background: 'linear-gradient(to bottom, #2458b3 0%, #1a4090 60%, #1a3a80 100%)',
      borderTop: '1px solid #5080d0',
      display: 'flex', alignItems: 'center',
      boxShadow: '0 -2px 8px rgba(0,0,0,0.3)',
      zIndex: 200,
    }}>
      {/* Start button */}
      <button style={{
        height: '100%', padding: '0 14px 0 10px',
        background: 'linear-gradient(to bottom, #62bb42 0%, #3d9025 50%, #2a7018 100%)',
        border: 'none', borderRight: '1px solid #2a6018',
        color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer',
        fontFamily: "'Tahoma', sans-serif",
        display: 'flex', alignItems: 'center', gap: 5,
        borderRadius: '0 10px 10px 0',
        boxShadow: 'inset 0 1px rgba(255,255,255,0.3)',
      }}>
        🪟 Iniciar
      </button>

      <div style={{ width: 1, height: '60%', background: 'rgba(255,255,255,0.2)', margin: '0 4px' }} />

      {/* Active window */}
      <div style={{
        height: '80%', maxWidth: 280, minWidth: 120,
        background: 'rgba(0,0,0,0.28)',
        borderRadius: 3, border: '1px solid rgba(255,255,255,0.15)',
        padding: '0 10px',
        display: 'flex', alignItems: 'center',
      }}>
        <span style={{
          fontFamily: "'Tahoma', 'Arial', sans-serif",
          fontSize: 11, color: '#fff', fontWeight: 700,
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>
          {WINDOW_TITLES[chapter]}
        </span>
      </div>

      <div style={{ flex: 1 }} />

      {/* System tray */}
      <div style={{
        height: '100%',
        background: 'linear-gradient(to bottom, #1a4090, #162c7a)',
        borderLeft: '1px solid rgba(255,255,255,0.15)',
        padding: '0 12px',
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <span style={{ fontSize: 13 }}>💕</span>
        <span style={{ fontFamily: "'Tahoma', 'Arial', sans-serif", fontSize: 11, color: '#fff' }}>
          {time}
        </span>
      </div>
    </div>
  )
}

export default function App() {
  const [chapter, setChapter] = useState<Chapter>('opening')

  const next = useCallback(() => {
    const idx = CHAPTERS.indexOf(chapter)
    if (idx < CHAPTERS.length - 1) setChapter(CHAPTERS[idx + 1])
  }, [chapter])

  return (
    <div style={{
      width: '100vw', height: '100vh', overflow: 'hidden',
      position: 'relative', background: '#fdf0e8',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* chapter area — space above taskbar */}
      <div style={{ position: 'relative', flex: 1, overflow: 'hidden' }}>
        <AnimatePresence mode="wait">
          {chapter === 'opening' && <Opening key="opening" onNext={next} />}
          {chapter === 'bus' && <Chapter01Bus key="bus" onNext={next} />}
          {chapter === 'comic' && <ChapterComic key="comic" onNext={next} />}
          {chapter === 'library' && <ChapterLibrary key="library" onNext={next} />}
          {chapter === 'music' && <ChapterMusic key="music" onRestart={() => setChapter('opening')} />}
        </AnimatePresence>
      </div>

      <WinXPTaskbar chapter={chapter} />
    </div>
  )
}
