import { useCallback, useEffect, useState } from 'react'
import { quests } from '../data/quests.js'

const STORAGE_KEY = 'birthday-quest-progress-v1'

const emptyProgress = { started: false, nickname: '', arrived: [], completed: [] }

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyProgress
    const saved = JSON.parse(raw)
    const known = new Set(quests.map((q) => q.id))
    return {
      started: Boolean(saved.started),
      nickname: typeof saved.nickname === 'string' ? saved.nickname : '',
      arrived: Array.isArray(saved.arrived) ? saved.arrived.filter((id) => known.has(id)) : [],
      completed: Array.isArray(saved.completed)
        ? saved.completed.filter((id) => known.has(id))
        : [],
    }
  } catch {
    return emptyProgress
  }
}

// 퀘스트 진행 상황. 새로고침해도 유지되도록 LocalStorage에 저장한다.
export function useProgress() {
  const [progress, setProgress] = useState(load)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
    } catch {
      // 저장이 막힌 환경(사생활 보호 모드 등)에서도 화면은 계속 동작한다.
    }
  }, [progress])

  // 'done' | 'current' | 'locked' — 앞의 퀘스트를 모두 끝내야 다음이 열린다.
  const statusOf = useCallback(
    (questId) => {
      if (progress.completed.includes(questId)) return 'done'
      const index = quests.findIndex((q) => q.id === questId)
      const previousDone = quests.slice(0, index).every((q) => progress.completed.includes(q.id))
      return previousDone ? 'current' : 'locked'
    },
    [progress.completed],
  )

  const start = useCallback((nickname) => {
    setProgress((p) => ({ ...p, started: true, nickname: nickname.trim() }))
  }, [])

  const markArrived = useCallback((questId) => {
    setProgress((p) =>
      p.arrived.includes(questId) ? p : { ...p, arrived: [...p.arrived, questId] },
    )
  }, [])

  const complete = useCallback((questId) => {
    setProgress((p) =>
      p.completed.includes(questId) ? p : { ...p, completed: [...p.completed, questId] },
    )
  }, [])

  const reset = useCallback(() => setProgress(emptyProgress), [])

  const doneCount = quests.filter((q) => progress.completed.includes(q.id)).length

  return {
    progress,
    statusOf,
    hasArrived: (questId) => progress.arrived.includes(questId),
    doneCount,
    allDone: doneCount === quests.length,
    start,
    markArrived,
    complete,
    reset,
  }
}
