import { useState } from 'react'
import { P } from '../photos'

const STEPS = [
  { img: P.kSmile,    lyric: 'Kaisha told me that she like me',  duration: 'photoLive 22s ease-out both, blinkFlick 7s linear infinite' },
  { img: P.kDemarcus, lyric: 'But she like Demarcus too',        duration: 'photoLive 22s ease-out both, blinkFlick 7s linear infinite' },
  { img: P.kKiss,     lyric: 'I seen her kiss him on the cheek', duration: 'photoLive 22s ease-out both, blinkFlick 7s linear infinite' },
  { img: P.roddo,     lyric: "I ain't know what else to do",     duration: 'photoLive 26s ease-out both, blinkFlick 8s linear infinite', desaturate: true },
]

const BARS = [0, 0.07, 0.14, 0.04, 0.11, 0.06, 0.18]

function TalkingWave() {
  return (
    <div style={{ display: 'flex', gap: 3, alignItems: 'center', justifyContent: 'center', height: 22, margin: '5px 0 8px' }}>
      {BARS.map((delay, i) => (
        <div
          key={i}
          style={{
            width: 3, borderRadius: 2,
            background: 'rgba(232,176,75,0.9)',
            animation: `talkBar 0.52s ease-in-out ${delay}s infinite`,
          }}
        />
      ))}
    </div>
  )
}

interface Props { onReplay: () => void }

export function Chorus({ onReplay }: Props) {
  const [step, setStep] = useState(0)

  const advance = () => {
    if (step < STEPS.length - 1) setStep(s => s + 1)
  }

  const s = STEPS[step]
  const isLast = step === STEPS.length - 1

  return (
    <div onClick={isLast ? undefined : advance} style={{ position: 'absolute', inset: 0, background: '#000', cursor: isLast ? 'default' : 'pointer' }}>

      {/* Progress bar */}
      <div style={{ position: 'absolute', top: 20, left: 24, right: 24, height: 3, background: 'rgba(255,255,255,0.18)', borderRadius: 3, zIndex: 5 }}>
        <div style={{ height: '100%', background: '#E8B04B', borderRadius: 3, width: `${(step + 1) / STEPS.length * 100}%`, transition: 'width 0.5s ease' }} />
      </div>

      {/* Photo background — key forces remount = re-triggers develop animation */}
      <div key={step} style={{ position: 'absolute', inset: 0, overflow: 'hidden', animation: 'develop 1.5s ease-out both', background: 'linear-gradient(160deg,#0a0d18,#180a10)' }}>
        <img
          src={s.img}
          alt=""
          onError={(e) => { e.currentTarget.style.opacity = '0' }}
          style={{
            position: 'absolute', left: '-6%', top: '-6%', width: '112%', height: '112%',
            objectFit: 'cover', objectPosition: 'center 20%',
            filter: s.desaturate ? 'saturate(0.85)' : undefined,
            animation: s.duration,
          }}
        />
      </div>

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.25) 60%, rgba(0,0,0,0.9) 100%)',
      }} />

      {/* Film grain */}
      <div style={{
        position: 'absolute', inset: '-20%', pointerEvents: 'none',
        mixBlendMode: 'overlay', opacity: 0.065,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        animation: 'grainShift 1.1s steps(3) infinite',
      }} />

      {/* Lyric + Roddo label + waveform */}
      <div
        key={`lyric-${step}`}
        style={{
          position: 'absolute', left: 20, right: 20, bottom: '22%',
          textAlign: 'center', animation: 'capIn 1.1s ease-out both',
        }}
      >
        {/* Roddo speaker label */}
        <div style={{
          fontSize: 10, letterSpacing: '0.38em', textTransform: 'uppercase',
          color: '#E8B04B', fontWeight: 700, marginBottom: 0,
        }}>
          Roddo
        </div>

        {/* Talking waveform */}
        <TalkingWave />

        {/* Lyric pill */}
        <div style={{
          display: 'inline-block',
          background: 'rgba(0,0,0,0.28)',
          backdropFilter: 'blur(10px)',
          borderRadius: 14, padding: '12px 22px',
        }}>
          <div style={{ fontSize: 22, fontWeight: 800, lineHeight: 1.25, letterSpacing: -0.3, color: '#fff' }}>
            {s.lyric}
          </div>
        </div>
      </div>

      {/* Last step: Replay icon — top left */}
      {isLast && (
        <div
          onClick={onReplay}
          style={{
            position: 'absolute', top: 48, left: 20,
            width: 32, height: 32, borderRadius: '50%',
            border: '1.5px solid rgba(255,255,255,0.35)',
            backdropFilter: 'blur(6px)', background: 'rgba(255,255,255,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 15, cursor: 'pointer',
            animation: 'fadeUp 0.6s ease-out both', zIndex: 6,
          }}
        >
          ↻
        </div>
      )}

      {/* Tap hint (not on last step) */}
      {!isLast && (
        <div style={{
          position: 'absolute', bottom: 40, left: 0, right: 0, textAlign: 'center',
          fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600,
          animation: 'tapPulse 1.8s ease-in-out infinite', pointerEvents: 'none',
        }}>
          Tap to continue ›
        </div>
      )}
    </div>
  )
}
