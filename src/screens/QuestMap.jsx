import { quests } from '../data/quests.js'
import IslandMap from '../components/IslandMap.jsx'
import { pad } from '../components/labels.js'

// 스탬프용 굵은 체크 아이콘
function CheckIcon() {
  return (
    <svg className="stamp-check" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12.5 L10 17.5 L19 7" fill="none" stroke="currentColor" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function QuestMap({ game, onOpen, onEnding, onReset }) {
  const { progress, statusOf, doneCount, allDone } = game
  const total = quests.length
  const current = quests.find((q) => statusOf(q.id) === 'current')
  const name = progress.nickname || '친구'

  return (
    <section>
      <div className="panel map-head">
        <div className="map-head-row">
          <h1 className="map-title">{name}의 생일 모험</h1>
          <span className="tag">
            {doneCount} / {total}
          </span>
        </div>
        <div
          className="segments"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={doneCount}
          aria-label="찾은 선물"
        >
          {quests.map((q) => (
            <span key={q.id} className={statusOf(q.id) === 'done' ? 'is-on' : ''} />
          ))}
        </div>
        <p className="map-sub">
          {allDone
            ? `${total}개의 발자국을 모두 모았어!`
            : doneCount === 0
              ? '물음표를 눌러 첫 번째 장소의 힌트를 확인해 봐.'
              : `선물 ${doneCount}개를 찾았어. 다음 물음표로 가 보자!`}
        </p>
      </div>

      <IslandMap quests={quests} statusOf={statusOf} onOpen={onOpen} />

      {allDone ? (
        <button type="button" className="panel next-card" onClick={onEnding}>
          <span className="next-badge is-party" aria-hidden="true">🎉</span>
          <span className="next-copy">
            <span className="tag is-terra">ALL CLEAR</span>
            <strong>마지막 축하가 남아 있어</strong>
            <small>엔딩 보러 가기</small>
          </span>
          <span className="next-arrow" aria-hidden="true">▶</span>
        </button>
      ) : (
        current && (
          <button type="button" className="panel next-card" onClick={() => onOpen(current.id)}>
            <span className="next-badge" aria-hidden="true">?</span>
            <span className="next-copy">
              <span className="tag is-terra">NEXT · {pad(quests.indexOf(current) + 1)}</span>
              <strong>{current.place}</strong>
              <small>{current.hint}</small>
            </span>
            <span className="next-arrow" aria-hidden="true">▶</span>
          </button>
        )
      )}

      <div className="panel stamp-board">
        <div className="stamp-head">
          <span>모은 스탬프</span>
          <span>
            {doneCount} / {total}
          </span>
        </div>
        <div className="stamps" style={{ gridTemplateColumns: `repeat(${total}, 1fr)` }}>
          {quests.map((q, i) => {
            const status = statusOf(q.id)
            return (
              <button
                key={q.id}
                type="button"
                className={`stamp is-${status}`}
                disabled={status === 'locked'}
                aria-label={`${pad(i + 1)}번 퀘스트`}
                onClick={() => onOpen(q.id)}
              >
                {status === 'done' ? <CheckIcon /> : status === 'current' ? '?' : i + 1}
              </button>
            )
          })}
        </div>
      </div>

      <div className="footer-actions">
        <button
          type="button"
          className="small-button"
          onClick={() => {
            if (window.confirm('진행 상황을 모두 지우고 처음부터 다시 시작할까?')) onReset()
          }}
        >
          ↺ 처음부터 다시
        </button>
      </div>
    </section>
  )
}
