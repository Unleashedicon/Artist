import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArtistSelect } from './scenes/ArtistSelect'

const A = '/story/'
const PG_IMG = 'https://lastfm.freetls.fastly.net/i/u/300x300/474060c6674da147db0cf18a0eb0292e.jpg'

function LyricPill({ lines, delay = 0.1 }: { lines: string; delay?: number }) {
  return (
    <motion.div className="lyric" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
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
  useEffect(() => { const t = setTimeout(() => setReady(true), 2500); return () => clearTimeout(t) }, [])
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
      {/* Lyric — no delay */}
      <LyricPill lines="I remember when I joined the club" delay={0} />
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
        style={{ filter: on ? 'drop-shadow(0 0 10px #FFB347aa)' : 'none', transition: 'fill 0.2s, filter 0.2s' }}
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
      setTimeout(() => setPhase(1), 400),
      setTimeout(() => setPhase(2), 800),
      setTimeout(() => setPhase(3), 1600),
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
          transition: phase === 3 ? 'clip-path 1.0s cubic-bezier(0.2,0,0.4,1)'
            : phase === 2 ? 'clip-path 0.25s ease-out'
            : 'none',
        }}
      />
      {isOn && <div className="fameShade" style={{ opacity: isRevealed ? 1 : 0.3, transition: 'opacity 1s' }} />}
      <div className="fameGrain" />
      <div className={`bulbFixture${phase === 1 ? ' flicker' : ''}${isRevealed ? ' hide' : ''}`}>
        <BulbSVG on={isOn} />
        {isOn && <div className="bulbHalo" />}
      </div>
      {isRevealed && (
        <>
          <LyricPill lines={`"it's always tough for new players to come in."`} />
          <div className="fameTap">TAP TO CONTINUE {'›'}</div>
        </>
      )}
    </div>
  )
}

/* ── Scene 4: DM scene ── */
const KEY_ROWS = [
  ['q','w','e','r','t','y','u','i','o','p'],
  ['a','s','d','f','g','h','j','k','l'],
  ['z','x','c','v','b','n','m'],
]

function charToKey(c: string): string {
  if (c === ' ') return 'space'
  if (c.charCodeAt(0) > 127) return '' // emoji / non-ascii
  return c.toLowerCase()
}

function DMScene({ next }: { next: () => void }) {
  const [step, setStep] = useState(0)
  const [typed, setTyped] = useState('')
  const [pressedKey, setPressedKey] = useState<string | null>(null)
  const [sendActive, setSendActive] = useState(false)
  const fullText = 'real ones 💛'

  // Main progression
  useEffect(() => {
    const ts = [
      setTimeout(() => setStep(1), 900),
      setTimeout(() => setStep(2), 2700),
      setTimeout(() => setStep(3), 3800),
    ]
    return () => ts.forEach(clearTimeout)
  }, [])

  // Key-by-key typing with highlights
  useEffect(() => {
    if (step !== 3) return
    setTyped('')
    setPressedKey(null)
    setSendActive(false)
    const chars = [...fullText]
    let i = 0

    function typeNext() {
      if (i >= chars.length) {
        // Done typing — flash send button then send
        setTimeout(() => {
          setSendActive(true)
          setTimeout(() => { setSendActive(false); setStep(4) }, 320)
        }, 150)
        return
      }
      const key = charToKey(chars[i])
      setPressedKey(key || null)
      setTimeout(() => {
        setTyped(chars.slice(0, i + 1).join(''))
        setPressedKey(null)
        i++
        setTimeout(typeNext, 55)
      }, 85)
    }

    const t = setTimeout(typeNext, 280)
    return () => clearTimeout(t)
  }, [step])

  const InputRow = ({ active }: { active: boolean }) => (
    <>
      <div className="dmIconBtn">
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none"><path d="M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4zM9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" fill="rgba(255,255,255,.55)"/></svg>
      </div>
      <div className="dmIconBtn">
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none"><path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z" fill="rgba(255,255,255,.55)"/></svg>
      </div>
      <div className="dmInput">
        {active ? (typed || <span className="dmPlaceholder">iMessage</span>) : <span className="dmPlaceholder">iMessage</span>}
        {active && !sendActive && <span className="dmCursor">|</span>}
      </div>
      {active && typed ? (
        <div className={`dmSendBtn${sendActive ? ' active' : ''}`}>↑</div>
      ) : (
        <div className="dmMicBtn">
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V5zm6 6c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" fill="rgba(255,255,255,.55)"/></svg>
        </div>
      )}
    </>
  )

  return (
    <div className="scene dmScene" onClick={step >= 4 ? next : undefined}>

      {/* Header — dark iMessage style */}
      <div className="dmHead">
        <span className="dmBack">‹</span>
        <div className="dmHeadCenter">
          <div className="dmAv"><img src={PG_IMG} alt="PG" /></div>
          <div className="dmHeadName">Polo G <span className="dmChev">›</span></div>
        </div>
        <div className="dmCallBtns">
          <span className="dmCallIcon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" fill="#0a84ff"/></svg>
          </span>
          <span className="dmCallIcon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.28-.28.67-.36 1.02-.25 1.12.37 2.32.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.26.2 2.45.57 3.57.1.35.02.74-.25 1.02l-2.2 2.2z" fill="#0a84ff"/></svg>
          </span>
        </div>
      </div>

      {/* Messages */}
      <div className="dmBody" style={{
        paddingBottom: step === 3 ? '322px' : step === 2 ? '78px' : '20px',
        transition: 'padding-bottom 0.3s',
      }}>
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
        {step >= 4 && (
          <motion.div
            className="dmBubble dmOut"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          >
            real ones 💛
          </motion.div>
        )}
        {step >= 4 && (
          <motion.div className="dmDelivered" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            Delivered
          </motion.div>
        )}
        {/* Lyric — visible from scene start, pinned to bottom */}
        <motion.div className="dmLyric" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0 }}>
          <div className="wave">{[1,2,3,4,5,6,7,8].map(i => <i key={i} style={{ animationDelay: `${i * .09}s` }} />)}</div>
          <small>RODDO · TALKING</small>
          <p>"And then he messaged me straight away"</p>
        </motion.div>
      </div>

      {/* Step 2: standalone input bar at bottom (before keyboard) */}
      {step === 2 && (
        <div className="dmInputFixed">
          <InputRow active={false} />
        </div>
      )}

      {/* Step 3: input bar + app row + keyboard slide up as ONE unit */}
      <AnimatePresence>
        {step === 3 && (
          <motion.div
            className="dmKeyboardSlide"
            initial={{ y: 260 }}
            animate={{ y: 0 }}
            exit={{ y: 260 }}
            transition={{ type: 'spring', stiffness: 340, damping: 34 }}
          >
            {/* Input bar at top of sliding unit */}
            <div className="dmInputBar">
              <InputRow active={true} />
            </div>
            {/* App shortcuts strip */}
            <div className="keyAppRow">
              {['📷','🏪','💳','🎭','🎵','🌐','⋯'].map((icon, i) => (
                <div key={i} className="keyAppIcon">{icon}</div>
              ))}
            </div>
            <div className="iosKeyboard">
              <div className="keyRow">
                {KEY_ROWS[0].map(k => (
                  <div key={k} className={`key${pressedKey === k ? ' pressing' : ''}`}>{k}</div>
                ))}
              </div>
              <div className="keyRow">
                {KEY_ROWS[1].map(k => (
                  <div key={k} className={`key${pressedKey === k ? ' pressing' : ''}`}>{k}</div>
                ))}
              </div>
              <div className="keyRow">
                <div className="key wide">⇧</div>
                {KEY_ROWS[2].map(k => (
                  <div key={k} className={`key${pressedKey === k ? ' pressing' : ''}`}>{k}</div>
                ))}
                <div className="key wide">⌫</div>
              </div>
              <div className="keyRow">
                <div className="key wide">123</div>
                <div className={`key space${pressedKey === 'space' ? ' pressing' : ''}`}>space</div>
                <div className="key ret">return</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {step >= 4 && <div className="fameTap">TAP TO CONTINUE {'›'}</div>}
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
        <button className="subReplay" onClick={(e) => { e.stopPropagation(); replay() }}>
          <span>↻</span>
        </button>
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
