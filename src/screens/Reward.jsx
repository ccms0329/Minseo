import { pad } from '../components/labels.js'

const CONFETTI = [
  ['8%', '14%', '#ffc94a', 20],
  ['86%', '12%', '#7cc456', -30],
  ['14%', '76%', '#f0a3a0', 40],
  ['84%', '70%', '#fff', -15],
  ['6%', '48%', '#7fb6c9', -50],
  ['92%', '44%', '#cf7f60', 25],
]

// 도착 후에도 선물은 닫혀 있고, 사용자가 해제 버튼을 직접 눌러야 공개된다.
export default function Reward({ quest, index, unlocked, isLast, onUnlock, onMap, onEnding }) {
  const { gift } = quest

  return (
    <section className={`reward ${unlocked ? 'is-open' : ''}`}>
      {unlocked && <div className="rays" aria-hidden="true" />}
      {unlocked && (
        <div className="reward-confetti" aria-hidden="true">
          {CONFETTI.map(([left, top, bg, r]) => (
            <i key={left + top} style={{ left, top, background: bg, transform: `rotate(${r}deg)` }} />
          ))}
        </div>
      )}

      <div className="ribbon">{unlocked ? '선물 획득!' : '선물 도착!'}</div>

      <div className={`panel gift-card ${unlocked ? 'is-open' : ''}`}>
        {unlocked ? (
          <div className="gift-media">
            {gift.image ? (
              <img src={gift.image} alt={gift.title} />
            ) : (
              <span className="gift-emoji" aria-hidden="true">{gift.emoji}</span>
            )}
          </div>
        ) : (
          <div className="gift-media is-locked">
            <span className="gift-box" aria-hidden="true">🎁</span>
            <span className="gift-lock" aria-hidden="true">🔒</span>
          </div>
        )}
        <span className="tag">
          {pad(index + 1)} · {quest.place}
        </span>
        <strong className="gift-title">{unlocked ? gift.title : '아직 잠겨 있는 선물'}</strong>
        <p className="body-copy">{unlocked ? gift.description : '버튼을 눌러 직접 열어 봐. 안에 뭐가 들어 있을까?'}</p>
      </div>

      {!unlocked ? (
        <button type="button" className="primary-button is-gold" onClick={onUnlock}>
          선물 해제하기 🔓
        </button>
      ) : isLast ? (
        <button type="button" className="primary-button is-gold" onClick={onEnding}>
          엔딩 보러 가기 🎉
        </button>
      ) : (
        <button type="button" className="primary-button" onClick={onMap}>
          지도로 돌아가기 <span aria-hidden="true">▶</span>
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
