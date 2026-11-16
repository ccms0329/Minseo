import { ending, quests } from '../data/quests.js'

const CONFETTI = ['#3698c3', '#ffd166', '#e8705a', '#8fd0a0', '#a9dcf5']

export default function Ending({ nickname, onBack }) {
  return (
    <section className="ending">
      <div className="confetti" aria-hidden="true">
        {Array.from({ length: 28 }, (_, i) => (
          <i
            key={i}
            style={{
              left: `${(i * 37) % 100}%`,
              background: CONFETTI[i % CONFETTI.length],
              animationDelay: `${(i % 7) * 0.35}s`,
              animationDuration: `${3.2 + (i % 5) * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="eyebrow">{ending.eyebrow}</div>
      <div className="ending-cake" aria-hidden="true">🎂</div>
      <h1 className="hero-title">
        {nickname ? `${nickname},` : 'HAPPY'}
        <br />
        <em>{nickname ? ending.title : 'BIRTHDAY!'}</em>
      </h1>
      <p className="intro-copy">{ending.message}</p>
      {ending.from && <p className="ending-from">— {ending.from}</p>}

      <div className="paper-card">
        <span className="destination-overline">오늘 모은 선물</span>
        <ul className="gift-list">
          {quests.map((q) => (
            <li key={q.id}>
              <span aria-hidden="true">{q.gift.emoji}</span>
              <span>
                <strong>{q.gift.title}</strong>
                <small>{q.place}</small>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <button type="button" className="text-button" onClick={onBack}>
        지도 다시 보기
      </button>
    </section>
  )
}
