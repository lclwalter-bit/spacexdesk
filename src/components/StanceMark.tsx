import type { Stance } from '../lib/stance'
import './StanceMark.css'

const ROCKET_PATH =
  'M12 1.6 15.6 8.2h-1.4v6.2h1.9L19.4 19 14.2 17.4V21L12 23.2 9.8 21v-3.6L4.6 19l3.3-4.6h1.9V8.2H8.4Z'

function RocketUp() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d={ROCKET_PATH} />
    </svg>
  )
}

function RocketFall() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        d="M2.8 20.8c3 1.4 6.1 2 9.2 2s6.2-.6 9.2-2"
      />
      <g transform="translate(12.4 9.8) rotate(150) scale(0.78) translate(-12 -12)">
        <path fill="currentColor" d={ROCKET_PATH} />
      </g>
    </svg>
  )
}

function Clock() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle
        cx="12"
        cy="12"
        r="7.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 7.4v5.1l3.6 2.2"
      />
    </svg>
  )
}

function iconFor(stance: Stance) {
  if (stance === 'Bullish') return <RocketUp />
  if (stance === 'Bearish') return <RocketFall />
  return <Clock />
}

export function StanceMark({
  stance,
  size = 'md',
}: {
  stance: Stance
  size?: 'sm' | 'md'
}) {
  return (
    <span
      className={`stance-mark stance-mark--${stance.toLowerCase()}${size === 'sm' ? ' stance-mark--sm' : ''}`}
      title={stance}
      aria-label={stance}
    >
      {iconFor(stance)}
    </span>
  )
}

export function StanceLegend() {
  return (
    <p className="stance-legend">
      <span>
        <StanceMark stance="Bullish" size="sm" /> Bullish
      </span>
      <span>
        <StanceMark stance="Bearish" size="sm" /> Bearish
      </span>
      <span>
        <StanceMark stance="Stagnant" size="sm" /> Stagnant
      </span>
    </p>
  )
}
