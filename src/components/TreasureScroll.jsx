// 첫 화면의 보물지도 두루마리. 점선 길이 물음표 장소들을 지나 X 표시로 이어진다.
const INK = '#8a5a3c'
const RED = '#d6544a'

const STOPS = [
  [96, 196],
  [128, 150],
  [176, 172],
  [214, 124],
  [256, 150],
  [270, 96],
]
const ROUTE =
  'M96 196 C108 176 116 160 128 150 S160 176 176 172 S200 128 214 124 S246 162 256 150 S262 110 270 96 S290 70 300 66'

function Roll({ x }) {
  return (
    <g>
      <rect x={x} y="22" width="24" height="206" rx="12" fill="url(#scroll-roll)" />
      <ellipse cx={x + 12} cy="24" rx="12" ry="5" fill="#c79a5c" />
      <ellipse cx={x + 12} cy="24" rx="5" ry="2.2" fill={INK} />
      <ellipse cx={x + 12} cy="226" rx="12" ry="5" fill="#b78a50" />
    </g>
  )
}

const Sparkle = ({ x, y, s = 1 }) => (
  <path
    transform={`translate(${x} ${y}) scale(${s})`}
    d="M0 -10 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3z"
    fill="#fff"
  />
)

export default function TreasureScroll({ stops = STOPS.length }) {
  return (
    <div className="scroll-art">
      <svg viewBox="0 0 390 250" role="img" aria-label="생일 보물지도">
        <defs>
          <linearGradient id="scroll-roll" x1="0" x2="1">
            <stop offset="0" stopColor="#b98b52" />
            <stop offset=".45" stopColor="#f0d39c" />
            <stop offset="1" stopColor="#a7783f" />
          </linearGradient>
          <radialGradient id="scroll-paper" cx=".5" cy=".5" r=".7">
            <stop offset=".55" stopColor="#f8e7c4" />
            <stop offset="1" stopColor="#ecd3a2" />
          </radialGradient>
        </defs>
        <ellipse cx="195" cy="238" rx="150" ry="9" fill="#5e4582" opacity=".35" />

        <path
          d="M62 30 Q130 22 195 30 T328 28 L328 222 Q262 230 195 222 T62 224 Z"
          fill="url(#scroll-paper)"
          stroke="#d7b37a"
          strokeWidth="2"
        />
        <circle cx="110" cy="70" r="16" fill="#e7cb95" opacity=".5" />
        <circle cx="290" cy="200" r="12" fill="#e7cb95" opacity=".5" />
        <text x="84" y="58" fontFamily="Jua" fontSize="17" fill={INK}>
          Birthday Treasure Map
        </text>
        <path d="M84 64 h150" stroke={INK} strokeWidth="1.5" strokeDasharray="3 4" />

        {/* 손으로 그린 듯한 해안선, 산, 나무 */}
        <path d="M70 120 q14 -8 22 2 t24 -4 M300 214 q-10 -14 6 -22 t14 -16" fill="none" stroke={INK} strokeWidth="1.6" opacity=".55" />
        <g fill="none" stroke={INK} strokeWidth="1.8" strokeLinejoin="round" opacity=".7">
          <path d="M150 104 l12 -18 l12 18 M166 104 l9 -13 l9 13" />
          <circle cx="98" cy="96" r="6" />
          <path d="M98 102 v6" />
          <circle cx="112" cy="102" r="5" />
          <path d="M112 107 v5" />
          <circle cx="244" cy="80" r="5" />
          <path d="M244 85 v5" />
        </g>

        {/* 나침반 */}
        <g transform="translate(240 194)">
          <circle r="17" fill="none" stroke={INK} strokeWidth="1.6" opacity=".7" />
          <path d="M0 -15 L4 0 L0 15 L-4 0Z" fill={INK} />
          <path d="M-15 0 L0 4 L15 0 L0 -4Z" fill={INK} opacity=".5" />
          <text y="-21" textAnchor="middle" fontFamily="Jua" fontSize="10" fill={INK}>
            N
          </text>
        </g>

        <path d={ROUTE} fill="none" stroke={RED} strokeWidth="2.6" strokeDasharray="6 6" strokeLinecap="round" />
        {STOPS.slice(0, stops).map(([x, y]) => (
          <g key={`${x}-${y}`} transform={`translate(${x} ${y})`}>
            <circle r="10" fill="#fff8ea" stroke={INK} strokeWidth="2" />
            <text y="4.5" textAnchor="middle" fontFamily="Jua" fontSize="13" fill={INK}>
              ?
            </text>
          </g>
        ))}
        <g transform="translate(304 62) rotate(8)" stroke={RED} strokeWidth="5" strokeLinecap="round">
          <path d="M-9 -9 L9 9 M9 -9 L-9 9" />
        </g>
        <text x="96" y="221" textAnchor="middle" fontFamily="Jua" fontSize="11" fill={INK}>
          START
        </text>

        <Roll x={44} />
        <Roll x={322} />

        {/* 하트 밀랍 봉인 */}
        <g transform="translate(306 210)">
          <path
            d="M0 -20 l6 4 l7 -1 l2 7 l6 4 l-3 6 l3 6 l-6 4 l-2 7 l-7 -1 l-6 4 l-6 -4 l-7 1 l-2 -7 l-6 -4 l3 -6 l-3 -6 l6 -4 l2 -7 l7 1 z"
            fill="#c8443b"
          />
          <circle r="12" fill="#b23a32" />
          <path d="M0 6 C-10 -2 -7 -10 0 -5 C7 -10 10 -2 0 6Z" fill="#e8786d" />
        </g>
        <Sparkle x={28} y={80} />
        <Sparkle x={362} y={176} s={0.7} />
      </svg>
    </div>
  )
}
