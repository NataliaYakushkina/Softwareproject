// Zentrale Stelle für alle Aufrufe an das Backend (REST API).
//
// In der Entwicklung läuft das Backend auf http://localhost:3000.
// Für die Produktion kann eine andere Adresse über die Umgebungsvariable
// VITE_API_URL gesetzt werden (z. B. beim Build auf der VM).
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

// Kleiner Helfer, der fetch kapselt: setzt den JSON-Header, prüft auf Fehler
// und gibt die Antwort als JSON zurück.
async function request(pfad, optionen = {}) {
  const antwort = await fetch(`${BASE_URL}${pfad}`, {
    headers: { 'Content-Type': 'application/json' },
    ...optionen,
  })

  if (!antwort.ok) {
    // Backend schickt Fehler als { error: "..." } — den zeigen wir an.
    const daten = await antwort.json().catch(() => ({}))
    throw new Error(daten.error || `Fehler ${antwort.status}`)
  }

  // Manche Antworten haben keinen Body (z. B. leere Ergebnisse) — abfangen.
  const text = await antwort.text()
  return text ? JSON.parse(text) : null
}

// --- Haushalt ---
export function getHaushalt() {
  return request('/household')
}

export function updateHaushalt(name) {
  return request('/household', {
    method: 'PUT',
    body: JSON.stringify({ name }),
  })
}

// --- Mitglieder ---
export function getMitglieder() {
  return request('/members')
}

export function createMitglied(name, householdId) {
  return request('/members', {
    method: 'POST',
    body: JSON.stringify({ name, householdId }),
  })
}

export function deleteMitglied(id) {
  return request(`/members/${id}`, { method: 'DELETE' })
}

// --- Aufgaben (für die spätere Anbindung der Aufgabenseite vorbereitet) ---
export function getAufgaben(woche) {
  const query = woche ? `?week=${encodeURIComponent(woche)}` : ''
  return request(`/tasks${query}`)
}

export function createAufgabe(daten) {
  return request('/tasks', {
    method: 'POST',
    body: JSON.stringify(daten),
  })
}

export function updateAufgabe(id, daten) {
  return request(`/tasks/${id}`, {
    method: 'PUT',
    body: JSON.stringify(daten),
  })
}

export function updateAufgabeStatus(id, status) {
  return request(`/tasks/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  })
}

export function deleteAufgabe(id) {
  return request(`/tasks/${id}`, { method: 'DELETE' })
}

export function getFairnessSuggestion() {
  return request('/fairness/suggestion')
}
