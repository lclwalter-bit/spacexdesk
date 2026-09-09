import { useEffect, useState } from 'react'
import { buildTldr, type Stance, type TldrPrint } from '../lib/tldr'
import {
  isAfterRthPrep,
  isNyWeekend,
  nextPrepLabel,
  nyClock,
  sessionDate,
} from '../lib/nyTime'
import { fmtMoney, type Quote } from '../lib/yahoo'
import { bagDeployed, bagHeadline, bagLadder } from '../data/bag'
import { StanceMark } from './StanceMark'
import './Tldr.css'

const STORAGE_KEY = 'spcx-tldr-print-v3'

function readStored(): TldrPrint | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<TldrPrint>
    if (!parsed.lede || !parsed.stance) return null
    return parsed as TldrPrint
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
      <header className="tldr__mast">
        <p className="tldr__kicker">TLDR</p>
        <span className="tldr__stance">
          <StanceMark stance={print.stance} size="sm" />
          {print.stance}
        </span>
      </header>
      <p className="tldr__lede">{print.lede}</p>
      <div className="tldr__trade">
        <h3 className="tldr__trade-title">Next trade</h3>
        <p className="tldr__trade-body">{print.action}</p>
      </div>
      <div className="tldr__bag">
        <h3 className="tldr__trade-title">Buy in</h3>
        <p className="tldr__trade-body">{bagHeadline(quote?.price ?? null)}</p>
        <ul className="tldr__bag-list">
          {bagLadder.map((rung) => {
            const last = quote?.price ?? null
            const hit = last != null && last <= rung.price
            const active = bagDeployed(last) === rung.pct && hit
            const vs =
              last != null ? ((last - rung.price) / rung.price) * 100 : null
            return (
              <li
                key={rung.price}
                className={
                  active ? 'is-active' : hit ? 'is-hit' : undefined
                }
              >
                <StanceMark stance={rung.stance} size="sm" />
                <div className="tldr__bag-copy">
                  <strong>
                    {fmtMoney(rung.price, 0)} · {rung.pct}% · {rung.label}
                  </strong>
                  <span>
                    {rung.note}
                    {vs != null && (
                      <>
                        {' '}
                        · tape {vs >= 0 ? '+' : ''}
                        {vs.toFixed(1)}% vs this print
                      </>
                    )}
                  </span>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
      <p className="tldr__meta">
        {print.preview
          ? `Preview · official print ${prepLabel} (10m before the open)`
          : `RTH prep print · ${print.session} 9:20 ET · next ${prepLabel}`}
      </p>
    </section>
  )
}
