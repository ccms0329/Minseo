const ORDINALS = ['첫', '두', '세', '네', '다섯', '여섯', '일곱', '여덟', '아홉', '열']

export const pad = (n) => String(n).padStart(2, '0')
export const ordinal = (index) => `${ORDINALS[index] ?? index + 1} 번째`
