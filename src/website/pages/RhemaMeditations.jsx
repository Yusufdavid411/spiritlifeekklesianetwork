// ============================================
// RHEMA MEDITATIONS PAGE
// Updated UI:
// - Unified image styling
// - Smaller featured rhema
// - Clear section separation
// - Dark / purple theme
// ============================================

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

  // Fetch all rhema meditations
  const fetchRhemas = async () => {
    try {
      const response = await rhemaMeditations.getAll()

      const list = Array.isArray(response?.data?.rhemaMeditation)
        ? response.data.rhemaMeditation
        : []

      const sorted = [...list].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      )

      setRhemas(sorted)

      // Detect today’s rhema or fallback to latest
      const today = new Date().toISOString().split("T")[0]
      const todayItem = sorted.find(
        r => new Date(r.created_at).toISOString().split("T")[0] === today
      )

      setTodayRhema(todayItem || sorted[0] || null)
    } catch (err) {
      console.error("Failed to fetch rhema:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rhema-page dark-theme">
      <Navbar />

      <main className="page-content">

        {/* PAGE TITLE */}
        <div className="page-header">
          <h1>Rhema Meditations</h1>
        </div>

        {/* ================= TODAY RHEMA ================= */}
        <h2 className="section-title">Today Rhema Meditation</h2>

        <section className="today-rhema-wrapper">
          {loading ? (
            <div className="today-rhema-skeleton" />
          ) : todayRhema ? (
            <div
              className="today-rhema-card unified-rhema-card"
              onClick={() => setSelectedRhema(todayRhema)}
            >
              {/* Image (full image, smaller size) */}
              <div className="rhema-image-box">
                <img
                  src={todayRhema.image?.image_url}
                  alt={todayRhema.title}
                />
              </div>

              {/* Content */}
              <div className="rhema-text">
                <h3>{todayRhema.title}</h3>

                <p className="rhema-date">
                  {new Date(todayRhema.created_at).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>

                <p className="rhema-preview">
                  {todayRhema.content?.substring(0, 260)}...
                </p>
              </div>
            </div>
          ) : null}
        </section>

        {/* ================= PREVIOUS RHEMA ================= */}
        <h2 className="section-title">Previous Rhema Meditations</h2>

        <section className="previous-rhema-wrapper">
          {loading ? (
            <div className="previous-skeleton-grid">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="previous-rhema-skeleton" />
              ))}
            </div>
          ) : (
            <div className="previous-rhema-grid">
              {rhemas
                .filter(r => r.id !== todayRhema?.id)
                .map(rhema => (
                  <div
                    key={rhema.id}
                    className="previous-rhema-card unified-rhema-card"
                    onClick={() => setSelectedRhema(rhema)}
                  >
                    {/* Image */}
                    <div className="rhema-image-box small">
                      <img
                        src={rhema.image?.image_url}
                        alt={rhema.title}
                      />
                    </div>

                    {/* Content */}
                    <div className="rhema-text">
                      <h4>{rhema.title}</h4>
                      <span className="rhema-date">
                        {new Date(rhema.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </section>
      </main>

      {/* MODAL */}
      {selectedRhema && (
        <RhemaModal
          rhema={selectedRhema}
          onClose={() => setSelectedRhema(null)}
        />
      )}

      <Footer />
    </div>
  )
}

export default RhemaMeditations