import { useState } from 'react'
import { P } from '../photos'

const grain = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`

const STEPS = [
  {
    img: P.kissScene,
    speaker: 'Roddo',
    speakerColor: '#E8B04B',
    lyric: '"after school the other day"',
  },
  {
    img: P.roddoComfort,
    speaker: 'Roddo',
    speakerColor: '#E8B04B',
    lyric: '"you act like you ain\'t know me"',
  },
]

interface Props { onComplete: () => void }

export function HallwayKiss({ onComplete }: Props) {
  const [step, setStep] = useState(0)

  const advance = () => {
    if (step < STEPS.length - 1) setStep(s => s + 1)
    else onComplete()
  }

  const s = STEPS[step]

  return (
    <div onClick={advance} style={{ position: 'absolute', inset: 0, background: '#000', cursor: 'pointer' }}>

      {/* Progress bar */}
      <div style={{ position: 'absolute', top: 20, left: 24, right: 24, height: 3, background: 'rgba(255,255,255,0.18)', borderRadius: 3, zIndex: 5 }}>
        <div style={{ height: '100%', background: '#E8B04B', borderRadius: 3, width: `${(step + 1) / STEPS.length * 100}%`, transition: 'width 0.5s ease' }} />
      </div>

      <div key={step} style={{ position: 'absolute', inset: 0, overflow: 'hidden', animation: 'develop 1.4s ease-out both', background: 'linear-gradient(160deg,#080610,#14080e)' }}>
        <img
          src={s.img}
          alt=""
          onError={(e) => { e.currentTarget.style.opacity = '0' }}
          style={{
            position: 'absolute', left: '-6%', top: '-6%', width: '112%', height: '112%',
            objectFit: 'cover', objectPosition: 'center 15%',
            animation: 'photoLive 24s ease-out both, blinkFlick 7s linear infinite',
          }}
        />
      </div>

      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.92) 100%)' }} />
      <div style={{ position: 'absolute', inset: '-20%', pointerEvents: 'none', mixBlendMode: 'overlay', opacity: 0.065, backgroundImage: grain, animation: 'grainShift 1.1s steps(3) infinite' }} />

      <div key={`lyric-${step}`} style={{ position: 'absolute', left: 20, right: 20, bottom: '22%', textAlign: 'center', animation: 'capIn 1.1s ease-out both' }}>
        <div style={{ fontSize: 10, letterSpacing: '0.38em', textTransform: 'uppercase', color: s.speakerColor, fontWeight: 700, marginBottom: 8 }}>
          {s.speaker}
        </div>
        <div style={{ display: 'inline-block', background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(12px)', borderRadius: 14, padding: '14px 22px' }}>
          <div style={{ fontSize: 20, fontWeight: 800, lineHeight: 1.35, letterSpacing: -0.3, color: '#fff', whiteSpace: 'pre-line' }}>
            {s.lyric}
          </div>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 40, left: 0, right: 0, textAlign: 'center', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600, animation: 'tapPulse 1.8s ease-in-out infinite', pointerEvents: 'none', color: 'rgba(255,255,255,0.5)' }}>
        Tap to continue ›
      </div>
    </div>
  )
}
