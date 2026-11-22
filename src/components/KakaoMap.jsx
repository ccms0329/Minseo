import { useEffect, useRef, useState } from 'react'
import { kakaoDirectionsUrl, loadKakaoMaps } from '../lib/kakao.js'

// 목적지(물음표 핀 + 인증 반경 원)와 내 위치(파란 점)를 보여 주는 실제 지도.
export default function KakaoMap({ quest, position }) {
  const box = useRef(null)
  const map = useRef(null)
  const me = useRef(null)
  const fitted = useRef(false)
  const [state, setState] = useState('loading') // 'loading' | 'ready' | 'error'

  // 지도와 목적지 표시
  useEffect(() => {
    let cancelled = false
    loadKakaoMaps()
      .then((kakao) => {
        if (cancelled || !box.current) return
        const dest = new kakao.maps.LatLng(quest.lat, quest.lng)
        const m = new kakao.maps.Map(box.current, { center: dest, level: 3 })
        m.addControl(new kakao.maps.ZoomControl(), kakao.maps.ControlPosition.RIGHT)

        new kakao.maps.Circle({
          map: m,
          center: dest,
          radius: quest.radius,
          strokeWeight: 2,
          strokeColor: '#3698c3',
          strokeOpacity: 0.9,
          strokeStyle: 'dash',
          fillColor: '#3698c3',
          fillOpacity: 0.12,
        })

        const pin = document.createElement('div')
        pin.className = 'kmap-pin'
        pin.innerHTML = '<span>?</span>'
        new kakao.maps.CustomOverlay({ map: m, position: dest, content: pin, yAnchor: 1 })

        map.current = m
        fitted.current = false
        setState('ready')
      })
      .catch(() => !cancelled && setState('error'))
    return () => {
      cancelled = true
      map.current = null
      me.current = null
    }
  }, [quest])

  // 내 위치 표시. 처음 위치를 받으면 목적지와 함께 한 화면에 들어오게 맞춘다.
  useEffect(() => {
    const kakao = window.kakao
    if (state !== 'ready' || !position || !map.current) return
    const here = new kakao.maps.LatLng(position.lat, position.lng)
    if (!me.current) {
      const dot = document.createElement('div')
      dot.className = 'kmap-me'
      dot.title = '내 위치'
      me.current = new kakao.maps.CustomOverlay({ map: map.current, position: here, content: dot, zIndex: 3 })
    } else {
      me.current.setPosition(here)
    }
    if (!fitted.current) {
      const bounds = new kakao.maps.LatLngBounds()
      bounds.extend(here)
      bounds.extend(new kakao.maps.LatLng(quest.lat, quest.lng))
      map.current.setBounds(bounds, 60, 40, 60, 40)
      fitted.current = true
    }
  }, [state, position, quest])

  const recenter = () => {
    const kakao = window.kakao
    if (!map.current) return
    if (position) {
      const bounds = new kakao.maps.LatLngBounds()
      bounds.extend(new kakao.maps.LatLng(position.lat, position.lng))
      bounds.extend(new kakao.maps.LatLng(quest.lat, quest.lng))
      map.current.setBounds(bounds, 60, 40, 60, 40)
    } else {
      map.current.setLevel(3)
      map.current.setCenter(new kakao.maps.LatLng(quest.lat, quest.lng))
    }
  }

  return (
    <div className="kmap">
      <div ref={box} className="kmap-canvas" />
      {state === 'loading' && <div className="kmap-cover">지도를 불러오는 중...</div>}
      {state === 'error' && (
        <div className="kmap-cover is-error">
          <span aria-hidden="true">🗺️</span>
          <strong>지도를 불러오지 못했어</strong>
          <span>아래 카카오맵 길찾기로 위치를 확인할 수 있어.</span>
        </div>
      )}
      {state === 'ready' && (
        <button type="button" className="kmap-recenter" onClick={recenter}>
          {position ? '나와 목적지 보기' : '목적지 보기'}
        </button>
      )}
      <a className="kmap-link" href={kakaoDirectionsUrl(quest)} target="_blank" rel="noreferrer">
        카카오맵 길찾기 ↗
      </a>
    </div>
  )
}
