import Landmark, { LANDMARK_HEIGHT } from './Landmarks.jsx'
import { pad } from './labels.js'

const W = 390
const H = 430

// 섬 위 건물 자리(아래에서 위로 이어지는 길 순서). 지금 지도는 6곳까지 그린다.
// 퀘스트가 더 많아지면 이 목록에 자리를 추가해야 한다.
const SPOTS = [
  { x: 92, y: 330 },
  { x: 238, y: 318 },
  { x: 300, y: 228 },
  { x: 150, y: 210 },
  { x: 78, y: 140 },
  { x: 236, y: 118 },
]

const TREES = [
  [44, 230, 1, 0], [56, 262, 0.8, 1], [190, 150, 0.9, 0], [330, 160, 1, 1], [346, 196, 0.8, 0],
  [170, 72, 0.9, 1], [120, 90, 0.8, 0], [290, 88, 0.85, 0], [200, 270, 0.8, 1], [40, 190, 0.7, 0],
  [150, 360, 0.8, 0], [350, 270, 0.75, 1],
]
const FLOWERS = [
  [120, 300, '#ff7a6b'], [270, 200, '#fff'], [60, 300, '#ffd166'], [200, 110, '#ff7a6b'],
  [300, 150, '#fff'], [176, 260, '#ffd166'], [260, 360, '#fff'],
]

// 섬 윗면 윤곽. dy만큼 내려 그리면 흙 단면이 된다.
export function islandPath(dy = 0) {
  const p = (x, y) => `${x} ${y + dy}`
  return `M${p(30, 150)} Q${p(18, 110)} ${p(55, 92)} L${p(150, 50)} Q${p(195, 34)} ${p(238, 52)} L${p(330, 84)}
    Q${p(368, 100)} ${p(364, 150)} L${p(368, 300)} Q${p(368, 342)} ${p(322, 352)} L${p(210, 380)}
    Q${p(168, 390)} ${p(126, 376)} L${p(52, 350)} Q${p(22, 336)} ${p(24, 300)} Z`
}

export function Tree({ x, y, s = 1, tone = 0 }) {
  const [light, dark] = tone ? ['#6fb36a', '#5a9a57'] : ['#8fd07a', '#6db45c']
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx="0" cy="2" rx="10" ry="3.5" fill="#00000022" />
      <rect x="-2" y="-8" width="4" height="10" rx="2" fill="#8c5a49" />
      <circle cx="0" cy="-16" r="11" fill={dark} />
      <circle cx="-2" cy="-18" r="9" fill={light} />
    </g>
  )
}

// 점들을 부드럽게 잇는 길(Catmull-Rom → 베지어)
function smoothPath(pts) {
  if (pts.length < 2) return ''
  let d = `M${pts[0].x} ${pts[0].y + 12}`
  const P = pts.map((p) => ({ x: p.x, y: p.y + 12 }))
  for (let i = 0; i < P.length - 1; i++) {
    const p0 = P[i - 1] ?? P[i]
    const p1 = P[i]
    const p2 = P[i + 1]
    const p3 = P[i + 2] ?? p2
    const c1 = { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 }
    const c2 = { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 }
    d += ` C${c1.x} ${c1.y} ${c2.x} ${c2.y} ${p2.x} ${p2.y}`
  }
  return d
}

function Flag({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="0" y="-30" width="3" height="30" fill="#6e4135" />
      <path d="M3 -30 h20 l-5 7 l5 7 h-20z" fill="#7cc456" />
      <path d="M8 -24 l3 3 l6 -6" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  )
}

// 떠 있는 섬 지도. 장소마다 건물이 있고, 완료=깃발, 다음 목적지=둥둥 뜨는 노란 이름표, 잠김=회색 건물.
export default function IslandMap({ quests, statusOf, onOpen }) {
  const shown = quests.slice(0, SPOTS.length)
  const route = smoothPath(SPOTS.slice(0, shown.length))

  return (
    <div className="island" style={{ aspectRatio: `${W} / ${H}` }}>
      <svg viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
        <defs>
          <filter id="island-locked">
            <feColorMatrix type="saturate" values="0.05" />
            <feComponentTransfer>
              <feFuncR type="linear" slope=".55" intercept=".38" />
              <feFuncG type="linear" slope=".5" intercept=".36" />
              <feFuncB type="linear" slope=".5" intercept=".44" />
            </feComponentTransfer>
          </filter>
        </defs>
        <ellipse cx="200" cy="412" rx="150" ry="14" fill="#6f5196" opacity=".45" />
        <path d={islandPath(34)} fill="#6e4135" />
        <path d={islandPath(22)} fill="#8c5a49" />
        <path d={islandPath(8)} fill="#7dbb52" />
        <path d={islandPath()} fill="#9bd16a" />
        <path d={route} fill="none" stroke="#c9e38f" strokeWidth="18" strokeLinecap="round" />
        <path d={route} fill="none" stroke="#e6f2b8" strokeWidth="12" strokeLinecap="round" />
        <path d={route} fill="none" stroke="#c3b07c" strokeWidth="2.5" strokeDasharray="1 9" strokeLinecap="round" />
        <ellipse cx="330" cy="318" rx="22" ry="11" fill="#8fd3e6" />
        <ellipse cx="326" cy="315" rx="14" ry="5" fill="#bde9f4" />
        {TREES.map(([x, y, s, t]) => (
          <Tree key={`${x}-${y}`} x={x} y={y} s={s} tone={t} />
        ))}
        {FLOWERS.map(([x, y, c]) => (
          <g key={`${x}-${y}`}>
            <circle cx={x} cy={y} r="2.2" fill={c} />
            <rect x={x - 0.6} y={y + 1} width="1.2" height="4" fill="#5d9a45" />
          </g>
        ))}
        {shown.map((q, i) => {
          const { x, y } = SPOTS[i]
          const status = statusOf(q.id)
          return (
            <g key={q.id}>
              <g
                transform={`translate(${x} ${y})`}
                filter={status === 'locked' ? 'url(#island-locked)' : undefined}
              >
                <Landmark type={q.landmark} />
              </g>
              {status === 'done' && <Flag x={x + 22} y={y - 2} />}
            </g>
          )
        })}
      </svg>

      {shown.map((q, i) => {
        const { x, y } = SPOTS[i]
        const status = statusOf(q.id)
        const lift = LANDMARK_HEIGHT[q.landmark] ?? 66
        const label =
          status === 'locked' ? '🔒 ???' : `${status === 'done' ? '✓ ' : ''}${pad(i + 1)} ${q.short ?? q.place}`
        return (
          <button
            key={q.id}
            type="button"
            className={`island-spot is-${status}`}
            // 버튼 아래쪽이 건물 바닥에 오도록 두고, 이름표는 건물 키만큼 위에 뜬다
            style={{ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` }}
            disabled={status === 'locked'}
            aria-label={`${pad(i + 1)}번 퀘스트, ${status === 'done' ? '완료' : status === 'current' ? '도전 가능' : '잠김'}`}
            onClick={() => onOpen(q.id)}
          >
            <span className="island-bubble">{label}</span>
            {/* 이름표 아래 건물 부분까지 눌리도록 */}
            <span className="island-hit" style={{ height: `calc(${lift - 4} / ${W} * 100cqw)` }} />
          </button>
        )
      })}
    </div>
  )
}
