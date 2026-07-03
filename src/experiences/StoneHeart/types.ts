export type SceneState =
  | 'living'    // Scene 1: heart beats, tiny cracks appear
  | 'timepass'  // Scene 2: rain, moss grow, seasons change
  | 'finalbeat' // Scene 3: final powerful heartbeat, big crack opens
  | 'frozen'    // Scene 4: everything stops, camera orbits slowly
  | 'collapse'  // Scene 5: gravity returns, fragments fall
  | 'aftermath' // Scene 6: dust settles, green sprout grows

export interface HeartProps {
  scene: SceneState
  beatCount: number
  crackIntensity: number   // 0-1
  mossAmount: number       // 0-1
  isFrozen: boolean
}

export interface FragmentsProps {
  active: boolean          // true when scene === 'collapse'
  frozen: boolean
}
