'use client'

import { useEffect, useRef } from 'react'

export default function AsciiBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const isMobile = window.innerWidth < 768

    const DOT_COLOR = '#D9D9D9'
    const WAVE_SPEED = 0.0008
    const MOUSE_INFLUENCE = 80
    const OPACITY_BASE = 0.25
    const OPACITY_PEAK = 0.55

    let DOT_SPACING = isMobile ? 32 : 28
    let DOT_RADIUS = 1.5
    let WAVE_AMPLITUDE = isMobile ? 6 : 10
    let WAVE_FREQUENCY = 0.015

    let cols = 0
    let rows = 0
    let time = 0

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      cols = Math.ceil(canvas.width / DOT_SPACING) + 1
      rows = Math.ceil(canvas.height / DOT_SPACING) + 1
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const baseX = col * DOT_SPACING
          const baseY = row * DOT_SPACING

          const wave1 = Math.sin(col * WAVE_FREQUENCY + time) * WAVE_AMPLITUDE
          const wave2 = Math.sin(col * WAVE_FREQUENCY * 0.7 + row * 0.1 + time * 1.3) * (WAVE_AMPLITUDE * 0.5)
          const wave3 = Math.cos(row * WAVE_FREQUENCY * 0.5 + time * 0.8) * (WAVE_AMPLITUDE * 0.3)

          const x = baseX
          const y = baseY + wave1 + wave2 + wave3

          const dx = x - mouseRef.current.x
          const dy = y - mouseRef.current.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const mouseEffect = dist < MOUSE_INFLUENCE
            ? (1 - dist / MOUSE_INFLUENCE) * 8
            : 0

          const finalY = y - mouseEffect

          const waveNorm = (wave1 + WAVE_AMPLITUDE) / (WAVE_AMPLITUDE * 2)
          const opacity = OPACITY_BASE + waveNorm * (OPACITY_PEAK - OPACITY_BASE)

          ctx.beginPath()
          ctx.arc(x, finalY, DOT_RADIUS, 0, Math.PI * 2)
          ctx.fillStyle = DOT_COLOR
          ctx.globalAlpha = opacity
          ctx.fill()
        }
      }

      ctx.globalAlpha = 1
      time += WAVE_SPEED
      rafRef.current = requestAnimationFrame(draw)
    }

    const onMouseMove = (e: MouseEvent) => {
      if (isMobile) return
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    resize()
    draw()

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouseMove)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
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
      }}
    />
  )
}
