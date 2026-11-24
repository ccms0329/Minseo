import { quests } from '../data/quests.js'
import IllustratedMap from '../components/IllustratedMap.jsx'
import { ordinal, pad } from '../components/labels.js'

export default function QuestMap({ game, onOpen, onEnding, onReset }) {
  const { progress, statusOf, doneCount, allDone } = game
  const total = quests.length
  const current = quests.find((q) => statusOf(q.id) === 'current')
  const name = progress.nickname || '친구'

  return (
    <section>
      <div className="screen-head">
        <div className="eyebrow">Quest map</div>
        <h1 className="screen-heading">
          {name}의
          <br />
          Birthday quest
        </h1>
        <p className="subcopy">
          {allDone
            ? '모든 선물을 찾았어. 마지막 화면이 기다리고 있어!'
            : '물음표를 눌러 다음 장소의 힌트를 확인해 봐.'}
        </p>
      </div>

      <div className="progress-strip">
        <div className="progress-count">
          {doneCount}
          <span>/{total}</span>
        </div>
        <div className="progress-meta">
          <strong>{allDone ? 'Complete!' : 'Collecting...'}</strong>
          <span>
            {doneCount === 0
              ? '첫 번째 발자국을 시작해 봐'
              : allDone
                ? `${total}개의 발자국을 모두 모았어`
                : `선물 ${doneCount}개를 찾았어`}
          </span>
          <div
            className="progress-track"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={total}
            aria-valuenow={doneCount}
          >
            <div className="progress-fill" style={{ width: `${(doneCount / total) * 100}%` }} />
          </div>
        </div>
        <span className="progress-icon" aria-hidden="true">👣</span>
      </div>

      <section className="journey-section" aria-label="Treasure Map">
        <div className="journey-heading">
          <div>
            <span className="journey-kicker">THE LITTLE JOURNEY</span>
            <h2>Treasure Map</h2>
          </div>
          <span className="journey-count">{total}개의 퀘스트</span>
        </div>

        <IllustratedMap quests={quests} statusOf={statusOf} onOpen={onOpen} />

        <ol className="journey-stages">
          {quests.map((quest, i) => {
            const status = statusOf(quest.id)
            const locked = status === 'locked'
            return (
              <li key={quest.id}>
                <button
                  type="button"
                  className={`journey-stage is-${status}`}
                  disabled={locked}
                  onClick={() => onOpen(quest.id)}
                >
                  <span className="journey-stage-symbol" aria-hidden="true">
                    {status === 'done' ? '✓' : locked ? '?' : pad(i + 1)}
                  </span>
                  <span className="journey-stage-copy">
                    <span className="journey-stage-topline">
                      <span>
                        {pad(i + 1)} · {locked ? '아직 비밀인 장소' : `${ordinal(i)} 퀘스트`}
                      </span>
                      <span className="journey-stage-status">
                        {status === 'done' ? '선물 획득' : locked ? '잠겨 있어' : '다음 목적지'}
                      </span>
                    </span>
                    <strong>{locked ? '앞의 퀘스트를 먼저 끝내야 해' : quest.place}</strong>
                  </span>
                </button>
              </li>
            )
          })}
        </ol>
      </section>

      {allDone ? (
        <div className="location-card">
          <span className="destination-overline">ALL QUESTS CLEAR</span>
          <strong className="card-title">마지막 축하가 남아 있어</strong>
          <button type="button" className="primary-button" onClick={onEnding}>
            엔딩 보러 가기 🎉
          </button>
        </div>
      ) : (
        current && (
          <div className="location-card">
            <span className="destination-overline">
              NEXT DESTINATION · {pad(quests.indexOf(current) + 1)}
            </span>
            <strong className="card-title">{current.place}</strong>
            <p className="status-line">{current.hint}</p>
            <button type="button" className="primary-button" onClick={() => onOpen(current.id)}>
              퀘스트 열기 <span aria-hidden="true">→</span>
            </button>
          </div>
        )
      )}

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
