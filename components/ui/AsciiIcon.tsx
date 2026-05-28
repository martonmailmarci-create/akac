'use client'

import { useEffect, useRef } from 'react'

const CHAR_SET = ' .,:;=+*#@'
const GRID = 28

interface Props {
  src: string
  size: number
  color: string
}

export default function AsciiIcon({ src, size, color }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const pausedRef = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = size
    canvas.height = size

    const cellW = size / GRID
    const cellH = size / GRID
    const fontSize = Math.max(6, Math.floor(cellH * 0.9))
    const isMobile = window.innerWidth < 768
    const frameSkip = isMobile ? 3 : 1

    // Pause when scrolled out of view
    const observer = new IntersectionObserver(
      ([entry]) => { pausedRef.current = !entry.isIntersecting },
      { threshold: 0 }
    )
    observer.observe(canvas)

    const img = new Image()
    img.src = src

    img.onload = () => {
      const off = document.createElement('canvas')
      off.width = GRID
      off.height = GRID
      const offCtx = off.getContext('2d')!
      offCtx.fillStyle = 'white'
      offCtx.fillRect(0, 0, GRID, GRID)
      offCtx.drawImage(img, 0, 0, GRID, GRID)
      const imageData = offCtx.getImageData(0, 0, GRID, GRID)

      // Precompute static density per cell — only wave animates
      const baseDensity = new Float32Array(GRID * GRID)
      for (let i = 0; i < GRID * GRID; i++) {
        const r = imageData.data[i * 4]
        const g = imageData.data[i * 4 + 1]
        const b = imageData.data[i * 4 + 2]
        baseDensity[i] = 1 - (0.299 * r + 0.587 * g + 0.114 * b) / 255
      }

      let time = 0
      let lastTs = 0
      let frame = 0

      const draw = (ts: number) => {
        rafRef.current = requestAnimationFrame(draw)
        if (pausedRef.current) { lastTs = 0; return }
        frame++
        if (frame % frameSkip !== 0) return
        const delta = lastTs ? Math.min((ts - lastTs) / 1000, 0.05) : 0.016
        lastTs = ts

        ctx.clearRect(0, 0, size, size)
        ctx.font = `${fontSize}px 'Courier New', monospace`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillStyle = color

        for (let row = 0; row < GRID; row++) {
          for (let col = 0; col < GRID; col++) {
            const density = baseDensity[row * GRID + col]
            if (density < 0.15) continue

            const wave = Math.sin(time * 1.4 - row * 0.3 + col * 0.1) * 0.2
            const final = Math.min(1, Math.max(0, density + wave))
            if (final < 0.1) continue

            const char = CHAR_SET[Math.floor(final * (CHAR_SET.length - 1))]
            if (char === ' ') continue

            ctx.globalAlpha = 1
            ctx.fillText(char, col * cellW + cellW / 2, row * cellH + cellH / 2)
          }
        }

        ctx.globalAlpha = 1
        time += delta * 0.45
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    return () => {
      cancelAnimationFrame(rafRef.current)
      observer.disconnect()
    }
  }, [src, size, color])

  return <canvas ref={canvasRef} style={{ width: size, height: size }} />
}
