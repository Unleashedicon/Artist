import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ARTISTS = [
  { id: 'roddo',  name: 'Polo G', tag: 'Chicago · Drill', img: 'https://lastfm.freetls.fastly.net/i/u/300x300/474060c6674da147db0cf18a0eb0292e.jpg', fallback: 'PG',  color: '#C8960E', real: true,  tilt: -3 },
  { id: 'travis', name: 'Travis Scott', tag: 'Houston · Rap',     img: 'https://i.scdn.co/image/ab6761610000517419c2790744c792d05570bb71', fallback: 'TS',  color: '#8844FF', real: false, tilt:  2 },
  { id: 'weeknd', name: 'The Weeknd',   tag: 'Toronto · R&B',     img: 'https://i.scdn.co/image/ab67616100005174c1719ac9e6a75c1c25835018', fallback: 'XO',  color: '#CC2244', real: false, tilt: -2 },
  { id: 'drake',  name: 'Drake',        tag: 'Toronto · Hip-Hop', img: 'https://i.scdn.co/image/ab676161000051744293385d324db8558179afd9', fallback: 'OVO', color: '#2255AA', real: false, tilt:  3 },
]

interface Props { onSelect: () => void }

export function ArtistSelect({ onSelect }: Props) {
  const [peeling, setPeeling] = useState(false)

  const handleRoddo = () => {
    if (peeling) return
    setPeeling(true)
    setTimeout(onSelect, 900)
  }

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: 'clamp(14px,3vh,24px) 16px', overflow: 'hidden' }}>

      {/* Background concert photo */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1600&h=1000&fit=crop&q=80&auto=format"
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', filter: 'blur(3px) brightness(0.32) saturate(0.7)', transform: 'scale(1.06)' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(5,0,12,0.78) 0%, rgba(10,5,0,0.82) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 90% 70% at 50% 50%, transparent 40%, rgba(0,0,0,0.7) 100%)' }} />
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: 'clamp(12px,2vh,24px)' }}
        >
          <p style={{ color: '#C8960E', fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: 6, fontWeight: 700 }}>
            NGOMA CHARTS · STORIES
          </p>
          <h1 style={{ color: '#F0EDE8', fontSize: 'clamp(1.2rem, 4.5vw, 2rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 4 }}>
            Choose an Artist
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12 }}>Tap Polo G to start the story</p>
        </motion.div>

        {/* Polaroid grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(130px, 155px))', gap: 'clamp(10px, 3vw, 20px)' }}>
          {ARTISTS.map((artist, i) => (
            <motion.div
              key={artist.id}
              initial={{ opacity: 0, y: 40, rotate: artist.tilt }}
              animate={{ opacity: 1, y: 0, rotate: artist.tilt }}
              transition={{ delay: i * 0.1 + 0.2, type: 'spring', stiffness: 220 }}
            >
              {artist.real ? (
                <AnimatePresence>
                  {!peeling && (
                    <motion.div
                      exit={{ y: -700, x: 30, rotate: -20, scale: 0.4, opacity: 0 }}
                      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                      whileHover={{ y: -14, rotate: 0, scale: 1.05, transition: { duration: 0.2 } }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleRoddo}
                      style={{ cursor: 'pointer' }}
                    >
                      <PolaroidCard artist={artist} active />
                    </motion.div>
                  )}
                </AnimatePresence>
              ) : (
                <motion.div style={{ cursor: 'not-allowed', opacity: 0.38 }} whileHover={{ y: -6, transition: { duration: 0.2 } }}>
                  <PolaroidCard artist={artist} active={false} />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
          style={{ color: 'rgba(255,255,255,0.15)', fontSize: 10, marginTop: 'clamp(8px,1.5vh,20px)', letterSpacing: '0.25em', textTransform: 'uppercase' }}>
          More artists dropping soon
        </motion.p>
      </div>

      {/* Voiceover lyric — immediate */}
      <motion.div className="lyric" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0, duration: 0.4 }}>
        <div className="wave">
          {[1,2,3,4,5,6,7,8].map(i => <i key={i} style={{ animationDelay: `${i * .09}s` }} />)}
        </div>
        <small>RODDO · TALKING</small>
        <p>you know</p>
      </motion.div>
    </div>
  )
}

function PolaroidCard({ artist, active }: { artist: typeof ARTISTS[0]; active: boolean }) {
  const [imgErr, setImgErr] = useState(false)

  return (
    <div style={{
      background: '#F5F0E8', borderRadius: 3, padding: '8px 8px 22px',
      boxShadow: active ? '0 10px 40px rgba(0,0,0,0.7), 0 2px 8px rgba(0,0,0,0.5)' : '0 4px 16px rgba(0,0,0,0.5)',
      position: 'relative',
    }}>
      {/* Tape */}
      <div style={{ position: 'absolute', top: -10, right: 16, width: 38, height: 18, background: 'rgba(255,253,230,0.75)', borderRadius: 2, transform: 'rotate(4deg)', boxShadow: '0 1px 3px rgba(0,0,0,0.18)' }} />

      {/* Gold glow border for Roddo */}
      {active && <div style={{ position: 'absolute', inset: -1, borderRadius: 3, boxShadow: `0 0 0 2px ${artist.color}66` }} />}

      {/* Photo */}
      <div style={{ width: '100%', aspectRatio: '1/1', background: '#111', borderRadius: 2, overflow: 'hidden', position: 'relative' }}>
        {!imgErr ? (
          <img src={artist.img} alt={artist.name} onError={() => setImgErr(true)} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', background: `linear-gradient(135deg, #1a1a1a, #0a0a0a)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: artist.color, fontSize: 28, fontWeight: 900, fontFamily: 'Permanent Marker, cursive' }}>
            {artist.fallback}
          </div>
        )}
        {!active && (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🔒</div>
        )}
      </div>

      {/* Name */}
      <p style={{ textAlign: 'center', marginTop: 10, fontFamily: 'Permanent Marker, cursive', fontSize: active ? 14 : 12, color: '#1a1a1a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {artist.name}
      </p>
      <p style={{ textAlign: 'center', fontSize: 9, marginTop: 2, color: active ? artist.color : '#aaa', letterSpacing: '0.08em' }}>
        {active ? '▶ TAP TO START' : artist.tag}
      </p>
    </div>
  )
}
