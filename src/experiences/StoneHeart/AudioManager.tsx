import { useEffect, useRef } from 'react'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Howl } from 'howler' // NOTE: intentionally unused — no real audio files exist,
// so all sounds below are synthesized with the native Web Audio API instead.
import { SceneState } from './types'
import { BEAT_INTERVAL, SCENE_DURATIONS } from './constants'

interface Props {
  scene: SceneState
  beatCount: number
  crackIntensity: number
  active: boolean
}

const CRACK_THRESHOLDS = [0.25, 0.5, 0.75]

// Expected number of beats during the 'finalbeat' scene — the last one is the big thump.
const FINAL_BEAT_TOTAL = Math.max(
  1,
  Math.floor(SCENE_DURATIONS.finalbeat / 1000 / BEAT_INTERVAL),
)

export default function AudioManager({ scene, beatCount, crackIntensity, active }: Props) {
  const ctxRef = useRef<AudioContext | null>(null)
  const prevCrackRef = useRef(0)
  const finalBeatCountRef = useRef(0)
  const windNodesRef = useRef<{ source: AudioBufferSourceNode; gain: GainNode } | null>(null)
  const activeRef = useRef(active)
  activeRef.current = active

  // ---------------------------------------------------------------------
  // Lazy AudioContext creation — browsers require a user gesture before
  // audio can play, so we create/resume the context on first interaction.
  // ---------------------------------------------------------------------
  useEffect(() => {
    const unlock = () => {
      if (!ctxRef.current) {
        const Ctx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        ctxRef.current = new Ctx()
      }
      if (ctxRef.current.state === 'suspended') {
        void ctxRef.current.resume()
      }
      window.removeEventListener('pointerdown', unlock)
      window.removeEventListener('keydown', unlock)
      window.removeEventListener('touchstart', unlock)
    }

    window.addEventListener('pointerdown', unlock)
    window.addEventListener('keydown', unlock)
    window.addEventListener('touchstart', unlock)

    return () => {
      window.removeEventListener('pointerdown', unlock)
      window.removeEventListener('keydown', unlock)
      window.removeEventListener('touchstart', unlock)
      stopWind()
      if (ctxRef.current) {
        void ctxRef.current.close()
        ctxRef.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getCtx = (): AudioContext | null => {
    if (!activeRef.current) return null
    const ctx = ctxRef.current
    if (!ctx || ctx.state !== 'running') return null
    return ctx
  }

  // ---------------------------------------------------------------------
  // Sound generators
  // ---------------------------------------------------------------------

  /** Low double-oscillator thump. */
  const playHeartbeat = (loud: boolean) => {
    const ctx = getCtx()
    if (!ctx) return
    const now = ctx.currentTime
    const master = ctx.createGain()
    const peak = (loud ? 2 : 1) * 0.5

    // Quick attack, short decay envelope
    master.gain.setValueAtTime(0.0001, now)
    master.gain.exponentialRampToValueAtTime(peak, now + 0.01)
    master.gain.exponentialRampToValueAtTime(0.0001, now + 0.01 + 0.15)
    master.connect(ctx.destination)

    for (const freq of [80, 120]) {
      const osc = ctx.createOscillator()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, now)
      osc.connect(master)
      osc.start(now)
      osc.stop(now + 0.25)
    }
  }

  /** Filtered noise burst for a crack forming. */
  const playCrack = () => {
    const ctx = getCtx()
    if (!ctx) return
    const now = ctx.currentTime
    const duration = 0.3

    const buffer = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * duration), ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < data.length; i++) {
      data[i] = Math.random() * 2 - 1
    }

    const source = ctx.createBufferSource()
    source.buffer = buffer

    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(500, now)

    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.6, now)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration)

    source.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)
    source.start(now)
    source.stop(now + duration)
  }

  /** Low rumbling collapse — clustered sub oscillators with heavy tremolo. */
  const playCollapse = () => {
    const ctx = getCtx()
    if (!ctx) return
    const now = ctx.currentTime
    const duration = 3.0

    const master = ctx.createGain()
    master.gain.setValueAtTime(0.0001, now)
    master.gain.exponentialRampToValueAtTime(0.7, now + 0.1)
    master.gain.exponentialRampToValueAtTime(0.0001, now + duration)
    master.connect(ctx.destination)

    // Heavy tremolo: an LFO modulating a gain stage
    const tremolo = ctx.createGain()
    tremolo.gain.setValueAtTime(0.5, now)
    tremolo.connect(master)

    const lfo = ctx.createOscillator()
    lfo.type = 'sine'
    lfo.frequency.setValueAtTime(9, now)
    const lfoGain = ctx.createGain()
    lfoGain.gain.setValueAtTime(0.45, now)
    lfo.connect(lfoGain)
    lfoGain.connect(tremolo.gain)
    lfo.start(now)
    lfo.stop(now + duration)

    for (const freq of [40, 47, 53, 60]) {
      const osc = ctx.createOscillator()
      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(freq, now)
      // Slight downward pitch drift as the rubble settles
      osc.frequency.linearRampToValueAtTime(freq * 0.8, now + duration)
      const oscGain = ctx.createGain()
      oscGain.gain.setValueAtTime(0.25, now)
      osc.connect(oscGain)
      oscGain.connect(tremolo)
      osc.start(now)
      osc.stop(now + duration)
    }
  }

  /** Soft airy wind loop (brown-noise approximation). */
  const startWind = () => {
    const ctx = getCtx()
    if (!ctx || windNodesRef.current) return
    const now = ctx.currentTime
    const seconds = 4

    const buffer = ctx.createBuffer(1, ctx.sampleRate * seconds, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    // Brown noise: integrate white noise with leaky accumulation
    let lastOut = 0
    for (let i = 0; i < data.length; i++) {
      const white = Math.random() * 2 - 1
      lastOut = (lastOut + 0.02 * white) / 1.02
      data[i] = lastOut * 3.5
    }

    const source = ctx.createBufferSource()
    source.buffer = buffer
    source.loop = true

    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(400, now)
    filter.Q.setValueAtTime(0.5, now)

    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.0001, now)
    gain.gain.exponentialRampToValueAtTime(0.18, now + 2) // slow fade in, soft and airy

    source.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)
    source.start(now)

    windNodesRef.current = { source, gain }
  }

  const stopWind = () => {
    const nodes = windNodesRef.current
    const ctx = ctxRef.current
    windNodesRef.current = null
    if (!nodes || !ctx) return
    const now = ctx.currentTime
    try {
      nodes.gain.gain.cancelScheduledValues(now)
      nodes.gain.gain.setValueAtTime(Math.max(nodes.gain.gain.value, 0.0001), now)
      nodes.gain.gain.exponentialRampToValueAtTime(0.0001, now + 1)
      nodes.source.stop(now + 1.1)
    } catch {
      // source may already be stopped
    }
  }

  /** A gentle high note for the sprout appearing. */
  const playSprout = () => {
    const ctx = getCtx()
    if (!ctx) return
    const now = ctx.currentTime
    const attack = 0.4 // soft attack
    const decay = 3.5 // long decay

    const osc = ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(880, now)

    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.0001, now)
    gain.gain.exponentialRampToValueAtTime(0.25, now + attack)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + attack + decay)

    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(now)
    osc.stop(now + attack + decay + 0.1)
  }

  // ---------------------------------------------------------------------
  // Heartbeat — fires on every beatCount change during beating scenes
  // ---------------------------------------------------------------------
  useEffect(() => {
    if (beatCount === 0) return
    if (scene !== 'living' && scene !== 'timepass' && scene !== 'finalbeat') return

    let loud = false
    if (scene === 'finalbeat') {
      finalBeatCountRef.current += 1
      // The LAST beat of the finale is the big one
      loud = finalBeatCountRef.current >= FINAL_BEAT_TOTAL
    } else {
      finalBeatCountRef.current = 0
    }

    playHeartbeat(loud)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [beatCount])

  // ---------------------------------------------------------------------
  // Cracks — fire when crackIntensity crosses each threshold upward
  // ---------------------------------------------------------------------
  useEffect(() => {
    const prev = prevCrackRef.current
    for (const threshold of CRACK_THRESHOLDS) {
      if (prev < threshold && crackIntensity >= threshold) {
        playCrack()
      }
    }
    prevCrackRef.current = crackIntensity
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [crackIntensity])

  // ---------------------------------------------------------------------
  // Scene-driven sounds
  // ---------------------------------------------------------------------
  useEffect(() => {
    if (scene !== 'finalbeat') {
      finalBeatCountRef.current = 0
    }

    if (scene === 'collapse') {
      playCollapse()
    }

    if (scene === 'aftermath') {
      startWind()
      playSprout()
    } else {
      stopWind()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene])

  // Stop everything if the experience is deactivated
  useEffect(() => {
    if (!active) stopWind()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  return null
}
