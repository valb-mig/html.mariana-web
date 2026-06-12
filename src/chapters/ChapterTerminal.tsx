import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'

interface Props { onClose: () => void }

const COMMANDS: Record<string, string[]> = {
  help: [
    'COMANDOS DISPONÍVEIS:',
    '  help    — esta mensagem',
    '  1987    — sobre a origem',
    '  music   — playlist secreta',
    '  future  — o que vem por aí',
    '  love    — /dev/null',
    '  clear   — limpar terminal',
    '  exit    — fechar terminal',
  ],
  '1987': [
    '> REGISTRO #1987',
    '  DATA: um dia qualquer.',
    '  LOCAL: ônibus, Rio Doce → Recife.',
    '  EVENTO: duas pessoas no mesmo veículo.',
    '  PROBABILIDADE: astronomicamente baixa.',
    '  RESULTADO: você.',
    '',
    '  // não foi coincidência. foi o universo.',
  ],
  music: [
    '> ACESSANDO PLAYLIST...',
    '  Melhor Que Ontem — Djonga',
    '  Best Part — Daniel Caesar',
    '  Gatinha Comunista — Vitroles',
    '  Mania de Você — Rita Lee',
    '  Um Amor Puro — Djavan',
    '',
    '  // cada música tem um porquê.',
    '  // você sabe quais são.',
  ],
  future: [
    '> ANALISANDO future.exe...',
    '',
    '  STATUS: em desenvolvimento.',
    '  VERSÃO: 1.0 (você está nela)',
    '  PRÓXIMA RELEASE: a gente decide juntos.',
    '',
    '  "Em desenvolvimento.',
    '  Mas você já faz parte da arquitetura."',
    '',
    '  // commit message: você ♡',
  ],
  love: [
    '> cat /dev/love',
    '',
    '  carinho: [██████████] 100%',
    '  respeito: [██████████] 100%',
    '  cumplicidade: [██████████] 100%',
    '  saudade: [████████--] overflow',
    '  desejo: [██████████] ∞',
    '',
    '  // arquivo muito grande para exibir.',
    '  // sinta na vida real.',
  ],
}

interface Line { text: string; type: 'input' | 'output' | 'error' }

export default function ChapterTerminal({ onClose }: Props) {
  const [lines, setLines] = useState<Line[]>([
    { text: 'SISTEMA MARIANA OS v1.9.8.7', type: 'output' },
    { text: 'Terminal secreto ativado. Bem-vinda.', type: 'output' },
    { text: 'Digite "help" para ver os comandos disponíveis.', type: 'output' },
    { text: '', type: 'output' },
  ])
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [lines])

  useEffect(() => { inputRef.current?.focus() }, [])

  const submit = () => {
    const cmd = input.trim().toLowerCase()
    if (!cmd) return

    const newLines: Line[] = [{ text: `> ${input}`, type: 'input' }]

    if (cmd === 'exit') { onClose(); return }
    if (cmd === 'clear') { setLines([]); setInput(''); return }

    const response = COMMANDS[cmd]
    if (response) {
      response.forEach(t => newLines.push({ text: t, type: 'output' }))
    } else {
      newLines.push({ text: `comando não encontrado: "${cmd}"`, type: 'error' })
      newLines.push({ text: 'tente "help"', type: 'error' })
    }

    newLines.push({ text: '', type: 'output' })
    setLines(prev => [...prev, ...newLines])
    setInput('')
  }

  return (
    <motion.div
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'rgba(0, 8, 0, 0.97)',
        display: 'flex', flexDirection: 'column',
        fontFamily: "'VT323', monospace",
        fontSize: 'clamp(16px, 2.5vw, 20px)',
        padding: 'clamp(12px, 3vw, 24px)',
      }}
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderBottom: '1px solid rgba(0,255,0,0.2)',
        paddingBottom: 8, marginBottom: 12,
        color: 'rgba(0,255,70,0.6)',
        fontSize: 12, fontFamily: "'Press Start 2P', monospace",
      }}>
        <span>MARIANA_OS · TERMINAL v1.987</span>
        <button
          onClick={onClose}
          style={{
            background: 'transparent', border: '1px solid rgba(0,255,0,0.3)',
            color: 'rgba(0,255,70,0.6)', cursor: 'pointer',
            padding: '2px 8px', fontFamily: "'Press Start 2P', monospace",
            fontSize: 10,
          }}
        >
          [X]
        </button>
      </div>

      {/* output */}
      <div style={{ flex: 1, overflowY: 'auto', marginBottom: 12 }}>
        {lines.map((l, i) => (
          <div
            key={i}
            style={{
              color: l.type === 'input'
                ? 'rgba(255,255,0,0.9)'
                : l.type === 'error'
                  ? 'rgba(255,60,60,0.8)'
                  : 'rgba(0,255,70,0.85)',
              lineHeight: 1.5,
              whiteSpace: 'pre-wrap',
            }}
          >
            {l.text || ' '}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* input */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(0,255,70,0.9)' }}>
        <span>mariana@1987:~$</span>
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') submit() }}
          style={{
            flex: 1, background: 'transparent', border: 'none', outline: 'none',
            color: 'rgba(255,255,0,0.9)', fontFamily: "'VT323', monospace",
            fontSize: 'inherit', caretColor: 'rgba(0,255,70,0.9)',
          }}
          autoComplete="off"
          spellCheck={false}
        />
        <span className="blink" style={{ color: 'rgba(0,255,70,0.9)' }}>█</span>
      </div>
    </motion.div>
  )
}
