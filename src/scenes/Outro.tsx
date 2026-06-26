import { useState } from 'react'
import { P } from '../photos'

interface Props { onReplay: () => void }

type Phase = 'strip' | 'subscribe'

const PANELS = [
  { img: P.roddoConcert, label: 'on stage',   rot: '-4deg', delay: '0s'    },
  { img: P.cafeteria,    label: 'with Chloe', rot: '2deg',  delay: '0.35s' },
  { img: P.chanel,       label: '$3,200 😌',  rot: '-2deg', delay: '0.65s' },
]

export function Outro({ onReplay }: Props) {
  const [phase, setPhase] = useState<Phase>('strip')

  if (phase === 'strip') {
    return (
      <div style={{ position: 'absolute', inset: 0, background: '#06040c', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px 24px' }}>

        <div style={{ fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(232,176,75,0.6)', marginBottom: 24, animation: 'fadeUp 0.6s ease-out both' }}>
          Roddo
        </div>

        {/* Polaroid strip */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 32 }}>
          {PANELS.map((p, i) => (
            <div key={i} style={{
              flex: 1, background: '#fff', borderRadius: 4, overflow: 'hidden',
              boxShadow: '0 12px 36px rgba(0,0,0,0.7)',
              transform: `rotate(${p.rot})`,
              animation: `polaroidIn 0.6s ${p.delay} cubic-bezier(.34,1.56,.64,1) both`,
            }}>
              <div style={{ paddingBottom: '130%', position: 'relative' }}>
                <img src={p.img} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }} onError={(e) => { e.currentTarget.style.opacity = '0' }} />
              </div>
              <div style={{ padding: '8px 6px', textAlign: 'center', fontSize: 10, fontWeight: 700, color: '#333', fontFamily: 'monospace' }}>
                {p.label}
              </div>
            </div>
          ))}
        </div>

        {/* Lyric — split into two lines */}
        <div style={{ textAlign: 'center', animation: 'capIn 0.8s 0.9s ease-out both', marginBottom: 32 }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: 'rgba(255,255,255,0.65)', fontStyle: 'italic', lineHeight: 1.6 }}>
            "that ain't replace the hurt<br />
            and yeah, you might'a did it first<br />
            but girl I does it worst"
          </div>
        </div>

        {/* Tap to continue */}
        <div onClick={() => setPhase('subscribe')} style={{ cursor: 'pointer', animation: 'tapPulse 1.8s 1.5s ease-in-out infinite', animationFillMode: 'both' }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600, color: 'rgba(255,255,255,0.4)' }}>
            Tap to continue ›
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#04020a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 28px' }}>

      {/* Notification slide */}
      <div style={{
        position: 'absolute', top: 48, left: 16, right: 16,
        background: 'rgba(30,30,40,0.95)', backdropFilter: 'blur(20px)',
        borderRadius: 16, padding: '12px 16px',
        display: 'flex', alignItems: 'center', gap: 12,
        border: '0.5px solid rgba(255,255,255,0.1)',
        animation: 'notifSlide 0.6s cubic-bezier(.34,1.56,.64,1) both',
        boxShadow: '0 12px 40px rgba(0,0,0,0.7)',
      }}>
        <div style={{ width: 38, height: 38, borderRadius: 10, background: 'linear-gradient(135deg,#E8B04B,#C8780A)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🎵</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Young Roddo</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', marginTop: 1 }}>new music dropping soon 🔥</div>
        </div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>now</div>
      </div>

      {/* Main text */}
      <div style={{ textAlign: 'center', animation: 'fadeUp 0.8s 0.4s ease-out both' }}>
        <div style={{ fontSize: 11, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>
          for the next chapter
        </div>
        <div style={{ fontSize: 52, fontWeight: 900, letterSpacing: -2, color: '#fff', lineHeight: 0.95, textShadow: '0 0 80px rgba(232,176,75,0.3)' }}>
          LIKE &<br />SUBSCRIBE
        </div>
        <div style={{ width: 60, height: 2.5, background: 'linear-gradient(90deg,#E8B04B,transparent)', margin: '18px auto 0', borderRadius: 2 }} />
      </div>

      {/* Subscribe + replay */}
      <div style={{ marginTop: 36, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, animation: 'fadeUp 0.8s 0.7s ease-out both' }}>
        <div style={{ background: '#FF0000', borderRadius: 6, padding: '12px 28px', fontSize: 14, fontWeight: 800, letterSpacing: 0.5, color: '#fff', animation: 'subPulse 2s ease-in-out infinite', cursor: 'pointer' }}>
          ▶ SUBSCRIBE
        </div>
        <div onClick={onReplay} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', opacity: 0.5 }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>↻</div>
          <span style={{ fontSize: 12, letterSpacing: 1, textTransform: 'uppercase' }}>Replay</span>
        </div>
      </div>
    </div>
  )
}
