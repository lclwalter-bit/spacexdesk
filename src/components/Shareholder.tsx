import { shareholder } from '../data/shareholder'
import { fmtMoney, fmtCompact } from '../lib/yahoo'
import './Shareholder.css'

export function Shareholder({ price }: { price: number | null }) {
  const px = price ?? 142
  const mkt = shareholder.sharesOutstandingB * 1e9 * px
  const musk = shareholder.muskSharesB * 1e9 * px
  const vsIpo = ((px - shareholder.ipoPrice) / shareholder.ipoPrice) * 100

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
          <span>vs IPO $135</span>
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
          <span>Musk unlock</span>
          <strong>{shareholder.muskLockUntil}</strong>
        </div>
      </div>

      <div className="shareholder__q2">
        <h3>Q2 2026</h3>
        <p>
          Revenue <strong>{fmtMoney(shareholder.q2.revenueB * 1e9, 0)}</strong> (
          +{(shareholder.q2.yoy * 100).toFixed(0)}% YoY) · Net loss{' '}
          {fmtMoney(shareholder.q2.netLossM * 1e6, 0)}
        </p>
        <p className="muted">{shareholder.q2.muskARR}</p>
        <ul className="shareholder__segments">
          {shareholder.segments.map((s) => (
            <li key={s.name}>
              <strong>{s.name}</strong>
              <span>{fmtMoney(s.q2RevB * 1e9, 0)}</span>
              <em>{s.note}</em>
            </li>
          ))}
        </ul>
      </div>

      <ul className="shareholder__notes">
        {shareholder.floatNotes.map((n) => (
          <li key={n}>{n}</li>
        ))}
      </ul>
    </section>
  )
}
