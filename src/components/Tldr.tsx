import { useEffect, useState } from 'react'
import { buildTldr, type Stance, type TldrPrint } from '../lib/tldr'
import {
  isAfterRthPrep,
  isNyWeekend,
  nextPrepLabel,
  nyClock,
  sessionDate,
} from '../lib/nyTime'
import type { Quote } from '../lib/yahoo'
import { StanceMark } from './StanceMark'
import './Tldr.css'

const STORAGE_KEY = 'spcx-tldr-print-v2'

function readStored(): TldrPrint | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as TldrPrint
  } catch {
    return null
  }
}

function writeStored(print: TldrPrint) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(print))
  } catch {
    /* ignore quota */
  }
}

export function Tldr({ quote }: { quote: Quote | null }) {
  const [print, setPrint] = useState<TldrPrint>(() => {
    const clock = nyClock()
    const preview = isNyWeekend(clock) || !isAfterRthPrep(clock)
    return {
      session: sessionDate(clock),
      preview,
      ...buildTldr(null, null, clock),
    }
  })
  const [prepLabel, setPrepLabel] = useState(nextPrepLabel())

  useEffect(() => {
    const tick = () => {
      const clock = nyClock()
      const session = sessionDate(clock)
      const live = buildTldr(quote?.price ?? null, quote?.previousClose ?? null, clock)
      setPrepLabel(nextPrepLabel(clock))

      const stored = readStored()
      const canFreeze = isAfterRthPrep(clock) && !isNyWeekend(clock)

      if (canFreeze && quote) {
        if (stored?.session === session && !stored.preview) {
          setPrint(stored)
          return
        }
        const frozen: TldrPrint = { session, preview: false, ...live }
        writeStored(frozen)
        setPrint(frozen)
        return
      }

      if (stored?.session === session && !stored.preview) {
        setPrint(stored)
        return
      }

      setPrint({ session, preview: true, ...live })
    }

    tick()
    const id = setInterval(tick, 15_000)
    return () => clearInterval(id)
  }, [quote?.price, quote?.previousClose])

  const stanceClass = print.stance.toLowerCase() as Lowercase<Stance>

  return (
    <section
      id="tldr"
      className={`tldr tldr--${stanceClass}`}
      aria-live="polite"
    >
      <div className="tldr__top">
        <p className="tldr__kicker">TLDR</p>
        <span className="tldr__stance">
          <StanceMark stance={print.stance} />
          {print.stance}
        </span>
      </div>
      <p className="tldr__because">Because {print.because}.</p>
      <p className="tldr__action">
        <span className="tldr__action-label">Next trade</span>
        {print.action}
      </p>
      <p className="tldr__meta">
        {print.preview
          ? `Preview · official print ${prepLabel} (10m before the open)`
          : `RTH prep print · ${print.session} 9:20 ET · next ${prepLabel}`}
      </p>
    </section>
  )
}
