import { useRef, useEffect } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import gsap from 'gsap'
import { SceneState } from './types'

interface Props {
  scene: SceneState
  isFrozen: boolean
}

interface CameraTarget {
  position: [number, number, number]
  lookAt: [number, number, number]
}

const CAMERA_TARGETS: Partial<Record<SceneState, CameraTarget>> = {
  living: { position: [0, 0.2, 3.5], lookAt: [0, 0, 0] },
  timepass: { position: [-1.5, 0.8, 3.0], lookAt: [0, 0, 0] },
  finalbeat: { position: [0, -0.2, 2.8], lookAt: [0, 0, 0] },
  collapse: { position: [0, 1.5, 4.5], lookAt: [0, -0.5, 0] },
  aftermath: { position: [0, -0.8, 2.5], lookAt: [0, -1.5, 0] },
}

const ORBIT_RADIUS = 3
const ORBIT_HEIGHT = 0.5
const ORBIT_DURATION = 5 // seconds for a full 360° rotation

export default function CameraRig({ scene, isFrozen }: Props) {
  const { camera } = useThree()
  const orbitAngle = useRef(0)
  const tweenRef = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    // Kill any in-flight tween before starting a new move
    tweenRef.current?.kill()
    tweenRef.current = null

    if (scene === 'frozen') {
      // Orbit is driven by useFrame — reset the angle so the
      // rotation always starts from the front of the scene.
      orbitAngle.current = 0
      return
    }

    const target = CAMERA_TARGETS[scene]
    if (!target) return

    const [x, y, z] = target.position
    const [lx, ly, lz] = target.lookAt

    tweenRef.current = gsap.to(camera.position, {
      x,
      y,
      z,
      duration: 1.5,
      ease: 'power2.inOut',
      onUpdate: () => {
        camera.lookAt(lx, ly, lz)
      },
    })

    return () => {
      tweenRef.current?.kill()
      tweenRef.current = null
    }
  }, [scene, camera])

  useFrame((_, delta) => {
    if (scene !== 'frozen') return
    if (!isFrozen) return

    // Full rotation in ORBIT_DURATION seconds
    orbitAngle.current += delta * ((Math.PI * 2) / ORBIT_DURATION)

    camera.position.x = Math.sin(orbitAngle.current) * ORBIT_RADIUS
    camera.position.z = Math.cos(orbitAngle.current) * ORBIT_RADIUS
    camera.position.y = ORBIT_HEIGHT

    camera.lookAt(0, 0, 0)
  })

  return null
}
