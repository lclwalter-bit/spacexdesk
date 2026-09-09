import { streetConsensus, streetTargets } from '../data/street'
import { stanceFromTarget } from '../lib/stance'
import { fmtMoney } from '../lib/yahoo'
import { StanceMark } from './StanceMark'
import './SmartMoney.css'

function upsidePct(target: number, last: number) {
  return (target - last) / last
}

function fmtPct(pct: number) {
  const sign = pct > 0 ? '+' : ''
  return `${sign}${(pct * 100).toFixed(1)}%`
}

export function SmartMoney({ price }: { price: number | null }) {
  const last = price ?? 142
  const consensusUpside = upsidePct(streetConsensus.mean, last)
  const counts = streetTargets.reduce(
    (acc, row) => {
      acc[stanceFromTarget(row.target, last)] += 1
      return acc
    },
    { Bullish: 0, Bearish: 0, Stagnant: 0 },
  )

  return (
    <section id="street" className="section street">
      <header className="section__head">
        <p className="eyebrow">Street · 12-month marks</p>
        <h2>Smart Money Sentiment</h2>
        <p className="section__lede">
          Bank and research-shop targets versus the live SPCX tape. Icon is the
          mark vs last — above +5% bullish, below −5% bearish, inside the band
          stagnant — not the house rating.
        </p>
      </header>

      <div className="street__stats">
        <div>
          <span>Street mean</span>
          <strong>{fmtMoney(streetConsensus.mean, 0)}</strong>
        </div>
        <div>
          <span>Vs last</span>
          <strong className={consensusUpside >= 0 ? 'is-up' : 'is-down'}>
            {fmtPct(consensusUpside)}
          </strong>
        </div>
        <div>
          <span>High / low</span>
          <strong>
            {fmtMoney(streetConsensus.high, 0)} / {fmtMoney(streetConsensus.low, 0)}
          </strong>
        </div>
        <div>
          <span>Desk split</span>
          <strong>
            {counts.Bullish} bull · {counts.Bearish} bear · {counts.Stagnant} flat
          </strong>
        </div>
      </div>
      <p className="street__poll">
        Mean {fmtMoney(streetConsensus.mean)} from {streetConsensus.analysts}{' '}
        analysts ({streetConsensus.source}, {streetConsensus.asOf}). Median{' '}
        {fmtMoney(streetConsensus.median, 0)}. Last {fmtMoney(last)}.
      </p>

      <div className="street__table-wrap">
        <table className="street__table">
          <thead>
            <tr>
              <th aria-label="Stance" />
              <th>House</th>
              <th>Target</th>
              <th>Vs last</th>
              <th>Rating</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {streetTargets.map((row) => {
              const pct = upsidePct(row.target, last)
              const stance = stanceFromTarget(row.target, last)
              return (
                <tr key={row.firm + row.date}>
                  <td className="street__stance">
                    <StanceMark stance={stance} size="sm" />
                  </td>
                  <td>
                    <div className="street__firm">{row.firm}</div>
                    <div className="street__note">
                      {row.analyst} · {row.note}
                      {row.source ? (
                        <>
                          {' '}
                          <a href={row.source} target="_blank" rel="noreferrer">
                            Source
                          </a>
                        </>
                      ) : null}
                    </div>
                  </td>
                  <td className="street__px">
                    {fmtMoney(row.target, 0)}
                    {row.priorTarget != null && (
                      <span className="street__prior">
                        was {fmtMoney(row.priorTarget, 0)}
                      </span>
                    )}
                  </td>
                  <td
                    className={
                      stance === 'Bullish'
                        ? 'is-up'
                        : stance === 'Bearish'
                          ? 'is-down'
                          : 'is-flat'
                    }
                  >
                    {fmtPct(pct)}
                  </td>
                  <td>{row.rating}</td>
                  <td>{row.date}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}
