import { motion } from 'framer-motion'

export function RoddoFace({ mood = 'neutral' }: { mood?: 'neutral' | 'sad' | 'defensive' }) {
  const isSad = mood === 'sad'

  return (
    <motion.svg
      viewBox="0 0 200 220"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%' }}
      animate={isSad ? { y: [0, 3, 0] } : {}}
      transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
    >
      {/* Short natural fade */}
      <ellipse cx="100" cy="55" rx="60" ry="45" fill="#0D0500" />
      {/* Hairline */}
      <path d="M 45 75 Q 60 62 100 58 Q 140 62 155 75" fill="#0D0500" />
      {/* Temples / fade */}
      <ellipse cx="46"  cy="95" rx="14" ry="30" fill="#0D0500" opacity="0.7" />
      <ellipse cx="154" cy="95" rx="14" ry="30" fill="#0D0500" opacity="0.7" />

      {/* Neck */}
      <rect x="82" y="192" width="36" height="30" rx="5" fill="#7D4E2D" />

      {/* Face — slightly wider jaw (teenage) */}
      <ellipse cx="100" cy="132" rx="62" ry="72" fill="#7D4E2D" />

      {/* Ear */}
      <ellipse cx="38"  cy="130" rx="11" ry="14" fill="#6B3D1E" />
      <ellipse cx="162" cy="130" rx="11" ry="14" fill="#6B3D1E" />

      {/* Highlight */}
      <ellipse cx="100" cy="92" rx="36" ry="16" fill="#8D5E3A" opacity="0.3" />

      {/* Eyebrows — slightly raised inner (sad/worried) */}
      <motion.path
        d="M 60 98 Q 75 92 88 96"
        stroke="#1a0800" strokeWidth="3.5" fill="none" strokeLinecap="round"
        animate={isSad ? { d: 'M 60 96 Q 75 95 88 98' } : { d: 'M 60 98 Q 75 92 88 96' }}
        transition={{ duration: 0.6 }}
      />
      <motion.path
        d="M 112 96 Q 125 92 140 98"
        stroke="#1a0800" strokeWidth="3.5" fill="none" strokeLinecap="round"
        animate={isSad ? { d: 'M 112 98 Q 125 95 140 96' } : { d: 'M 112 96 Q 125 92 140 98' }}
        transition={{ duration: 0.6 }}
      />

      {/* Eyes — drooping / puppy dog */}
      <g style={{ animation: 'blink 4s ease-in-out infinite', transformOrigin: '76px 118px' }}>
        <ellipse cx="76"  cy="118" rx="14" ry="13" fill="white" />
        {/* Drooping lower lid */}
        <path d="M 63 122 Q 76 128 89 122" stroke="#8B5535" strokeWidth="1.5" fill="#C08060" opacity="0.4" />
        <circle  cx="77"  cy="117" r="8.5"          fill="#1a0800" />
        <circle  cx="80"  cy="113" r="2.5"          fill="white" />
      </g>
      <g style={{ animation: 'blink 4s ease-in-out 0.2s infinite', transformOrigin: '124px 118px' }}>
        <ellipse cx="124" cy="118" rx="14" ry="13" fill="white" />
        <path d="M 111 122 Q 124 128 137 122" stroke="#8B5535" strokeWidth="1.5" fill="#C08060" opacity="0.4" />
        <circle  cx="125" cy="117" r="8.5"          fill="#1a0800" />
        <circle  cx="128" cy="113" r="2.5"          fill="white" />
      </g>

      {/* Tears (visible when sad) */}
      {isSad && (
        <>
          <motion.ellipse cx="76" cy="133" rx="4" ry="5"
            fill="#a8d8ea" opacity="0.8"
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: [0, 14, 28], opacity: [0.8, 0.5, 0] }}
            transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
          />
          <motion.ellipse cx="124" cy="133" rx="4" ry="5"
            fill="#a8d8ea" opacity="0.8"
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: [0, 14, 28], opacity: [0.8, 0.5, 0] }}
            transition={{ repeat: Infinity, duration: 2, delay: 1.2 }}
          />
        </>
      )}

      {/* Nose */}
      <path d="M 94 138 Q 100 146 106 138" stroke="#5A3010" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="92"  cy="143" rx="7" ry="4.5" fill="#6B3D1E" />
      <ellipse cx="108" cy="143" rx="7" ry="4.5" fill="#6B3D1E" />

      {/* Mouth — slight frown / quivering lip */}
      <motion.g
        animate={isSad ? { scaleY: [1, 0.95, 1.05, 1] } : {}}
        transition={{ repeat: Infinity, duration: 2 }}
        style={{ transformOrigin: '100px 163px' }}
      >
        <path d="M 76 160 Q 100 155 124 160" stroke="#7A4A2A" strokeWidth="2" fill="#A06040" strokeLinecap="round" />
        <motion.path
          d="M 78 163 Q 100 170 122 163"
          stroke="#7A4A2A" strokeWidth="2.5" fill="none" strokeLinecap="round"
          animate={isSad ? { d: 'M 78 163 Q 100 175 122 163' } : { d: 'M 78 163 Q 100 168 122 163' }}
          transition={{ duration: 0.6 }}
        />
      </motion.g>

      {/* Bottom lip pout */}
      {isSad && (
        <path d="M 84 163 Q 100 173 116 163" fill="#9A5838" opacity="0.5" />
      )}
    </motion.svg>
  )
}
