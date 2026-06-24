export function KaishaFace() {
  return (
    <svg viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      {/* Hair — natural puffs */}
      <ellipse cx="100" cy="48" rx="68" ry="52" fill="#0D0500" />
      <circle  cx="47"  cy="68" r="34"         fill="#0D0500" />
      <circle  cx="153" cy="68" r="34"         fill="#0D0500" />
      {/* Hair shine */}
      <ellipse cx="70"  cy="38" rx="12" ry="8" fill="#251008" opacity="0.5" />
      <ellipse cx="130" cy="38" rx="12" ry="8" fill="#251008" opacity="0.5" />

      {/* Neck */}
      <rect x="85" y="190" width="30" height="30" rx="5" fill="#8D5524" />

      {/* Face */}
      <ellipse cx="100" cy="130" rx="63" ry="73" fill="#8D5524" />

      {/* Ear */}
      <ellipse cx="37"  cy="132" rx="10" ry="13" fill="#7A4A1E" />
      <ellipse cx="163" cy="132" rx="10" ry="13" fill="#7A4A1E" />
      {/* Earrings */}
      <circle cx="37"  cy="148" r="4" fill="#FFD700" />
      <circle cx="163" cy="148" r="4" fill="#FFD700" />

      {/* Forehead highlight */}
      <ellipse cx="100" cy="90" rx="38" ry="18" fill="#9A6030" opacity="0.25" />

      {/* Eyebrows */}
      <path d="M 62 100 Q 78 94 90 98"  stroke="#1a0800" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M 110 98 Q 122 94 138 100" stroke="#1a0800" strokeWidth="3.5" fill="none" strokeLinecap="round" />

      {/* Eyes with blink */}
      <g style={{ animation: 'blink 3.5s ease-in-out infinite', transformOrigin: '78px 118px' }}>
        <ellipse cx="78"  cy="118" rx="14" ry="15" fill="white" />
        <circle  cx="80"  cy="121" r="9"            fill="#1a0800" />
        <circle  cx="84"  cy="116" r="3"            fill="white" />
        <circle  cx="80"  cy="126" r="2.5"          fill="#1a0800" />
      </g>
      <g style={{ animation: 'blink 3.5s ease-in-out 0.15s infinite', transformOrigin: '122px 118px' }}>
        <ellipse cx="122" cy="118" rx="14" ry="15" fill="white" />
        <circle  cx="124" cy="121" r="9"            fill="#1a0800" />
        <circle  cx="128" cy="116" r="3"            fill="white" />
        <circle  cx="124" cy="126" r="2.5"          fill="#1a0800" />
      </g>

      {/* Lashes */}
      <path d="M 65 105 L 62 100 M 69 103 L 67 97 M 73 102 L 72 96" stroke="#1a0800" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M 109 102 L 108 96 M 113 103 L 112 97 M 117 105 L 120 100" stroke="#1a0800" strokeWidth="1.8" strokeLinecap="round" />

      {/* Nose */}
      <path d="M 96 138 Q 100 145 104 138" stroke="#6B3D18" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="94"  cy="143" rx="6" ry="4" fill="#7A4A1E" />
      <ellipse cx="106" cy="143" rx="6" ry="4" fill="#7A4A1E" />

      {/* Smile — big happy */}
      <path d="M 68 158 Q 100 185 132 158" stroke="#1a0800" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M 72 158 Q 100 178 128 158 L 127 163 Q 100 183 73 163 Z" fill="white" />
      {/* Lips */}
      <path d="M 68 158 Q 100 165 132 158" stroke="#C0705A" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* Cheek blush */}
      <ellipse cx="54"  cy="148" rx="15" ry="9" fill="#D4826A" opacity="0.28" />
      <ellipse cx="146" cy="148" rx="15" ry="9" fill="#D4826A" opacity="0.28" />
    </svg>
  )
}
