import { useEffect, useState } from 'react'
import { P } from '../photos'

const grain = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`

interface Props { onComplete: () => void }

export function ConcertCrowd({ onComplete }: Props) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const target = 20000
    const duration = 2200
    const steps = 60
    const inc = target / steps
    let step = 0
    const t = setInterval(() => {
      step++
      setCount(Math.min(Math.round(inc * step), target))
      if (step >= steps) clearInterval(t)
    }, duration / steps)
    return () => clearInterval(t)
  }, [])

  return (
    <div onClick={onComplete} style={{ position: 'absolute', inset: 0, background: '#000', cursor: 'pointer' }}>

      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', animation: 'develop 1.8s ease-out both' }}>
        <img
          src={P.crowd}
          alt=""
          onError={(e) => { e.currentTarget.style.opacity = '0' }}
          style={{
            position: 'absolute', left: '-6%', top: '-6%', width: '112%', height: '112%',
            objectFit: 'cover', objectPosition: 'center 40%',
            animation: 'photoLive 30s ease-out both',
          }}
        />
      </div>

      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.1) 55%, rgba(0,0,0,0.9) 100%)' }} />
      <div style={{ position: 'absolute', inset: '-20%', pointerEvents: 'none', mixBlendMode: 'overlay', opacity: 0.07, backgroundImage: grain, animation: 'grainShift 1.1s steps(3) infinite' }} />

      {/* Live counter */}
      <div style={{ position: 'absolute', top: '28%', left: 0, right: 0, textAlign: 'center', animation: 'fadeUp 0.9s 0.4s ease-out both' }}>
        <div style={{ fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', fontWeight: 700, marginBottom: 6 }}>
          🔴 live attendance
        </div>
        <div style={{ fontSize: 64, fontWeight: 900, letterSpacing: -2, color: '#fff', textShadow: '0 0 60px rgba(232,176,75,0.5)', lineHeight: 1 }}>
          {count.toLocaleString()}
        </div>
        <div style={{ width: 40, height: 2, background: '#E8B04B', margin: '10px auto 0', borderRadius: 2 }} />
      </div>

      <div style={{ position: 'absolute', left: 20, right: 20, bottom: '22%', textAlign: 'center', animation: 'capIn 1.2s 0.3s ease-out both' }}>
        <div style={{ display: 'inline-block', background: 'rgba(0,0,0,0.32)', backdropFilter: 'blur(12px)', borderRadius: 14, padding: '14px 24px' }}>
          <div style={{ fontSize: 22, fontWeight: 800, lineHeight: 1.25, letterSpacing: -0.3, color: '#fff' }}>
            "and rocking 20,000 fans"
          </div>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 40, left: 0, right: 0, textAlign: 'center', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600, animation: 'tapPulse 1.8s ease-in-out infinite', pointerEvents: 'none', color: 'rgba(255,255,255,0.5)' }}>
        Tap to continue ›
      </div>
    </div>
  )
}
