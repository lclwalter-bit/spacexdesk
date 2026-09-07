import { useEffect, useState } from 'react'
import {
  analogRows,
  muskArrB,
  nextMilestone,
  q2AnnualizedB,
  teslaSalesMultiple,
  TSLA_SHARES_B,
} from '../data/teslaAnalog'
import { shareholder } from '../data/shareholder'
import { fetchQuote, fmtCompact, fmtMoney, type Quote } from '../lib/yahoo'
import './TeslaCompare.css'

export function TeslaCompare({ price }: { price: number | null }) {
  const [tsla, setTsla] = useState<Quote | null>(null)

  useEffect(() => {
    let alive = true
    const load = async () => {
      try {
        const q = await fetchQuote('TSLA')
        if (alive) setTsla(q)
      } catch {
        if (alive) setTsla(null)
      }
    }
    load()
    const id = setInterval(load, 20_000)
    return () => {
      alive = false
      clearInterval(id)
    }
  }, [])

  const spcxPx = price ?? 142
  const spcxMkt = shareholder.sharesOutstandingB * 1e9 * spcxPx
  const tslaMkt = tsla ? TSLA_SHARES_B * 1e9 * tsla.price : null
  const vsTsla = tslaMkt ? spcxMkt / tslaMkt : null
  const runRateMult = spcxMkt / (q2AnnualizedB * 1e9)
  const arrMult = spcxMkt / (muskArrB * 1e9)
  const teslaFloor = teslaSalesMultiple.mature * muskArrB * 1e9
  const magnitudeCap =
    teslaSalesMultiple.peak *
    teslaSalesMultiple.magnitudePremium *
    muskArrB *
    1e9

  return (
    <section id="tesla" className="section tesla">
      <header className="section__head">
        <p className="eyebrow">Relative value · TSLA analog</p>
        <h2>SPCX vs Tesla cliffs</h2>
        <p className="section__lede">
          Tesla 2010 lockup was ~80% SO in one day (−15%). SPCX next print is
          2.4% — Tesla is the floor for ops re-rate, not an IPO multiple.
        </p>
      </header>

      <div className="tesla__stats">
        <div>
          <span>SPCX cap</span>
          <strong>{fmtCompact(spcxMkt)}</strong>
        </div>
        <div>
          <span>TSLA cap (~{TSLA_SHARES_B}B sh)</span>
          <strong>{tslaMkt ? fmtCompact(tslaMkt) : '—'}</strong>
        </div>
        <div>
          <span>SPCX / TSLA</span>
          <strong>{vsTsla ? `${vsTsla.toFixed(2)}×` : '—'}</strong>
        </div>
        <div>
          <span>TSLA last</span>
          <strong>{tsla ? fmtMoney(tsla.price) : 'Yahoo…'}</strong>
        </div>
      </div>

      <div className="tesla__next">
        <p className="tesla__next-kicker">Next milestone</p>
        <h3>
          {nextMilestone.date} · {nextMilestone.label} · {nextMilestone.sharesM}M (
          {nextMilestone.pctOutstanding}%)
        </h3>
        <p>
          <strong>Local analog.</strong> {nextMilestone.localAnalog}
        </p>
        <p>
          <strong>Tesla analog.</strong> {nextMilestone.teslaAnalog}
        </p>
        <p className="tesla__playbook">{nextMilestone.playbook}</p>
      </div>

      <div className="tesla__table-wrap">
        <table className="tesla__table">
          <thead>
            <tr>
              <th>Analog</th>
              <th>Tesla</th>
              <th>SPCX</th>
              <th>Read</th>
            </tr>
          </thead>
          <tbody>
            {analogRows.map((row) => (
              <tr key={row.analog}>
                <td className="tesla__analog">{row.analog}</td>
                <td>{row.tesla}</td>
                <td>{row.spcx}</td>
                <td>{row.read}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="tesla__scenarios">
        <div>
          <span>Q2 run-rate multiple</span>
          <strong>{runRateMult.toFixed(1)}×</strong>
          <p>
            {fmtCompact(spcxMkt)} on {fmtMoney(q2AnnualizedB * 1e9, 0)} annualized
            Q2. Rich vs Tesla-at-scale (~{teslaSalesMultiple.mature}×). Multiple
            compresses if ARR lands.
          </p>
        </div>
        <div>
          <span>At Musk $100B ARR</span>
          <strong>{arrMult.toFixed(1)}×</strong>
          <p>
            Same cap on $100B is {arrMult.toFixed(1)}× sales. Tesla-mature{' '}
            {teslaSalesMultiple.mature}× implies {fmtCompact(teslaFloor)} — already
            in the tape if ARR prints.
          </p>
        </div>
        <div>
          <span>Magnitude &gt; cars</span>
          <strong>{fmtCompact(magnitudeCap)}</strong>
          <p>
            Tesla peak stretch ~{teslaSalesMultiple.peak}× ×{' '}
            {teslaSalesMultiple.magnitudePremium}× product premium on $100B ARR.
            Not a target — a map of how much bigger than Tesla the stack has to
            prove. Unlock dips are inventory if that path holds.
          </p>
        </div>
      </div>
    </section>
  )
}
