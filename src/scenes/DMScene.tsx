import { useEffect, useRef, useState } from 'react'
import { P } from '../photos'

interface Props { onComplete: () => void }

const DOT_GRID = {
  backgroundColor: '#0a0a0f',
  backgroundImage: 'radial-gradient(rgba(255,255,255,.03) 1px, transparent 1px), radial-gradient(rgba(255,255,255,.015) 1px, transparent 1px)',
  backgroundSize: '24px 24px, 12px 12px',
  backgroundPosition: '0 0, 6px 6px',
}

function Avatar({ src, size = 32 }: { src: string; size?: number }) {
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, background: '#333' }}>
      <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 10%' }} onError={(e) => { e.currentTarget.style.opacity = '0' }} />
    </div>
  )
}

function TypingDots() {
  return (
    <div style={{ display: 'flex', gap: 4, padding: '10px 14px', background: '#262626', borderRadius: '18px 18px 18px 4px', width: 'fit-content' }}>
      {[0, 0.22, 0.44].map((delay, i) => (
        <div key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: '#888', animation: `typingDot 1.2s ease-in-out ${delay}s infinite` }} />
      ))}
    </div>
  )
}

export function DMScene({ onComplete }: Props) {
  const [lyric, setLyric] = useState<1 | 2>(1)
  const [kaishaTyping, setKaishaTyping] = useState(false)
  const [showSeen, setShowSeen] = useState(false)
  const [canTap, setCanTap] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    const t1 = setTimeout(() => setLyric(2), 3500)
    const t2 = setTimeout(() => setKaishaTyping(true), 2000)
    const t3 = setTimeout(() => { setKaishaTyping(false); setShowSeen(true) }, 3800)
    const t4 = setTimeout(() => setCanTap(true), 4600)
    return () => { [t1, t2, t3, t4].forEach(clearTimeout) }
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [kaishaTyping, showSeen])

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: '#000' }}>

      {/* DM Header */}
      <div style={{ padding: '52px 16px 12px', background: '#000', borderBottom: '0.5px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        <Avatar src={P.chloe} size={40} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>Chloe</div>
          <div style={{ fontSize: 12, color: '#8e8e8e', marginTop: 1 }}>Active now</div>
        </div>
        <div style={{ fontSize: 20, color: 'rgba(255,255,255,0.5)' }}>📞</div>
      </div>

      {/* Floating lyric banner */}
      <div style={{ flexShrink: 0, padding: '10px 12px 0', textAlign: 'center' }}>
        <div key={lyric} style={{ display: 'inline-block', background: 'rgba(232,176,75,0.12)', border: '1px solid rgba(232,176,75,0.3)', borderRadius: 12, padding: '6px 14px', fontSize: 11, fontWeight: 700, color: '#E8B04B', letterSpacing: 0.3, animation: 'fadeUp 0.5s ease-out both' }}>
          {lyric === 1
            ? '"but got the nerve to be on Facebook taking shots at Chloe?"'
            : '"Okay I bought the girl a purse"'}
        </div>
      </div>

      {/* Chat area — all messages shown at once */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 12px 8px', ...DOT_GRID }}>

        {/* Kaisha sent */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 6, animation: 'fadeUp 0.3s ease-out both' }}>
          <div style={{ maxWidth: '72%', background: 'linear-gradient(135deg,#8134AF,#C13584)', borderRadius: '18px 18px 4px 18px', padding: '10px 14px' }}>
            <div style={{ fontSize: 14, color: '#fff', lineHeight: 1.4 }}>can you leave Roddo alone please</div>
          </div>
        </div>

        {/* Chloe reply */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, marginBottom: 6, animation: 'fadeUp 0.3s 0.2s ease-out both' }}>
          <Avatar src={P.chloe} size={28} />
          <div style={{ maxWidth: '72%', background: '#262626', borderRadius: '18px 18px 18px 4px', padding: '10px 14px' }}>
            <div style={{ fontSize: 14, color: '#fff', lineHeight: 1.4 }}>too late, we're together now 💅</div>
          </div>
        </div>

        {/* Chanel purse image */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, marginBottom: 6, animation: 'fadeUp 0.3s 0.4s ease-out both' }}>
          <Avatar src={P.chloe} size={28} />
          <div style={{ maxWidth: '72%', borderRadius: '18px 18px 18px 4px', overflow: 'hidden' }}>
            <img src={P.chanel} alt="" style={{ width: '100%', display: 'block', objectFit: 'cover', maxHeight: 200 }} onError={(e) => { e.currentTarget.style.opacity = '0' }} />
          </div>
        </div>

        {/* Price message */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, marginBottom: 8, animation: 'fadeUp 0.3s 0.6s ease-out both' }}>
          <Avatar src={P.chloe} size={28} />
          <div style={{ maxWidth: '72%', background: '#262626', borderRadius: '18px 18px 18px 4px', padding: '10px 14px' }}>
            <div style={{ fontSize: 14, color: '#fff', lineHeight: 1.4 }}>he got it for me last night 😌<br />$3,200</div>
          </div>
        </div>

        {/* Kaisha typing */}
        {kaishaTyping && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 6, animation: 'fadeUp 0.3s ease-out both' }}>
            <div style={{ maxWidth: '72%' }}>
              <TypingDots />
            </div>
          </div>
        )}

        {/* Seen */}
        {showSeen && (
          <div style={{ textAlign: 'right', fontSize: 11, color: '#8e8e8e', paddingRight: 4, marginBottom: 4, animation: 'fadeUp 0.4s ease-out both' }}>
            Seen
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Tap hint */}
      {canTap && (
        <div onClick={onComplete} style={{ padding: '12px 16px', background: '#000', textAlign: 'center', cursor: 'pointer', borderTop: '0.5px solid rgba(255,255,255,0.08)', flexShrink: 0 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600, animation: 'tapPulse 1.8s ease-in-out infinite', color: 'rgba(255,255,255,0.4)' }}>
            Tap to continue ›
          </div>
        </div>
      )}
    </div>
  )
}
