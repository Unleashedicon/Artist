import { useState } from 'react'
import { P } from '../photos'

interface Props { onComplete: () => void }

const grain = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`

const BARS = [0, 0.09, 0.17, 0.05, 0.13, 0.07, 0.21]

function TalkingWave({ color }: { color: string }) {
  return (
    <div style={{ display: 'flex', gap: 4, alignItems: 'center', justifyContent: 'center', height: 24, margin: '6px 0 10px' }}>
      {BARS.map((delay, i) => (
        <div
          key={i}
          style={{
            width: 3.5, borderRadius: 3,
            background: color,
            animation: `talkBar 0.55s ease-in-out ${delay}s infinite`,
          }}
        />
      ))}
    </div>
  )
}

export function MsJackson({ onComplete }: Props) {
  const [step, setStep] = useState(0)

  const advance = () => {
    if (step === 0) setStep(1)
    else onComplete()
  }

  return (
    <div onClick={advance} style={{ position: 'absolute', inset: 0, background: '#000', cursor: 'pointer' }}>

      {/* ── Step 0: Ms. Jackson on phone, scolding ── */}
      {step === 0 && (
        <div key="j0" style={{ position: 'absolute', inset: 0, overflow: 'hidden', animation: 'develop 1.4s ease-out both', background: 'linear-gradient(160deg,#1a0808,#0d0818)' }}>
          <img
            src={P.jacksonCall}
            alt="Ms. Jackson"
            onError={(e) => { e.currentTarget.style.opacity = '0' }}
            style={{
              position: 'absolute', left: '-6%', top: '-6%', width: '112%', height: '112%',
              objectFit: 'cover', objectPosition: 'center 20%',
              animation: 'photoLive 24s ease-out both, blinkFlick 6.5s linear infinite',
            }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.1) 55%, rgba(0,0,0,0.88) 100%)' }} />
          <div style={{ position: 'absolute', inset: '-20%', pointerEvents: 'none', mixBlendMode: 'overlay', opacity: 0.065, backgroundImage: grain, animation: 'grainShift 1.1s steps(3) infinite' }} />

          <div style={{ position: 'absolute', left: 20, right: 20, bottom: '22%', textAlign: 'center', animation: 'capIn 1.1s ease-out both' }}>
            <div style={{ fontSize: 11, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#FF6B5E', fontWeight: 700, marginBottom: 2 }}>
              Ms. Jackson
            </div>
            <TalkingWave color="rgba(255,107,94,0.85)" />
            <div style={{ display: 'inline-block', background: 'rgba(0,0,0,0.28)', backdropFilter: 'blur(12px)', borderRadius: 14, padding: '16px 20px' }}>
              <div style={{ fontSize: 20, fontWeight: 800, lineHeight: 1.25, letterSpacing: -0.3, color: '#fff' }}>
                "Roddo, you done messed around and broke my daughter heart"
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Step 1: Roddo on phone, responding ── */}
      {step === 1 && (
        <div key="j1" style={{ position: 'absolute', inset: 0, overflow: 'hidden', animation: 'develop 1.4s ease-out both', background: 'linear-gradient(160deg,#0d1018,#181008)' }}>
          <img
            src={P.roddoCall}
            alt="Roddo"
            onError={(e) => { e.currentTarget.style.opacity = '0' }}
            style={{
              position: 'absolute', left: '-6%', top: '-6%', width: '112%', height: '112%',
              objectFit: 'cover', objectPosition: 'center 20%',
              animation: 'photoLive 20s ease-out both, blinkFlick 6.5s linear infinite',
            }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.1) 55%, rgba(0,0,0,0.88) 100%)' }} />
          <div style={{ position: 'absolute', inset: '-20%', pointerEvents: 'none', mixBlendMode: 'overlay', opacity: 0.065, backgroundImage: grain, animation: 'grainShift 1.1s steps(3) infinite' }} />

          <div style={{ position: 'absolute', left: 20, right: 20, bottom: '22%', textAlign: 'center', animation: 'capIn 1.1s ease-out both' }}>
            <div style={{ fontSize: 11, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#E8B04B', fontWeight: 700, marginBottom: 2 }}>
              Roddo
            </div>
            <TalkingWave color="rgba(232,176,75,0.85)" />
            <div style={{ display: 'inline-block', background: 'rgba(0,0,0,0.28)', backdropFilter: 'blur(12px)', borderRadius: 14, padding: '16px 20px' }}>
              <div style={{ fontSize: 20, fontWeight: 800, lineHeight: 1.25, letterSpacing: -0.3, color: '#fff' }}>
                "Ms. Jackson, she be capping, let me take it from the start"
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tap hint */}
      <div style={{
        position: 'absolute', bottom: 30, left: 0, right: 0, textAlign: 'center',
        fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600,
        animation: 'tapPulse 1.8s ease-in-out infinite', pointerEvents: 'none',
        color: 'rgba(255,255,255,0.5)',
      }}>
        Tap to continue ›
      </div>
    </div>
  )
}
