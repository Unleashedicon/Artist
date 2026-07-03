import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface Props {
  scene: string
  mossAmount: number // 0-1
}

const MOSS_COUNT = 40

// Deterministic pseudo-random helper so patches don't jump between renders
function pseudoRandom(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

// Sample a point on the heart surface using the classic parametric heart formula,
// with a depth offset to wrap points around the 3D volume.
function heartPoint(i: number): THREE.Vector3 {
  const t = (i / MOSS_COUNT) * Math.PI * 2
  const scale = 0.055

  const x = 16 * Math.pow(Math.sin(t), 3) * scale
  const y =
    (13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t)) *
    scale

  // Push each patch slightly forward/backward so moss wraps the volume
  const z = (pseudoRandom(i) - 0.5) * 0.5

  return new THREE.Vector3(x, y, z)
}

export default function MossEffect({ scene, mossAmount }: Props) {
  const mossGroupRef = useRef<THREE.Group>(null)
  const sproutRef = useRef<THREE.Group>(null)

  const showMoss = scene === 'timepass' || scene === 'aftermath'

  const targetScale = useMemo(() => new THREE.Vector3(1, 1, 1), [])

  // Precompute moss patch positions + orientations (normal facing away from center)
  const mossPatches = useMemo(() => {
    const center = new THREE.Vector3(0, 0, 0)
    return Array.from({ length: MOSS_COUNT }, (_, i) => {
      const position = heartPoint(i)
      const normal = position.clone().sub(center).normalize()
      // Orient the disc so its face points along the outward normal
      const quaternion = new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 0, 1),
        normal
      )
      // Slight per-patch size variation
      const sizeJitter = 0.7 + pseudoRandom(i + 100) * 0.6
      return { position, quaternion, sizeJitter }
    })
  }, [])

  useFrame((_, delta) => {
    // Moss patches grow according to mossAmount
    if (mossGroupRef.current) {
      mossGroupRef.current.children.forEach((child, i) => {
        const patch = mossPatches[i]
        const target = showMoss ? mossAmount * patch.sizeJitter : 0
        const s = THREE.MathUtils.lerp(child.scale.x, target, delta * 2)
        child.scale.setScalar(Math.max(s, 0.0001))
      })
    }

    // Sprout grows in during the aftermath
    if (sproutRef.current) {
      if (scene === 'aftermath') {
        sproutRef.current.scale.lerp(targetScale, delta * 0.4)
      } else {
        sproutRef.current.scale.setScalar(0.0001)
      }
    }
  })

  return (
    <group>
      {/* Moss patches scattered on the heart surface */}
      <group ref={mossGroupRef}>
        {mossPatches.map((patch, i) => (
          <mesh
            key={i}
            position={patch.position}
            quaternion={patch.quaternion}
            scale={0.0001}
          >
            <circleGeometry args={[0.05, 12]} />
            <meshStandardMaterial
              color="#2d6b2d"
              roughness={0.95}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}
      </group>

      {/* Green sprout emerging from the ground */}
      <group ref={sproutRef} position={[0.1, -1.55, 0.1]} scale={0.0001}>
        {/* Stem */}
        <mesh position={[0, 0.125, 0]}>
          <cylinderGeometry args={[0.008, 0.015, 0.25, 8]} />
          <meshStandardMaterial color="#3a8a3a" roughness={0.8} />
        </mesh>

        {/* Bud at the top of the stem */}
        <mesh position={[0, 0.25, 0]}>
          <sphereGeometry args={[0.04, 12, 12]} />
          <meshStandardMaterial color="#2ecc71" roughness={0.7} />
        </mesh>

        {/* Leaf 1 */}
        <mesh position={[0.05, 0.16, 0]} rotation={[0, 0, -0.9]} scale={[1, 0.45, 1]}>
          <circleGeometry args={[0.05, 12]} />
          <meshStandardMaterial
            color="#2ecc71"
            roughness={0.7}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Leaf 2 */}
        <mesh position={[-0.05, 0.1, 0]} rotation={[0, 0, 0.9]} scale={[1, 0.45, 1]}>
          <circleGeometry args={[0.05, 12]} />
          <meshStandardMaterial
            color="#2ecc71"
            roughness={0.7}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </group>
  )
}
