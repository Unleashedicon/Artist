import { P } from '../photos'

const grain = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`

interface Props { onComplete: () => void }

export function Cafeteria({ onComplete }: Props) {
  return (
    <div onClick={onComplete} style={{ position: 'absolute', inset: 0, background: '#000', cursor: 'pointer' }}>

      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', animation: 'develop 1.6s ease-out both' }}>
        <img
          src={P.cafeteria}
          alt=""
          onError={(e) => { e.currentTarget.style.opacity = '0' }}
          style={{
            position: 'absolute', left: '-6%', top: '-6%', width: '112%', height: '112%',
            objectFit: 'cover', objectPosition: 'center 20%',
            animation: 'photoLive 26s ease-out both, blinkFlick 7s linear infinite',
          }}
        />
      </div>

      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0.9) 100%)' }} />
      <div style={{ position: 'absolute', inset: '-20%', pointerEvents: 'none', mixBlendMode: 'overlay', opacity: 0.06, backgroundImage: grain, animation: 'grainShift 1.1s steps(3) infinite' }} />

      {/* Everybody watching badge */}
      <div style={{ position: 'absolute', top: 36, left: 0, right: 0, textAlign: 'center', animation: 'fadeUp 0.8s ease-out both' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', border: '1px solid rgba(232,176,75,0.3)', borderRadius: 20, padding: '5px 14px' }}>
          <span style={{ fontSize: 11 }}>👀</span>
          <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)' }}>everybody watching</span>
        </div>
      </div>

      <div style={{ position: 'absolute', left: 20, right: 20, bottom: '22%', textAlign: 'center', animation: 'capIn 1.1s 0.2s ease-out both' }}>
        <div style={{ fontSize: 10, letterSpacing: '0.38em', textTransform: 'uppercase', color: '#E8B04B', fontWeight: 700, marginBottom: 6 }}>Roddo</div>
        <div style={{ display: 'inline-block', background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(12px)', borderRadius: 14, padding: '14px 22px' }}>
          <div style={{ fontSize: 21, fontWeight: 800, lineHeight: 1.3, letterSpacing: -0.3, color: '#fff' }}>
            "Cause you see I'm lit"
          </div>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 40, left: 0, right: 0, textAlign: 'center', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600, animation: 'tapPulse 1.8s ease-in-out infinite', pointerEvents: 'none', color: 'rgba(255,255,255,0.5)' }}>
        Tap to continue ›
      </div>
    </div>
  )
}
