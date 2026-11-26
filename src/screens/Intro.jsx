import { useState } from 'react'
import { site } from '../data/quests.js'
import TreasureScroll from '../components/TreasureScroll.jsx'

export default function Intro({ initialNickname, onStart }) {
  const [nickname, setNickname] = useState(initialNickname)

  return (
    <section className="intro">
      <div className="eyebrow">{site.eyebrow}</div>
      <h1 className="logo">
        <span className="logo-gold">{site.titleLine1}</span>
        <br />
        <span className="logo-gold">{site.titleGold}</span>
        {site.titleWhite}
      </h1>
      <p className="intro-copy">{site.introCopy}</p>

      <TreasureScroll />

      <form
        className="panel"
        onSubmit={(e) => {
          e.preventDefault()
          onStart(nickname)
        }}
      >
        <label className="field-label" htmlFor="nickname">
          어떻게 불러줄까? <span className="muted-caption">선택 사항</span>
        </label>
        <input
          id="nickname"
          className="text-field"
          placeholder="별명이나 이름"
          maxLength={12}
          autoComplete="off"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <button type="submit" className="primary-button">
          모험 시작하기 <span aria-hidden="true">▶</span>
        </button>
      </form>
    </section>
  )
}
