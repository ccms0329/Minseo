import { useEffect, useState } from 'react'
import { quests, site } from './data/quests.js'
import { useProgress } from './hooks/useProgress.js'
import { isTestMode } from './lib/geo.js'
import Intro from './screens/Intro.jsx'
import QuestMap from './screens/QuestMap.jsx'
import QuestDetail from './screens/QuestDetail.jsx'
import Location from './screens/Location.jsx'
import Reward from './screens/Reward.jsx'
import Ending from './screens/Ending.jsx'

// 화면 흐름: intro → map → detail → location → reward → (map | ending)
export default function App() {
  const game = useProgress()
  const [testMode] = useState(isTestMode)
  const [screen, setScreen] = useState(() => ({
    name: game.progress.started ? 'map' : 'intro',
    questId: null,
  }))

  const go = (name, questId = null) => setScreen({ name, questId })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [screen])

  const index = quests.findIndex((q) => q.id === screen.questId)
  const quest = quests[index]
  const status = quest ? game.statusOf(quest.id) : null

  let view
  if (screen.name === 'intro' || !game.progress.started) {
    view = (
      <Intro
        initialNickname={game.progress.nickname}
        onStart={(nickname) => {
          game.start(nickname)
          go('map')
        }}
      />
    )
  } else if (screen.name === 'ending' && game.allDone) {
    view = <Ending nickname={game.progress.nickname} onBack={() => go('map')} />
  } else if (!quest || status === 'locked' || screen.name === 'map') {
    // 잠긴 퀘스트나 알 수 없는 화면은 항상 지도로 돌려보낸다.
    view = (
      <QuestMap
        game={game}
        onOpen={(id) => go('detail', id)}
        onEnding={() => go('ending')}
        onReset={() => {
          game.reset()
          go('intro')
        }}
      />
    )
  } else if (screen.name === 'location') {
    view = (
      <Location
        quest={quest}
        index={index}
        arrived={game.hasArrived(quest.id)}
        testMode={testMode}
        onArrive={() => game.markArrived(quest.id)}
        onBack={() => go('detail', quest.id)}
        onReward={() => go('reward', quest.id)}
      />
    )
  } else if (screen.name === 'reward' && (game.hasArrived(quest.id) || status === 'done')) {
    view = (
      <Reward
        quest={quest}
        index={index}
        unlocked={status === 'done'}
        isLast={index === quests.length - 1}
        onUnlock={() => game.complete(quest.id)}
        onMap={() => go('map')}
        onEnding={() => go('ending')}
      />
    )
  } else {
    view = (
      <QuestDetail
        quest={quest}
        index={index}
        status={status}
        onBack={() => go('map')}
        onLocation={() => go('location', quest.id)}
        onReward={() => go('reward', quest.id)}
      />
    )
  }

  return (
    <div className="app-shell">
      <main className="quest-frame">
        <header className="topline">
          <div className="brand-mark">
            <span className="brand-seal" aria-hidden="true">♥</span>
            <span>{site.brand}</span>
          </div>
        </header>
        {testMode && (
          <div className="test-ribbon">테스트 모드 · GPS 없이 도착을 확인할 수 있어</div>
        )}
        <div key={`${screen.name}-${screen.questId}`} className="screen">
          {view}
        </div>
      </main>
    </div>
  )
}
