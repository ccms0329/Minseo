import { pad } from '../components/labels.js'

// 1단계: 화면 흐름만 연결한 상태.
// 실제 GPS 인증(2단계)과 카카오맵(3단계)은 아직 없어서 임시 도착 버튼으로 대신한다.
export default function Location({ quest, index, arrived, onArrive, onBack, onReward }) {
  return (
    <section>
      <button type="button" className="back-link" onClick={onBack}>
        ← 퀘스트로
      </button>
      <div className="screen-head">
        <div className="eyebrow">Location · {pad(index + 1)}</div>
        <h1 className="screen-heading">{quest.place}</h1>
        <p className="subcopy">{quest.address}</p>
      </div>

      <div className="map-placeholder">
        <span className="map-placeholder-pin" aria-hidden="true">📍</span>
        <strong>실제 지도가 들어갈 자리</strong>
        <span>현재 위치와 목적지를 보여 주는 카카오맵은 다음 단계에서 연결돼.</span>
      </div>

      <div className={`location-card ${arrived ? 'is-arrived' : ''}`}>
        <span className="destination-overline">GPS CHECK</span>
        <strong className="card-title">
          {arrived ? '도착 확인 완료!' : `반경 ${quest.radius}m 안에 도착해야 해`}
        </strong>
        <p className="status-line">
          {arrived
            ? '이제 선물을 열 수 있어. 해제 버튼은 다음 화면에 있어.'
            : 'GPS 인증은 아직 준비 중이라, 지금은 아래 임시 버튼으로 도착을 확인해.'}
        </p>
        {arrived ? (
          <button type="button" className="primary-button" onClick={onReward}>
            선물 확인하러 가기 🎁
          </button>
        ) : (
          <button type="button" className="primary-button is-temp" onClick={onArrive}>
            도착했어! (임시 확인)
          </button>
        )}
      </div>
    </section>
  )
}
