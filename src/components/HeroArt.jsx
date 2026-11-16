import { site } from '../data/quests.js'

// 첫 화면 배너. site.heroImage가 있으면 그 이미지를, 없으면 기본 일러스트를 보여 준다.
export default function HeroArt() {
  return (
    <div className="hero-art">
      {site.heroImage ? (
        <img className="hero-photo" src={site.heroImage} alt="" />
      ) : (
        <svg className="hero-photo" viewBox="0 0 390 203" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#a9dcf5" />
              <stop offset="1" stopColor="#dff3fc" />
            </linearGradient>
          </defs>
          <rect width="390" height="203" fill="url(#sky)" />
          <g fill="#fff" opacity=".9">
            <ellipse cx="60" cy="38" rx="30" ry="10" />
            <ellipse cx="80" cy="30" rx="18" ry="10" />
            <ellipse cx="345" cy="52" rx="26" ry="8" />
            <ellipse cx="170" cy="168" rx="24" ry="7" />
          </g>
          <path d="M0 180 Q90 150 190 176 T390 160 V203 H0Z" fill="#bfe6c8" />
          <path d="M0 192 Q120 172 240 190 T390 182 V203 H0Z" fill="#9fd6ae" />
          {/* 보물 지도 */}
          <g transform="translate(250 62) rotate(8)">
            <rect x="0" y="0" width="112" height="84" rx="8" fill="#fff7df" stroke="#d9b877" strokeWidth="2.5" />
            <path d="M14 62 C30 30 46 70 62 40 S84 26 96 22" fill="none" stroke="#3698c3" strokeWidth="3" strokeDasharray="1 8" strokeLinecap="round" />
            <circle cx="14" cy="62" r="5" fill="#3698c3" />
            <path d="M90 16 l12 12 M102 16 l-12 12" stroke="#e8705a" strokeWidth="4" strokeLinecap="round" />
            <path d="M30 20 l8 -10 l8 10z M40 22 l6 -8 l6 8z" fill="#9fd6ae" />
          </g>
          {/* 선물 상자 */}
          <g transform="translate(226 118)">
            <rect x="0" y="16" width="52" height="40" rx="5" fill="#ffd166" />
            <rect x="-4" y="6" width="60" height="14" rx="4" fill="#ffbf3f" />
            <rect x="21" y="6" width="10" height="50" fill="#e8705a" />
            <path d="M26 6 C10 -12 2 4 26 6 C50 4 42 -12 26 6Z" fill="#e8705a" />
          </g>
          <g fill="#ffd166">
            <path d="M212 70 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3z" />
            <path d="M372 150 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2z" />
          </g>
        </svg>
      )}
      <div className="hero-speech">
        {site.heroSpeech.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </div>
    </div>
  )
}
