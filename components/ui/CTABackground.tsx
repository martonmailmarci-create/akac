'use client'

import { useEffect, useRef } from 'react'

const CHAR_SET = ' .,:;=+*#@'
const FONT_SIZE = 12
const CHAR_W = FONT_SIZE * 0.6

export default function CTABackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const isMobile = window.innerWidth < 768
    const frameSkip = isMobile ? 3 : 2

    let time = 0
    let frameCount = 0
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
          if (r < 0.005 || r > 1.0) continue

          const depth = 1 / r
          const ring = (Math.sin(depth * 1.8 - time * 2.2) + 1) / 2
          const edgeFade = Math.max(0, 1 - r * 1.1)
          const depthFade = Math.min(1, r * 12)
          const finalBrightness = ring * edgeFade * Math.max(0.15, depthFade)

          if (finalBrightness < 0.04) continue

          const charIndex = Math.floor(finalBrightness * (CHAR_SET.length - 1))
          const char = CHAR_SET[charIndex]
          if (char === ' ') continue

          // Light chars on dark bg — orange glow at tunnel center, cream toward walls
          const orangeStrength = Math.max(0, 1 - r * 6)
          const red   = Math.round(217 + (237 - 217) * orangeStrength)
          const green = Math.round(217 + (109 - 217) * orangeStrength)
          const blue  = Math.round(217 + (64  - 217) * orangeStrength)

          ctx.fillStyle = `rgb(${red},${green},${blue})`
          ctx.globalAlpha = finalBrightness * 0.5
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
