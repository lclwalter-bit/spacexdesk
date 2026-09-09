import { useEffect, useState } from 'react'
import './StarshipFlyby.css'

const FIRST_PASS_MS = 2_000
const EVERY_MS = 60_000

/**
 * Full stack from spacex.com/vehicles/starship:
 * Starship (black tip, canards, aft flaps) on Super Heavy
 * (hot-stage vents, grid fins, long booster, Raptor skirt).
 */
function StarshipMark() {
  const cx = 40
  const left = 31
  const vents = Array.from({ length: 8 }, (_, i) => {
    const x = left + 1.4 + i * 2.15
    return `${x},121 ${x + 1.05},124.5 ${x},128 ${x - 1.05},124.5`
  })

  return (
    <svg viewBox="0 0 80 300" aria-hidden="true">
      <defs>
        <linearGradient id="starship-steel" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#4a4a4a" />
          <stop offset="16%" stopColor="#b7b7b7" />
          <stop offset="38%" stopColor="#ffffff" />
          <stop offset="55%" stopColor="#e4e4e4" />
          <stop offset="82%" stopColor="#8a8a8a" />
          <stop offset="100%" stopColor="#2e2e2e" />
        </linearGradient>
        <linearGradient id="starship-plume" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.42" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <pattern
          id="starship-gridfin"
          width="2.2"
          height="2.2"
          patternUnits="userSpaceOnUse"
        >
          <rect width="2.2" height="2.2" fill="#2a2a2a" />
          <path
            d="M0 0h2.2M0 2.2h2.2M0 0v2.2M2.2 0v2.2"
            stroke="#8a8a8a"
            strokeWidth="0.35"
            fill="none"
          />
        </pattern>
      </defs>

      <g className="starship-flyby__plume">
        <ellipse cx={cx} cy="288" rx="8" ry="16" fill="url(#starship-plume)" />
        <ellipse cx={cx} cy="280" rx="3.6" ry="8" fill="#fff" opacity="0.18" />
      </g>

      {/* Super Heavy — long stainless booster */}
      <rect x={left} y="128" width="18" height="146" fill="url(#starship-steel)" />
      {/* chines / raceway */}
      <rect x="33.4" y="214" width="1.1" height="54" fill="#5a5a5a" opacity="0.55" />
      <rect x="45.6" y="214" width="0.9" height="54" fill="#d8d8d8" opacity="0.35" />

      {/* Grid fins, just below the hot-stage ring */}
      <rect
        x="19.5"
        y="132"
        width="11.5"
        height="9"
        rx="0.4"
        fill="url(#starship-gridfin)"
      />
      <rect
        x="49"
        y="132"
        width="11.5"
        height="9"
        rx="0.4"
        fill="url(#starship-gridfin)"
      />

      {/* Hot-stage ring — diamond vents */}
      <rect x={left} y="119" width="18" height="10" fill="url(#starship-steel)" />
      <rect x={left} y="119" width="18" height="10" fill="#cfcfcf" opacity="0.35" />
      {vents.map((points) => (
        <polygon key={points} points={points} fill="#161616" />
      ))}

      {/* Starship spacecraft */}
      <path
        fill="url(#starship-steel)"
        d={`M${cx} 8
           C52 22 49 32 49 40
           L49 120
           L31 120
           L31 40
           C31 32 28 22 ${cx} 8 Z`}
      />

      {/* Black nose tip only */}
      <path
        fill="#111"
        d={`M${cx} 8
           C46.5 16 48.2 24 48.6 30
           L31.4 30
           C31.8 24 33.5 16 ${cx} 8 Z`}
      />

      {/* Forward flaps — small canards under the nose */}
      <path fill="url(#starship-steel)" d="M31 34 L16 30 L14 42 L31 44 Z" />
      <path fill="url(#starship-steel)" d="M49 34 L64 30 L66 42 L49 44 Z" />

      {/* Aft flaps — large shark fins at the base of the ship */}
      <path fill="url(#starship-steel)" d="M31 92 L9 88 L6 122 L31 120 Z" />
      <path fill="url(#starship-steel)" d="M49 92 L71 88 L74 122 L49 120 Z" />
      <path fill="#3f3f3f" opacity="0.28" d="M31 92 L9 88 L8 98 L31 102 Z" />

      {/* 33-Raptor skirt */}
      <path fill="#1a1a1a" d="M31 272 L28.5 282 L51.5 282 L49 272 Z" />
      {Array.from({ length: 11 }, (_, i) => (
        <circle
          key={i}
          cx={31.8 + i * 1.6}
          cy={276.5 + (i % 2) * 2.2}
          r="1.05"
          fill="#3a3a3a"
        />
      ))}
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
