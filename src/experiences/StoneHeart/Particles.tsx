import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface Props {
  scene: string
  isFrozen: boolean
}

const RAIN_COUNT = 600
const DUST_COUNT = 80

export default function Particles({ scene, isFrozen }: Props) {
  const rainRef = useRef<THREE.Points>(null)
  const dustRef = useRef<THREE.Points>(null)
  const rainMatRef = useRef<THREE.PointsMaterial>(null)

  // Rain: positions + per-particle fall speeds
  const { rainPositions, rainSpeeds } = useMemo(() => {
    const positions = new Float32Array(RAIN_COUNT * 3)
    const speeds = new Float32Array(RAIN_COUNT)
    for (let i = 0; i < RAIN_COUNT; i++) {
      positions[i * 3 + 0] = -4 + Math.random() * 8 // x: -4 to 4
      positions[i * 3 + 1] = 2 + Math.random() * 6 // y: 2 to 8
      positions[i * 3 + 2] = -3 + Math.random() * 6 // z: -3 to 3
      speeds[i] = 3.5 + Math.random() * 1.5 // 3.5 to 5.0
    }
    return { rainPositions: positions, rainSpeeds: speeds }
  }, [])

  // Dust: positions in a sphere around origin (radius 2) + outward drift directions
  const { dustPositions, dustDirections } = useMemo(() => {
    const positions = new Float32Array(DUST_COUNT * 3)
    const directions = new Float32Array(DUST_COUNT * 3)
    for (let i = 0; i < DUST_COUNT; i++) {
      // Uniform point in sphere of radius 2
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 2 * Math.cbrt(Math.random())
      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = r * Math.sin(phi) * Math.sin(theta)
      const z = r * Math.cos(phi)
      positions[i * 3 + 0] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z
      // Normalized outward direction (fallback for particles at origin)
      const len = Math.sqrt(x * x + y * y + z * z) || 1
      directions[i * 3 + 0] = x / len
      directions[i * 3 + 1] = y / len
      directions[i * 3 + 2] = z / len
    }
    return { dustPositions: positions, dustDirections: directions }
  }, [])

  const showRain = scene === 'timepass' || scene === 'collapse' || scene === 'aftermath'
  const isCollapse = scene === 'collapse' || scene === 'aftermath'
  const rainFading = isCollapse

  useFrame((_, delta) => {
    const freezeFactor = isFrozen || scene === 'frozen' ? 0 : 1

    // --- Rain ---
    const rain = rainRef.current
    if (rain) {
      rain.visible = showRain
      if (rain.visible && freezeFactor !== 0) {
        const attr = rain.geometry.attributes.position as THREE.BufferAttribute
        const arr = attr.array as Float32Array
        for (let i = 0; i < RAIN_COUNT; i++) {
          const ix = i * 3
          arr[ix + 1] -= rainSpeeds[i] * delta * freezeFactor
          arr[ix + 0] += 0.15 * delta // slight wind
          if (arr[ix + 1] < -2) {
            arr[ix + 1] = 6 + Math.random()
          }
          if (arr[ix + 0] > 4) arr[ix + 0] = -4
        }
        attr.needsUpdate = true
      }
      // Rain fades out during collapse/aftermath
      const mat = rainMatRef.current
      if (mat) {
        const target = rainFading ? 0 : 0.6
        mat.opacity = THREE.MathUtils.lerp(mat.opacity, target, Math.min(1, delta * 2))
      }
    }

    // --- Dust ---
    const dust = dustRef.current
    if (dust && freezeFactor !== 0) {
      const attr = dust.geometry.attributes.position as THREE.BufferAttribute
      const arr = attr.array as Float32Array
      for (let i = 0; i < DUST_COUNT; i++) {
        const ix = i * 3
        if (isCollapse) {
          // Drift slowly outward
          arr[ix + 0] += dustDirections[ix + 0] * 0.4 * delta
          arr[ix + 1] += dustDirections[ix + 1] * 0.4 * delta
          arr[ix + 2] += dustDirections[ix + 2] * 0.4 * delta
        } else {
          // Gentle idle drift
          const t = performance.now() * 0.0003
          arr[ix + 1] += Math.sin(t + i * 1.7) * 0.02 * delta
          arr[ix + 0] += Math.cos(t + i * 0.9) * 0.015 * delta
        }
      }
      attr.needsUpdate = true
    }
  })

  return (
    <group>
      <points ref={rainRef} visible={showRain}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={RAIN_COUNT}
            array={rainPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          ref={rainMatRef}
          size={0.02}
          color="#a0c4ff"
          transparent
          opacity={0.6}
          depthWrite={false}
          sizeAttenuation
        />
      </points>

      <points ref={dustRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={DUST_COUNT}
            array={dustPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.015}
          color="#c8b89a"
          transparent
          opacity={0.4}
          depthWrite={false}
          sizeAttenuation
        />
      </points>
    </group>
  )
}
