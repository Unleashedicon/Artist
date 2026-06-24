import { useRef, useEffect, useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import type { Character } from '../characters'

// Mouth shape definitions — each takes (ctx, cx, cy, w, h)
type ShapeFn = (ctx: CanvasRenderingContext2D, cx: number, cy: number, w: number, h: number) => void

const SHAPES: ShapeFn[] = [
  // 0 — closed
  (ctx, cx, cy, w, h) => {
    ctx.beginPath()
    ctx.moveTo(cx - w * 0.45, cy)
    ctx.bezierCurveTo(cx - w * 0.2, cy + h * 0.15, cx + w * 0.2, cy + h * 0.15, cx + w * 0.45, cy)
    ctx.bezierCurveTo(cx + w * 0.2, cy - h * 0.05, cx - w * 0.2, cy - h * 0.05, cx - w * 0.45, cy)
    ctx.closePath()
  },
  // 1 — barely open
  (ctx, cx, cy, w, h) => {
    ctx.beginPath()
    ctx.ellipse(cx, cy + h * 0.15, w * 0.38, h * 0.18, 0, 0, Math.PI * 2)
    ctx.closePath()
  },
  // 2 — half open
  (ctx, cx, cy, w, h) => {
    ctx.beginPath()
    ctx.ellipse(cx, cy + h * 0.2, w * 0.42, h * 0.3, 0, 0, Math.PI * 2)
    ctx.closePath()
  },
  // 3 — open
  (ctx, cx, cy, w, h) => {
    ctx.beginPath()
    ctx.ellipse(cx, cy + h * 0.22, w * 0.44, h * 0.42, 0, 0, Math.PI * 2)
    ctx.closePath()
  },
  // 4 — wide (emphasis)
  (ctx, cx, cy, w, h) => {
    ctx.beginPath()
    ctx.ellipse(cx, cy + h * 0.2, w * 0.48, h * 0.35, 0, 0, Math.PI * 2)
    ctx.closePath()
  },
]

// Natural speech rhythm pattern — indexes into SHAPES
const SPEECH_SEQ = [0, 1, 2, 3, 2, 1, 0, 1, 2, 4, 3, 2, 1, 0, 1, 3, 2, 1, 0]

interface Props {
  character: Character
  speaking: boolean
  size?: number | string
  round?: boolean
  expression?: keyof Character['expressions']
  style?: React.CSSProperties
}

export function TalkingFace({
  character,
  speaking,
  size = 140,
  round = true,
  expression = 'neutral',
  style,
}: Props) {
  const [imgErr, setImgErr] = useState(false)
  const canvasRef    = useRef<HTMLCanvasElement>(null)
  const imgRef       = useRef<HTMLImageElement>(null)
  const rafRef       = useRef<number>()
  const seqRef       = useRef(0)
  const lastRef      = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Keep canvas dimensions in sync with actual rendered image size
  const syncCanvasSize = useCallback(() => {
    const img    = imgRef.current
    const canvas = canvasRef.current
    if (!img || !canvas) return
    const { width, height } = img.getBoundingClientRect()
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width  = width
      canvas.height = height
    }
  }, [])

  useEffect(() => {
    const observer = new ResizeObserver(syncCanvasSize)
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [syncCanvasSize])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    if (!speaking) {
      cancelAnimationFrame(rafRef.current ?? 0)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      return
    }

    const draw = (ts: number) => {
      syncCanvasSize()
      const { width: W, height: H } = canvas

      const elapsed = ts - lastRef.current
      const frameDuration = 75 + Math.random() * 55 // 75–130 ms per shape

      if (elapsed > frameDuration) {
        lastRef.current = ts
        seqRef.current  = (seqRef.current + 1) % SPEECH_SEQ.length
      }

      ctx.clearRect(0, 0, W, H)

      const { x, y, w, h } = character.mouthRegion
      const cx = (x / 100) * W
      const cy = (y / 100) * H
      const mw = (w / 100) * W
      const mh = (h / 100) * H

      const shapeIdx = SPEECH_SEQ[seqRef.current]

      // Mouth fill
      ctx.fillStyle = 'rgba(18, 8, 4, 0.88)'
      SHAPES[shapeIdx](ctx, cx, cy, mw, mh)
      ctx.fill()

      // Subtle lip outline
      ctx.strokeStyle = 'rgba(0,0,0,0.35)'
      ctx.lineWidth   = Math.max(1, mw * 0.04)
      ctx.stroke()

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(rafRef.current ?? 0) }
  }, [speaking, character, syncCanvasSize])

  const photoUrl = character.expressions[expression] ?? character.photoUrl

  const sizeStyle: React.CSSProperties = typeof size === 'number'
    ? { width: size, height: size }
    : { width: size, height: size }

  return (
    <motion.div
      ref={containerRef}
      animate={speaking ? { y: [0, -3, 0] } : { y: 0 }}
      transition={speaking
        ? { repeat: Infinity, duration: 0.55, ease: 'easeInOut' }
        : { duration: 0.3 }
      }
      style={{
        position: 'relative',
        borderRadius: round ? '50%' : 12,
        overflow: 'hidden',
        flexShrink: 0,
        background: character.accentColor + '22',
        ...sizeStyle,
        ...style,
      }}
    >
      {imgErr ? (
        /* Fallback avatar initials */
        <div style={{
          width: '100%', height: '100%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: `linear-gradient(135deg, ${character.accentColor}33, ${character.bgColor})`,
          color: character.accentColor,
          fontSize: typeof size === 'number' ? size * 0.36 : 28,
          fontWeight: 700, letterSpacing: '-0.02em',
          userSelect: 'none',
        }}>
          {character.name.slice(0, 2).toUpperCase()}
        </div>
      ) : (
        <img
          ref={imgRef}
          src={photoUrl}
          alt={character.name}
          crossOrigin="anonymous"
          onLoad={syncCanvasSize}
          onError={() => setImgErr(true)}
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            display: 'block',
            userSelect: 'none',
          }}
        />
      )}
      {!imgErr && (
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            top: 0, left: 0,
            width: '100%', height: '100%',
            pointerEvents: 'none',
          }}
        />
      )}
    </motion.div>
  )
}
