import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArtistSelect }  from './scenes/ArtistSelect'
import { IncomingCall }  from './scenes/IncomingCall'
import { ConcertStage }  from './scenes/ConcertStage'
import { ConcertCrowd }  from './scenes/ConcertCrowd'
import { VSChoice }      from './scenes/VSChoice'
import { Cafeteria }     from './scenes/Cafeteria'
import { HallwayKiss }   from './scenes/HallwayKiss'
import { DMScene }       from './scenes/DMScene'
import { Outro }         from './scenes/Outro'

type Scene = 'select' | 'incoming' | 'concert' | 'crowd' | 'vs' | 'cafeteria' | 'hallway' | 'dm' | 'outro'

export default function App() {
  const [scene, setScene] = useState<Scene>('select')
  const go = (s: Scene) => setScene(s)

  return (
    <div style={{
      position: 'fixed', inset: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#000',
    }}>
      <div style={{
        position: 'relative',
        width: 'min(390px, 100vw)',
        height: 'min(844px, 100dvh)',
        overflow: 'hidden',
        background: '#050506',
        fontFamily: "'Bricolage Grotesque', -apple-system, sans-serif",
        color: '#fff',
      }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={scene}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32 }}
            style={{ position: 'absolute', inset: 0 }}
          >
            {scene === 'select'    && <ArtistSelect onSelect={() => go('incoming')} />}
            {scene === 'incoming'  && <IncomingCall onAccept={() => go('concert')} onDecline={() => go('concert')} />}
            {scene === 'concert'   && <ConcertStage  onComplete={() => go('crowd')} />}
            {scene === 'crowd'     && <ConcertCrowd  onComplete={() => go('vs')} />}
            {scene === 'vs'        && <VSChoice       onComplete={() => go('cafeteria')} />}
            {scene === 'cafeteria' && <Cafeteria      onComplete={() => go('hallway')} />}
            {scene === 'hallway'   && <HallwayKiss    onComplete={() => go('dm')} />}
            {scene === 'dm'        && <DMScene         onComplete={() => go('outro')} />}
            {scene === 'outro'     && <Outro           onReplay={() => go('select')} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
