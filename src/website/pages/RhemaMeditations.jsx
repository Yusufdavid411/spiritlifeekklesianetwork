import React, { useEffect, useState } from "react"
import { rhemaMeditations } from "../../services/api"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import RhemaModal from "../components/RhemaModal"
import "./rhemaPage.css"

const RhemaMeditations = () => {
  const [rhemas, setRhemas] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedRhema, setSelectedRhema] = useState(null)
  const [todayRhema, setTodayRhema] = useState(null)

  useEffect(() => {
    fetchRhemas()
  }, [])

  const fetchRhemas = async () => {
    try {
      const response = await rhemaMeditations.getAll()
      const rhemaList = response?.data?.rhemaMeditation || []
      // sort newest first
      const sorted = [...rhemaList].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      )
      setRhemas(sorted)
      // Find today's rhema
      const today = new Date().toISOString().split("T")[0]
      const todayRhemaData = sorted.find(r => new Date(r.created_at).toISOString().split("T")[0] === today)
      setTodayRhema(todayRhemaData || null)
    } catch (error) {
      console.error("Failed to fetch rhemas:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rhema-page">
      <Navbar />
      <main className="page-content">
        <div className="page-header">
          <h1>Rhema Meditations</h1>
          <p className="page-subtitle">Daily inspirational messages for your spiritual growth</p>
        </div>

        {loading && <p>Loading rhema meditations...</p>}
        {!loading && !todayRhema && rhemas.length === 0 && (
          <p>No rhema meditations available.</p>
        )}


        {/* Today's Rhema Meditation - Side by Side */}
        {!loading && todayRhema && (
          <section className="todays-rhema-featured">
            <h2 className="featured-label">Today's Rhema Meditation</h2>
            <div className="featured-rhema-card rhema-featured" onClick={() => setSelectedRhema(todayRhema)}>
              <div className="rhema-image-wrapper">
                <img className="rhema-featured-image" src={todayRhema.image?.image_url} alt={todayRhema.title} />
              </div>
              <div className="rhema-featured-content">
                <h2>{todayRhema.title}</h2>
                <p className="rhema-date">{new Date(todayRhema.created_at).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
                <p className="rhema-writeup">{todayRhema.content}</p>
                <button className="btn-view-modal">View Full Rhema</button>
              </div>
            </div>
          </section>
        )}

        {/* Previous Rhema Meditations Grid */}
        {!loading && rhemas.length > 0 && (
          <section className="previous-rhemas">
            <h3 className="previous-title">Previous Rhema Meditations</h3>
            <div className="rhema-grid">
              {rhemas
                .filter(r => !todayRhema || r.id !== todayRhema.id)
                .map(rhema => (
                  <div
                    key={rhema.id}
                    className="rhema-card"
                    onClick={() => setSelectedRhema(rhema)}
                  >
                    <div className="rhema-card-image">
                      <img src={rhema.image?.image_url} alt={rhema.title} />
                    </div>
                    <div className="rhema-card-content">
                      <h4>{rhema.title}</h4>
                      <p className="card-date">{new Date(rhema.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
            </div>
          </section>
        )}
      </main>
      {selectedRhema && (
        <RhemaModal rhema={selectedRhema} onClose={() => setSelectedRhema(null)} />
      )}
      <Footer />
    </div>
  )
}

export default RhemaMeditations
