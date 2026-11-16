import { ordinal, pad } from '../components/labels.js'

export default function QuestDetail({ quest, index, status, onBack, onLocation, onReward }) {
  const done = status === 'done'

  return (
    <section>
      <button type="button" className="back-link" onClick={onBack}>
        ← 지도로
      </button>
      <div className="screen-head">
        <div className="eyebrow">Quest {pad(index + 1)}</div>
        <h1 className="screen-heading">{quest.place}</h1>
        <p className="subcopy">{ordinal(index)} 퀘스트{done ? ' · 완료' : ''}</p>
      </div>

      <div className="hint-card">
        <span className="hint-badge" aria-hidden="true">?</span>
        <span className="destination-overline">HINT</span>
        <p>{quest.hint}</p>
      </div>

      <div className="paper-card">
        <span className="destination-overline">MISSION</span>
        <p className="body-copy">{quest.description}</p>
        <dl className="fact-list">
          <div>
            <dt>장소</dt>
            <dd>{quest.place}</dd>
          </div>
          <div>
            <dt>주소</dt>
            <dd>{quest.address}</dd>
          </div>
          <div>
            <dt>인증 범위</dt>
            <dd>목적지 반경 {quest.radius}m 이내</dd>
          </div>
        </dl>
      </div>

      {done ? (
        <button type="button" className="primary-button" onClick={onReward}>
          받은 선물 다시 보기 🎁
        </button>
      ) : (
        <button type="button" className="primary-button" onClick={onLocation}>
          위치 확인하러 가기 <span aria-hidden="true">→</span>
        </button>
      )}
    </section>
  )
}
