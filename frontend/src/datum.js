// Gibt die aktuelle Kalenderwoche im ISO-8601-Format zurück, z. B. "2026-W27".
// Genau dieses Format nutzt auch <input type="week"> und das Backend (Task.week).
export function aktuelleWoche() {
  const jetzt = new Date()
  const d = new Date(Date.UTC(jetzt.getFullYear(), jetzt.getMonth(), jetzt.getDate()))
  const tag = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - tag)
  const jahresStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  const wochenNr = Math.ceil(((d - jahresStart) / 86400000 + 1) / 7)
  return `${d.getUTCFullYear()}-W${String(wochenNr).padStart(2, '0')}`
}
