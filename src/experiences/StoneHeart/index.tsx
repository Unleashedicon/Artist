import { useState, useEffect, useRef, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { SceneState } from './types'
import { SCENE_DURATIONS, BEAT_INTERVAL, BEATS_PER_CRACK_LEVEL } from './constants'
import HeartMesh from './HeartMesh'
import HeartFragments from './HeartFragments'
import Particles from './Particles'
import SceneEnvironment from './Environment'
import CameraRig from './CameraRig'
import PostFX from './PostFX'
import MossEffect from './MossEffect'
import AudioManager from './AudioManager'

// Which scene follows which
const NEXT_SCENE: Partial<Record<SceneState, SceneState>> = {
  living: 'timepass',
  timepass: 'finalbeat',
  finalbeat: 'frozen',
  frozen: 'collapse',
  collapse: 'aftermath',
  // aftermath: stays forever
}

const SCENE_LABELS: Record<SceneState, string> = {
  living: 'I — LIVING STONE',
  timepass: 'II — THE WEIGHT OF TIME',
  finalbeat: 'III — THE FINAL BEAT',
  frozen: 'IV — TIME STOPS',
  collapse: 'V — EVERYTHING FALLS',
  aftermath: 'VI — AFTERMATH',
}

// Scenes during which the heart still beats
const BEATING_SCENES: SceneState[] = ['living', 'timepass', 'finalbeat']

export default function StoneHeart() {
  const [scene, setScene] = useState<SceneState>('living')
  const [beatCount, setBeatCount] = useState(0)
  const [crackIntensity, setCrackIntensity] = useState(0)
  const [mossAmount, setMossAmount] = useState(0)
  const [isFrozen, setIsFrozen] = useState(false)
  const [audioActive, setAudioActive] = useState(false)

  const sceneRef = useRef<SceneState>(scene)
  sceneRef.current = scene

  // ---- Scene progression ----------------------------------------------
  useEffect(() => {
    const next = NEXT_SCENE[scene]
    if (!next) return // aftermath: stays

    const timer = setTimeout(() => {
      setScene(next)
    }, SCENE_DURATIONS[scene])

    return () => clearTimeout(timer)
  }, [scene])

  // ---- Heartbeat counter ----------------------------------------------
  useEffect(() => {
    if (!BEATING_SCENES.includes(scene)) return

    const interval = setInterval(() => {
      setBeatCount((c) => c + 1)
    }, BEAT_INTERVAL * 1000) // 750ms

    return () => clearInterval(interval)
  }, [scene])

  // ---- Cracks & moss react to beats -------------------------------------
  useEffect(() => {
    if (beatCount === 0) return

    const newCrackIntensity = Math.min(1, beatCount / (BEATS_PER_CRACK_LEVEL * 6)) // 18 beats to full
    setCrackIntensity(newCrackIntensity)

    if (sceneRef.current === 'timepass') {
      setMossAmount((prev) => Math.min(1, prev + 0.05))
    }
  }, [beatCount])

  // ---- Frozen state ------------------------------------------------------
  useEffect(() => {
    if (scene === 'frozen') setIsFrozen(true)
    if (scene === 'collapse') setIsFrozen(false)
  }, [scene])

  // ---- Audio activation on first click -----------------------------------
  const handleActivateAudio = useCallback(() => {
    setAudioActive(true)
  }, [])

  useEffect(() => {
    if (audioActive) return
    window.addEventListener('click', handleActivateAudio)
    return () => window.removeEventListener('click', handleActivateAudio)
  }, [audioActive, handleActivateAudio])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#000',
        overflow: 'hidden',
      }}
    >
      <Canvas
        shadows
        camera={{ position: [0, 0.2, 3.5], fov: 55 }}
        style={{ width: '100vw', height: '100vh', background: '#0d0d0f' }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
      >
        <SceneEnvironment scene={scene} isFrozen={isFrozen} />
        <CameraRig scene={scene} isFrozen={isFrozen} />
        <HeartMesh
          scene={scene}
          beatCount={beatCount}
          crackIntensity={crackIntensity}
          isFrozen={isFrozen}
        />
        <HeartFragments
          active={scene === 'collapse' || scene === 'aftermath'}
          frozen={isFrozen}
        />
        <Particles scene={scene} isFrozen={isFrozen} />
        <MossEffect scene={scene} mossAmount={mossAmount} />
        <PostFX scene={scene} />
      </Canvas>

      {/* Audio (null-render component) */}
      <AudioManager
        scene={scene}
        beatCount={beatCount}
        crackIntensity={crackIntensity}
        active={audioActive}
      />

      {/* Scene title overlay */}
      <div
        style={{
          position: 'absolute',
          top: 20,
          left: 20,
          zIndex: 10,
          color: '#fff',
          fontSize: 13,
          opacity: 0.5,
          letterSpacing: '0.2em',
          fontFamily: 'monospace',
          pointerEvents: 'none',
          textTransform: 'uppercase',
        }}
      >
        SCENE {SCENE_LABELS[scene]}
      </div>

      {/* Click-to-begin overlay */}
      {!audioActive && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: 15,
            letterSpacing: '0.35em',
            fontFamily: 'monospace',
            pointerEvents: 'none',
            animation: 'stoneheart-pulse 1.8s ease-in-out infinite',
          }}
        >
          CLICK TO BEGIN
          <style>
            {`@keyframes stoneheart-pulse {
              0%, 100% { opacity: 0.9; }
              50% { opacity: 0.25; }
            }`}
          </style>
        </div>
      )}
    </div>
  )
}
