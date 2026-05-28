'use client'

import { useEffect, useRef } from 'react'

const CHAR_SET = ' .,:;=+*#@'
const FONT_SIZE = 18
const CHAR_W = FONT_SIZE * 0.6

export default function OurFocusBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const isMobile = window.innerWidth < 768
    const frameSkip = isMobile ? 4 : 3

    let time = 0
    let frameCount = 0
    // Precomputed normalized distance for each cell — avoids sqrt in draw loop
    let cellDist: Float32Array = new Float32Array(0)
    let COLS = 0
    let ROWS = 0
    let cellW = 0
    let cellH = 0

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      COLS = Math.max(1, Math.floor(canvas.width / CHAR_W))
      ROWS = Math.max(1, Math.floor(canvas.height / FONT_SIZE))
      cellW = canvas.width / COLS
      cellH = canvas.height / ROWS

      const cx = COLS / 2
      const cy = ROWS * 0.38
      cellDist = new Float32Array(COLS * ROWS)

      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          // Normalize separately by each half so the tunnel fills the canvas
          const dx = (col - cx) / (COLS / 2)
          const dy = (row - cy) / (ROWS / 2)
          cellDist[row * COLS + col] = Math.sqrt(dx * dx + dy * dy)
        }
      }
    }

    const draw = () => {
      rafRef.current = requestAnimationFrame(draw)
      frameCount++
      if (frameCount % frameSkip !== 0) return

      const W = canvas.width
      const H = canvas.height
      ctx.clearRect(0, 0, W, H)
      ctx.font = `${FONT_SIZE}px 'Courier New', monospace`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          const r = cellDist[row * COLS + col]

          // Skip exact center and outside the tunnel mouth
          if (r < 0.005 || r > 1.0) continue

          // Perspective depth: 1/r compresses rings toward center like real depth
          const depth = 1 / r

          // Rings flowing outward — tunnel motion
          const ring = (Math.sin(depth * 1.8 - time * 2.2) + 1) / 2

          // Soft fade at the tunnel mouth (edges)
          const edgeFade = Math.max(0, 1 - r * 1.1)
          // Slight dark at very center (the far end receding into distance)
          const depthFade = Math.min(1, r * 12)

          const finalBrightness = ring * edgeFade * Math.max(0.15, depthFade)

          if (finalBrightness < 0.04) continue

          const charIndex = Math.floor(finalBrightness * (CHAR_SET.length - 1))
          const char = CHAR_SET[charIndex]
          if (char === ' ') continue

          // Orange glow at the tunnel's far end, fading to dark toward the walls
          const orangeStrength = Math.max(0, 1 - r * 6)
          const red   = Math.round(17 + (237 - 17) * orangeStrength)
          const green = Math.round(17 + (109 - 17) * orangeStrength)
          const blue  = Math.round(17 + (64  - 17) * orangeStrength)

          ctx.fillStyle = `rgb(${red},${green},${blue})`
          ctx.globalAlpha = finalBrightness * 0.75
          ctx.fillText(char, col * cellW + cellW / 2, row * cellH + cellH / 2)
        }
      }

      ctx.globalAlpha = 1
      time += 0.016
    }

    resize()
    draw()

    setTimeout(() => {
      canvas.style.transition = 'opacity 1.4s ease'
      canvas.style.opacity = '1'
    }, 200)

    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0,
      }}
    />
  )
}
