import { Link } from 'react-router-dom'

export default function EinstellungenPage() {
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

      <main
        className="container"
        style={{ flex: 1, padding: '64px 24px', textAlign: 'center' }}
      >
        <div style={{ fontSize: '3rem' }} aria-hidden="true">⚙️</div>
        <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', marginTop: 8 }}>Einstellungen</h1>
        <p style={{ color: 'var(--color-muted)', marginTop: 8 }}>Diese Seite kommt bald.</p>
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
