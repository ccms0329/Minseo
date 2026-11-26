// 섬 지도 위의 장소별 건물 그림. 각 건물은 (0,0)을 바닥 가운데로 두고 위로 그린다.
// quests.js의 landmark 값으로 고르며, 모르는 값이면 기본 집을 그린다.

const Shadow = ({ w }) => <ellipse cx="0" cy="3" rx={w * 0.62} ry="6" fill="#00000026" />

// 정면 + 오른쪽 옆면 + 지붕 테두리로 된 기본 상자 건물
function Box({ w, h, face, side, roof }) {
  return (
    <>
      <rect x={-w / 2} y={-h} width={w} height={h} rx="3" fill={face} />
      <rect x={w / 2 - 8} y={-h} width="8" height={h} rx="2" fill={side} />
      <rect x={-w / 2 - 3} y={-h - 6} width={w + 6} height="8" rx="3" fill={roof} />
    </>
  )
}
const Door = ({ c = '#5b3a33' }) => <rect x="-6" y="-16" width="12" height="16" rx="6" fill={c} />
const Win = ({ x, y, c = '#fff6df' }) => <rect x={x} y={y} width="9" height="9" rx="2" fill={c} />

function Station() {
  return (
    <>
      <Shadow w={46} />
      <Box w={46} h={34} face="#5f9f92" side="#487f74" roof="#3f6f66" />
      <rect x="-16" y="-27" width="32" height="27" rx="13" fill="#2f4f4a" />
      <path d="M-10 0 v-6 h20 v6" fill="none" stroke="#9fd0c4" strokeWidth="2" />
      <rect x="-1.5" y="-41" width="3" height="6" fill="#fff" />
      <circle cx="0" cy="-52" r="11" fill="#7cc456" stroke="#fff" strokeWidth="3" />
      <text x="0" y="-47.5" textAnchor="middle" fontFamily="Jua" fontSize="14" fill="#fff">4</text>
    </>
  )
}

function Soup() {
  return (
    <>
      <Shadow w={50} />
      <Box w={50} h={34} face="#cf7f60" side="#a9604a" roof="#8c4d3c" />
      <Door />
      <Win x={-19} y={-26} />
      <Win x={10} y={-26} />
      <path d="M-20 -44 Q0 -26 20 -44 Z" fill="#fff8ec" stroke="#6e4135" strokeWidth="3" strokeLinejoin="round" />
      <rect x="-22" y="-47" width="44" height="5" rx="2.5" fill="#6e4135" />
      <path
        d="M-8 -52 q-5 -6 0 -12 M0 -54 q-5 -6 0 -12 M8 -52 q-5 -6 0 -12"
        fill="none"
        stroke="#fff"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </>
  )
}

function Tower() {
  return (
    <>
      <Shadow w={34} />
      <rect x="-17" y="-92" width="34" height="92" rx="4" fill="#7fb6c9" />
      <rect x="9" y="-92" width="8" height="92" rx="2" fill="#5f97ab" />
      {[0, 1, 2, 3, 4].map((r) => (
        <g key={r}>
          <Win x={-12} y={-84 + r * 15} c="#e6f6ff" />
          <Win x={1} y={-84 + r * 15} c="#e6f6ff" />
        </g>
      ))}
      <rect x="-20" y="-98" width="40" height="8" rx="3" fill="#4d7f91" />
      <rect x="-1.5" y="-114" width="3" height="16" fill="#4d7f91" />
      <circle cx="0" cy="-115" r="3.5" fill="#ff7a6b" />
      <Door c="#2f5664" />
    </>
  )
}

function Dice() {
  return (
    <>
      <Shadow w={48} />
      <Box w={48} h={32} face="#f3e2c4" side="#d9c3a6" roof="#b98d6c" />
      <Door c="#8c5a49" />
      <Win x={-19} y={-25} c="#fff" />
      <Win x={10} y={-25} c="#fff" />
      <g transform="translate(0 -56) rotate(-12)">
        <rect x="-15" y="-15" width="30" height="30" rx="6" fill="#fff" stroke="#c8443b" strokeWidth="3" />
        <circle cx="-7" cy="-7" r="3" fill="#c8443b" />
        <circle cx="0" cy="0" r="3" fill="#c8443b" />
        <circle cx="7" cy="7" r="3" fill="#c8443b" />
      </g>
    </>
  )
}

function Hanok() {
  return (
    <>
      <Shadow w={52} />
      <rect x="-22" y="-28" width="44" height="28" rx="2" fill="#fbf3e4" />
      <rect x="14" y="-28" width="8" height="28" fill="#e3d4bb" />
      <rect x="-14" y="-22" width="10" height="14" fill="#c9a77a" />
      <rect x="4" y="-22" width="10" height="14" fill="#c9a77a" />
      <path d="M-34 -30 Q-20 -40 -16 -50 L16 -50 Q20 -40 34 -30 Q20 -34 0 -34 Q-20 -34 -34 -30Z" fill="#4c5a63" />
      <path d="M-16 -50 L16 -50" stroke="#36424a" strokeWidth="3" />
      <path d="M26 -54 q8 -14 0 -22 q-8 8 0 22" fill="#7dbb52" />
    </>
  )
}

function Cafe() {
  return (
    <>
      <Shadow w={48} />
      <Box w={48} h={34} face="#f0a3a0" side="#d07f7c" roof="#a95f5c" />
      <Door c="#6e4135" />
      <path d="M-27 -30 h54 l-4 9 h-46 z" fill="#fff" />
      {[0, 1, 2, 3, 4].map((i) => (
        <path key={i} d={`M${-27 + i * 11} -30 h5.5 l-1 9 h-5.5z`} fill="#e2675f" />
      ))}
      <g transform="translate(0 -58)">
        <rect x="-13" y="-14" width="22" height="20" rx="4" fill="#fff" stroke="#6e4135" strokeWidth="3" />
        <path d="M9 -9 q9 0 9 6 q0 6 -9 6" fill="none" stroke="#6e4135" strokeWidth="3" />
        <ellipse cx="-2" cy="-14" rx="11" ry="3" fill="#8c5a49" />
        <path d="M-6 -20 q-4 -5 0 -10 M2 -22 q-4 -5 0 -10" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </>
  )
}

function House() {
  return (
    <>
      <Shadow w={44} />
      <Box w={44} h={32} face="#f3e2c4" side="#d9c3a6" roof="#b98d6c" />
      <path d="M-26 -36 L0 -58 L26 -36 Z" fill="#cf7f60" />
      <Door c="#8c5a49" />
    </>
  )
}

const LANDMARKS = { station: Station, soup: Soup, tower: Tower, dice: Dice, hanok: Hanok, cafe: Cafe }

// 건물 위 이름표를 띄울 높이(건물 키)
export const LANDMARK_HEIGHT = { station: 66, soup: 64, tower: 124, dice: 80, hanok: 60, cafe: 82 }

export default function Landmark({ type }) {
  const Shape = LANDMARKS[type] ?? House
  return <Shape />
}
