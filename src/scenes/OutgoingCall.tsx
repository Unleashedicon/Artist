import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { P } from '../photos'

interface Props { onHangUp: () => void }

const grain = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`

const CONTROLS = [
  { icon: '🔇', label: 'mute'    },
  { icon: '⌨️', label: 'keypad'  },
  { icon: '🔊', label: 'speaker' },
  { icon: '➕', label: 'add'     },
  { icon: '⏸',  label: 'hold'    },
  { icon: '📹', label: 'FaceTime' },
]

/* Voice-level indicator — flat when calling, bouncing when answered */
function VoiceBars({ active }: { active: boolean }) {
  const delays = [0, 0.09, 0.18, 0.06, 0.14]
  return (
    <div style={{ display: 'flex', gap: 3, alignItems: 'center', justifyContent: 'center', height: 18 }}>
      {delays.map((delay, i) => (
        <div
          key={i}
          style={{
            width: 3, borderRadius: 2,
            background: active ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.2)',
            height: active ? undefined : 3,
            animation: active ? `talkBar 0.5s ease-in-out ${delay}s infinite` : 'none',
          }}
        />
      ))}
    </div>
  )
}

export function OutgoingCall({ onHangUp }: Props) {
  const [phase, setPhase] = useState<'calling' | 'answered'>('calling')

  /* After 2.8 s Ms. Jackson "answers" */
  useEffect(() => {
    const t = setTimeout(() => setPhase('answered'), 2800)
    return () => clearTimeout(t)
  }, [])

  /* After she's shown for 5 s, move to jackson scene */
  useEffect(() => {
    if (phase !== 'answered') return
    const t = setTimeout(onHangUp, 5000)
    return () => clearTimeout(t)
  }, [phase, onHangUp])

  const isAnswered = phase === 'answered'

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#0a0810' }}>

      {/* ── Full-screen background: Kaisha (blurred) → Ms. Jackson (clear) ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={phase}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}
        >
          <div
            style={{
              position: 'absolute', inset: 0,
              background: isAnswered
                ? 'linear-gradient(135deg, #1a0d0d, #0d0a14)'
                : 'linear-gradient(135deg, #0a0d1a, #140a14)',
            }}
          />
          <img
            src={isAnswered ? P.jackson : P.kaisha}
            alt=""
            onError={(e) => { e.currentTarget.style.opacity = '0' }}
            style={{
              position: 'absolute', left: '-6%', top: '-6%', width: '116%', height: '116%',
              objectFit: 'cover', objectPosition: 'center 20%',
              filter: isAnswered ? 'brightness(0.5)' : 'blur(16px) brightness(0.4)',
              animation: isAnswered
                ? 'photoLive 18s ease-out both, blinkFlick 7s linear infinite'
                : 'sway 12s ease-in-out infinite alternate',
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 30%, rgba(0,0,0,0.1) 55%, rgba(0,0,0,0.9) 100%)',
        transition: 'background 0.7s ease',
      }} />

      {/* Film grain */}
      <div style={{
        position: 'absolute', inset: '-20%', pointerEvents: 'none',
        mixBlendMode: 'overlay', opacity: 0.06,
        backgroundImage: grain, animation: 'grainShift 1.1s steps(3) infinite',
      }} />

      {/* ── iOS status bar ── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '18px 26px 0', fontSize: 14, fontWeight: 600,
      }}>
        <span style={{ opacity: 0.85 }}>9:41</span>
        <span style={{ letterSpacing: 1, opacity: 0.7, fontSize: 13 }}>5G ▮▮▮</span>
      </div>

      {/* ── Avatar + caller info (cross-fades between phases) ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={phase}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'absolute', top: 100, left: 0, right: 0,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0,
          }}
        >
          {/* Caller label */}
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', fontWeight: 500 }}>
            {isAnswered ? 'iPhone' : 'iPhone'}
          </div>

          {/* Caller name */}
          <div style={{ fontSize: 40, fontWeight: 800, marginTop: 4, letterSpacing: -1, textShadow: '0 2px 18px rgba(0,0,0,0.7)' }}>
            {isAnswered ? 'Ms. Jackson' : 'Kaisha'}
          </div>

          {/* Status with voice bars */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
            <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>
              {isAnswered ? 'mobile' : 'mobile · calling…'}
            </span>
          </div>

          {/* Voice bars — flat when calling, active when answered */}
          <div style={{ marginTop: 10 }}>
            <VoiceBars active={isAnswered} />
          </div>

          {/* Avatar circle */}
          <div style={{
            width: 126, height: 126, borderRadius: '50%', overflow: 'hidden',
            marginTop: 20,
            border: isAnswered
              ? '2px solid rgba(255,80,60,0.55)'
              : '1.5px solid rgba(255,255,255,0.14)',
            boxShadow: isAnswered
              ? '0 0 0 6px rgba(255,59,48,0.1), 0 10px 36px rgba(0,0,0,0.6)'
              : '0 10px 36px rgba(0,0,0,0.55)',
            animation: isAnswered ? 'answerRing 1.8s ease-in-out infinite' : 'breathe 4.5s ease-in-out infinite',
          }}>
            <div style={{
              width: '100%', height: '100%',
              background: isAnswered ? 'linear-gradient(135deg,#2d1010,#1a0d20)' : 'linear-gradient(135deg,#101022,#1a1030)',
            }}>
              <img
                src={isAnswered ? P.jackson : P.kaisha}
                alt=""
                onError={(e) => { e.currentTarget.style.opacity = '0' }}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%', display: 'block' }}
              />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── Lyric caption — sits above the control grid ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`lyric-${phase}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          style={{
            position: 'absolute', left: 24, right: 24, top: '58%',
            textAlign: 'center', zIndex: 5,
          }}
        >
          <div style={{
            display: 'inline-block',
            background: 'rgba(0,0,0,0.28)',
            backdropFilter: 'blur(12px)',
            borderRadius: 12,
            padding: '10px 18px',
          }}>
            <div style={{
              fontSize: isAnswered ? 16 : 15,
              fontWeight: 700,
              color: isAnswered ? '#FFB3AE' : 'rgba(255,255,255,0.92)',
              lineHeight: 1.35,
              letterSpacing: 0.1,
            }}>
              {isAnswered ? '"her mom pick up"' : '"I call her phone,"'}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── iOS call controls (6 buttons) — visible in both phases ── */}
      <div style={{
        position: 'absolute', bottom: 100, left: 0, right: 0,
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '18px 0',
        padding: '0 24px',
      }}>
        {CONTROLS.map(({ icon, label }) => (
          <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7 }}>
            <div style={{
              width: 56, height: 56, borderRadius: '50%',
              background: 'rgba(255,255,255,0.12)',
              backdropFilter: 'blur(8px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 20,
            }}>{icon}</div>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)', letterSpacing: 0.2 }}>{label}</span>
          </div>
        ))}
      </div>

      {/* ── End call button ── */}
      <div style={{ position: 'absolute', bottom: 36, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
        <div
          onClick={onHangUp}
          style={{
            width: 68, height: 68, borderRadius: '50%', background: '#FF3B30',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', boxShadow: '0 8px 22px rgba(255,59,48,0.5)',
          }}
        >
          <span style={{ fontSize: 28, transform: 'rotate(135deg)', display: 'block' }}>📞</span>
        </div>
      </div>
    </div>
  )
}
