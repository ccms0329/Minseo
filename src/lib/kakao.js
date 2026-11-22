import { KAKAO_JS_KEY } from '../config.js'

let loading = null

// 카카오맵 SDK를 한 번만 불러온다. 실패하면 다음 호출 때 다시 시도한다.
export function loadKakaoMaps() {
  if (window.kakao?.maps?.LatLng) return Promise.resolve(window.kakao)
  if (loading) return loading

  loading = new Promise((resolve, reject) => {
    if (!KAKAO_JS_KEY) {
      reject(new Error('no-key'))
      return
    }
    const script = document.createElement('script')
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_JS_KEY}&autoload=false&libraries=services`
    script.async = true
    const timer = setTimeout(() => reject(new Error('timeout')), 15000)
    script.onload = () => {
      // 도메인이 등록되지 않았으면 스크립트는 받아지지만 kakao 객체가 생기지 않는다.
      if (!window.kakao?.maps?.load) {
        clearTimeout(timer)
        reject(new Error('domain'))
        return
      }
      window.kakao.maps.load(() => {
        clearTimeout(timer)
        resolve(window.kakao)
      })
    }
    script.onerror = () => {
      clearTimeout(timer)
      reject(new Error('network'))
    }
    document.head.appendChild(script)
  }).catch((err) => {
    loading = null
    document.querySelectorAll('script[src*="dapi.kakao.com"]').forEach((s) => s.remove())
    throw err
  })

  return loading
}

// SDK 없이도 동작하는 카카오맵 길찾기 링크(앱이 있으면 앱, 없으면 웹으로 열린다).
export const kakaoDirectionsUrl = (quest) =>
  `https://map.kakao.com/link/to/${encodeURIComponent(quest.place)},${quest.lat},${quest.lng}`
