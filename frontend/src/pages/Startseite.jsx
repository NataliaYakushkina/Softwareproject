import { Link } from 'react-router-dom'
import './Startseite.css'

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

            <div className="hero-card" aria-hidden="true">
              <div className="card-head">
                <span className="dot dot-r"></span>
                <span className="dot dot-y"></span>
                <span className="dot dot-g"></span>
                <span className="card-title">Heute zu erledigen</span>
              </div>
              <ul className="todo">
                <li className="done"><span className="check">✓</span> Müll rausbringen (Tom)</li>
                <li className="done"><span className="check">✓</span> Spülmaschine ausräumen (Lena)</li>
                <li><span className="check open"></span> Einkaufen — 4 Artikel (Max)</li>
                <li><span className="check open"></span> Bad putzen (Lena)</li>
              </ul>
              <div className="card-foot">
                <span className="fortschritt-text">2 von 4 erledigt</span>
                <div className="balken"><div className="balken-fill"></div></div>
              </div>
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
