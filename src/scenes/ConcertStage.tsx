import { P } from '../photos'

const grain = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
const BARS = [0, 0.07, 0.14, 0.04, 0.11, 0.06, 0.18]

function TalkingWave() {
  return (
    <div style={{ display: 'flex', gap: 3, alignItems: 'center', justifyContent: 'center', height: 22, margin: '5px 0 8px' }}>
      {BARS.map((delay, i) => (
        <div key={i} style={{ width: 3, borderRadius: 2, background: 'rgba(232,176,75,0.9)', animation: `talkBar 0.52s ease-in-out ${delay}s infinite` }} />
      ))}
    </div>
  )
}

interface Props { onComplete: () => void }

export function ConcertStage({ onComplete }: Props) {
  return (
    <div onClick={onComplete} style={{ position: 'absolute', inset: 0, background: '#000', cursor: 'pointer' }}>

      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', animation: 'develop 1.5s ease-out both', background: 'linear-gradient(160deg,#08060e,#1a0a10)' }}>
        <img
          src={P.roddoConcert}
          alt=""
          onError={(e) => { e.currentTarget.style.opacity = '0' }}
          style={{
            position: 'absolute', left: '-6%', top: '-6%', width: '112%', height: '112%',
            objectFit: 'cover', objectPosition: 'center 15%',
            animation: 'photoLive 24s ease-out both, blinkFlick 8s linear infinite',
          }}
        />
      </div>

      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.92) 100%)' }} />
      <div style={{ position: 'absolute', inset: '-20%', pointerEvents: 'none', mixBlendMode: 'overlay', opacity: 0.065, backgroundImage: grain, animation: 'grainShift 1.1s steps(3) infinite' }} />

      {/* Stage label top */}
      <div style={{ position: 'absolute', top: 36, left: 0, right: 0, textAlign: 'center', animation: 'fadeUp 0.8s ease-out both' }}>
        <div style={{ display: 'inline-block', border: '1px solid rgba(232,176,75,0.4)', borderRadius: 4, padding: '4px 14px', fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#E8B04B', fontWeight: 800 }}>
          Live Performance
        </div>
      </div>

      <div style={{ position: 'absolute', left: 20, right: 20, bottom: '22%', textAlign: 'center', animation: 'capIn 1.1s ease-out both' }}>
        <div style={{ fontSize: 10, letterSpacing: '0.38em', textTransform: 'uppercase', color: '#E8B04B', fontWeight: 700 }}>Roddo</div>
        <TalkingWave />
        <div style={{ display: 'inline-block', background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(12px)', borderRadius: 14, padding: '14px 24px' }}>
          <div style={{ fontSize: 21, fontWeight: 800, lineHeight: 1.3, letterSpacing: -0.3, color: '#fff' }}>
            "plus I just came from off the stage"
          </div>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 40, left: 0, right: 0, textAlign: 'center', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600, animation: 'tapPulse 1.8s ease-in-out infinite', pointerEvents: 'none', color: 'rgba(255,255,255,0.5)' }}>
        Tap to continue ›
      </div>
    </div>
  )
}
