import { useState } from 'react'
import { P } from '../photos'

interface Props { onAccept: () => void; onDecline: () => void }

const grain = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`

export function IncomingCall({ onAccept, onDecline }: Props) {
  const [status, setStatus] = useState<'ringing' | 'busy'>('ringing')

  const decline = () => { if (status !== 'ringing') return; setStatus('busy'); setTimeout(onDecline, 700) }
  const answer  = () => { if (status !== 'ringing') return; setStatus('busy'); setTimeout(onAccept,  500) }

  return (
    <div
      style={{
        position: 'absolute', inset: 0, background: '#0a0810',
        animation: status === 'ringing' ? 'vibrate 0.5s linear infinite' : 'none',
      }}
    >
      {/* Full-screen Kaisha photo — kenburns + sway + breathe + blinkFlick */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: 'linear-gradient(160deg,#0d0a18,#1a0a14)' }}>
        <img
          src={P.kaisha}
          alt=""
          onError={(e) => { e.currentTarget.style.opacity = '0' }}
          style={{
            position: 'absolute', left: '-6%', top: '-6%', width: '112%', height: '112%',
            objectFit: 'cover', objectPosition: 'center 20%',
            animation: 'photoLive 26s ease-out both, blinkFlick 7s linear infinite',
          }}
        />
      </div>

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(5,5,8,0.72) 0%, rgba(5,5,8,0.15) 32%, rgba(5,5,8,0.25) 62%, rgba(5,5,8,0.92) 100%)',
      }} />

      {/* Film grain */}
      <div style={{
        position: 'absolute', inset: '-20%', pointerEvents: 'none',
        mixBlendMode: 'overlay', opacity: 0.07,
        backgroundImage: grain, animation: 'grainShift 1.1s steps(3) infinite',
      }} />

      {/* Status bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        display: 'flex', justifyContent: 'space-between',
        padding: '18px 28px 0', fontSize: 14, fontWeight: 600,
      }}>
        <span>12:03</span>
        <span style={{ letterSpacing: 1 }}>5G ▮▮▮</span>
      </div>

      {/* Caller info */}
      <div style={{ position: 'absolute', top: 108, left: 0, right: 0, textAlign: 'center' }}>
        <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', fontWeight: 600, letterSpacing: 0.5 }}>iPhone</div>
        <div style={{ fontSize: 42, fontWeight: 800, marginTop: 6, letterSpacing: -1, textShadow: '0 2px 18px rgba(0,0,0,0.7)' }}>
          Kaisha
        </div>
        <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginTop: 3 }}>mobile</div>

        {/* Contact avatar ring */}
        <div style={{
          width: 118, height: 118, borderRadius: '50%', overflow: 'hidden',
          margin: '22px auto 0',
          border: '2.5px solid rgba(255,255,255,0.22)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.55), 0 0 0 6px rgba(255,255,255,0.06)',
          animation: 'breathe 4s ease-in-out infinite',
          background: 'linear-gradient(135deg,#1a1030,#2a1040)',
        }}>
          <img
            src={P.kaisha}
            alt=""
            onError={(e) => { e.currentTarget.style.opacity = '0' }}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }}
          />
        </div>
      </div>

      {/* Lyric caption — above the decline/accept buttons */}
      <div style={{
        position: 'absolute', left: 24, right: 24, bottom: 168,
        textAlign: 'center', animation: 'capIn 1.1s ease-out both', zIndex: 5,
      }}>
        <div style={{
          display: 'inline-block',
          background: 'rgba(0,0,0,0.28)',
          backdropFilter: 'blur(12px)',
          borderRadius: 12,
          padding: '10px 18px',
        }}>
          <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: 0.1, color: 'rgba(255,255,255,0.92)', lineHeight: 1.5 }}>
            "You say you call, I don't pick up
            <br />it's after 10 you wildin'"
          </div>
        </div>
      </div>

      {/* Decline / Accept */}
      <div style={{
        position: 'absolute', bottom: 48, left: 0, right: 0,
        display: 'flex', justifyContent: 'space-between', padding: '0 56px',
      }}>
        <div onClick={decline} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
          <div style={{
            width: 68, height: 68, borderRadius: '50%', background: '#FF3B30',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 8px 22px rgba(255,59,48,0.45)', fontSize: 30,
          }}>
            <span style={{ transform: 'rotate(135deg)', display: 'block' }}>📞</span>
          </div>
          <span style={{ fontSize: 13, color: '#eee' }}>Decline</span>
        </div>

        <div onClick={answer} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
          <div style={{
            width: 68, height: 68, borderRadius: '50%', background: '#34C759',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            animation: 'ringPulse 1.4s ease-out infinite', fontSize: 30,
          }}>
            📞
          </div>
          <span style={{ fontSize: 13, color: '#eee' }}>Accept</span>
        </div>
      </div>
    </div>
  )
}
