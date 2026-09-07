import type { Stance } from '../lib/stance'
import './StanceMark.css'

function RocketUp() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2.2c1.7 2.6 2.6 5.3 2.6 8.2 0 1.4-.2 2.6-.5 3.6h-4.2c-.3-1-.5-2.2-.5-3.6 0-2.9.9-5.6 2.6-8.2Z"
      />
      <path fill="currentColor" d="M9.4 14.2 6.2 18.4l3.4-1.1v-3.1Zm5.2 0v3.1l3.4 1.1-3.2-4.2Z" />
      <path fill="currentColor" d="M10.4 15.1h3.2v3.2h-3.2Z" />
      <path fill="currentColor" d="M12 18.1c.9 1.4 1.4 2.6 1.4 3.4 0 .7-.6.9-1.4.9s-1.4-.2-1.4-.9c0-.8.5-2 1.4-3.4Z" />
    </svg>
  )
}

function RocketFall() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        d="M4 20.4c2.6 1.2 5.3 1.8 8 1.8s5.4-.6 8-1.8"
      />
      <g transform="translate(12 11.2) rotate(155) translate(-12 -11)">
        <path
          fill="currentColor"
          d="M12 1.6c1.5 2.3 2.3 4.7 2.3 7.3 0 1.2-.2 2.3-.4 3.2h-3.8c-.2-.9-.4-2-.4-3.2 0-2.6.8-5 2.3-7.3Z"
        />
        <path fill="currentColor" d="M9.7 12.3 7 15.9l2.9-.9v-2.7Zm4.6 0v2.7l2.9.9-2.7-3.6Z" />
        <path fill="currentColor" d="M10.6 13.1h2.8v2.8h-2.8Z" />
        <path fill="currentColor" d="M12 15.7c.8 1.2 1.2 2.3 1.2 3 0 .6-.5.8-1.2.8s-1.2-.2-1.2-.8c0-.7.4-1.8 1.2-3Z" />
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
        r="7.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        d="M12 7.6v4.6l3.3 2"
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
