import { EffectComposer, Bloom, Vignette, ChromaticAberration, DepthOfField } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'

interface Props {
  scene: string
}

export default function PostFX({ scene }: Props) {
  return (
    <EffectComposer>
      <DepthOfField
        focusDistance={0.0}
        focalLength={0.02}
        bokehScale={scene === 'aftermath' ? 3 : 1.5}
      />
      <Bloom
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9}
        intensity={scene === 'finalbeat' ? 1.8 : scene === 'frozen' ? 1.2 : 0.8}
      />
      <ChromaticAberration
        offset={scene === 'finalbeat' ? new THREE.Vector2(0.003, 0.003) : new THREE.Vector2(0.0005, 0.0005)}
        blendFunction={BlendFunction.NORMAL}
        radialModulation={false}
        modulationOffset={0}
      />
      <Vignette offset={0.35} darkness={scene === 'aftermath' ? 0.9 : 0.6} />
    </EffectComposer>
  )
}
