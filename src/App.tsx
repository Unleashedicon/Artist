import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArtistSelect } from './scenes/ArtistSelect'
import { IncomingCall } from './scenes/IncomingCall'
import { OutgoingCall } from './scenes/OutgoingCall'
import { MsJackson }   from './scenes/MsJackson'
import { Chorus }       from './scenes/Chorus'

type Scene = 'select' | 'incoming' | 'outgoing' | 'jackson' | 'chorus'

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
            {scene === 'select'   && <ArtistSelect onSelect={()     => go('incoming')} />}
            {scene === 'incoming' && <IncomingCall onAccept={()     => go('outgoing')} onDecline={() => go('outgoing')} />}
            {scene === 'outgoing' && <OutgoingCall onHangUp={()     => go('jackson')} />}
            {scene === 'jackson'  && <MsJackson   onComplete={()   => go('chorus')} />}
            {scene === 'chorus'   && <Chorus       onReplay={()     => go('select')} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
