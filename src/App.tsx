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
import { Tldr } from './components/Tldr'
import type { Quote } from './lib/yahoo'
import './App.css'

const NAV = [
  { href: '#tldr', label: 'TLDR' },
  { href: '#tape', label: 'Tape' },
  { href: '#unlocks', label: 'Unlocks' },
  { href: '#tesla', label: 'vs TSLA' },
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
          <div className="hero__copy">
            <p className="hero__kicker">SpaceX public equity · trader desk</p>
            <h1 className="hero__brand">SPCX</h1>
            <p className="hero__line">
              Live Yahoo tape, unlock cliffs, ops, and primary Musk / KOL signal.
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
        </div>
      </header>

      <main>
        <section id="tape" className="section tape">
          <header className="section__head">
            <p className="eyebrow">Market</p>
            <h2>Price & extended hours</h2>
            <p className="section__lede">
              Yahoo candles with <code>includePrePost=true</code>. Quote 20s ·
              chart 60s.
            </p>
          </header>
          <PriceChart />
        </section>

        <Unlocks price={quote?.price ?? null} />
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
          analogs are event maps, not price targets. Flight 14 NET dates slip.
          Yahoo delayed/extended data via proxy.
        </p>
        <p>SPCX Desk · built for Walter’s SpaceX trading workflow</p>
      </footer>
    </div>
  )
}
