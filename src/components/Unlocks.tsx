import { unlocks, notionalAt, SHARES_OUTSTANDING_B } from '../data/unlocks'
import { fmtCompact, fmtMoney } from '../lib/yahoo'
import { StanceMark } from './StanceMark'
import './Unlocks.css'

export function Unlocks({ price }: { price: number | null }) {
  const px = price ?? 142
  const next = unlocks.find((u) => u.status === 'next')

  return (
    <section id="unlocks" className="section unlocks">
      <header className="section__head">
        <p className="eyebrow">Supply calendar</p>
        <h2>Unlocks & cliffs</h2>
        <p className="section__lede">
          Prospectus eligibility. ~{SHARES_OUTSTANDING_B}B SO. Notional at live ~
          {fmtMoney(px, 0)}.
        </p>
      </header>

      {next && (
        <div className="unlocks__next">
          <StanceMark stance={next.stance} />
          <div className="unlocks__next-copy">
            <span className="unlocks__next-label">Next timed</span>
            <strong>
              {next.date} · {next.sharesM}M · {next.pctOutstanding}%
            </strong>
            <span>{fmtCompact(notionalAt(px, next.sharesM))} notional</span>
          </div>
        </div>
      )}

      <div className="unlocks__table-wrap">
        <table className="unlocks__table">
          <thead>
            <tr>
              <th aria-label="Factor" />
              <th>Date</th>
              <th>Event</th>
              <th>Shares</th>
              <th>% SO</th>
              <th>Notional</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {unlocks.map((u) => (
              <tr key={u.date + u.label} className={`is-${u.status}`}>
                <td className="unlocks__stance">
                  <StanceMark stance={u.stance} size="sm" />
                </td>
                <td>{u.date}</td>
                <td>
                  <div className="unlocks__label">{u.label}</div>
                  <div className="unlocks__note">{u.note}</div>
                </td>
                <td>{u.sharesM}M</td>
                <td>{u.pctOutstanding.toFixed(2)}%</td>
                <td>{fmtCompact(notionalAt(px, u.sharesM))}</td>
                <td>
                  <span className={`pill pill--${u.status}`}>{u.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
