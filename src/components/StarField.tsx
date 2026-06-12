import { useEffect, useRef } from 'react'

interface Star {
  x: number; y: number; r: number; opacity: number
  speed: number; twinkle: number; twinkleSpeed: number
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    let animId: number

    const stars: Star[] = []
    const W = () => window.innerWidth
    const H = () => window.innerHeight

    function resize() {
      canvas.width = W()
      canvas.height = H()
    }

    function spawn() {
      stars.length = 0
      for (let i = 0; i < 180; i++) {
        stars.push({
          x: Math.random() * W(),
          y: Math.random() * H(),
          r: Math.random() * 1.5 + 0.3,
          opacity: Math.random() * 0.7 + 0.1,
          speed: Math.random() * 0.15 + 0.02,
          twinkle: Math.random() * Math.PI * 2,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
        })
      }
    }

    function draw() {
      ctx.clearRect(0, 0, W(), H())

      // nebula gradient
      const grad = ctx.createRadialGradient(W() * 0.3, H() * 0.4, 0, W() * 0.3, H() * 0.4, W() * 0.6)
      grad.addColorStop(0, 'rgba(100, 30, 80, 0.12)')
      grad.addColorStop(0.5, 'rgba(30, 15, 80, 0.08)')
      grad.addColorStop(1, 'transparent')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, W(), H())

      const grad2 = ctx.createRadialGradient(W() * 0.7, H() * 0.6, 0, W() * 0.7, H() * 0.6, W() * 0.5)
      grad2.addColorStop(0, 'rgba(20, 60, 100, 0.1)')
      grad2.addColorStop(1, 'transparent')
      ctx.fillStyle = grad2
      ctx.fillRect(0, 0, W(), H())

      stars.forEach(s => {
        s.twinkle += s.twinkleSpeed
        const op = s.opacity * (0.5 + 0.5 * Math.sin(s.twinkle))
        s.y -= s.speed
        if (s.y < -5) { s.y = H() + 5; s.x = Math.random() * W() }

        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(224, 232, 240, ${op})`
        ctx.fill()

        if (s.r > 1) {
          ctx.beginPath()
          ctx.arc(s.x, s.y, s.r * 2.5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 253, 231, ${op * 0.15})`
          ctx.fill()
        }
      })

      animId = requestAnimationFrame(draw)
    }

    resize()
    spawn()
    draw()
    window.addEventListener('resize', () => { resize(); spawn() })

    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  )
}
