import { useEffect, useState } from 'react'
import { P } from '../photos'

interface Props { onComplete: () => void }

type Phase = 'idle' | 'selected' | 'error'

export function VSChoice({ onComplete }: Props) {
  const [phase, setPhase] = useState<Phase>('idle')
  const [canTap, setCanTap] = useState(false)

  const pickRoddo = () => {
    if (phase !== 'idle') return
    setPhase('selected')
    setTimeout(() => setPhase('error'), 800)
    setTimeout(() => setCanTap(true), 2000)
  }

  return (
    <div
      onClick={canTap ? onComplete : undefined}
      style={{ position: 'absolute', inset: 0, background: '#08060e', cursor: canTap ? 'pointer' : 'default', overflow: 'hidden' }}
    >
      {/* Subtle grid */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.06, backgroundImage: 'radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

      {/* Header lyric */}
      <div style={{ position: 'absolute', top: 52, left: 20, right: 20, textAlign: 'center', animation: 'capIn 0.9s ease-out both' }}>
        <div style={{ fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#E8B04B', fontWeight: 700, marginBottom: 10 }}>three weeks ago</div>
        <div style={{ fontSize: 17, fontWeight: 800, color: 'rgba(255,255,255,0.88)', lineHeight: 1.4 }}>
          "it's crazy just three weeks ago<br />you ain't know who to pick"
        </div>
      </div>

      {/* VS Cards */}
      <div style={{ position: 'absolute', top: '26%', left: 16, right: 16, display: 'flex', gap: 12, alignItems: 'stretch', animation: 'fadeUp 0.8s 0.5s ease-out both' }}>

        {/* Demarcus card */}
        <div style={{
          flex: 1, borderRadius: 16, overflow: 'hidden', position: 'relative',
          border: '2px solid rgba(255,255,255,0.15)',
          opacity: phase === 'selected' || phase === 'error' ? 0.4 : 1,
          transition: 'opacity 0.5s',
          height: 290,
        }}>
          <img src={P.demarcus} alt="" onError={(e) => { e.currentTarget.style.opacity = '0' }}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 10%' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 45%, rgba(0,0,0,0.9) 100%)' }} />
          <div style={{ position: 'absolute', bottom: 14, left: 12, right: 12 }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>DEMARCUS</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>your guy ❤️</div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', marginTop: 1 }}>since 9th grade</div>
          </div>
        </div>

        {/* VS badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'rgba(232,176,75,0.12)', border: '1.5px solid rgba(232,176,75,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 900, color: '#E8B04B' }}>VS</div>
        </div>

        {/* Roddo card — tap to pick */}
        <div
          onClick={(e) => { e.stopPropagation(); pickRoddo() }}
          style={{
            flex: 1, borderRadius: 16, overflow: 'hidden', position: 'relative',
            border: `2px solid ${phase === 'idle' ? 'rgba(255,255,255,0.15)' : '#E8B04B'}`,
            animation: phase === 'selected' || phase === 'error' ? 'selectGlow 1.2s ease-in-out infinite' : 'none',
            transition: 'border-color 0.3s',
            height: 290,
            cursor: phase === 'idle' ? 'pointer' : 'default',
          }}
        >
          <img src={P.roddoConcert} alt="" onError={(e) => { e.currentTarget.style.opacity = '0' }}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 10%' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 45%, rgba(0,0,0,0.9) 100%)' }} />
          {(phase === 'selected' || phase === 'error') && (
            <div style={{ position: 'absolute', top: 10, right: 10, width: 24, height: 24, borderRadius: '50%', background: '#E8B04B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, animation: 'fadeUp 0.3s ease-out both' }}>✓</div>
          )}
          <div style={{ position: 'absolute', bottom: 14, left: 12, right: 12 }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>RODDO</div>
            <div style={{ fontSize: 10, color: '#E8B04B', marginTop: 2 }}>🔥 going viral</div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', marginTop: 1 }}>1.2M streams</div>
          </div>
          {/* Tap hint on Roddo card */}
          {phase === 'idle' && (
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center', animation: 'tapPulse 1.8s ease-in-out infinite' }}>
              <div style={{ fontSize: 22 }}>👆</div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.6)', marginTop: 4, fontWeight: 700, letterSpacing: 1 }}>TAP</div>
            </div>
          )}
        </div>
      </div>

      {/* Error modal */}
      {phase === 'error' && (
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: 'linear-gradient(160deg,#120810,#0d0d18)',
          border: '1px solid rgba(255,59,48,0.3)',
          borderRadius: '20px 20px 0 0',
          padding: '26px 22px 44px',
          animation: 'slideUp 0.45s ease-out both',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,59,48,0.15)', border: '1.5px solid rgba(255,59,48,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>⛔</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#FF3B30', letterSpacing: 0.5 }}>ERROR 404: TAKEN</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>request could not be processed</div>
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: '14px 16px', marginBottom: 14 }}>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, fontWeight: 500 }}>
              <span style={{ color: '#E8B04B', fontWeight: 700 }}>@roddo</span> has moved on<br />
              now with: <span style={{ color: '#ff9eb5' }}>Chloe 💔</span><br />
              status: <span style={{ color: 'rgba(255,255,255,0.45)' }}>off the market 🔥</span>
            </div>
          </div>

          <div style={{ fontSize: 13, fontStyle: 'italic', color: 'rgba(255,255,255,0.55)', textAlign: 'center', lineHeight: 1.5 }}>
            "and Demarcus don't mean nothing"
          </div>

          {canTap && (
            <div style={{ textAlign: 'center', marginTop: 14, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600, animation: 'tapPulse 1.8s ease-in-out infinite', color: 'rgba(255,255,255,0.4)' }}>
              Tap to continue ›
            </div>
          )}
        </div>
      )}
    </div>
  )
}
