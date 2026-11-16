import { useCallback, useEffect, useRef, useState } from 'react'

const ERROR_MESSAGES = {
  unsupported: '이 브라우저에서는 위치 확인을 쓸 수 없어. 다른 브라우저로 열어 봐.',
  insecure: '위치 확인은 https 주소에서만 동작해.',
  denied: '위치 권한이 꺼져 있어. 브라우저 설정에서 이 사이트의 위치 권한을 허용한 뒤 다시 눌러 줘.',
  unavailable: '지금은 위치를 잡을 수 없어. 하늘이 보이는 곳에서 다시 시도해 봐.',
  timeout: '위치를 찾는 데 시간이 너무 오래 걸려. 다시 시도해 봐.',
}

// 현재 위치 추적. 권한 요청은 사용자가 버튼을 눌러 start()를 부를 때만 한다.
// status: 'idle' | 'locating' | 'tracking' | 'error'
export function useGeolocation() {
  const [state, setState] = useState({ status: 'idle', position: null, error: null })
  const watchId = useRef(null)

  const stop = useCallback(() => {
    if (watchId.current !== null) {
      navigator.geolocation.clearWatch(watchId.current)
      watchId.current = null
    }
  }, [])

  const start = useCallback(() => {
    const fail = (code) =>
      setState((s) => ({ ...s, status: 'error', error: { code, message: ERROR_MESSAGES[code] } }))

    if (!('geolocation' in navigator)) return fail('unsupported')
    if (!window.isSecureContext) return fail('insecure')

    stop()
    setState((s) => ({ ...s, status: 'locating', error: null }))
    watchId.current = navigator.geolocation.watchPosition(
      (pos) =>
        setState({
          status: 'tracking',
          error: null,
          position: {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            accuracy: pos.coords.accuracy,
            timestamp: pos.timestamp,
          },
        }),
      (err) => {
        // 이미 위치를 받고 있는 중의 일시적인 실패는 무시하고 마지막 위치를 유지한다.
        if (err.code === err.PERMISSION_DENIED) {
          stop()
          fail('denied')
        } else {
          setState((s) =>
            s.position
              ? s
              : {
                  ...s,
                  status: 'error',
                  error: {
                    code: err.code === err.TIMEOUT ? 'timeout' : 'unavailable',
                    message: ERROR_MESSAGES[err.code === err.TIMEOUT ? 'timeout' : 'unavailable'],
                  },
                },
          )
        }
      },
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 20000 },
    )
  }, [stop])

  useEffect(() => stop, [stop])

  return { ...state, start, stop }
}
