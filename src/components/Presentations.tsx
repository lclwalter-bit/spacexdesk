import { presentations } from '../data/presentations'
import './Presentations.css'

export function Presentations() {
  return (
    <section id="presentations" className="section presentations">
      <header className="section__head">
        <p className="eyebrow">Source docs</p>
        <h2>Presentations & filings</h2>
        <p className="section__lede">
          Earnings, prospectus lockup mechanics, and ops filings traders actually use.
        </p>
      </header>

      <ul className="presentations__list">
        {presentations.map((p) => (
          <li key={p.title}>
            <span className="presentations__kind">{p.kind}</span>
            <div>
              {p.url ? (
                <a href={p.url} target="_blank" rel="noreferrer">
                  {p.title}
                </a>
              ) : (
                <strong>{p.title}</strong>
              )}
              <time>{p.date}</time>
              <p>{p.blurb}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
