import { useEffect } from 'react'
import KakaoMap from '../components/KakaoMap.jsx'
import { pad } from '../components/labels.js'
import { useGeolocation } from '../hooks/useGeolocation.js'
import { distanceMeters, formatDistance } from '../lib/geo.js'

// GPS로 목적지 반경 안에 들어왔는지 확인한다.
// 반경 안이 확인되면 도착으로 기록하고, 선물 해제는 다음 화면에서 직접 누른다.
export default function Location({ quest, index, arrived, testMode, onArrive, onBack, onReward }) {
  const geo = useGeolocation()
  const distance = geo.position ? distanceMeters(geo.position, quest) : null
  const inside = distance !== null && distance <= quest.radius

  useEffect(() => {
    if (inside && !arrived) onArrive()
  }, [inside, arrived, onArrive])

  // 거리 막대: 반경의 5배 거리부터 채워지기 시작해 반경 안에서 가득 찬다.
  const closeness =
    distance === null ? 0 : Math.max(0, Math.min(1, 1 - (distance - quest.radius) / (quest.radius * 4)))

  let title
  let line
  if (arrived) {
    title = '도착 확인 완료!'
    line = '이제 선물을 열 수 있어. 해제 버튼은 다음 화면에 있어.'
  } else if (geo.status === 'error') {
    title = '위치를 확인하지 못했어'
    line = geo.error.message
  } else if (geo.status === 'locating') {
    title = '위치를 찾는 중...'
    line = '위치 권한을 물어보면 허용을 눌러 줘.'
  } else if (distance !== null) {
    title = `목적지까지 ${formatDistance(distance)}`
    line = `${formatDistance(Math.max(0, distance - quest.radius))} 더 가까이 가면 인증돼. 걸어가는 동안 거리가 자동으로 바뀌어.`
  } else {
    title = `반경 ${quest.radius}m 안에 도착해야 해`
    line = '목적지 근처에 왔다면 아래 버튼으로 내 위치를 확인해 봐.'
  }

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

      <KakaoMap quest={quest} position={geo.position} />

      <div className={`location-card ${arrived ? 'is-arrived' : ''}`}>
        <span className="destination-overline">GPS CHECK</span>
        <strong className="card-title" aria-live="polite">{title}</strong>
        <p className="status-line">{line}</p>

        {!arrived && distance !== null && (
          <div className="radar">
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${closeness * 100}%` }} />
            </div>
            <div className="radar-meta">
              <span>GPS 오차 약 ±{Math.round(geo.position.accuracy)}m</span>
              <span>인증 범위 {quest.radius}m</span>
            </div>
            {geo.position.accuracy > quest.radius && (
              <p className="radar-note">
                GPS 신호가 약해서 거리가 부정확할 수 있어. 실외에서 잠시 기다려 봐.
              </p>
            )}
          </div>
        )}

        {arrived ? (
          <button type="button" className="primary-button" onClick={onReward}>
            선물 확인하러 가기 🎁
          </button>
        ) : geo.status === 'locating' || geo.status === 'tracking' ? (
          <button type="button" className="primary-button" disabled>
            {geo.status === 'locating' ? '위치 찾는 중...' : '위치 확인 중 · 자동 갱신'}
          </button>
        ) : (
          <button type="button" className="primary-button" onClick={geo.start}>
            {geo.status === 'error' ? '다시 시도하기' : '내 위치 확인하기'} 📡
          </button>
        )}

        {testMode && !arrived && (
          <>
            <button type="button" className="primary-button is-temp" onClick={onArrive}>
              테스트: 도착한 것으로 처리
            </button>
            {!quest.coordsVerified && (
              <p className="radar-note">
                이 장소의 좌표는 아직 추정치야. 실제 인증 전에 quests.js의 좌표를 확인해야 해.
              </p>
            )}
          </>
        )}
      </div>
    </section>
  )
}
