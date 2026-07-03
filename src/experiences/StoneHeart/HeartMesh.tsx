import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface Props {
  scene: string
  beatCount: number
  crackIntensity: number // 0-1
  isFrozen: boolean
}

const HEART_SCALE = 0.065
const HEART_SAMPLES = 100

/**
 * Crack paths: short jagged polylines spread across the front face
 * of the heart. Each is an array of Vector3 points (3-5 points).
 */
const CRACK_PATHS: THREE.Vector3[][] = [
  [
    new THREE.Vector3(0, 0.5, 0.2),
    new THREE.Vector3(0.05, 0.35, 0.2),
    new THREE.Vector3(-0.03, 0.22, 0.2),
    new THREE.Vector3(0.04, 0.08, 0.2),
  ],
  [
    new THREE.Vector3(-0.3, 0.2, 0.2),
    new THREE.Vector3(-0.22, 0.1, 0.2),
    new THREE.Vector3(-0.28, -0.02, 0.2),
  ],
  [
    new THREE.Vector3(0.2, -0.1, 0.2),
    new THREE.Vector3(0.14, -0.22, 0.2),
    new THREE.Vector3(0.2, -0.32, 0.2),
    new THREE.Vector3(0.12, -0.42, 0.2),
  ],
  [
    new THREE.Vector3(0.35, 0.25, 0.2),
    new THREE.Vector3(0.28, 0.15, 0.2),
    new THREE.Vector3(0.33, 0.05, 0.2),
    new THREE.Vector3(0.26, -0.05, 0.2),
  ],
  [
    new THREE.Vector3(-0.15, -0.2, 0.2),
    new THREE.Vector3(-0.08, -0.3, 0.2),
    new THREE.Vector3(-0.13, -0.4, 0.2),
    new THREE.Vector3(-0.05, -0.5, 0.2),
    new THREE.Vector3(-0.08, -0.58, 0.2),
  ],
  [
    new THREE.Vector3(-0.4, 0.35, 0.2),
    new THREE.Vector3(-0.33, 0.28, 0.2),
    new THREE.Vector3(-0.38, 0.18, 0.2),
  ],
  [
    new THREE.Vector3(0.1, 0.4, 0.2),
    new THREE.Vector3(0.18, 0.32, 0.2),
    new THREE.Vector3(0.12, 0.24, 0.2),
    new THREE.Vector3(0.2, 0.16, 0.2),
  ],
  [
    new THREE.Vector3(-0.05, 0.05, 0.2),
    new THREE.Vector3(-0.12, -0.05, 0.2),
    new THREE.Vector3(-0.06, -0.14, 0.2),
  ],
]

export default function HeartMesh({ scene, beatCount, crackIntensity, isFrozen }: Props) {
  const heartRef = useRef<THREE.Group>(null)

  // Parametric heart geometry, extruded and centered at the origin.
  const geometry = useMemo(() => {
    const points: THREE.Vector2[] = []
    for (let i = 0; i < HEART_SAMPLES; i++) {
      const t = (i / HEART_SAMPLES) * Math.PI * 2
      const x = 16 * Math.pow(Math.sin(t), 3) * HEART_SCALE
      const y =
        (13 * Math.cos(t) -
          5 * Math.cos(2 * t) -
          2 * Math.cos(3 * t) -
          Math.cos(4 * t)) *
        HEART_SCALE
      points.push(new THREE.Vector2(x, y))
    }

    const shape = new THREE.Shape()
    shape.setFromPoints(points)

    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.4,
      bevelEnabled: true,
      bevelSegments: 4,
      bevelSize: 0.06,
    })
    geo.center()
    return geo
  }, [])

  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#6e6e6e',
        roughness: 0.88,
        metalness: 0.06,
      }),
    []
  )

  // Crack line segments: pairs of points forming each jagged path.
  const crackGeometry = useMemo(() => {
    const segmentPoints: THREE.Vector3[] = []
    for (const path of CRACK_PATHS) {
      for (let i = 0; i < path.length - 1; i++) {
        segmentPoints.push(path[i], path[i + 1])
      }
    }
    return new THREE.BufferGeometry().setFromPoints(segmentPoints)
  }, [])

  const crackMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: '#222',
        transparent: true,
        opacity: 0,
        depthWrite: false,
      }),
    []
  )

  // Keep crack opacity in sync with intensity.
  useEffect(() => {
    crackMaterial.opacity = crackIntensity * 0.8
  }, [crackIntensity, crackMaterial])

  // Dispose GPU resources on unmount.
  useEffect(() => {
    return () => {
      geometry.dispose()
      material.dispose()
      crackGeometry.dispose()
      crackMaterial.dispose()
    }
  }, [geometry, material, crackGeometry, crackMaterial])

  // Heartbeat: "lub-dub" pulse every 0.75s.
  useFrame(({ clock }) => {
    if (!heartRef.current) return

    if (isFrozen) {
      heartRef.current.scale.setScalar(1)
      return
    }

    const cycle = (clock.getElapsedTime() % 0.75) / 0.75 // 0 to 1
    const lub = Math.exp(-60 * Math.pow(cycle - 0.12, 2))
    const dub = Math.exp(-60 * Math.pow(cycle - 0.28, 2)) * 0.7
    const beatScale = 1 + (lub + dub) * 0.065

    heartRef.current.scale.setScalar(beatScale)
  })

  return (
    <group ref={heartRef}>
      {/* Rotated 180 deg on Y and Z so the heart points up */}
      <mesh geometry={geometry} material={material} rotation={[0, Math.PI, Math.PI]} />
      {/* Cracks sit slightly in front of the heart surface */}
      <lineSegments
        geometry={crackGeometry}
        material={crackMaterial}
        position={[0, 0, 0.01]}
      />
    </group>
  )
}
