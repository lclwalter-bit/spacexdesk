import { useCallback, useState } from 'react'
import { PriceStrip } from './components/PriceStrip'
import { PriceChart } from './components/PriceChart'
import { Unlocks } from './components/Unlocks'
import { Shareholder } from './components/Shareholder'
import { Flights } from './components/Flights'
import { Kol } from './components/Kol'
import { News } from './components/News'
import { Presentations } from './components/Presentations'
import { TeslaCompare } from './components/TeslaCompare'
import { SmartMoney } from './components/SmartMoney'
import { Tldr } from './components/Tldr'
import { StanceLegend } from './components/StanceMark'
import { StarshipFlyby } from './components/StarshipFlyby'
import type { Quote } from './lib/yahoo'
import './App.css'

const NAV = [
  { href: '#tldr', label: 'TLDR' },
  { href: '#tape', label: 'Tape' },
  { href: '#unlocks', label: 'Unlocks' },
  { href: '#street', label: 'Street' },
  { href: '#tesla', label: 'vs TSLA' },
  { href: '#shareholder', label: 'Equity' },
  { href: '#flights', label: 'Flights' },
  { href: '#influence', label: 'Influence' },
  { href: '#news', label: 'News' },
  { href: '#presentations', label: 'Docs' },
]

export default function App() {
  const [quote, setQuote] = useState<Quote | null>(null)
  const onQuote = useCallback((q: Quote) => setQuote(q), [])

  return (
    <>
      <StarshipFlyby />
      <div className="desk">
        <nav className="nav">
        <a className="nav__brand" href="#top">
          SPCX Nexus
        </a>
        <div className="nav__links">
          {NAV.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
        </div>
      </nav>

      <header id="top" className="hero">
        <div className="hero__atmosphere" aria-hidden />
        <div className="hero__inner">
          <div className="hero__copy">
            <p className="hero__kicker">SpaceX public equity</p>
            <div className="hero__brand-wrap">
              <span className="hero__orbit" aria-hidden />
              <h1 className="hero__brand">SPCX</h1>
            </div>
            <p className="hero__line">
              Your key desk for everything to do with investing in SPCX.
            </p>
            <div className="hero__cta">
              <a href="#unlocks">Next unlock</a>
              <a className="ghost" href="#flights">
                Flight 14
              </a>
              <a className="ghost" href="#tesla">
                vs TSLA
              </a>
            </div>
          </div>
          <div className="hero__price">
            <PriceStrip onQuote={onQuote} />
          </div>
        </div>
        <div className="hero__tldr">
          <Tldr quote={quote} />
          <StanceLegend />
        </div>
      </header>

      <main>
        <section id="tape" className="section tape">
          <header className="section__head">
            <p className="eyebrow">Market</p>
            <h2>Price & extended hours</h2>
            <p className="section__lede">
              Yahoo candles with <code>includePrePost=true</code>. Strip and
              chart share the last tape print · 20s.
            </p>
          </header>
          <PriceChart livePrice={quote?.price ?? null} />
        </section>

        <Unlocks price={quote?.price ?? null} />
        <SmartMoney price={quote?.price ?? null} />
        <TeslaCompare price={quote?.price ?? null} />
        <Shareholder price={quote?.price ?? null} />
        <Flights />
        <Kol />
        <News />
        <Presentations />
      </main>

      <footer className="footer">
        <p>
          Not investment advice. Unlock sizes from prospectus tracking; Tesla
          analogs are event maps, not price targets. Street marks are 12-month
          house targets versus the live tape, not a recommendation. Flight 14
          NET dates slip. Yahoo delayed/extended data via proxy.
        </p>
        <p>
          SPCX Nexus · built for Walter’s SpaceX trading workflow ·{' '}
          <a href="https://cursor.com" target="_blank" rel="noreferrer">
            Powered by Cursor
          </a>
        </p>
      </footer>
    </div>
    </>
  )
}
