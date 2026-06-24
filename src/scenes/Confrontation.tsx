import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TalkingFace } from '../components/TalkingFace'
import { msJackson, roddo } from '../characters'

interface Props { onComplete: () => void }

/* ── Dialogue script ── */
const LINES = [
  { id: 'j1', speaker: 'jackson' as const, text: '"Roddo, you done messed around..."',        ms: 3500 },
  { id: 'j2', speaker: 'jackson' as const, text: '"...and broke my daughter\'s heart"',        ms: 3400 },
  { id: 'r1', speaker: 'roddo'   as const, text: '"Ms. Jackson, she be capping, I swear..."', ms: 3800 },
  { id: 'r2', speaker: 'roddo'   as const, text: '"Let me take it from the start"',            ms: 3200 },
  { id: 'j3', speaker: 'jackson' as const, text: '"Boy, I am not tryna hear it—"',             ms: 2600 },
  { id: 'r3', speaker: 'roddo'   as const, text: '"Please... just give me a second."',         ms: 3000 },
]

function useTypewriter(text: string, active: boolean, cps = 32) {
  const [displayed, setDisplayed] = useState('')
  const frameRef = useRef<number>()
  const startRef  = useRef<number | null>(null)

  useEffect(() => {
    if (!active) { setDisplayed(''); return }
    startRef.current = null

    const tick = (ts: number) => {
      if (startRef.current === null) startRef.current = ts
      const chars = Math.min(Math.floor((ts - startRef.current) / (1000 / cps)), text.length)
      setDisplayed(text.slice(0, chars))
      if (chars < text.length) frameRef.current = requestAnimationFrame(tick)
    }

    frameRef.current = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(frameRef.current ?? 0) }
  }, [text, active, cps])

  return displayed
}

/* ── Speaking bars — like iOS FaceTime indicator ── */
function SpeakBar({ active, color }: { active: boolean; color: string }) {
  return (
    <div style={{ display: 'flex', gap: 3, alignItems: 'flex-end', height: 18 }}>
      {[0.6, 1, 0.75, 0.9, 0.65].map((h, i) => (
        <motion.div
          key={i}
          animate={active ? { height: ['4px', `${Math.round(h * 18)}px`, '4px'] } : { height: '4px' }}
          transition={{ repeat: Infinity, duration: 0.5 + i * 0.06, delay: i * 0.06, ease: 'easeInOut' }}
          style={{ width: 3, borderRadius: 2, background: active ? color : 'rgba(255,255,255,0.15)' }}
        />
      ))}
    </div>
  )
}

export function Confrontation({ onComplete }: Props) {
  const [lineIdx, setLineIdx] = useState(0)
  const [visible, setVisible] = useState(true)
  const [done, setDone] = useState(false)

  const line = LINES[lineIdx]
  const isJackson      = line.speaker === 'jackson'
  const isRoddo        = line.speaker === 'roddo'
  const jacksonSpeaking = visible && isJackson
  const roddoSpeaking   = visible && isRoddo

  const text = useTypewriter(line.text, visible)

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false)
      setTimeout(() => {
        const next = lineIdx + 1
        if (next >= LINES.length) {
          setDone(true)
          setTimeout(onComplete, 1600)
        } else {
          setLineIdx(next)
          setVisible(true)
        }
      }, 380)
    }, line.ms)
    return () => clearTimeout(t)
  }, [lineIdx, line.ms, onComplete])

  if (done) {
    return (
      <motion.div
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 1.4, delay: 0.2 }}
        style={{ position: 'fixed', inset: 0, background: '#000' }}
      />
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ position: 'fixed', inset: 0, display: 'flex', flexDirection: 'column', background: '#050505', overflow: 'hidden' }}
    >
      {/* FaceTime header */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 20,
        padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.85), transparent)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            style={{ width: 7, height: 7, borderRadius: '50%', background: '#34C759' }}
          />
          <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: 13 }}>FaceTime · HD</span>
        </div>
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          onClick={onComplete}
          style={{
            background: 'rgba(255,255,255,0.09)', border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 20, padding: '5px 13px', color: 'rgba(255,255,255,0.45)',
            fontSize: 11, cursor: 'pointer', letterSpacing: '0.08em',
          }}
        >
          SKIP →
        </motion.button>
      </div>

      {/* ── Split screen ── */}
      <div style={{ display: 'flex', flex: 1, position: 'relative' }}>

        {/* Ms. Jackson */}
        <motion.div
          animate={{
            flex: jacksonSpeaking ? 1.6 : 1,
            filter: jacksonSpeaking ? 'brightness(1)' : 'brightness(0.45)',
          }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          style={{
            position: 'relative', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            background: `radial-gradient(ellipse 80% 80% at 50% 40%, ${msJackson.bgColor} 0%, #000 100%)`,
            overflow: 'hidden',
          }}
        >
          <motion.div
            animate={{ opacity: jacksonSpeaking ? 0.38 : 0 }}
            style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              background: `radial-gradient(ellipse 60% 60% at 50% 40%, ${msJackson.accentColor}44 0%, transparent 70%)`,
            }}
          />

          <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <motion.div
              animate={{ opacity: jacksonSpeaking ? 1 : 0.4, y: jacksonSpeaking ? 0 : 4 }}
              style={{
                background: `${msJackson.accentColor}22`, border: `1px solid ${msJackson.accentColor}55`,
                borderRadius: 20, padding: '3px 12px', color: msJackson.accentColor,
                fontSize: 11, fontWeight: 600, letterSpacing: '0.12em',
              }}
            >
              MS. JACKSON
            </motion.div>

            <TalkingFace
              character={msJackson}
              speaking={jacksonSpeaking}
              size={jacksonSpeaking ? 'clamp(100px, 24vw, 144px)' : 'clamp(80px, 18vw, 108px)'}
              round
              expression="angry"
              style={{ transition: 'width 0.4s, height 0.4s' }}
            />

            <SpeakBar active={jacksonSpeaking} color={msJackson.accentColor} />
          </div>
        </motion.div>

        {/* Divider */}
        <div style={{ width: 1, background: 'rgba(255,255,255,0.07)', zIndex: 10, flexShrink: 0 }} />

        {/* Roddo */}
        <motion.div
          animate={{
            flex: roddoSpeaking ? 1.6 : 1,
            filter: roddoSpeaking ? 'brightness(1)' : 'brightness(0.45)',
          }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          style={{
            position: 'relative', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            background: `radial-gradient(ellipse 80% 80% at 50% 40%, ${roddo.bgColor} 0%, #000 100%)`,
            overflow: 'hidden',
          }}
        >
          <motion.div
            animate={{ opacity: roddoSpeaking ? 0.38 : 0 }}
            style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              background: `radial-gradient(ellipse 60% 60% at 50% 40%, ${roddo.accentColor}44 0%, transparent 70%)`,
            }}
          />

          <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <motion.div
              animate={{ opacity: roddoSpeaking ? 1 : 0.4, y: roddoSpeaking ? 0 : 4 }}
              style={{
                background: `${roddo.accentColor}22`, border: `1px solid ${roddo.accentColor}55`,
                borderRadius: 20, padding: '3px 12px', color: roddo.accentColor,
                fontSize: 11, fontWeight: 600, letterSpacing: '0.12em',
              }}
            >
              YOUNG RODDO
            </motion.div>

            <TalkingFace
              character={roddo}
              speaking={roddoSpeaking}
              size={roddoSpeaking ? 'clamp(100px, 24vw, 144px)' : 'clamp(80px, 18vw, 108px)'}
              round
              expression="sad"
              style={{ transition: 'width 0.4s, height 0.4s' }}
            />

            <SpeakBar active={roddoSpeaking} color={roddo.accentColor} />
          </div>
        </motion.div>
      </div>

      {/* ── Subtitle bar ── */}
      <div style={{
        position: 'relative', zIndex: 20,
        background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '14px 24px 28px',
        minHeight: 96,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8,
      }}>
        {/* Speaker dot */}
        <motion.div
          key={line.id + '-dot'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            width: 8, height: 8, borderRadius: '50%',
            background: isJackson ? msJackson.accentColor : roddo.accentColor,
            boxShadow: `0 0 10px ${isJackson ? msJackson.accentColor : roddo.accentColor}`,
            alignSelf: isJackson ? 'flex-start' : 'flex-end',
          }}
        />

        <AnimatePresence mode="wait">
          {visible && (
            <motion.p
              key={line.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22 }}
              style={{
                color: '#F0EDE8', fontSize: 'clamp(14px, 4vw, 17px)',
                fontWeight: 400, lineHeight: 1.55, textAlign: 'center', fontStyle: 'italic',
                textShadow: `0 2px 12px ${isJackson ? msJackson.accentColor : roddo.accentColor}55`,
              }}
            >
              {text}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.5 }}
                style={{ borderLeft: '2px solid currentColor', marginLeft: 2 }}
              />
            </motion.p>
          )}
        </AnimatePresence>

        {/* Progress dots */}
        <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
          {LINES.map((l, i) => (
            <motion.div
              key={l.id}
              animate={{ scale: i === lineIdx ? 1.4 : 1, opacity: i <= lineIdx ? 1 : 0.25 }}
              style={{
                width: 5, height: 5, borderRadius: '50%',
                background: i === lineIdx
                  ? (LINES[i].speaker === 'jackson' ? msJackson.accentColor : roddo.accentColor)
                  : 'rgba(255,255,255,0.4)',
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}
