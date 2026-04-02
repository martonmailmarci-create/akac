'use client'

import { useEffect, useRef } from 'react'

const CHAR_SET = ' .,:;=+*#@'

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const imageDataRef = useRef<ImageData | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = new Image()
    img.src = '/images/s-curve.jpg'

    img.onload = () => {
      const SAMPLE_W = 120
      const SAMPLE_H = 55

      const offscreen = document.createElement('canvas')
      offscreen.width = SAMPLE_W
      offscreen.height = SAMPLE_H
      const offCtx = offscreen.getContext('2d')!
      offCtx.drawImage(img, 0, 0, SAMPLE_W, SAMPLE_H)
      imageDataRef.current = offCtx.getImageData(0, 0, SAMPLE_W, SAMPLE_H)

      startAnimation()
    }

    // Fallback: if s-curve.jpg not found, try the existing ascii-art.png
    img.onerror = () => {
      const fallback = new Image()
      fallback.src = '/images/ascii-art.png'
      fallback.onload = () => {
        const SAMPLE_W = 120
        const SAMPLE_H = 55
        const offscreen = document.createElement('canvas')
        offscreen.width = SAMPLE_W
        offscreen.height = SAMPLE_H
        const offCtx = offscreen.getContext('2d')!
        offCtx.drawImage(fallback, 0, 0, SAMPLE_W, SAMPLE_H)
        imageDataRef.current = offCtx.getImageData(0, 0, SAMPLE_W, SAMPLE_H)
        startAnimation()
      }
    }

    let time = 0
    const mouse = { x: -9999, y: -9999 }
    const MOUSE_RADIUS = 180  // px — how far the orange spreads

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    const onMouseLeave = () => { mouse.x = -9999; mouse.y = -9999 }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseleave', onMouseLeave)

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    const getPixelBrightness = (data: ImageData, col: number, row: number): number => {
      const idx = (row * data.width + col) * 4
      const r = data.data[idx]
      const g = data.data[idx + 1]
      const b = data.data[idx + 2]
      return (0.299 * r + 0.587 * g + 0.114 * b) / 255
    }

    const startAnimation = () => {
      const draw = () => {
        const imageData = imageDataRef.current
        if (!imageData) return

        const W = canvas.width
        const H = canvas.height

        ctx.clearRect(0, 0, W, H)

        const COLS = imageData.width
        const ROWS = imageData.height

        const cellW = W / COLS
        const cellH = H / ROWS
        const fontSize = Math.min(cellW * 1.2, cellH * 1.5, 13)

        ctx.font = `${fontSize}px 'Courier New', monospace`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'

        for (let row = 0; row < ROWS; row++) {
          for (let col = 0; col < COLS; col++) {
            const brightness = getPixelBrightness(imageData, col, row)

            if (brightness < 0.05) continue

            const charIndex = Math.floor(brightness * (CHAR_SET.length - 1))
            const char = CHAR_SET[charIndex]

            if (char === ' ') continue

            // Traveling wave drifts downward
            const wave = Math.sin(time * 1.4 - row * 0.2 + col * 0.05) * 0.22
            // Slow overall breathe
            const pulse = Math.sin(time * 0.6) * 0.12
            const finalBrightness = Math.min(1, Math.max(0, brightness + wave + pulse))

            // Character changes with animated brightness — creates visible char cycling
            const animCharIndex = Math.floor(finalBrightness * (CHAR_SET.length - 1))
            const animChar = CHAR_SET[Math.max(0, animCharIndex)]

            const x = col * cellW + cellW / 2
            const y = row * cellH + cellH / 2

            // Mouse proximity — blend toward orange (#ED6D40)
            const dx = x - mouse.x
            const dy = y - mouse.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            const orangeStrength = Math.max(0, 1 - dist / MOUSE_RADIUS)
            const eased = orangeStrength * orangeStrength

            const v = Math.round(100 + finalBrightness * 155)
            const gr = Math.round(v + (237 - v) * eased)
            const gg = Math.round(v + (109 - v) * eased)
            const gb = Math.round(v + (64  - v) * eased)
            ctx.fillStyle = `rgb(${gr},${gg},${gb})`
            ctx.globalAlpha = Math.min(1, finalBrightness * 1.2)

            ctx.fillText(animChar, x, y)
          }
        }

        ctx.globalAlpha = 1
        time += 0.012
        rafRef.current = requestAnimationFrame(draw)
      }

      draw()
    }

    resize()

    // Fade in after a short delay so it syncs with the content animation
    setTimeout(() => {
      canvas.style.transition = 'opacity 1.2s ease'
      canvas.style.opacity = '0.7'
    }, 300)

    window.addEventListener('resize', resize)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
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
