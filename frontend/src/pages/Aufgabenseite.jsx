import { useState } from 'react'
import './Aufgabenseite.css'

const WOCHENTAGE = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']
const VOLLE_NAMEN = {
  Mo: 'Montag',
  Di: 'Dienstag',
  Mi: 'Mittwoch',
  Do: 'Donnerstag',
  Fr: 'Freitag',
  Sa: 'Samstag',
  So: 'Sonntag',
}
const PERSONEN = ['Lena', 'Max', 'Anna', 'Tom']

// Beispiel-Aufgaben zum Start (spaeter aus dem Backend)
const START_AUFGABEN = [
  { id: 1, titel: 'Müll rausbringen', person: 'Max', tag: 'Mo' },
  { id: 2, titel: 'Bad putzen', person: 'Lena', tag: 'Mi' },
  { id: 3, titel: 'Einkaufen', person: '', tag: 'Mi' },
  { id: 4, titel: 'Küche wischen', person: 'Anna', tag: 'Fr' },
]

export default function Aufgabenseite() {
  const [aufgaben, setAufgaben] = useState(START_AUFGABEN)
  const [tag, setTag] = useState('Mi')
  const [formOffen, setFormOffen] = useState(false)
  const [titel, setTitel] = useState('')
  const [person, setPerson] = useState('')

  const sichtbar = aufgaben.filter((a) => a.tag === tag)

  function hinzufuegen(e) {
    e.preventDefault()
    const name = titel.trim()
    if (!name) return
    setAufgaben([...aufgaben, { id: Date.now(), titel: name, person, tag }])
    setTitel('')
    setPerson('')
    setFormOffen(false)
  }

  function personSetzen(id, neuePerson) {
    setAufgaben(aufgaben.map((a) => (a.id === id ? { ...a, person: neuePerson } : a)))
  }

  function loeschen(id) {
    setAufgaben(aufgaben.filter((a) => a.id !== id))
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
            {/*<Link to="/aufgaben">Aufgaben</Link>  */} 
            {/*<Link to="/aufgaben">Mitbewohner</Link>  */}
            {/*<Link to="/aufgaben">Einstellungen</Link>  */}        
            <a href="#">Aufgaben</a>
            <a href="#">Mitbewohner</a>          
            <a href="#">Einstellungen</a>
          </nav>
        </div>
      </header>

      <main className="container aufgaben-main">
        <h1 className="aufgaben-titel">Aufgaben</h1>
        <p className="aufgaben-lead">Wähle einen Wochentag und verteile die Aufgaben im Haushalt.</p>

        {/* Wochenauswahl */}
        <div className="wochenauswahl">
          {WOCHENTAGE.map((t) => (
            <button
              key={t}
              className={'tag-chip' + (t === tag ? ' aktiv' : '')}
              onClick={() => setTag(t)}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Listen-Kopf mit "Neue Aufgabe" */}
        <div className="listen-kopf">
          <h2>
            {sichtbar.length} Aufgabe{sichtbar.length === 1 ? '' : 'n'} am {VOLLE_NAMEN[tag]}
          </h2>
          <button className="btn btn-primary btn-sm" onClick={() => setFormOffen(!formOffen)}>
            {formOffen ? 'Abbrechen' : '+ Neue Aufgabe'}
          </button>
        </div>

        {/* Formular: neue Aufgabe erstellen */}
        {formOffen && (
          <form className="aufgabe-form" onSubmit={hinzufuegen}>
            <input
              className="feld feld-titel"
              type="text"
              placeholder="Was ist zu tun? (z. B. Staubsaugen)"
              value={titel}
              onChange={(e) => setTitel(e.target.value)}
              autoFocus
            />
            <select className="feld" value={person} onChange={(e) => setPerson(e.target.value)}>
              <option value="">— Person wählen —</option>
              {PERSONEN.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            <button type="submit" className="btn btn-primary">Hinzufügen</button>
          </form>
        )}

        {/* Liste der Aufgaben */}
        {sichtbar.length === 0 ? (
          <p className="leer">Keine Aufgaben am {VOLLE_NAMEN[tag]}. Erstelle eine neue! 🎉</p>
        ) : (
          <ul className="aufgaben-liste">
            {sichtbar.map((a) => (
              <li className="aufgabe" key={a.id}>
                <span className="aufgabe-titel">{a.titel}</span>
                <div className="aufgabe-rechts">
                  <select
                    className={'person-select' + (a.person ? '' : ' leer')}
                    value={a.person}
                    onChange={(e) => personSetzen(a.id, e.target.value)}
                  >
                    <option value="">Nicht zugewiesen</option>
                    {PERSONEN.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                  <button className="loeschen" onClick={() => loeschen(a.id)} aria-label="Aufgabe löschen">
                    ×
                  </button>
                </div>
              </li>
            ))}
          </ul>
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
