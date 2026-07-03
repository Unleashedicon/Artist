import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface Props {
  scene: string
  isFrozen: boolean
}

export default function SceneEnvironment({ scene, isFrozen }: Props) {
  const pulseLightRef = useRef<THREE.PointLight>(null)
  const groundRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (!pulseLightRef.current) return

    if ((scene === 'living' || scene === 'finalbeat') && !isFrozen) {
      const cycle = (clock.getElapsedTime() % 0.75) / 0.75
      const lub = Math.exp(-60 * Math.pow(cycle - 0.12, 2))
      const dub = Math.exp(-60 * Math.pow(cycle - 0.28, 2)) * 0.7
      pulseLightRef.current.intensity = (lub + dub) * 2.5
    }
    // When frozen: intensity stays at last value
  })

  return (
    <>
      {/* Background */}
      <color attach="background" args={['#0d0d0f']} />

      {/* Fog */}
      <fog attach="fog" args={['#0d0d0f', 6, 20]} />

      {/* Ground plane */}
      <mesh ref={groundRef} position={[0, -1.6, 0]} receiveShadow>
        <boxGeometry args={[20, 0.1, 20]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.95} />
      </mesh>

      {/* Ambient light */}
      <ambientLight color="#161622" intensity={0.4} />

      {/* Main key light */}
      <directionalLight
        position={[3, 5, 3]}
        color="#8899bb"
        intensity={1.2}
        castShadow
      />

      {/* Fill light */}
      <directionalLight position={[-4, 2, -2]} color="#334466" intensity={0.5} />

      {/* Heart pulse light */}
      <pointLight ref={pulseLightRef} position={[0, 0, 1.5]} color="#ff4444" intensity={0} />

      {/* Ground bounce */}
      <pointLight position={[0, -1.5, 0]} color="#334455" intensity={0.3} />
    </>
  )
}
