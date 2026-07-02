import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Mitgliederseite.css'
import { getHaushalt, getMitglieder, createMitglied, deleteMitglied } from '../api.js'

export default function Mitgliederseite() {
  const [mitglieder, setMitglieder] = useState([])
  const [haushaltId, setHaushaltId] = useState(null)
  const [laden, setLaden] = useState(true)
  const [fehler, setFehler] = useState('')
  const [formOffen, setFormOffen] = useState(false)
  const [name, setName] = useState('')

  // Beim Öffnen der Seite: Haushalt + Mitglieder vom Backend laden.
  useEffect(() => {
    async function ladeDaten() {
      try {
        const [haushalt, liste] = await Promise.all([getHaushalt(), getMitglieder()])
        setHaushaltId(haushalt?.id ?? null)
        setMitglieder(liste)
      } catch {
        setFehler('Daten konnten nicht geladen werden. Läuft das Backend?')
      } finally {
        setLaden(false)
      }
    }
    ladeDaten()
  }, [])

  async function hinzufuegen(e) {
    e.preventDefault()
    const neu = name.trim()
    if (!neu) return
    if (mitglieder.some((m) => m.name === neu)) {
      setFehler('Dieses Mitglied gibt es schon.')
      return
    }
    try {
      const erstellt = await createMitglied(neu, haushaltId)
      setMitglieder([...mitglieder, erstellt])
      setName('')
      setFormOffen(false)
      setFehler('')
    } catch {
      setFehler('Mitglied konnte nicht gespeichert werden.')
    }
  }

  async function entfernen(id) {
    try {
      await deleteMitglied(id)
      setMitglieder(mitglieder.filter((m) => m.id !== id))
    } catch {
      setFehler('Mitglied konnte nicht gelöscht werden.')
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

      <main className="container mitglieder-main">
        <h1 className="mitglieder-titel">Mitbewohner</h1>
        <p className="mitglieder-lead">
          Wer wohnt im Haushalt? Mitbewohner hinzufügen oder entfernen.
        </p>

        {fehler && <p className="fehler" style={{ color: '#b91c1c' }}>{fehler}</p>}

        {/* Kopf mit "Neues Mitglied" */}
        <div className="listen-kopf">
          <h2>{mitglieder.length} Mitbewohner</h2>
          <button className="btn btn-primary btn-sm" onClick={() => setFormOffen(!formOffen)}>
            {formOffen ? 'Abbrechen' : '+ Neuer Mitbewohner'}
          </button>
        </div>

        {/* Formular: Mitglied hinzufügen */}
        {formOffen && (
          <form className="mitglied-form" onSubmit={hinzufuegen}>
            <input
              className="feld feld-name"
              type="text"
              placeholder="Name des Mitbewohners (z. B. Sophie)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
            <button type="submit" className="btn btn-primary">Hinzufügen</button>
          </form>
        )}

        {/* Liste der Mitglieder */}
        {laden ? (
          <p className="leer-text">Lädt…</p>
        ) : mitglieder.length === 0 ? (
          <p className="leer-text">Noch keine Mitbewohner. Füge den ersten hinzu!</p>
        ) : (
          <div className="mitglied-liste">
            {mitglieder.map((m) => (
              <article className="mitglied" key={m.id}>
                <div className="mitglied-kopf">
                  <div className="mitglied-name">
                    <span className="avatar" aria-hidden="true">{m.name[0]}</span>
                    <span>{m.name}</span>
                  </div>
                  <div className="mitglied-rechts">
                    <button
                      className="loeschen"
                      onClick={() => entfernen(m.id)}
                      aria-label={`${m.name} entfernen`}
                    >
                      ×
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
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
