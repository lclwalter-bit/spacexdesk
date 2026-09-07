import { useCallback, useState } from 'react'
import { PriceStrip } from './components/PriceStrip'
import { PriceChart } from './components/PriceChart'
import { Unlocks } from './components/Unlocks'
import { Shareholder } from './components/Shareholder'
import { Flights } from './components/Flights'
import { Kol } from './components/Kol'
import { News } from './components/News'
import { Presentations } from './components/Presentations'
import type { Quote } from './lib/yahoo'
import './App.css'

const NAV = [
  { href: '#tape', label: 'Tape' },
  { href: '#unlocks', label: 'Unlocks' },
  { href: '#shareholder', label: 'Equity' },
  { href: '#flights', label: 'Flights' },
  { href: '#kol', label: 'Elon / KOL' },
  { href: '#news', label: 'News' },
  { href: '#presentations', label: 'Docs' },
]

export default function App() {
  const [quote, setQuote] = useState<Quote | null>(null)
  const onQuote = useCallback((q: Quote) => setQuote(q), [])

  return (
    <div className="desk">
      <nav className="nav">
        <a className="nav__brand" href="#top">
          SPCX Desk
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
          <p className="hero__kicker">SpaceX public equity · trader desk</p>
          <h1 className="hero__brand">SPCX</h1>
          <p className="hero__line">
            Live Yahoo tape (RTH + pre/post), unlock cliffs, ops schedule, and
            primary Musk / KOL signal — one composition for the desk.
          </p>
          <div className="hero__cta">
            <a href="#unlocks">Next unlock</a>
            <a className="ghost" href="#flights">
              Flight 14
            </a>
          </div>
          <div className="hero__price">
            <PriceStrip onQuote={onQuote} />
          </div>
        </div>
      </header>

      <main>
        <section id="tape" className="section tape">
          <header className="section__head">
            <p className="eyebrow">Market</p>
            <h2>Price & extended hours</h2>
            <p className="section__lede">
              Candles from Yahoo Finance with <code>includePrePost=true</code>.
              Quotes refresh every 20s; chart every 60s. True overnight prints only
              exist in pre/post sessions — gaps outside those windows are expected.
            </p>
          </header>
          <PriceChart />
        </section>

        <Unlocks price={quote?.price ?? null} />
        <Shareholder price={quote?.price ?? null} />
        <Flights />
        <Kol />
        <News />
        <Presentations />
      </main>

      <footer className="footer">
        <p>
          Not investment advice. Unlock sizes from prospectus tracking; Flight 14
          NET dates slip. Yahoo delayed/extended data via proxy.
        </p>
        <p>SPCX Desk · built for Walter’s SpaceX trading workflow</p>
      </footer>
    </div>
  )
}
