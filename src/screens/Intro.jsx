import { useState } from 'react'
import { site } from '../data/quests.js'
import HeroArt from '../components/HeroArt.jsx'

export default function Intro({ initialNickname, onStart }) {
  const [nickname, setNickname] = useState(initialNickname)

  return (
    <section className="intro">
      <div className="eyebrow">{site.eyebrow}</div>
      <h1 className="hero-title">
        {site.titleLine1}
        <br />
        <em>{site.titleLine2}</em>
      </h1>
      <p className="intro-copy">{site.introCopy}</p>

      <HeroArt />

      <form
        className="paper-card"
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
          초대장 열기 <span aria-hidden="true">→</span>
        </button>
      </form>
    </section>
  )
}
