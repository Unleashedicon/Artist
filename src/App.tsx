import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArtistSelect } from './scenes/ArtistSelect'

const A = '/story/'
const lyrics = [
  '',
  `"DJ, run it back, play my song in this bitch"`,
  `"Vibin' like I'm alone in this bitch"`,
  `"Tit-for-tat, I got your back, was I wrong for that shit?"`,
  `"Tell me, is we too grown for that shit?"`,
  `"I wanna lock it in, baby, no weighin' my options"`,
  `"Wanna travel, see the world, gettin' drunk on an island"`,
  `"Wanna settle, start a family, so tell me about it"`,
  `"And you so perfect, baby, don't give nobody that body"`,
]

function Status({ dark = false }: { dark?: boolean }) {
  return <div className={`status ${dark ? 'dark' : ''}`}><b>9:41</b><span>▮▮▮  Wi‑Fi  ▰</span></div>
}

function Tap({ onClick, final = false }: { onClick: () => void; final?: boolean }) {
  return <button className="tap" onClick={onClick}>{final ? 'REPLAY STORY' : 'TAP TO CONTINUE'} <span>›</span></button>
}

function Lyric({ n }: { n: number }) {
  return <motion.div className="lyric" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .35 }}>
    <div className="wave">{[1,2,3,4,5,6,7,8].map(i => <i key={i} style={{ animationDelay: `${i * .09}s` }} />)}</div>
    <small>RODDO · TALKING</small><p>{lyrics[n]}</p>
  </motion.div>
}

type IconName = 'airplane' | 'wifi' | 'bluetooth' | 'signal' | 'sun' | 'volume' | 'moon' | 'play' | 'pause' | 'back' | 'next' | 'heart'
function Icon({ name, size = 22 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    airplane: <path d="M21.5 15.5 13.4 12V5.2c0-1.2-.6-3.2-1.4-3.2s-1.4 2-1.4 3.2V12l-8.1 3.5v1.8l8.1-1.5v4.5l-2.2 1.4V23l3.6-.7 3.6.7v-1.3l-2.2-1.4v-4.5l8.1 1.5Z"/>,
    wifi: <><path d="M2 8.5a16 16 0 0 1 20 0M5.5 12a11 11 0 0 1 13 0M9 15.5a6 6 0 0 1 6 0"/><circle cx="12" cy="20" r="1"/></>,
    bluetooth: <path d="m7 7 10 10-5 5V2l5 5L7 17"/>,
    signal: <><path d="M4 20v-3M9 20v-7M14 20V9M19 20V5"/></>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></>,
    volume: <><path d="M5 9H2v6h3l5 4V5L5 9Z"/><path d="M14 9a5 5 0 0 1 0 6M17 6a9 9 0 0 1 0 12"/></>,
    moon: <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5 9 9 0 1 0 20.5 14.2Z"/>,
    play: <path d="m8 5 11 7-11 7Z"/>,
    pause: <><path d="M8 5v14M16 5v14"/></>,
    back: <><path d="m11 18-6-6 6-6M19 18l-6-6 6-6"/></>,
    next: <><path d="m5 18 6-6-6-6M13 18l6-6-6-6"/></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>,
  }
  return <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>
}

function Player({ next }: { next: () => void }) {
  const [playing, setPlaying] = useState(true)
  return <div className="scene player">
    <Status/><div className="playerGlow"/>
    <div className="now">NOW PLAYING <span>•••</span></div>
    <motion.div className="cover" animate={{ y: [0,-4,0] }} transition={{ repeat: Infinity, duration: 5 }}>
      <img src={`${A}last-lap.jpg`} alt="Rod Wave — Last Lap"/>
    </motion.div>
    <div className="song"><div><h2>25</h2><p>Rod Wave · Last Lap</p></div><button aria-label="Favorite"><Icon name="heart"/></button></div>
    <div className="progress"><i/><div><span>0:25</span><span>-2:54</span></div></div>
    <div className="controls"><span>↝</span><b><Icon name="back"/></b><button onClick={() => setPlaying(!playing)} aria-label={playing ? 'Pause' : 'Play'}><Icon name={playing ? 'pause' : 'play'} size={25}/></button><b><Icon name="next"/></b><span>∞</span></div>
    <Lyric n={1}/><Tap onClick={next}/>
  </div>
}

function Focus({ next }: { next: () => void }) {
  const [on, setOn] = useState(false)
  useEffect(() => { const t = setTimeout(() => setOn(true), 1400); return () => clearTimeout(t) }, [])
  return <div className="scene focusScene">
    <img className="focusBg" src={`${A}wallpaper.png`}/><Status/>
    <motion.div className="control" initial={{ y: '-100%' }} animate={{ y: 0 }} transition={{ duration: 1.15, ease: [.2,.8,.2,1] }}>
      <div className="controlGrab"/>
      <div className="controlTop">
        <div className="connectTile"><button><Icon name="airplane"/></button><button className="blue"><Icon name="signal"/></button><button className="blue"><Icon name="wifi"/></button><button className="blue"><Icon name="bluetooth"/></button></div>
        <div className="miniPlayer"><img src={`${A}last-lap.jpg`}/><div><small>OUR SONG</small><b>25</b><p>Rod Wave</p></div><span><Icon name="pause"/><Icon name="next"/></span></div>
      </div>
      <div className="controlGrid"><div className="slider"><i/><Icon name="sun"/></div><div className="slider volume"><i/><Icon name="volume"/></div></div>
      <motion.div className={`dnd ${on ? 'on' : ''}`} animate={on ? { scale: [1,1.025,1] } : {}}><i><Icon name="moon"/></i><div><b>Do Not Disturb</b><small>{on ? 'On' : 'Tap to focus'}</small></div><span className="switch"><em/></span></motion.div>
    </motion.div>
    <Lyric n={2}/><Tap onClick={next}/>
  </div>
}

function Split({ next }: { next: () => void }) {
  return <div className="scene split"><Status/>
    <div className="splitHead"><small>THEN / NOW</small><h2>Some memories<br/>don't match.</h2></div>
    <div className="splitPhotos">
      <motion.div initial={{ x: -80 }} animate={{ x: 0 }}><img src={`${A}whisper.png`}/><span>RODDO + KAISHA</span><b>the way it was</b></motion.div>
      <motion.div initial={{ x: 80 }} animate={{ x: 0 }}><img src={`${A}betrayal.png`}/><span>KAISHA + DEMARCUS</span><b>the moment it changed</b></motion.div>
    </div><Lyric n={3}/><Tap onClick={next}/>
  </div>
}

function Keyboard({ deleting = false }: { deleting?: boolean }) {
  const r1 = 'qwertyuiop'.split('')
  const r2 = 'asdfghjkl'.split('')
  const r3 = 'zxcvbnm'.split('')
  return (
    <div className="iosKeyboard">
      <div className="keyRow">{r1.map(k => <div className="key" key={k}>{k}</div>)}</div>
      <div className="keyRow">{r2.map(k => <div className="key" key={k}>{k}</div>)}</div>
      <div className="keyRow">
        <div className="key wide">{'⇧'}</div>
        {r3.map(k => <div className="key" key={k}>{k}</div>)}
        <div className={`key wide${deleting ? ' deleting' : ''}`}>{'⌫'}</div>
      </div>
      <div className="keyRow">
        <div className="key wide">123</div>
        <div className="key wide">{'😊'}</div>
        <div className="key space">space</div>
        <div className="key ret">return</div>
      </div>
    </div>
  )
}

function Message({ next }: { next: () => void }) {
  const [phase, setPhase] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const shortText = `I miss us too…`

  useEffect(() => {
    const a = setTimeout(() => setPhase(1), 900)
    const b = setTimeout(() => setPhase(2), 2500)
    return () => { clearTimeout(a); clearTimeout(b) }
  }, [])

  useEffect(() => {
    if (phase !== 2) return
    let idx = shortText.length
    setCharIdx(idx)
    const t = setInterval(() => {
      idx--
      setCharIdx(idx)
      if (idx <= 0) { clearInterval(t); setPhase(3) }
    }, 75)
    return () => clearInterval(t)
  }, [phase])

  let draft = ''
  if (phase === 0) draft = `I miss us too, but I can’t—`
  else if (phase === 1) draft = shortText
  else if (phase === 2) draft = shortText.slice(0, charIdx)

  const deleting = phase === 2

  return (
    <div className="scene message">
      <Status />
      <div className="chatTop">
        <span>{'‹'}</span>
        <div className="kaishaAv">K</div>
        <b>Kaisha</b>
        <small>mobile</small>
      </div>
      <div className="day">TODAY 10:42 PM</div>
      <div className="bubble">I miss us.</div>
      <div className="typing">{draft}<i>{phase < 3 && '|'}</i></div>
      {phase === 3 && <motion.small className="deleted" initial={{opacity:0}} animate={{opacity:1}}>Draft deleted</motion.small>}
      <Lyric n={4} />
      <Tap onClick={next} />
      <Keyboard deleting={deleting} />
    </div>
  )
}

function Contacts({ next }: { next: () => void }) {
  const [open, setOpen] = useState(false)
  useEffect(()=>{const t=setTimeout(()=>setOpen(true),1200);return()=>clearTimeout(t)},[])
  return <div className="scene contacts"><img className="chatWall" src={`${A}chloe-roddo.png`}/><div className="wallTint"/><Status/>
    <div className="inboxHead"><small>MESSAGES</small><h1>People</h1><button>＋</button></div>
    <motion.div className="threadList" animate={open ? { y: '-105%' } : { y: 0 }} transition={{duration:.8}}>
      {[['Manager 🎙️','Studio moved to 11 tomorrow.'],['Chloe ❤️','Made it home. Call me?'],['Kaisha','I miss us.'],['Trey','That second verse is crazy.'],['Mom','Proud of you always.']].map((x,i)=><div className="thread" key={x[0]}><i>{x[0][0]}</i><div><b>{x[0]}</b><p>{x[1]}</p></div><span>{i+8}:4{i}</span></div>)}
    </motion.div>
    <AnimatePresence>{open && <motion.div className="chloeChat" initial={{y:'100%'}} animate={{y:0}}><div className="chatName"><span>‹</span><div>❤️</div><b>Chloe</b><small>our song</small></div><div className="photoBubble"><img src={`${A}chloe-roddo-autumn.png`}/><span>Always us.</span></div></motion.div>}</AnimatePresence>
    <Lyric n={5}/><Tap onClick={next}/>
  </div>
}

function Gallery({ next }: { next: () => void }) {
  const pics=[['passports.png','TOUCHDOWN','JUL 24'],['sunset.png','GOLDEN HOUR','JUST US'],['drinks.png','ISLAND NIGHTS','11:48 PM']]
  return <div className="scene gallery"><Status/><div className="galleryHead"><span>‹ Albums</span><h2>Us, lately</h2><small>36 PHOTOS · 3 FAVORITES</small></div>
    <motion.div className="film" animate={{x:[0,-535]}} transition={{duration:7,repeat:Infinity,repeatType:'reverse',ease:'easeInOut'}}>
      {pics.map((p,i)=><figure key={p[0]}><img src={A+p[0]}/><figcaption><b>{p[1]}</b><small>{p[2]}</small></figcaption><i>0{i+1}</i></figure>)}
    </motion.div><div className="dots">●　○　○</div><Lyric n={6}/><Tap onClick={next}/>
  </div>
}

function Future({ next }: { next: () => void }) {
  const milestones = [
    { img: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=200&h=200&fit=crop&q=80', label: 'A place of our own', date: 'NEXT' },
    { img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=200&h=200&fit=crop&q=80', label: 'Make it forever', date: 'ONE DAY' },
    { img: 'https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=200&h=200&fit=crop&q=80', label: 'Start our family', date: 'SOMEDAY' },
  ]
  return <div className="scene future"><Status/>
    <div className="futureHero"><img src={`${A}chloe-roddo-autumn.png`} alt="Roddo and Chloe together"/><div className="futureFade"/>
      <motion.div className="futureStamp" initial={{opacity:0,scale:.85,rotate:-8}} animate={{opacity:1,scale:1,rotate:-5}} transition={{delay:.45,type:'spring'}}>
        <small>THE NEXT CHAPTER</small><b>Us, for real.</b>
      </motion.div>
    </div>
    <div className="futurePlan"><small>RODDO'S NOTES · PRIVATE</small><h2>Things I see with you</h2>
      <div className="milestones">{milestones.map((m,i)=><motion.div key={m.label} initial={{opacity:0,x:28}} animate={{opacity:1,x:0}} transition={{delay:.55+i*.18}}>
        <i><img src={m.img} alt={m.label}/></i><span><b>{m.label}</b><small>{m.date}</small></span>{i < 2 && <em/>}
      </motion.div>)}</div>
    </div>
    <Lyric n={7}/><Tap onClick={next}/>
  </div>
}

function Lock({ next }: { next: () => void }) {
  const [gone,setGone]=useState(false)
  useEffect(()=>{const t=setTimeout(()=>setGone(true),1800);return()=>clearTimeout(t)},[])
  return <div className="scene lock"><img src={`${A}wallpaper.png`} className="lockBg"/><div className="lockShade"/><Status/><div className="lockTime"><small>Sunday, June 28</small><b>9:41</b></div>
    <AnimatePresence>{!gone && <motion.div className="notification" initial={{y:-80,opacity:0}} animate={{y:0,opacity:1}} exit={{x:440,opacity:0,rotate:3}} transition={{duration:.55}} onClick={()=>setGone(true)}>
      <i>K</i><div><b>MESSAGES <span>now</span></b><strong>Kaisha</strong><p>I miss us.</p></div><small>›</small>
    </motion.div>}</AnimatePresence>
    {gone && <motion.div className="quiet" initial={{opacity:0}} animate={{opacity:1}}>☾ Do Not Disturb</motion.div>}
    <Lyric n={8}/><Tap onClick={next}/>
  </div>
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
        PART 3
      </motion.div>
      <motion.p className="introHook" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.1 }}>
        she's still texting.<br />he's not replying anymore.
      </motion.p>
      {show && <motion.small className="introTap" initial={{ opacity: 0 }} animate={{ opacity: 0.5 }}>tap to start</motion.small>}
    </div>
  )
}

export default function App() {
  const [scene,setScene]=useState(0)
  const next=()=>setScene(s=>Math.min(10,s+1))
  const pages=[<Intro next={next}/>,<ArtistSelect onSelect={next}/>,<Player next={next}/>,<Focus next={next}/>,<Split next={next}/>,<Message next={next}/>,<Contacts next={next}/>,<Gallery next={next}/>,<Future next={next}/>,<Lock next={next}/>,<Subscribe replay={()=>setScene(0)}/>]
  return <main><div className="phone"><AnimatePresence mode="wait"><motion.div key={scene} className="page" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.32}}>{pages[scene]}</motion.div></AnimatePresence></div></main>
}
