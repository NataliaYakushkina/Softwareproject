import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Startseite.css'
import { getAufgaben, getMitglieder } from '../api.js'
import { aktuelleWoche } from '../datum.js'

const funktionen = [
  {
    icon: '📋',
    titel: 'Aufgaben',
    link: '/aufgaben',
    text: 'Wer macht was? Aufgaben erstellen, einem Mitbewohner zuweisen und abhaken.',
  },

  {
    icon: '👥',
    titel: 'Haushalt teilen',
    link: '/mitbewohner',
    text: 'Mitbewohner einladen und gemeinsam den Überblick behalten.',
  },

  {
    icon: '⚙️',
    titel: 'Einstellungen',
    link: '/einstellungen',
    text: 'Haushaltseinstellungen anpassen und mehr.',
  },
]


export default function Startseite() {
  const [aufgaben, setAufgaben] = useState([])
  const [mitglieder, setMitglieder] = useState([])
  const [geladen, setGeladen] = useState(false)

  // Aufgaben der aktuellen Woche + Mitglieder für die Vorschau-Karte laden.
  useEffect(() => {
    Promise.all([getAufgaben(aktuelleWoche()), getMitglieder()])
      .then(([a, m]) => {
        setAufgaben(a)
        setMitglieder(m)
      })
      .catch(() => {
        // Läuft das Backend nicht, bleibt die Karte einfach leer (kein Fehler auf der Startseite).
      })
      .finally(() => setGeladen(true))
  }, [])

  const erledigt = aufgaben.filter((a) => a.status === 'done').length
  const gesamt = aufgaben.length
  const prozent = gesamt ? Math.round((erledigt / gesamt) * 100) : 0
  const sichtbar = aufgaben.slice(0, 4)

  function nameVon(id) {
    const m = mitglieder.find((x) => x.id === id)
    return m ? m.name : ''
  }

  return (
    <div className="seite">
      {/* Kopfzeile */}
      <header className="kopf">
        <div className="container kopf-inner">
          <Link className="logo" to="/">
            <span className="logo-icon" aria-hidden="true">🏠</span>
            <span>Haushalthelfer</span>
          </Link>
          <nav className="nav">
            <Link to="/aufgaben">Aufgaben</Link>
            <Link to="/mitbewohner">Mitbewohner</Link>
            <Link to="/einstellungen">Einstellungen</Link>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="hero" id="start">
          <div className="container hero-inner">
            <div className="hero-text">
              <span className="badge">🎓 Softwareprojekt · HSHL</span>
              <h1>
                Euer Haushalt,<br />
                <span className="akzent">gemeinsam organisiert</span>
              </h1>
              <p className="hero-lead">
                Aufgaben erstellen und verteilen, den Überblick behalten —
                alles an einem Ort. Der Haushalthelfer bringt Ordnung in euer
                Zuhause.
              </p>
              <div className="hero-cta">
                <Link className="btn btn-primary" to="/aufgaben">Jetzt starten</Link>
                <button
                  className="btn btn-ghost"
                  onClick={() =>
                    document.getElementById('funktionen')?.scrollIntoView({ behavior: 'smooth' })
                  }
                >
                  Mehr erfahren
                </button>
              </div>
            </div>

            {/* Vorschau-Karte: echte Aufgaben der aktuellen Woche */}
            <div className="hero-card">
              <div className="card-head">
                <span className="dot dot-r" aria-hidden="true"></span>
                <span className="dot dot-y" aria-hidden="true"></span>
                <span className="dot dot-g" aria-hidden="true"></span>
                <span className="card-title">Diese Woche</span>
              </div>

              {gesamt === 0 ? (
                <ul className="todo">
                  <li>
                    <span className="check open" aria-hidden="true"></span>
                    {geladen ? 'Noch keine Aufgaben — leg direkt los!' : 'Lädt…'}
                  </li>
                </ul>
              ) : (
                <>
                  <ul className="todo">
                    {sichtbar.map((a) => {
                      const person = nameVon(a.assignedMemberId)
                      return (
                        <li key={a.id} className={a.status === 'done' ? 'done' : undefined}>
                          <span
                            className={'check' + (a.status === 'done' ? '' : ' open')}
                            aria-hidden="true"
                          >
                            {a.status === 'done' ? '✓' : ''}
                          </span>
                          {a.title}{person ? ` (${person})` : ''}
                        </li>
                      )
                    })}
                    {gesamt > sichtbar.length && (
                      <li className="fortschritt-text">… und {gesamt - sichtbar.length} weitere</li>
                    )}
                  </ul>
                  <div className="card-foot">
                    <span className="fortschritt-text">{erledigt} von {gesamt} erledigt</span>
                    <div className="balken">
                      <div className="balken-fill" style={{ width: prozent + '%' }}></div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Funktionen */}
        <section className="funktionen" id="funktionen">
          <div className="container">
            <h2 className="abschnitt-titel">Alles, was euer Haushalt braucht</h2>
            <p className="abschnitt-lead">
              Einfache Werkzeuge, die das Zusammenleben leichter machen.
            </p>
            <div className="karten">
              {funktionen.map((f) => (
                <Link className="karte" to={f.link} key={f.titel}>
                  <div className="karte-icon" aria-hidden="true">{f.icon}</div>
                  <h3>{f.titel}</h3>
                  <p>{f.text}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* Fußzeile */}
      <footer className="fuss">
        <div className="container fuss-inner">
          <span className="logo">
            <span className="logo-icon" aria-hidden="true">🏠</span> Haushalthelfer
          </span>
          <span className="fuss-text">Softwareprojekt · HSHL · SoSe · 2026</span>
        </div>
      </footer>
    </div>
  )
}
