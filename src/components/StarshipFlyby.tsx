import { useEffect, useState } from 'react'
import './StarshipFlyby.css'

const FIRST_PASS_MS = 8_000
const EVERY_MS = 60_000

function StarshipMark() {
  return (
    <svg viewBox="0 0 40 220" aria-hidden="true">
      <defs>
        <linearGradient id="starship-steel" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#5c5c5c" />
          <stop offset="42%" stopColor="#d6d6d6" />
          <stop offset="100%" stopColor="#8a8a8a" />
        </linearGradient>
        <linearGradient id="starship-plume" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g className="starship-flyby__plume">
        <ellipse cx="20" cy="208" rx="6.5" ry="16" fill="url(#starship-plume)" />
        <ellipse cx="20" cy="200" rx="3.2" ry="8" fill="#fff" opacity="0.22" />
      </g>
      <rect x="12.5" y="86" width="15" height="112" rx="2.2" fill="url(#starship-steel)" />
      <rect x="12.5" y="86" width="5.5" height="112" rx="1.4" fill="#4a4a4a" opacity="0.55" />
      <path
        fill="#bdbdbd"
        d="M11 118h4.2l-1.2 14H11zm13.8 0H29l.2 14h-4.2zM10.5 168h5l-1 18h-4zm14 0h5l.2 18h-5.2z"
      />
      <path
        fill="url(#starship-steel)"
        d="M20 6c4.4 10 6.6 22 6.8 38v42H13.2V44C13.4 28 15.6 16 20 6Z"
      />
      <path fill="#3f3f3f" opacity="0.5" d="M13.2 18c1.8-6 3.8-10.4 6.8-12v80h-6.8z" />
      <path fill="#cfcfcf" d="M11 48h5.2l-1.4 11H11zm12.8 0H29l.2 11h-5.4z" />
      <path fill="#cfcfcf" d="M12 72h5l-1 10h-4zm11 0h5l.2 10h-5.2z" />
      <rect x="18.4" y="28" width="3.2" height="2.1" rx="0.6" fill="#1a1a1a" opacity="0.7" />
      <rect x="18.6" y="48" width="2.8" height="1.6" rx="0.5" fill="#1a1a1a" opacity="0.45" />
      <g fill="#6e6e6e">
        <circle cx="14.8" cy="200.5" r="2.1" />
        <circle cx="20" cy="201.2" r="2.3" />
        <circle cx="25.2" cy="200.5" r="2.1" />
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
