// ============================================
// APP.JSX - MAIN APP ROUTING
// Purpose: Setup routes for public website
// ============================================

import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"

// Website pages
import Home from "./website/pages/Home"
import About from "./website/pages/About"
import Sermons from "./website/pages/Sermons"
import Events from "./website/pages/Events"
import RhemaMeditations from "./website/pages/RhemaMeditations"

// Departments
import Child from "./website/components/departments/Child"
import Drama from "./website/components/departments/Drama"
import Evan from "./website/components/departments/Evan"
import Media from "./website/components/departments/Media"
import Prayer from "./website/components/departments/Prayer"
import Protocol from "./website/components/departments/Protocol"
import Usher from "./website/components/departments/Usher"
import Welfare from "./website/components/departments/Welfare"
import ZoeStreams from "./website/components/departments/ZoeStreams"

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes future={{ v7_relativeSplatPath: true }}>
          {/* PUBLIC WEBSITE */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/sermons" element={<Sermons />} />
          <Route path="/events" element={<Events />} />
          <Route path="/rhema-meditations" element={<RhemaMeditations />} />

          {/* DEPARTMENTS */}
          <Route path="/departments/child" element={<Child />} />
          <Route path="/departments/drama" element={<Drama />} />
          <Route path="/departments/evan" element={<Evan />} />
          <Route path="/departments/media" element={<Media />} />
          <Route path="/departments/prayer" element={<Prayer />} />
          <Route path="/departments/protocol" element={<Protocol />} />
          <Route path="/departments/usher" element={<Usher />} />
          <Route path="/departments/welfare" element={<Welfare />} />
          <Route path="/departments/zoestreams" element={<ZoeStreams />} />

          {/* 404 */}
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
