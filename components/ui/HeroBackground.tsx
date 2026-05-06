'use client'

import { useEffect, useRef } from 'react'

const CHAR_SET = ' .,:;=+*#@'
const FONT_SIZE = 12        // fixed px — same on every screen width
const CHAR_W = FONT_SIZE * 0.6  // approx monospace glyph width

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const imageDataRef = useRef<ImageData | null>(null)
  const srcImgRef = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const isMobile = window.innerWidth < 768

    const resample = () => {
      const img = srcImgRef.current
      if (!img) return
      const COLS = Math.max(1, Math.floor(canvas.width / CHAR_W))
      const ROWS = Math.max(1, Math.floor(canvas.height / FONT_SIZE))
      const offscreen = document.createElement('canvas')
      offscreen.width = COLS
      offscreen.height = ROWS
      const offCtx = offscreen.getContext('2d')!
      offCtx.drawImage(img, 0, 0, COLS, ROWS)
      imageDataRef.current = offCtx.getImageData(0, 0, COLS, ROWS)
    }

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      resample()
    }

    const img = new Image()
    img.src = '/images/s-curve.jpg'

    img.onload = () => {
      srcImgRef.current = img
      resample()
      startAnimation()
    }

    img.onerror = () => {
      const fallback = new Image()
      fallback.src = '/images/ascii-art.png'
      fallback.onload = () => {
        srcImgRef.current = fallback
        resample()
        startAnimation()
      }
    }

    let time = 0
    const mouse = { x: -9999, y: -9999 }
    const MOUSE_RADIUS = 220

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    const onMouseLeave = () => { mouse.x = -9999; mouse.y = -9999 }
    if (!isMobile) {
      window.addEventListener('mousemove', onMouseMove)
      window.addEventListener('mouseleave', onMouseLeave)
    }

    const getPixelBrightness = (data: ImageData, col: number, row: number): number => {
      const idx = (row * data.width + col) * 4
      const r = data.data[idx]
      const g = data.data[idx + 1]
      const b = data.data[idx + 2]
      return (0.299 * r + 0.587 * g + 0.114 * b) / 255
    }

    const startAnimation = () => {
      let frameCount = 0
      const draw = () => {
        frameCount++
        // On mobile, draw every 3rd frame to reduce CPU load
        if (isMobile && frameCount % 3 !== 0) {
          rafRef.current = requestAnimationFrame(draw)
          return
        }
        const imageData = imageDataRef.current
        if (!imageData) return

        const W = canvas.width
        const H = canvas.height

        ctx.clearRect(0, 0, W, H)

        const COLS = imageData.width
        const ROWS = imageData.height

        const cellW = W / COLS
        const cellH = H / ROWS

        ctx.font = `${FONT_SIZE}px 'Courier New', monospace`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'

        for (let row = 0; row < ROWS; row++) {
          for (let col = 0; col < COLS; col++) {
            const brightness = getPixelBrightness(imageData, col, row)

            if (brightness < 0.05) continue

            const charIndex = Math.floor(brightness * (CHAR_SET.length - 1))
            const char = CHAR_SET[charIndex]

            if (char === ' ') continue

            const wave = Math.sin(time * 1.4 - row * 0.2 + col * 0.05) * 0.22
            const pulse = Math.sin(time * 0.6) * 0.12
            const finalBrightness = Math.min(1, Math.max(0, brightness + wave + pulse))

            const animCharIndex = Math.floor(finalBrightness * (CHAR_SET.length - 1))
            const animChar = CHAR_SET[Math.max(0, animCharIndex)]

            const x = col * cellW + cellW / 2
            const y = row * cellH + cellH / 2

            // Mouse proximity — blend toward orange (#ED6D40)
            const dx = x - mouse.x
            const dy = y - mouse.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            const orangeStrength = Math.max(0, 1 - dist / MOUSE_RADIUS)
            const eased = orangeStrength * (2 - orangeStrength)

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

    setTimeout(() => {
      canvas.style.transition = 'opacity 1.2s ease'
      canvas.style.opacity = '0.7'
    }, 300)

    window.addEventListener('resize', resize)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      if (!isMobile) {
        window.removeEventListener('mousemove', onMouseMove)
        window.removeEventListener('mouseleave', onMouseLeave)
      }
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
