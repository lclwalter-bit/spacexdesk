import { shareholder } from '../data/shareholder'
import { fmtMoney, fmtCompact } from '../lib/yahoo'
import type { Stance } from '../lib/stance'
import { StanceMark } from './StanceMark'
import './Shareholder.css'

export function Shareholder({ price }: { price: number | null }) {
  const px = price ?? 142
  const mkt = shareholder.sharesOutstandingB * 1e9 * px
  const musk = shareholder.muskSharesB * 1e9 * px
  const vsIpo = ((px - shareholder.ipoPrice) / shareholder.ipoPrice) * 100
  const vsIpoStance: Stance = vsIpo >= 3 ? 'Bullish' : vsIpo <= -5 ? 'Bearish' : 'Stagnant'

  return (
    <section id="shareholder" className="section shareholder">
      <header className="section__head">
        <p className="eyebrow">Equity & value</p>
        <h2>Shareholder map</h2>
        <p className="section__lede">
          Live market value from Yahoo price × shares outstanding. Q2 is the last
          reported public print.
        </p>
      </header>

      <div className="shareholder__stats">
        <div>
          <span>Market cap</span>
          <strong>{fmtCompact(mkt)}</strong>
        </div>
        <div>
          <span className="shareholder__stat-kicker">
            <StanceMark stance={vsIpoStance} size="sm" />
            vs IPO $135
          </span>
          <strong className={vsIpo >= 0 ? 'is-up' : 'is-down'}>
            {vsIpo >= 0 ? '+' : ''}
            {vsIpo.toFixed(1)}%
          </strong>
        </div>
        <div>
          <span>Musk locked (~{shareholder.muskSharesB}B)</span>
          <strong>{fmtCompact(musk)}</strong>
        </div>
        <div>
          <span className="shareholder__stat-kicker">
            <StanceMark stance={shareholder.muskLockStance} size="sm" />
            Musk unlock
          </span>
          <strong>{shareholder.muskLockUntil}</strong>
        </div>
      </div>

      <div className="shareholder__q2">
        <h3>
          <StanceMark stance={shareholder.q2Stance} size="sm" />
          Q2 2026
        </h3>
        <p>
          Revenue <strong>{fmtMoney(shareholder.q2.revenueB * 1e9, 0)}</strong> (
          +{(shareholder.q2.yoy * 100).toFixed(0)}% YoY) · Net loss{' '}
          {fmtMoney(shareholder.q2.netLossM * 1e6, 0)}
        </p>
        <p className="muted stance-row">
          <StanceMark stance={shareholder.q2.arrStance} size="sm" />
          <span>{shareholder.q2.muskARR}</span>
        </p>
        <ul className="shareholder__segments">
          {shareholder.segments.map((s) => (
            <li key={s.name}>
              <StanceMark stance={s.stance} size="sm" />
              <strong>{s.name}</strong>
              <span>{fmtMoney(s.q2RevB * 1e9, 0)}</span>
              <em>{s.note}</em>
            </li>
          ))}
        </ul>
      </div>

      <ul className="shareholder__notes">
        {shareholder.floatNotes.map((n) => (
          <li key={n.text}>
            <StanceMark stance={n.stance} size="sm" />
            <span>{n.text}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
