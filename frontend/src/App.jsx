import { Routes, Route } from 'react-router-dom'
import Startseite from './pages/Startseite.jsx'
import Aufgabenseite from './pages/Aufgabenseite.jsx'
import Mitgliederseite from './pages/Mitgliederseite.jsx'
import Einstellungenseite from './pages/Einstellungenseite.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Startseite />} />
      <Route path="/aufgaben" element={<Aufgabenseite />} />
      <Route path="/mitbewohner" element={<Mitgliederseite />} />
      <Route path="/einstellungen" element={<Einstellungenseite />} />
    </Routes>
  )
}
