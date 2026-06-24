import { motion } from 'framer-motion'

export function MsJacksonFace({ speaking = false }: { speaking?: boolean }) {
  return (
    <motion.svg
      viewBox="0 0 200 220"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%' }}
      animate={speaking ? { rotate: [-1, 1, -1, 0] } : {}}
      transition={{ repeat: Infinity, duration: 0.4 }}
    >
      {/* Hair — short relaxed with grey streaks */}
      <ellipse cx="100" cy="52" rx="66" ry="48" fill="#1A0A00" />
      {/* Grey streaks */}
      <path d="M 60 30 Q 55 55 52 80"  stroke="#777" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.7" />
      <path d="M 140 30 Q 145 55 148 80" stroke="#777" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.7" />
      <path d="M 100 20 Q 100 50 100 80" stroke="#666" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.5" />
      {/* Hair sides */}
      <ellipse cx="44"  cy="90" rx="16" ry="40" fill="#1A0A00" />
      <ellipse cx="156" cy="90" rx="16" ry="40" fill="#1A0A00" />

      {/* Neck */}
      <rect x="82" y="190" width="36" height="32" rx="5" fill="#5A2E14" />

      {/* Face */}
      <ellipse cx="100" cy="132" rx="60" ry="75" fill="#6B3A2A" />

      {/* Ear */}
      <ellipse cx="40"  cy="135" rx="11" ry="14" fill="#5A3020" />
      <ellipse cx="160" cy="135" rx="11" ry="14" fill="#5A3020" />

      {/* Forehead furrow lines (age/anger) */}
      <path d="M 78 85 Q 90 82 102 85"   stroke="#4A2010" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
      <path d="M 98 85 Q 110 82 122 85"   stroke="#4A2010" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />

      {/* Angry eyebrows — heavy V shape */}
      <path d="M 58 102 Q 72 90 86 98"   stroke="#1a0800" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M 114 98 Q 128 90 142 102" stroke="#1a0800" strokeWidth="6" fill="none" strokeLinecap="round" />

      {/* Brow furrow shadow */}
      <ellipse cx="100" cy="102" rx="14" ry="5" fill="#3A1808" opacity="0.4" />

      {/* Eyes — narrowed/intense */}
      <g style={{ animation: 'blink2 5s ease-in-out infinite', transformOrigin: '78px 116px' }}>
        <ellipse cx="78"  cy="116" rx="13" ry="10" fill="white" />
        <circle  cx="79"  cy="117" r="7"            fill="#1a0800" />
        <circle  cx="82"  cy="114" r="2"            fill="white" />
      </g>
      <g style={{ animation: 'blink2 5s ease-in-out 0.2s infinite', transformOrigin: '122px 116px' }}>
        <ellipse cx="122" cy="116" rx="13" ry="10" fill="white" />
        <circle  cx="123" cy="117" r="7"            fill="#1a0800" />
        <circle  cx="126" cy="114" r="2"            fill="white" />
      </g>

      {/* Under-eye lines */}
      <path d="M 65 122 Q 78 126 91 122" stroke="#4A2010" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5" />
      <path d="M 109 122 Q 122 126 135 122" stroke="#4A2010" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5" />

      {/* Nose — broader */}
      <path d="M 93 138 Q 100 146 107 138" stroke="#4A2010" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="91"  cy="143" rx="8" ry="5" fill="#5A3020" />
      <ellipse cx="109" cy="143" rx="8" ry="5" fill="#5A3020" />

      {/* Mouth — pursed / slight frown, animated when speaking */}
      <motion.g
        animate={speaking ? { scaleY: [1, 1.4, 0.9, 1.2, 1] } : {}}
        transition={{ repeat: Infinity, duration: 0.5 }}
        style={{ transformOrigin: '100px 162px' }}
      >
        {/* Lips */}
        <path d="M 72 158 Q 100 152 128 158" stroke="#8B4A3A" strokeWidth="2" fill="#B05A48" strokeLinecap="round" />
        {/* Frown */}
        <path d="M 74 162 Q 100 172 126 162" stroke="#8B4A3A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {/* Lower lip */}
        <path d="M 80 163 Q 100 170 120 163" fill="#A05040" opacity="0.6" />
      </motion.g>

      {/* Nasolabial folds (expression lines) */}
      <path d="M 72 148 Q 68 158 72 168" stroke="#4A2010" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.4" />
      <path d="M 128 148 Q 132 158 128 168" stroke="#4A2010" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.4" />

      {/* Earrings — small studs */}
      <circle cx="40"  cy="140" r="3.5" fill="#C0C0C0" />
      <circle cx="160" cy="140" r="3.5" fill="#C0C0C0" />
    </motion.svg>
  )
}
