import { useEffect, useState } from 'react'
import './StarshipFlyby.css'

const FIRST_PASS_MS = 8_000
const EVERY_MS = 60_000

/** Starship spacecraft (upper stage) — stainless cylinder, black nose, canards + aft flaps. */
function StarshipMark() {
  return (
    <svg viewBox="0 0 100 168" aria-hidden="true">
      <defs>
        <linearGradient id="starship-steel" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8d8d8d" />
          <stop offset="22%" stopColor="#dedede" />
          <stop offset="46%" stopColor="#ffffff" />
          <stop offset="70%" stopColor="#cfcfcf" />
          <stop offset="100%" stopColor="#8f8f8f" />
        </linearGradient>
        <linearGradient id="starship-tps" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#2b2b2b" />
          <stop offset="55%" stopColor="#141414" />
          <stop offset="100%" stopColor="#0a0a0a" />
        </linearGradient>
        <linearGradient id="starship-plume" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>

      <g className="starship-flyby__plume">
        <ellipse cx="50" cy="154" rx="9" ry="18" fill="url(#starship-plume)" />
        <ellipse cx="50" cy="146" rx="4" ry="9" fill="#fff" opacity="0.2" />
      </g>

      {/* Aft flaps — the big landing fins */}
      <path
        fill="url(#starship-steel)"
        d="M39 104 L10 98 L6 136 L39 138 Z"
      />
      <path
        fill="url(#starship-steel)"
        d="M61 104 L90 98 L94 136 L61 138 Z"
      />
      <path fill="#4a4a4a" opacity="0.45" d="M39 104 L10 98 L8 112 L39 118 Z" />
      <path fill="#efefef" opacity="0.35" d="M61 104 L90 98 L92 112 L61 118 Z" />

      {/* Stainless body + nose */}
      <path
        fill="url(#starship-steel)"
        d="M50 6
           C62 22 63.5 34 63.5 44
           L63.5 136
           Q50 141 36.5 136
           L36.5 44
           C36.5 34 38 22 50 6 Z"
      />

      {/* Windward tiles — thin dark edge, not a black hull */}
      <path
        fill="#3a3a3a"
        opacity="0.28"
        d="M36.5 44 L40.5 44 L40.5 136 Q38 137.5 36.5 136 Z"
      />

      {/* Black nose cone */}
      <path
        fill="url(#starship-tps)"
        d="M50 6
           C62 22 63.5 34 63.5 44
           L36.5 44
           C36.5 34 38 22 50 6 Z"
      />
      <path
        fill="#0d0d0d"
        d="M50 6 C44 16 38.5 30 37.2 44 L50 44 Z"
        opacity="0.85"
      />

      {/* Forward flaps — small canards under the nose */}
      <path
        fill="url(#starship-steel)"
        d="M36.5 48 L14 46 L12 60 L36.5 62 Z"
      />
      <path
        fill="url(#starship-steel)"
        d="M63.5 48 L86 46 L88 60 L63.5 62 Z"
      />
      <path fill="#3a3a3a" opacity="0.4" d="M36.5 48 L14 46 L15 52 L36.5 54 Z" />

      {/* Window belt */}
      <rect x="51.5" y="50" width="3.4" height="2" rx="0.4" fill="#1a1a1a" opacity="0.7" />
      <rect x="51.8" y="58" width="2.8" height="1.5" rx="0.35" fill="#1a1a1a" opacity="0.45" />
      <rect x="51.8" y="66" width="2.8" height="1.5" rx="0.35" fill="#1a1a1a" opacity="0.35" />

      {/* Six Raptors as a tight cluster of bells */}
      <g fill="#4a4a4a">
        <ellipse cx="43" cy="138.5" rx="3.1" ry="2.4" />
        <ellipse cx="50" cy="139.4" rx="3.4" ry="2.6" />
        <ellipse cx="57" cy="138.5" rx="3.1" ry="2.4" />
        <ellipse cx="46.2" cy="136.6" rx="2.2" ry="1.6" opacity="0.8" />
        <ellipse cx="53.8" cy="136.6" rx="2.2" ry="1.6" opacity="0.8" />
        <ellipse cx="50" cy="135.6" rx="2" ry="1.4" opacity="0.7" />
      </g>
    </svg>
  )
}

export function StarshipFlyby() {
  const [pass, setPass] = useState(0)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduced.matches) return
    let cancelled = false
    let timer = 0
    const arm = (wait: number) => {
      timer = window.setTimeout(() => {
        if (cancelled) return
        if (!document.hidden) setPass((n) => n + 1)
        arm(EVERY_MS)
      }, wait)
    }
    arm(FIRST_PASS_MS)
    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [])

  return (
    <div className="starship-flyby" aria-hidden="true">
      {pass > 0 ? (
        <div key={pass} className="starship-flyby__craft">
          <StarshipMark />
        </div>
      ) : null}
    </div>
  )
}
