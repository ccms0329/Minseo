import { pad } from './labels.js'

const W = 390
const H = 430

// 퀘스트 개수에 맞춰 아래에서 위로 구불구불 올라가는 길 위에 마커를 놓는다.
function layout(count) {
  return Array.from({ length: count }, (_, i) => {
    const t = count === 1 ? 0.5 : i / (count - 1)
    return {
      x: W / 2 + Math.cos(i * Math.PI) * 105 * (i === 0 || i === count - 1 ? 0.75 : 1),
      y: H - 58 - t * (H - 120),
    }
  })
}

function trail(points) {
  return points.reduce((d, p, i) => {
    if (i === 0) return `M${p.x} ${p.y}`
    const prev = points[i - 1]
    const midY = (prev.y + p.y) / 2
    return `${d} C${prev.x} ${midY} ${p.x} ${midY} ${p.x} ${p.y}`
  }, '')
}

export default function IllustratedMap({ quests, statusOf, onOpen }) {
  const points = layout(quests.length)
  const doneCount = quests.filter((q) => statusOf(q.id) === 'done').length
  const walked = points.slice(0, Math.min(doneCount + 1, points.length))

  return (
    <div className="illustrated-map" style={{ aspectRatio: `${W} / ${H}` }}>
      <svg viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
        <rect width={W} height={H} fill="#dff2fa" />
        <path d="M0 70 Q80 40 150 78 T300 60 T390 84 V0 H0Z" fill="#c9e9f7" />
        <path d="M300 0 C250 90 350 150 300 240 S340 380 290 430 H350 C390 370 350 300 370 240 S320 90 360 0Z" fill="#b5def2" />
        <path d="M0 330 Q70 300 130 340 T250 350 V430 H0Z" fill="#cdeed6" />
        <g fill="#9cc9dd">
          <path d="M52 150 l18 -26 l18 26z M74 152 l13 -19 l13 19z" />
          <path d="M318 318 l16 -24 l16 24z" />
        </g>
        <g fill="#8fd0a0">
          <circle cx="50" cy="372" r="13" /><circle cx="70" cy="382" r="10" /><circle cx="190" cy="392" r="11" />
        </g>
        <g fill="#fff" opacity=".85">
          <ellipse cx="96" cy="36" rx="26" ry="8" /><ellipse cx="250" cy="130" rx="20" ry="6" />
        </g>
        <path d={trail(points)} fill="none" stroke="#fff" strokeWidth="9" strokeLinecap="round" />
        <path d={trail(points)} fill="none" stroke="#8fb9cc" strokeWidth="3" strokeDasharray="2 10" strokeLinecap="round" />
        <path d={trail(walked)} fill="none" stroke="#3698c3" strokeWidth="4" strokeDasharray="2 10" strokeLinecap="round" />
      </svg>

      {quests.map((quest, i) => {
        const status = statusOf(quest.id)
        const label =
          status === 'done'
            ? `${pad(i + 1)}번 퀘스트, 완료`
            : status === 'current'
              ? `${pad(i + 1)}번 퀘스트, 도전 가능`
              : `${pad(i + 1)}번 퀘스트, 잠김`
        return (
          <button
            key={quest.id}
            type="button"
            className={`map-node is-${status}`}
            style={{ left: `${(points[i].x / W) * 100}%`, top: `${(points[i].y / H) * 100}%` }}
            disabled={status === 'locked'}
            aria-label={label}
            onClick={() => onOpen(quest.id)}
          >
            <span className="map-node-face">{status === 'done' ? '✓' : '?'}</span>
            <span className="map-node-tag">{status === 'locked' ? '🔒' : pad(i + 1)}</span>
          </button>
        )
      })}
    </div>
  )
}
