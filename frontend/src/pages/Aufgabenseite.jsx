import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Aufgabenseite.css'
import {
  getHaushalt,
  getMitglieder,
  getAufgaben,
  createAufgabe,
  updateAufgabe,
  updateAufgabeStatus,
  deleteAufgabe,
} from '../api.js'
import { aktuelleWoche } from '../datum.js'

export default function Aufgabenseite() {
  const [woche, setWoche] = useState(aktuelleWoche())
  const [aufgaben, setAufgaben] = useState([])
  const [mitglieder, setMitglieder] = useState([])
  const [haushaltId, setHaushaltId] = useState(null)
  const [laden, setLaden] = useState(true)
  const [fehler, setFehler] = useState('')
  const [formOffen, setFormOffen] = useState(false)
  const [titel, setTitel] = useState('')
  const [zustaendig, setZustaendig] = useState('')

  // Mitglieder + Haushalt einmalig laden (für Zuweisung und householdId).
  useEffect(() => {
    Promise.all([getHaushalt(), getMitglieder()])
      .then(([haushalt, liste]) => {
        setHaushaltId(haushalt?.id ?? null)
        setMitglieder(liste)
      })
      .catch(() => setFehler('Daten konnten nicht geladen werden. Läuft das Backend?'))
  }, [])

  // Aufgaben (neu) laden, wann immer sich die gewählte Woche ändert.
  useEffect(() => {
    setLaden(true)
    getAufgaben(woche)
      .then((liste) => {
        setAufgaben(liste)
        setFehler('')
      })
      .catch(() => setFehler('Aufgaben konnten nicht geladen werden. Läuft das Backend?'))
      .finally(() => setLaden(false))
  }, [woche])

  async function hinzufuegen(e) {
    e.preventDefault()
    const name = titel.trim()
    if (!name) return
    try {
      await createAufgabe({
        title: name,
        description: '',
        week: woche,
        assignedMemberId: zustaendig ? Number(zustaendig) : null,
        householdId: haushaltId,
      })
      setTitel('')
      setZustaendig('')
      setFormOffen(false)
      setFehler('')
      // POST liefert nur eine Bestätigung — Liste frisch vom Backend holen.
      setAufgaben(await getAufgaben(woche))
    } catch {
      setFehler('Aufgabe konnte nicht gespeichert werden.')
    }
  }

  async function statusUmschalten(a) {
    const neuerStatus = a.status === 'done' ? 'open' : 'done'
    try {
      await updateAufgabeStatus(a.id, neuerStatus)
      setAufgaben(aufgaben.map((x) => (x.id === a.id ? { ...x, status: neuerStatus } : x)))
    } catch {
      setFehler('Status konnte nicht geändert werden.')
    }
  }

  async function zuweisen(a, memberId) {
    const id = memberId ? Number(memberId) : null
    try {
      await updateAufgabe(a.id, {
        title: a.title,
        description: a.description,
        week: a.week,
        assignedMemberId: id,
      })
      setAufgaben(aufgaben.map((x) => (x.id === a.id ? { ...x, assignedMemberId: id } : x)))
    } catch {
      setFehler('Zuweisung fehlgeschlagen.')
    }
  }

  async function loeschen(id) {
    try {
      await deleteAufgabe(id)
      setAufgaben(aufgaben.filter((a) => a.id !== id))
    } catch {
      setFehler('Aufgabe konnte nicht gelöscht werden.')
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

      <main className="container aufgaben-main">
        <h1 className="aufgaben-titel">Aufgaben</h1>
        <p className="aufgaben-lead">Wähle eine Woche und verteile die Aufgaben im Haushalt.</p>

        {fehler && <p className="fehler" style={{ color: '#b91c1c' }}>{fehler}</p>}

        {/* Wochenauswahl */}
        <div className="wochenauswahl">
          <label htmlFor="woche">Woche:</label>
          <input
            id="woche"
            className="feld"
            type="week"
            value={woche}
            onChange={(e) => setWoche(e.target.value || aktuelleWoche())}
          />
        </div>

        {/* Listen-Kopf mit "Neue Aufgabe" */}
        <div className="listen-kopf">
          <h2>
            {aufgaben.length} Aufgabe{aufgaben.length === 1 ? '' : 'n'} diese Woche
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
            <select className="feld" value={zustaendig} onChange={(e) => setZustaendig(e.target.value)}>
              <option value="">— Person wählen —</option>
              {mitglieder.map((m) => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
            <button type="submit" className="btn btn-primary">Hinzufügen</button>
          </form>
        )}

        {/* Liste der Aufgaben */}
        {laden ? (
          <p className="leer">Lädt…</p>
        ) : aufgaben.length === 0 ? (
          <p className="leer">Keine Aufgaben diese Woche. Erstelle eine neue!</p>
        ) : (
          <ul className="aufgaben-liste">
            {aufgaben.map((a) => (
              <li className="aufgabe" key={a.id}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={a.status === 'done'}
                    onChange={() => statusUmschalten(a)}
                  />
                  <span
                    className="aufgabe-titel"
                    style={a.status === 'done' ? { textDecoration: 'line-through', opacity: 0.6 } : undefined}
                  >
                    {a.title}
                  </span>
                </label>
                <div className="aufgabe-rechts">
                  <select
                    className={'person-select' + (a.assignedMemberId ? '' : ' leer')}
                    value={a.assignedMemberId ?? ''}
                    onChange={(e) => zuweisen(a, e.target.value)}
                  >
                    <option value="">Nicht zugewiesen</option>
                    {mitglieder.map((m) => (
                      <option key={m.id} value={m.id}>{m.name}</option>
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
