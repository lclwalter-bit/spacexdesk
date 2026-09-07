import { kolPosts } from '../data/kol'
import './Kol.css'

export function Kol() {
  return (
    <section id="kol" className="section kol">
      <header className="section__head">
        <p className="eyebrow">Primary signal</p>
        <h2>Elon & KOL posts</h2>
        <p className="section__lede">
          Musk primary first, then ops voices. Wire paraphrase marked when primary
          text is incomplete.
        </p>
      </header>

      <div className="kol__list">
        {kolPosts.map((p) => (
          <article key={p.who + p.when + p.quote.slice(0, 24)} className="kol-card">
            <div className="kol-card__meta">
              <strong>{p.who}</strong>
              <span>{p.role}</span>
              <span>
                {p.when} · {p.source}
              </span>
            </div>
            <blockquote>“{p.quote}”</blockquote>
            <p className="kol-card__why">
              <span>Why</span> {p.why}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
