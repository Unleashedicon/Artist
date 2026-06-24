export type Character = {
  id: string
  name: string
  label: string
  photoUrl: string
  expressions: { neutral: string; happy?: string; angry?: string; sad?: string }
  mouthRegion: { x: number; y: number; w: number; h: number }
  accentColor: string
  bgColor: string
}

const unsplash = (id: string, w = 500, h = 500) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&crop=faces&q=85&auto=format`

export const kaisha: Character = {
  id: 'kaisha',
  name: 'Kaisha 💕',
  label: 'mobile',
  photoUrl: unsplash('ktQ5qaFR2Dw'),
  expressions: {
    neutral: unsplash('ktQ5qaFR2Dw'),
    happy:   unsplash('ktQ5qaFR2Dw'),
  },
  // mouth centre ~50% x, ~70% y of cropped image; width ~34%, height ~12%
  mouthRegion: { x: 50, y: 70, w: 34, h: 12 },
  accentColor: '#34C759',
  bgColor: '#0D2B0D',
}

export const msJackson: Character = {
  id: 'msJackson',
  name: 'Ms. Jackson 😤',
  label: 'mobile',
  photoUrl: unsplash('Y6wlz2toY5M'),
  expressions: {
    neutral: unsplash('Y6wlz2toY5M'),
    angry:   unsplash('Y6wlz2toY5M'),
  },
  mouthRegion: { x: 50, y: 71, w: 32, h: 11 },
  accentColor: '#FF3B30',
  bgColor: '#2A0808',
}

export const roddo: Character = {
  id: 'roddo',
  name: 'Young Roddo',
  label: 'mobile',
  photoUrl: unsplash('Xr6FOCwu04I'),
  expressions: {
    neutral: unsplash('lSEyF33EEC4'),
    sad:     unsplash('Xr6FOCwu04I'),
  },
  mouthRegion: { x: 50, y: 70, w: 30, h: 11 },
  accentColor: '#007AFF',
  bgColor: '#080D1A',
}

// ── Flashback scene photos ─────────────────────────────────
export const flashbackPhotos = [
  {
    url: unsplash('ktQ5qaFR2Dw', 600, 600),
    caption: '"Kaisha told me that she like me"',
    emoji: '😊',
  },
  {
    url: unsplash('WVG69HbLY_s', 600, 600),
    caption: '"But she like Demarcus too"',
    emoji: '😏',
  },
  {
    url: unsplash('0dXvugMScIY', 600, 600),
    caption: '"I seen her kiss him on the cheek"',
    emoji: '😘',
  },
  {
    url: unsplash('Xr6FOCwu04I', 600, 600),
    caption: '"I ain\'t know what else to do"',
    emoji: '😢',
    isRoddo: true,
  },
]
