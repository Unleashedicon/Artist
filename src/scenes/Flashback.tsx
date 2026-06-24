import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { flashbackPhotos } from '../characters'

const ACCENTS = ['#40A060', '#C8960E', '#C06080', '#6080C0']

interface Props { onRestart: () => void }

export function Flashback({ onRestart }: Props) {
  const [current, setCurrent] = useState(0)
  const [viewed, setViewed]   = useState<Set<number>>(new Set([0]))
  const [view, setView]       = useState<'gallery' | 'photo'>('gallery')

  const openPhoto = (i: number) => {
    setViewed(prev => new Set([...prev, i]))
    setCurrent(i)
    setView('photo')
  }

  const next = () => {
    if (current < flashbackPhotos.length - 1) {
      const n = current + 1
      setViewed(prev => new Set([...prev, n]))
      setCurrent(n)
    } else {
      setView('gallery')
    }
  }

  const photo = flashbackPhotos[current]
  const accent = ACCENTS[current] ?? '#fff'

  return (
    <div style={{ minHeight: '100dvh', background: '#080808', display: 'flex', flexDirection: 'column' }}>
      {/* macOS window dots */}
      <div style={{
        padding: '18px 20px 12px',
        background: 'linear-gradient(to bottom, #111, transparent)',
        display: 'flex', alignItems: 'center', gap: 14,
      }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {['#FF5F57', '#FEBC2E', '#28C840'].map(c => (
            <div key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />
          ))}
        </div>
        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>📸 Camera Roll</span>
      </div>

      <AnimatePresence mode="wait">
        {view === 'gallery' ? (
          <motion.div
            key="gallery"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ flex: 1, padding: '0 12px' }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ textAlign: 'center', padding: '16px 0 24px' }}
            >
              <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, letterSpacing: '0.3em', marginBottom: 6 }}>
                LET ME TAKE IT FROM THE START
              </p>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14 }}>Tap each photo to see the memory</p>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
              {flashbackPhotos.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9, rotate: (i % 2 === 0 ? -2 : 2) }}
                  animate={{ opacity: 1, scale: 1, rotate: (i % 2 === 0 ? -1.5 : 1.5) }}
                  transition={{ delay: i * 0.1 + 0.1, type: 'spring', stiffness: 200 }}
                  whileHover={{ scale: 1.04, rotate: 0 }}
                  onClick={() => openPhoto(i)}
                  style={{ cursor: 'pointer' }}
                >
                  <PolaroidThumb url={p.url} caption={p.caption} emoji={p.emoji} viewed={viewed.has(i)} />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              style={{ textAlign: 'center', padding: '36px 0 44px' }}
            >
              <p style={{ color: 'rgba(255,255,255,0.18)', fontSize: 12, marginBottom: 18 }}>
                Young Roddo · Ms. Jackson Story
              </p>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={onRestart}
                style={{
                  background: 'transparent', border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: 9999, padding: '10px 28px',
                  color: 'rgba(255,255,255,0.5)', fontSize: 12,
                  letterSpacing: '0.15em', cursor: 'pointer',
                }}
              >
                ↺ RESTART STORY
              </motion.button>
            </motion.div>
          </motion.div>
        ) : (
          /* ── Full photo view ── */
          <motion.div
            key={`photo-${current}`}
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35 }}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '16px 20px' }}
          >
            <motion.button
              onClick={() => setView('gallery')}
              whileTap={{ scale: 0.95 }}
              style={{
                alignSelf: 'flex-start', marginBottom: 20,
                background: 'rgba(255,255,255,0.07)', border: 'none', borderRadius: 20,
                padding: '7px 15px', color: 'rgba(255,255,255,0.55)', fontSize: 12, cursor: 'pointer',
              }}
            >
              ← Back
            </motion.button>

            {/* Polaroid */}
            <motion.div
              initial={{ rotate: -2 }}
              animate={{ rotate: current % 2 === 0 ? -1 : 1 }}
              style={{
                background: '#F5F0E8', borderRadius: 4, padding: '14px 14px 52px',
                width: '100%', maxWidth: 290,
                boxShadow: `0 20px 60px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.04)`,
              }}
            >
              {/* Photo */}
              <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', borderRadius: 2, overflow: 'hidden' }}>
                <img
                  src={photo.url}
                  alt={photo.caption}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                {/* Film grain overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(135deg, rgba(255,255,220,0.06) 0%, transparent 60%)',
                  mixBlendMode: 'overlay',
                }} />
                {/* Emoji badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: 'spring' }}
                  style={{
                    position: 'absolute', top: 8, right: 8,
                    fontSize: 22, lineHeight: 1,
                    background: 'rgba(0,0,0,0.4)', borderRadius: '50%',
                    width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  {photo.emoji}
                </motion.div>
              </div>

              <p style={{
                fontFamily: 'Permanent Marker, cursive',
                color: '#2a1a0a', fontSize: 13, textAlign: 'center',
                marginTop: 14, lineHeight: 1.55,
              }}>
                {photo.caption}
              </p>
            </motion.div>

            {/* Dots */}
            <div style={{ display: 'flex', gap: 8, marginTop: 22 }}>
              {flashbackPhotos.map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: i === current ? 1.4 : 1,
                    background: i === current ? accent : 'rgba(255,255,255,0.2)',
                  }}
                  onClick={() => openPhoto(i)}
                  style={{ width: 6, height: 6, borderRadius: '50%', cursor: 'pointer' }}
                />
              ))}
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={next}
              style={{
                marginTop: 20,
                background: accent, border: 'none', borderRadius: 9999,
                padding: '12px 32px', color: '#000', fontSize: 13,
                fontWeight: 700, letterSpacing: '0.1em', cursor: 'pointer',
                boxShadow: `0 6px 20px ${accent}55`,
              }}
            >
              {current < flashbackPhotos.length - 1 ? 'NEXT MEMORY →' : 'DONE'}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function PolaroidThumb({ url, caption, emoji, viewed }: { url: string; caption: string; emoji: string; viewed: boolean }) {
  return (
    <div style={{
      background: '#F5F0E8', borderRadius: 3, padding: '8px 8px 26px',
      boxShadow: '0 6px 24px rgba(0,0,0,0.55)',
      filter: viewed ? undefined : 'saturate(0) brightness(0.45)',
      transition: 'filter 0.5s',
    }}>
      <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', borderRadius: 2, overflow: 'hidden' }}>
        <img src={url} alt={caption} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        {!viewed && (
          <div style={{
            position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 28,
          }}>
            📷
          </div>
        )}
      </div>
      <p style={{
        fontFamily: 'Permanent Marker, cursive',
        color: '#2a1a0a', fontSize: 9,
        textAlign: 'center', marginTop: 6, lineHeight: 1.4,
        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
      }}>
        {caption.replace(/"/g, '')}
      </p>
    </div>
  )
}
