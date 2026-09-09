import { useEffect, useState } from 'react'
import { fetchQuote, fmtMoney, sessionLabel, type Quote } from '../lib/yahoo'
import './PriceStrip.css'

export function PriceStrip({ onQuote }: { onQuote?: (q: Quote) => void }) {
  const [q, setQ] = useState<Quote | null>(null)
  const [err, setErr] = useState<string | null>(null)
  const [nvda, setNvda] = useState<number | null>(null)

  useEffect(() => {
    let alive = true
    const load = async () => {
      try {
        const [spcx, n] = await Promise.all([fetchQuote('SPCX'), fetchQuote('NVDA')])
        if (!alive) return
        setQ(spcx)
        setNvda(n.price)
        setErr(null)
        onQuote?.(spcx)
      } catch (e) {
        if (!alive) return
        setErr(e instanceof Error ? e.message : 'quote failed')
      }
    }
    load()
    const id = setInterval(load, 20_000)
    return () => {
      alive = false
      clearInterval(id)
    }
  }, [onQuote])

  if (err && !q) {
    return (
      <div className="price-strip price-strip--err">
        Yahoo feed unavailable ({err}). Retrying…
      </div>
    )
  }

  if (!q) {
    return <div className="price-strip price-strip--loading">Linking Yahoo extended-hours feed…</div>
  }

  const chg = q.price - q.previousClose
  const pct = (chg / q.previousClose) * 100
  const up = chg >= 0
  const ext =
    q.marketState?.toUpperCase().includes('PRE') && q.preMarketPrice
      ? q.preMarketPrice
      : q.marketState?.toUpperCase().includes('POST') && q.postMarketPrice
        ? q.postMarketPrice
        : null

  return (
    <div className="price-strip">
      <div className="price-strip__main">
        <span className="price-strip__sym">SPCX</span>
        <span className={`price-strip__px ${up ? 'is-up' : 'is-down'}`}>
          {fmtMoney(q.price)}
        </span>
        <span className={`price-strip__chg ${up ? 'is-up' : 'is-down'}`}>
          {up ? '+' : ''}
          {chg.toFixed(2)} ({up ? '+' : ''}
          {pct.toFixed(2)}%)
        </span>
        <span className="price-strip__sess">{sessionLabel(q.marketState)}</span>
      </div>
      <div className="price-strip__meta">
        <span>Prev {fmtMoney(q.previousClose)}</span>
        {q.open != null && <span>Open {fmtMoney(q.open)}</span>}
        {q.dayHigh != null && q.dayLow != null && (
          <span>
            Range {fmtMoney(q.dayLow)}–{fmtMoney(q.dayHigh)}
          </span>
        )}
        {q.volume != null && <span>Vol {q.volume.toLocaleString()}</span>}
        {ext != null && Math.abs(ext - q.price) >= 0.005 && (
          <span>Ext {fmtMoney(ext)}</span>
        )}
        {nvda != null && <span>NVDA {fmtMoney(nvda)}</span>}
        <span className="price-strip__src">Yahoo · 20s poll · pre/post included</span>
      </div>
    </div>
  )
}
