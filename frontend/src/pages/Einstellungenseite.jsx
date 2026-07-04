import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Einstellungenseite.css'
import { getHaushalt, updateHaushalt } from '../api.js'

export default function Einstellungenseite() {
  const [name, setName] = useState('')
  const [gespeichert, setGespeichert] = useState(false)
  const [fehler, setFehler] = useState('')

  // Aktuellen Haushaltsnamen vom Backend laden.
  useEffect(() => {
    getHaushalt()
      .then((haushalt) => setName(haushalt?.name ?? ''))
      .catch(() => setFehler('Haushalt konnte nicht geladen werden. Läuft das Backend?'))
  }, [])

  async function speichern(e) {
    e.preventDefault()
    if (!name.trim()) return
    try {
      await updateHaushalt(name.trim())
      setGespeichert(true)
      setFehler('')
    } catch {
      setFehler('Speichern fehlgeschlagen.')
    }
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

      <main className="container einstellungen-main">
        <h1 className="einstellungen-titel">Einstellungen</h1>
        <p className="einstellungen-lead">Passe die Einstellungen deines Haushalts an.</p>

        {fehler && <p className="fehler" style={{ color: '#b91c1c' }}>{fehler}</p>}

        <form className="einstellung-karte" onSubmit={speichern}>
          <h2>Haushalt</h2>
          <div className="einstellung-feld">
            <label htmlFor="hausname">Haushaltsname</label>
            <input
              id="hausname"
              className="feld"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                setGespeichert(false)
              }}
              placeholder="z. B. WG Sonnenallee"
            />
          </div>
          <div className="einstellung-aktionen">
            <button type="submit" className="btn btn-primary">Speichern</button>
            {gespeichert && <span className="gespeichert">Gespeichert</span>}
          </div>
        </form>
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
