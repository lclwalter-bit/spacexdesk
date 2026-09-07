import { newsItems } from '../data/news'
import { StanceMark } from './StanceMark'
import './News.css'

export function News() {
  return (
    <section id="news" className="section news">
      <header className="section__head">
        <p className="eyebrow">Wire scan</p>
        <h2>News desk</h2>
        <p className="section__lede">
          Curated last ~2 weeks for traders. Prefer primary Elon/ops over paraphrase.
        </p>
      </header>

      <ul className="news__list">
        {newsItems.map((n) => (
          <li key={n.date + n.title}>
            <div className="news__when">
              <StanceMark stance={n.stance} />
              <time>{n.date}</time>
              <span>{n.outlet}</span>
            </div>
            <div className="news__body">
              {n.url ? (
                <a href={n.url} target="_blank" rel="noreferrer">
                  {n.title}
                </a>
              ) : (
                <strong>{n.title}</strong>
              )}
              <p>{n.summary}</p>
              <div className="news__tags">
                {n.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
