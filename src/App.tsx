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

function BookingPage({ next }: { next: () => void }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const target = 20000
    let n = 0
    const t = setInterval(() => { n += 347; if (n >= target) { n = target; clearInterval(t) }; setCount(n) }, 40)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="scene posterScene" onClick={next}>
      <img className="fameBg" src={`${A}stage-back.png`} alt="" style={{ objectPosition: 'center 10%' }} />
      <div className="posterOverlay" />
      <div className="posterNeon" />

      {/* Part 4 badge + hook */}
      <motion.div className="posterHook" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <div className="posterPt4">PART 4</div>
        <p>20,000 fans screaming his name.<br />but he's never felt more alone.</p>
      </motion.div>

      {/* Date block */}
      <motion.div className="posterDate" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
        <span>SAT</span>
        <b>18</b>
        <span>JUL</span>
        <div className="posterDateLine" />
        <small>DOORS 7PM</small>
      </motion.div>

      {/* Big name */}
      <motion.div className="posterName" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 }}>
        <h1>RODDO</h1>
        <em>Live</em>
      </motion.div>

      {/* Genre tags */}
      <motion.div className="posterTags" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
        <span>HIP-HOP</span><i>+</i><span>R&B</span><i>+</i><span>AFROBEATS</span>
      </motion.div>

      {/* Bottom info */}
      <motion.div className="posterBottom" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
        <div className="posterVenue">THE FORUM, LOS ANGELES</div>
        <div className="posterCapacity">
          <b>{count.toLocaleString()}</b><span> / 20,000</span>
        </div>
        <div className="posterPrice">$85 — $250</div>
      </motion.div>

      {/* Sold out stamp */}
      <motion.div className="posterStamp" initial={{ opacity: 0, scale: 1.3, rotate: -22 }} animate={{ opacity: 1, scale: 1, rotate: -18 }} transition={{ delay: 1.2, type: 'spring' }}>
        SOLD OUT
      </motion.div>

      <div className="fameTap">TAP TO CONTINUE {'›'}</div>
    </div>
  )
}

function FlashbackSplit({ next }: { next: () => void }) {
  return (
    <div className="scene flashSplit" onClick={next}>
      <div className="flashLabel">
        <motion.small initial={{ opacity: 0 }} animate={{ opacity: 1 }}>THEN vs NOW</motion.small>
        <motion.h2 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>she only called after<br />the check cleared.</motion.h2>
      </div>
      <div className="flashPanels">
        <motion.div className="flashThen" initial={{ x: -60 }} animate={{ x: 0 }}>
          <img src={`${A}rejection.png`} alt="" />
          <span>BEFORE THE FAME</span>
          <b>she said no</b>
        </motion.div>
        <motion.div initial={{ x: 60 }} animate={{ x: 0 }}>
          <img src={`${A}after-fame.png`} alt="" />
          <span>AFTER THE FAME</span>
          <b>now she calling</b>
        </motion.div>
      </div>
      <LyricPill lines={`"Girl you told me no because I wasn't getting paid"`} />
      <div className="fameTap">TAP TO CONTINUE {'›'}</div>
    </div>
  )
}

function Subscribe({ replay }: { replay: () => void }) {
  return <div className="scene subscribe">
    <div className="subGlow"/>
    <motion.div className="subNotif" initial={{y:-90,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:.3,type:'spring',stiffness:180}}>
      <i>🎵</i><div><b>NGOMA CHARTS</b><p>new story dropping soon 🔥</p></div><small>now</small>
    </motion.div>
    <motion.div className="subCenter" initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{delay:.6}}>
      <small>FOR THE NEXT CHAPTER</small>
      <h1>LIKE &<br/>SUBSCRIBE</h1>
      <div className="subLine"/>
    </motion.div>
    <motion.div className="subActions" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.9}}>
      <button className="subBtn">▶ SUBSCRIBE</button>
      <button className="subReplay" onClick={replay}><span>↻</span> REPLAY STORY</button>
    </motion.div>
  </div>
}

function NameTag({ name, color, x, y, delay }: { name: string; color: string; x: string; y: string; delay: number }) {
  return (
    <motion.div className="nameTag" style={{ left: x, top: y }} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
      <span style={{ background: color }}>{name}</span>
      <i style={{ borderTopColor: color }} />
    </motion.div>
  )
}

function Intro({ next }: { next: () => void }) {
  const [show, setShow] = useState(false)
  useEffect(() => { const t = setTimeout(() => setShow(true), 2400); return () => clearTimeout(t) }, [])
  return (
    <div className="scene intro" onClick={show ? next : undefined}>
      <img className="introBg" src={`${A}intro-hallway.png`} alt="" />
      <div className="introShade" />
      <NameTag name="KAISHA" color="#888" x="12%" y="28%" delay={0.5} />
      <NameTag name="CHLOE" color="#d778b0" x="36%" y="24%" delay={0.9} />
      <NameTag name="RODDO" color="#C8960E" x="60%" y="18%" delay={1.3} />
      <motion.div className="introBadge" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.8 }}>
        PART 4
      </motion.div>
      <motion.p className="introHook" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.1 }}>
        20,000 fans screaming his name.<br />but he's never felt more alone.
      </motion.p>
      {show && <motion.small className="introTap" initial={{ opacity: 0 }} animate={{ opacity: 0.5 }}>tap to start</motion.small>}
    </div>
  )
}

export default function App() {
  const [scene,setScene]=useState(0)
  const next=()=>setScene(s=>Math.min(6,s+1))
  const pages=[
    <BookingPage next={next}/>,
    <ArtistSelect onSelect={next}/>,
    <PhotoScene img={`${A}backstage.png`} next={next} lyric={`"Shey I think I changed, things don't feel the same"`} />,
    <PhotoScene img={`${A}stage-back.png`} next={next} imgPos="center 25%" lyric={`"I don't wanna play no games, since I got this fame, it's been so hard to love again"`} />,
    <PhotoScene img={`${A}kaisha-phone.png`} next={next} imgPos="center 30%" lyric={`"Girl your love is in vain, now you feel the shame"`} />,
    <FlashbackSplit next={next}/>,
    <Subscribe replay={()=>setScene(0)}/>,
  ]
  return <main><div className="phone"><AnimatePresence mode="wait"><motion.div key={scene} className="page" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.32}}>{pages[scene]}</motion.div></AnimatePresence></div></main>
}
