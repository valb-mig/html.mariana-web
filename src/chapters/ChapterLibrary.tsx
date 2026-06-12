import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import libraryBg from '@assets/background/biblioteca.jpg'
import radioImg from '@assets/radio/radio.png'
import sonataCover from '@assets/livros/a sonata a kreutzer.png'
import felicidadeCover from '@assets/livros/felicidade-conjugal.png'
import guerraCover from '@assets/livros/guerra-e-paz.png'
import hipertrofiaCover from '@assets/livros/hipertrofia-muscular-brad-schonenfeld.png'
import ivanCover from '@assets/livros/ivan-ilich.png'
import sapiensCover from '@assets/livros/sapiens.png'

interface Book {
  id: number
  title: string
  author: string
  cover: string
  description: string
  personalNote: string
  tilt: number
}

const BOOKS: Book[] = [
  {
    id: 1,
    title: 'A Sonata a Kreutzer',
    author: 'Lev Tolstói',
    cover: sonataCover,
    description: 'Uma das obras mais polêmicas de Tolstói. Narrada por Pozdnyshev, que confessa ter assassinado a esposa por ciúme , uma reflexão sobre amor, possessividade e moralidade.',
    personalNote: 'Esse livro me fez entender que amor de verdade não é posse. Quando penso em você, quero a sua liberdade tanto quanto a nossa história juntos.',
    tilt: -2,
  },
  {
    id: 2,
    title: 'Felicidade Conjugal',
    author: 'Lev Tolstói',
    cover: felicidadeCover,
    description: 'A história de Mária, uma jovem que se apaixona por um homem mais velho. O romance acompanha a transformação do amor idealizado em uma relação mais madura.',
    personalNote: 'Mária descobre que o amor que dura é o que cresce junto. Lendo ela, me vejo querendo exatamente isso contigo , crescer, mudar e continuar te escolhendo.',
    tilt: 1.5,
  },
  {
    id: 3,
    title: 'Guerra e Paz',
    author: 'Lev Tolstói',
    cover: guerraCover,
    description: 'Um dos maiores romances já escritos. Famílias da aristocracia russa durante as Guerras Napoleônicas , amor, destino, guerra e o sentido da vida.',
    personalNote: 'No meio de guerras e caos, o que fica são as pessoas que a gente ama. Você seria a minha paz em qualquer guerra.',
    tilt: -1,
  },
  {
    id: 4,
    title: 'Hipertrofia Muscular',
    author: 'Brad Schoenfeld',
    cover: hipertrofiaCover,
    description: 'Referência científica sobre crescimento muscular: volume, intensidade, frequência, recuperação e nutrição aplicados à prática real.',
    personalNote: 'Ok, esse não tem nada a ver com amor... ou tem? Você foi a motivação que me fez querer ser uma versão melhor de mim , não só no treino. 💪',
    tilt: 2,
  },
  {
    id: 5,
    title: 'A Morte de Ivan Ilitch',
    author: 'Lev Tolstói',
    cover: ivanCover,
    description: 'Ivan Ilitch, diante de uma doença terminal, questiona toda a sua existência. Uma das reflexões mais profundas da literatura sobre o que realmente importa.',
    personalNote: 'Ivan passa a vida toda pra descobrir o que importa só no final. Mas eu já sei: é você, aqui, agora. E isso é tudo.',
    tilt: -1.5,
  },
  {
    id: 6,
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    cover: sapiensCover,
    description: 'A trajetória da humanidade desde os primeiros Homo sapiens. Harari argumenta que histórias compartilhadas foram o segredo do nosso domínio.',
    personalNote: 'Harari diz que a humanidade avançou por causa de histórias compartilhadas. A nossa é a minha favorita de todas.',
    tilt: 1,
  },
]

interface PopupProps {
  book: Book
  onClose: () => void
}

function WinXPPopup({ book, onClose }: PopupProps) {
  return (
    <motion.div
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(0,0,0,0.55)',
        backdropFilter: 'blur(4px)',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        style={{
          width: 'min(560px, 94vw)',
          borderRadius: '8px 8px 5px 5px',
          overflow: 'hidden',
          boxShadow: '5px 5px 20px rgba(0,0,0,0.7)',
          border: '2px solid #0a246a',
        }}
        initial={{ scale: 0.65, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.65, y: 40 }}
        transition={{ type: 'spring', damping: 20, stiffness: 220 }}
        onClick={e => e.stopPropagation()}
      >
        {/* title bar */}
        <div style={{
          background: 'linear-gradient(to right, #0a246a, #2f5fb8 35%, #4477cc 50%, #2f5fb8 65%, #0a246a)',
          padding: '4px 6px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          userSelect: 'none',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 13 }}>📖</span>
            <span style={{
              fontFamily: "'Tahoma', 'Arial', sans-serif",
              fontSize: 12, fontWeight: 700, color: '#fff',
              textShadow: '1px 1px 2px rgba(0,0,0,0.6)',
            }}>
              {book.title}
            </span>
          </div>
          <div style={{ display: 'flex', gap: 2 }}>
            {['−', '□'].map(sym => (
              <button key={sym} style={{
                width: 21, height: 21,
                background: 'linear-gradient(to bottom, #7ba2d4, #4e7bb5)',
                border: '1px solid #1a3a7a', borderRadius: 2,
                color: '#fff', fontSize: 11, cursor: 'default',
                fontFamily: "'Tahoma', sans-serif", fontWeight: 700,
                lineHeight: 1,
              }}>{sym}</button>
            ))}
            <button
              onClick={onClose}
              style={{
                width: 21, height: 21,
                background: 'linear-gradient(to bottom, #f08070, #cc3a2a)',
                border: '1px solid #7a1a1a', borderRadius: 2,
                color: '#fff', fontSize: 12, cursor: 'pointer',
                fontFamily: "'Tahoma', sans-serif", fontWeight: 700,
                lineHeight: 1,
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* body */}
        <div style={{
          background: '#ece9d8',
          padding: 14,
          display: 'flex', gap: 14,
        }}>
          <img
            src={book.cover}
            alt={book.title}
            style={{
              width: 96, flexShrink: 0,
              borderRadius: 4,
              boxShadow: '2px 2px 8px rgba(0,0,0,0.25)',
              objectFit: 'cover',
            }}
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontFamily: "'Tahoma', 'Arial', sans-serif",
              fontSize: 13, fontWeight: 700, color: '#0a246a',
              marginBottom: 2,
            }}>
              {book.title}
            </div>
            <div style={{
              fontFamily: "'Tahoma', 'Arial', sans-serif",
              fontSize: 11, color: '#555',
              marginBottom: 8,
            }}>
              {book.author}
            </div>

            <div style={{
              background: '#fff',
              border: '1px inset #b4b4b4',
              borderRadius: 2, padding: '7px 9px',
              marginBottom: 9,
            }}>
              <p style={{
                fontFamily: "'Tahoma', 'Arial', sans-serif",
                fontSize: 11, color: '#222', lineHeight: 1.55,
              }}>
                {book.description}
              </p>
            </div>

            <div style={{
              background: '#fff5f7',
              border: '1px solid #f4b8c5',
              borderRadius: 4, padding: '7px 9px',
            }}>
              <div style={{
                fontFamily: "'Tahoma', 'Arial', sans-serif",
                fontSize: 10, color: '#e8537a', fontWeight: 700,
                marginBottom: 4,
                textTransform: 'uppercase', letterSpacing: '0.05em',
              }}>
                💕 por que esse livro me lembra você
              </div>
              <p style={{
                fontFamily: "'Tahoma', 'Arial', sans-serif",
                fontSize: 11, color: '#555', lineHeight: 1.55,
                fontStyle: 'italic',
              }}>
                {book.personalNote}
              </p>
            </div>
          </div>
        </div>

        {/* footer */}
        <div style={{
          background: '#ece9d8',
          borderTop: '1px solid #bbb',
          padding: '7px 14px',
          display: 'flex', justifyContent: 'flex-end',
        }}>
          <button
            onClick={onClose}
            style={{
              fontFamily: "'Tahoma', 'Arial', sans-serif",
              fontSize: 12, padding: '4px 22px',
              background: 'linear-gradient(to bottom, #f6f6f6, #e0e0e0)',
              border: '1px solid #999',
              borderRadius: 3, cursor: 'pointer',
              boxShadow: 'inset 0 1px rgba(255,255,255,0.9)',
            }}
          >
            Fechar
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

interface Props { onNext: () => void }

export default function ChapterLibrary({ onNext }: Props) {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [fadingOut, setFadingOut] = useState(false)
  const [balloonVisible, setBalloonVisible] = useState(false)
  const [balloonDismissed, setBalloonDismissed] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setBalloonVisible(true), 2200)
    return () => clearTimeout(t)
  }, [])

  const handleRadioClick = () => {
    if (fadingOut) return
    setFadingOut(true)
    setTimeout(onNext, 1000)
  }

  return (
    <motion.div
      style={{
        position: 'absolute', inset: 0, zIndex: 1,
        backgroundImage: `url(${libraryBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflow: 'hidden',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      transition={{ duration: 0.9 }}
    >
      {/* overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(8, 5, 2, 0.52)',
      }} />

      {/* fade-to-black for music transition */}
      <motion.div
        style={{
          position: 'absolute', inset: 0, zIndex: 60,
          background: '#111', pointerEvents: 'none',
        }}
        initial={{ opacity: 0 }}
        animate={fadingOut ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.9 }}
      />

      {/* title */}
      <motion.div
        style={{
          position: 'absolute', top: 20, left: 0, right: 0,
          textAlign: 'center', zIndex: 5,
          padding: '0 16px',
        }}
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 style={{
          fontFamily: "'Pacifico', cursive",
          fontSize: 'clamp(18px, 3.5vw, 32px)',
          color: '#f5e0c0',
          textShadow: '2px 3px 10px rgba(0,0,0,0.7)',
        }}>
          nossos livros favoritos
        </h2>
        <p style={{
          fontFamily: "'Nunito', sans-serif",
          fontSize: 13, color: 'rgba(255,225,190,0.65)',
          marginTop: 4, fontWeight: 600,
        }}>
          clique em um livro para abrir 📖
        </p>
      </motion.div>

      {/* books shelf */}
      <div style={{
        position: 'absolute',
        bottom: 'clamp(70px, 10vw, 100px)',
        left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: 'clamp(6px, 1.5vw, 16px)',
        alignItems: 'flex-end',
        zIndex: 5,
        flexWrap: 'wrap', justifyContent: 'center',
        maxWidth: '92vw',
      }}>
        {BOOKS.map((book, i) => (
          <motion.div
            key={book.id}
            style={{
              cursor: 'pointer',
              transformOrigin: 'bottom center',
              transform: `rotate(${book.tilt}deg)`,
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.08, type: 'spring', damping: 16 }}
            whileHover={{ y: -14, scale: 1.08, rotate: 0 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setSelectedBook(book)}
          >
            <img
              src={book.cover}
              alt={book.title}
              style={{
                height: 'clamp(90px, 14vw, 150px)',
                width: 'auto',
                borderRadius: '3px 7px 7px 3px',
                boxShadow: '4px 6px 16px rgba(0,0,0,0.6), -2px 0 5px rgba(0,0,0,0.3)',
                display: 'block',
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* shelf plank */}
      <div style={{
        position: 'absolute',
        bottom: 'clamp(62px, 9.5vw, 92px)',
        left: '50%', transform: 'translateX(-50%)',
        width: '94vw', maxWidth: 800,
        height: 12,
        background: 'linear-gradient(to bottom, #8B5E3C, #6B3F1F)',
        borderRadius: 4,
        boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
        zIndex: 4,
      }} />

      {/* radio */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: 'clamp(16px, 3vw, 24px)',
          right: 'clamp(14px, 3vw, 28px)',
          zIndex: 5, cursor: 'pointer',
          textAlign: 'center',
        }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.1 }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.94 }}
        onClick={handleRadioClick}
      >
        <img
          src={radioImg}
          alt="rádio"
          style={{
            height: 'clamp(55px, 7vw, 85px)',
            width: 'auto',
            filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.6))',
            display: 'block',
            margin: '0 auto',
          }}
        />
        <motion.p
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontSize: 11, color: 'rgba(255,225,190,0.8)',
            marginTop: 4, fontWeight: 700,
          }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          músicas 🎵
        </motion.p>
      </motion.div>

      {/* WinXP balloon tip from system tray */}
      <AnimatePresence>
        {balloonVisible && !balloonDismissed && (
          <motion.div
            style={{
              position: 'absolute', bottom: 8, right: 12, zIndex: 70,
              width: 220,
            }}
            initial={{ opacity: 0, scale: 0.8, y: 10, originX: 1, originY: 1 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ type: 'spring', damping: 20 }}
          >
            {/* balloon pointer */}
            <div style={{ textAlign: 'right', paddingRight: 16, marginBottom: -1 }}>
              <div style={{ display: 'inline-block', width: 0, height: 0, borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderTop: '8px solid #0a246a' }} />
            </div>
            <div style={{ border: '2px solid #0a246a', borderRadius: '6px 6px 4px 4px', overflow: 'hidden', boxShadow: '3px 3px 12px rgba(0,0,0,0.5)' }}>
              <div style={{
                background: 'linear-gradient(to right, #0a246a, #2f5fb8 35%, #4477cc 50%, #2f5fb8 65%, #0a246a)',
                padding: '3px 6px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <span style={{ fontFamily: "'Tahoma',sans-serif", fontSize: 10, fontWeight: 700, color: '#fff' }}>
                  📚 Windows Explorer
                </span>
                <button onClick={() => setBalloonDismissed(true)} style={{
                  width: 16, height: 16, background: 'linear-gradient(to bottom, #f08070, #cc3a2a)',
                  border: '1px solid #7a1a1a', borderRadius: 2, color: '#fff', fontSize: 9,
                  cursor: 'pointer', fontWeight: 700, lineHeight: 1, fontFamily: "'Tahoma',sans-serif",
                }}>✕</button>
              </div>
              <div style={{ background: '#fffbe6', padding: '8px 10px' }}>
                <p style={{ fontFamily: "'Tahoma','Arial',sans-serif", fontSize: 11, color: '#333', lineHeight: 1.5 }}>
                  📖 <strong>6 livros encontrados</strong><br />
                  Clique em um livro para abrir.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WinXP popup */}
      <AnimatePresence>
        {selectedBook && (
          <WinXPPopup book={selectedBook} onClose={() => setSelectedBook(null)} />
        )}
      </AnimatePresence>
    </motion.div>
  )
}
