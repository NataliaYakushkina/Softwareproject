import { useState } from 'react'
import './MitgliederPage.css'

const WOCHENTAGE = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']

// Beispiel-Aufgaben der Woche
const AUFGABEN = [
  { id: 1, titel: 'Müll rausbringen', person: 'Max', tag: 'Mo' },
  { id: 2, titel: 'Wäsche waschen', person: 'Tom', tag: 'Di' },
  { id: 3, titel: 'Bad putzen', person: 'Lena', tag: 'Mi' },
  { id: 4, titel: 'Einkaufen', person: 'Max', tag: 'Mi' },
  { id: 5, titel: 'Küche wischen', person: 'Anna', tag: 'Fr' },
  { id: 6, titel: 'Staubsaugen', person: 'Lena', tag: 'Sa' },
]

export default function MitgliederPage() {
  const [mitglieder, setMitglieder] = useState(['Lena', 'Max', 'Anna', 'Tom'])
  const [formOffen, setFormOffen] = useState(false)
  const [name, setName] = useState('')

  function hinzufuegen(e) {
    e.preventDefault()
    const neu = name.trim()
    if (!neu || mitglieder.includes(neu)) return
    setMitglieder([...mitglieder, neu])
    setName('')
    setFormOffen(false)
  }

  function entfernen(m) {
    setMitglieder(mitglieder.filter((x) => x !== m))
  }

  // Aufgaben einer Person, sortiert nach Wochentag (Mo -> So)
  function aufgabenVon(m) {
    return AUFGABEN.filter((a) => a.person === m).sort(
      (a, b) => WOCHENTAGE.indexOf(a.tag) - WOCHENTAGE.indexOf(b.tag),
    )
  }

  return (
    <div className="seite">
      {/* Kopfzeile */}
      <header className="kopf">
        <div className="container kopf-inner">
          <a className="logo" href="#">
            <span className="logo-icon" aria-hidden="true">🏠</span>
            <span>Haushalthelfer</span>
          </a>
          <nav className="nav">
            <a href="#">Aufgaben</a>
            <a href="#">Mitbewohner</a>          
            <a href="#">Einstellungen</a>
          </nav>
        </div>
      </header>

      <main className="container mitglieder-main">
        <h1 className="mitglieder-titel">Mitbewohner</h1>
        <p className="mitglieder-lead">
          Wer wohnt im Haushalt — und welche Aufgaben hat jede Person diese Woche?
        </p>

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

        {/* Liste der Mitglieder mit ihren Wochen-Aufgaben */}
        <div className="mitglied-liste">
          {mitglieder.map((m) => {
            const aufgaben = aufgabenVon(m)
            return (
              <article className="mitglied" key={m}>
                <div className="mitglied-kopf">
                  <div className="mitglied-name">
                    <span className="avatar" aria-hidden="true">{m[0]}</span>
                    <span>{m}</span>
                  </div>
                  <div className="mitglied-rechts">
                    <span className="anzahl">
                      {aufgaben.length} Aufgabe{aufgaben.length === 1 ? '' : 'n'}
                    </span>
                    <button
                      className="loeschen"
                      onClick={() => entfernen(m)}
                      aria-label={`${m} entfernen`}
                    >
                      ×
                    </button>
                  </div>
                </div>

                {aufgaben.length === 0 ? (
                  <p className="leer-text">Keine Aufgaben diese Woche.</p>
                ) : (
                  <ul className="mitglied-aufgaben">
                    {aufgaben.map((a) => (
                      <li key={a.id}>
                        <span className="tag-badge">{a.tag}</span>
                        <span className="aufgabe-name">{a.titel}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            )
          })}
        </div>
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
