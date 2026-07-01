import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArtistSelect } from './scenes/ArtistSelect'

const A = '/story/'

function LyricPill({ lines }: { lines: string }) {
  return (
    <motion.div className="lyric" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
      <div className="wave">{[1,2,3,4,5,6,7,8].map(i => <i key={i} style={{ animationDelay: `${i * .09}s` }} />)}</div>
      <small>RODDO · TALKING</small>
      <p dangerouslySetInnerHTML={{ __html: lines }} />
    </motion.div>
  )
}

function PhotoScene({ img, lyric, next, imgPos }: { img: string; lyric: string; next: () => void; imgPos?: string }) {
  return (
    <div className="scene fameScene" onClick={next}>
      <img className="fameBg" src={img} alt="" style={imgPos ? { objectPosition: imgPos } : undefined} />
      <div className="fameShade" />
      <div className="fameGrain" />
      <LyricPill lines={lyric} />
      <div className="fameTap">TAP TO CONTINUE {'›'}</div>
    </div>
  )
}

/* ── Scene 0: Part 5 intro card ── */
function Pt5Intro({ next }: { next: () => void }) {
  const [ready, setReady] = useState(false)
  useEffect(() => { const t = setTimeout(() => setReady(true), 2200); return () => clearTimeout(t) }, [])
  return (
    <div className="scene pt5intro" onClick={ready ? next : undefined}>
      <img className="fameBg" src={`${A}intro-bg.png`} alt="" style={{ objectPosition: 'center 20%' }} />
      <div className="pt5overlay" />
      <motion.div className="pt5badge" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        PART 5
      </motion.div>
      <motion.div className="pt5title" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
        BETTER DAYS
      </motion.div>
      <motion.p className="pt5hook" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
        some connections<br />change everything.
      </motion.p>
      <motion.small className="pt5credit" initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ delay: 1.5 }}>
        POLO G · BETTER DAYS
      </motion.small>
      {ready && (
        <motion.small className="introTap" initial={{ opacity: 0 }} animate={{ opacity: 0.5 }}>
          tap to start
        </motion.small>
      )}
    </div>
  )
}

/* ── Scene 2: Bulb lamp reveal ── */
function BulbSVG({ on }: { on: boolean }) {
  return (
    <svg width="30" height="44" viewBox="0 0 30 44" fill="none">
      <rect x="10" y="34" width="10" height="7" rx="2" fill="#3a3a3a" />
      <line x1="10" y1="36.5" x2="20" y2="36.5" stroke="#555" strokeWidth="1" />
      <line x1="10" y1="39" x2="20" y2="39" stroke="#555" strokeWidth="1" />
      <path
        d="M4 15Q4 2 15 2Q26 2 26 15Q26 26 21 33L9 33Q4 26 4 15Z"
        fill={on ? '#FFE080' : '#1c1c1c'}
        style={{ filter: on ? 'drop-shadow(0 0 10px #FFB347aa)' : 'none', transition: 'fill 0.3s, filter 0.3s' }}
      />
      {on && (
        <path d="M11 27L13 20L15 24L17 18L19 22"
          stroke="#fff" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  )
}

function BulbScene({ next }: { next: () => void }) {
  const [phase, setPhase] = useState<0 | 1 | 2 | 3>(0)
  useEffect(() => {
    const ts = [
      setTimeout(() => setPhase(1), 700),
      setTimeout(() => setPhase(2), 1350),
      setTimeout(() => setPhase(3), 2600),
    ]
    return () => ts.forEach(clearTimeout)
  }, [])
  const isOn = phase >= 2
  const isRevealed = phase === 3
  return (
    <div className="scene bulbScene" onClick={isRevealed ? next : undefined}>
      <img
        className="fameBg"
        src={`${A}studio-entrance.png`}
        alt=""
        style={{
          objectPosition: 'center 20%',
          clipPath: phase === 3 ? 'circle(200vmax at 50% 10%)'
            : phase === 2 ? 'circle(28px at 50% 10%)'
            : 'circle(0px at 50% 10%)',
          transition: phase === 3 ? 'clip-path 1.5s cubic-bezier(0.2,0,0.4,1)'
            : phase === 2 ? 'clip-path 0.4s ease-out'
            : 'none',
        }}
      />
      {isOn && <div className="fameShade" style={{ opacity: isRevealed ? 1 : 0.3, transition: 'opacity 1.2s' }} />}
      <div className="fameGrain" />
      <div className={`bulbFixture${phase === 1 ? ' flicker' : ''}${isRevealed ? ' hide' : ''}`}>
        <BulbSVG on={isOn} />
        {isOn && <div className="bulbHalo" />}
      </div>
      {isRevealed && (
        <>
          <LyricPill lines={`"I remember when I joined the club..."`} />
          <div className="fameTap">TAP TO CONTINUE {'›'}</div>
        </>
      )}
    </div>
  )
}

/* ── Scene 4: DM scene ── */
function DMScene({ next }: { next: () => void }) {
  const [step, setStep] = useState(0)
  useEffect(() => {
    const ts = [
      setTimeout(() => setStep(1), 900),
      setTimeout(() => setStep(2), 2700),
      setTimeout(() => setStep(3), 4100),
    ]
    return () => ts.forEach(clearTimeout)
  }, [])
  return (
    <div className="scene dmScene" onClick={step >= 2 ? next : undefined}>
      <div className="dmHead">
        <span>‹</span>
        <div className="dmHeadInfo">
          <div className="dmAv">PG</div>
          <b>Polo G</b>
          <small>Chicago · Drill</small>
        </div>
      </div>
      <div className="dmBody">
        {step === 1 && (
          <motion.div className="dmTyping" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <span /><span /><span />
          </motion.div>
        )}
        {step >= 2 && (
          <motion.div className="dmBubble dmIn" initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }}>
            Aye bro, heard your tape.<br />Welcome to the game. 🤝
          </motion.div>
        )}
        {step >= 3 && (
          <motion.div className="dmBubble dmOut" initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }}>
            real ones 💛
          </motion.div>
        )}
      </div>
      {step >= 2 && <LyricPill lines={`"And then he messaged me straight away"`} />}
      {step >= 2 && <div className="fameTap">TAP TO CONTINUE {'›'}</div>}
    </div>
  )
}

/* ── Scene 7: Enough Said ── */
function EnoughSaid({ next }: { next: () => void }) {
  return (
    <div className="scene enoughScene" onClick={next}>
      <motion.div className="enoughText" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.9 }}>
        ENOUGH<br />SAID.
      </motion.div>
      <motion.div className="enoughLine" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.2, duration: 0.7 }} />
      <motion.small className="enoughSub" initial={{ opacity: 0 }} animate={{ opacity: 0.38 }} transition={{ delay: 1.8 }}>
        TAP TO CONTINUE
      </motion.small>
    </div>
  )
}

/* ── Subscribe ── */
function Subscribe({ replay }: { replay: () => void }) {
  return (
    <div className="scene subscribe">
      <div className="subGlow" />
      <motion.div className="subNotif" initial={{ y: -90, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: .3, type: 'spring', stiffness: 180 }}>
        <i>🎵</i><div><b>NGOMA CHARTS</b><p>new story dropping soon 🔥</p></div><small>now</small>
      </motion.div>
      <motion.div className="subCenter" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .6 }}>
        <small>FOR THE NEXT CHAPTER</small>
        <h1>LIKE &<br />SUBSCRIBE</h1>
        <div className="subLine" />
      </motion.div>
      <motion.div className="subActions" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .9 }}>
        <button className="subBtn">▶ SUBSCRIBE</button>
        <button className="subReplay" onClick={replay}><span>↻</span></button>
      </motion.div>
    </div>
  )
}

export default function App() {
  const [scene, setScene] = useState(0)
  const next = () => setScene(s => Math.min(8, s + 1))
  const pages = [
    <Pt5Intro next={next} />,
    <ArtistSelect onSelect={next} />,
    <BulbScene next={next} />,
    <PhotoScene img={`${A}studio-hallway.png`} next={next} imgPos="center 30%"
      lyric={`"I'm, like, very shy."`} />,
    <DMScene next={next} />,
    <PhotoScene img={`${A}studio-bond.png`} next={next} imgPos="center 25%"
      lyric={`"I think from that moment I just knew that he was going to help me out."`} />,
    <PhotoScene img={`${A}rooftop-city.png`} next={next} imgPos="center 30%"
      lyric={`"He's always got an open ear about everything."`} />,
    <EnoughSaid next={next} />,
    <Subscribe replay={() => setScene(0)} />,
  ]
  return (
    <main>
      <div className="phone">
        <AnimatePresence mode="wait">
          <motion.div key={scene} className="page"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: .32 }}>
            {pages[scene]}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  )
}
