import { ending, quests } from '../data/quests.js'

const CONFETTI = ['#ffc94a', '#7cc456', '#f0a3a0', '#ffffff', '#7fb6c9', '#cf7f60']

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

      <div className="ribbon">{ending.eyebrow}</div>
      <div className="ending-cake" aria-hidden="true">🎂</div>
      <h1 className="logo is-center">
        {nickname ? `${nickname},` : 'HAPPY'}
        <br />
        <span className="logo-gold">{nickname ? ending.title : 'BIRTHDAY!'}</span>
      </h1>
      <p className="intro-copy">{ending.message}</p>
      {ending.from && <p className="ending-from">— {ending.from}</p>}

      {ending.videoId && (
        <div className="panel video-card">
          <div className="video-frame">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${ending.videoId}?rel=0&playsinline=1`}
              title="생일 축하 영상"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      )}

      <div className="panel">
        <span className="overline">오늘 모은 선물</span>
        <ul className="gift-list">
          {quests.map((q) => (
            <li key={q.id}>
              <span className="gift-thumb" aria-hidden="true">
                {q.gift.image ? <img src={q.gift.image} alt="" /> : q.gift.emoji}
              </span>
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
