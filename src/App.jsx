// ============================================
// APP.JSX - MAIN APP ROUTING
// Purpose: Setup routes for public website
// Uses: Backend API (https://spiritlife.familytradecenter.com/api/)
// Admin: https://spiritlife.tokinrides.com/
// ============================================

import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"

// Website pages
import Home from "./website/pages/Home"
import About from "./website/pages/About"
import Sermons from "./website/pages/Sermons"
import Events from "./website/pages/Events"
import RhemaMeditations from "./website/pages/RhemaMeditations"

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes future={{ v7_relativeSplatPath: true }}>
          {/* PUBLIC WEBSITE ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/sermons" element={<Sermons />} />
          <Route path="/events" element={<Events />} />
          <Route path="/rhema-meditations" element={<RhemaMeditations />} />

          {/* 404 - Not found */}
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App