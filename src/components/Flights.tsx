import { flights, cadenceNotes } from '../data/flights'
import './Flights.css'

export function Flights() {
  return (
    <section id="flights" className="section flights">
      <header className="section__head">
        <p className="eyebrow">Ops cadence</p>
        <h2>Rocket & Starlink schedule</h2>
        <p className="section__lede">
          Starship Flight 14 is the near ops catalyst. Dates are NET targets until
          SpaceX confirms a window.
        </p>
      </header>

      <div className="flights__list">
        {flights.map((f) => (
          <article key={f.id} className={`flight is-${f.status}`}>
            <div className="flight__top">
              <span className="flight__id">{f.id}</span>
              <span className={`flight__status`}>{f.status}</span>
            </div>
            <h3>{f.vehicle}</h3>
            <p className="flight__when">
              {f.netDate} · {f.site}
            </p>
            <p className="flight__payload">{f.payload}</p>
            <p className="flight__notes">{f.notes}</p>
          </article>
        ))}
      </div>

      <ul className="flights__cadence">
        {cadenceNotes.map((n) => (
          <li key={n}>{n}</li>
        ))}
      </ul>
    </section>
  )
}
