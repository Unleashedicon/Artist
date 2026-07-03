import { useRef, useEffect, useMemo } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'

interface Props {
  active: boolean
  frozen: boolean
}

const FRAGMENT_COUNT = 24

interface FragmentData {
  position: [number, number, number]
  size: [number, number, number]
}

function randomSize() {
  return 0.06 + Math.random() * 0.12
}

export default function HeartFragments({ active, frozen }: Props) {
  const fragmentRefs = useRef<(THREE.Mesh | null)[]>([])
  fragmentRefs.current = []

  const fragments = useMemo<FragmentData[]>(() => {
    return Array.from({ length: FRAGMENT_COUNT }, (_, i) => {
      const t = (i / FRAGMENT_COUNT) * Math.PI * 2
      const x = 16 * Math.pow(Math.sin(t), 3) * 0.065
      const y =
        (13 * Math.cos(t) -
          5 * Math.cos(2 * t) -
          2 * Math.cos(3 * t) -
          Math.cos(4 * t)) *
        0.065
      const z = (Math.random() - 0.5) * 0.3

      return {
        position: [x, y, z] as [number, number, number],
        size: [randomSize(), randomSize(), randomSize()] as [number, number, number],
      }
    })
  }, [])

  useEffect(() => {
    if (!active) return
    if (frozen) return

    const tweens: gsap.core.Tween[] = []

    fragmentRefs.current.forEach((mesh, i) => {
      if (!mesh) return

      const position = fragments[i].position
      const delay = i * 0.04 + Math.random() * 0.1
      const xTarget = position[0] + (Math.random() - 0.5) * 1.5
      const yTarget = -2.5 - Math.random() * 1.5
      const zTarget = position[2] + (Math.random() - 0.5) * 1.2

      tweens.push(
        gsap.to(mesh.position, {
          x: xTarget,
          y: yTarget,
          z: zTarget,
          duration: 1.2 + Math.random() * 0.8,
          delay: delay,
          ease: 'power2.in',
        })
      )
      tweens.push(
        gsap.to(mesh.rotation, {
          x: Math.random() * Math.PI * 4,
          y: Math.random() * Math.PI * 4,
          z: Math.random() * Math.PI * 2,
          duration: 1.5,
          delay: delay,
          ease: 'power1.in',
        })
      )
    })

    return () => {
      tweens.forEach((tween) => tween.kill())
    }
  }, [active, frozen, fragments])

  return (
    <group>
      {fragments.map((fragment, i) => (
        <mesh
          key={i}
          ref={(el) => {
            fragmentRefs.current[i] = el
          }}
          position={fragment.position}
          visible={active}
        >
          <boxGeometry args={fragment.size} />
          <meshPhysicalMaterial color="#5a5a5a" roughness={0.9} />
        </mesh>
      ))}
    </group>
  )
}
