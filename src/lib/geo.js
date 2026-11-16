// 두 좌표 사이의 거리(m). 하버사인 공식.
export function distanceMeters(a, b) {
  const R = 6371000
  const rad = (deg) => (deg * Math.PI) / 180
  const dLat = rad(b.lat - a.lat)
  const dLng = rad(b.lng - a.lng)
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(h))
}

export function formatDistance(m) {
  return m >= 1000 ? `${(m / 1000).toFixed(1)}km` : `${Math.round(m)}m`
}

// 테스트 모드: 주소 뒤에 ?test=1 을 붙여 열면 GPS 없이 도착을 확인할 수 있다.
export const isTestMode = () =>
  typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('test') === '1'
