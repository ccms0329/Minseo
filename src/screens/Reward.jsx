import { pad } from '../components/labels.js'

// 도착 후에도 선물은 닫혀 있고, 사용자가 해제 버튼을 직접 눌러야 공개된다.
export default function Reward({ quest, index, unlocked, isLast, onUnlock, onMap, onEnding }) {
  const { gift } = quest

  return (
    <section className="reward">
      <div className="screen-head">
        <div className="eyebrow">Reward · {pad(index + 1)}</div>
        <h1 className="screen-heading">{unlocked ? gift.title : '선물이 도착했어'}</h1>
        <p className="subcopy">
          {unlocked ? quest.place + '에서 찾은 선물' : '버튼을 눌러 직접 열어 봐.'}
        </p>
      </div>

      {unlocked ? (
        <div className="gift-card is-open">
          <div className={`gift-media ${gift.image ? 'has-image' : ''}`}>
            {gift.image ? (
              <img src={gift.image} alt={gift.title} />
            ) : (
              <span className="gift-emoji" aria-hidden="true">{gift.emoji}</span>
            )}
          </div>
          <strong className="card-title">{gift.title}</strong>
          <p className="body-copy">{gift.description}</p>
        </div>
      ) : (
        <div className="gift-card">
          <div className="gift-media is-locked">
            <span className="gift-box" aria-hidden="true">🎁</span>
            <span className="gift-lock" aria-hidden="true">🔒</span>
          </div>
          <strong className="card-title">아직 잠겨 있는 선물</strong>
          <p className="body-copy">안에 뭐가 들어 있을까?</p>
        </div>
      )}

      {!unlocked ? (
        <button type="button" className="primary-button" onClick={onUnlock}>
          선물 해제하기 🔓
        </button>
      ) : isLast ? (
        <button type="button" className="primary-button" onClick={onEnding}>
          엔딩 보러 가기 🎉
        </button>
      ) : (
        <button type="button" className="primary-button" onClick={onMap}>
          지도로 돌아가기 <span aria-hidden="true">→</span>
        </button>
      )}
      {unlocked && isLast && (
        <button type="button" className="text-button" onClick={onMap}>
          지도 다시 보기
        </button>
      )}
    </section>
  )
}
