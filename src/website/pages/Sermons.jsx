// ============================================
// PUBLIC WEBSITE – SERMONS PAGE
// Data Source: Google Sheet (CSV)
// Features:
// - Live search (as user types)
// - Latest sermons shown first
// ============================================

import React, { useEffect, useState } from "react"
import axios from "axios"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import "./sermons.css"

const Sermons = () => {
  const [sermons, setSermons] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSermons()
  }, [])

  const fetchSermons = async () => {
    const url =
      "https://docs.google.com/spreadsheets/d/18OVONeRvroB2xmxzFNIHQrQGYhRgdC5sTV9BqoOT368/gviz/tq?tqx=out:csv"

    try {
      const response = await axios.get(url)
      const rows = response.data.split("\n").slice(1)

      const parsed = rows
        .map(row => {
          const fields = row.split(",")
          if (fields.length < 5) return null

          const [
            year,
            month,
            title,
            audio,
            video,
            speaker,
            thumbnail,
          ] = fields.map(f => f.trim().replace(/^"|"$/g, ""))

          return { year, month, title, audio, video, speaker, thumbnail }
        })
        .filter(Boolean)
        .reverse() // 🔥 latest first

      setSermons(parsed)
    } catch (err) {
      console.error("Failed to fetch sermons:", err)
    } finally {
      setLoading(false)
    }
  }

  // 🔍 LIVE SEARCH FILTER
  const filteredSermons = sermons.filter(sermon => {
    const q = searchTerm.toLowerCase()
    return (
      sermon.title.toLowerCase().includes(q) ||
      sermon.speaker.toLowerCase().includes(q) ||
      `${sermon.month} ${sermon.year}`.toLowerCase().includes(q)
    )
  })

  return (
    <div className="sermons-page">
      <Navbar />

      <main className="page-content">
        <div className="sermons-header">
          <h1>Sermons</h1>

          {/* 🔍 SEARCH INPUT (exact place you requested) */}
          <input
            type="text"
            className="sermon-search"
            placeholder="Search sermons, speaker, date..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="sermons-loading">Loading sermons...</div>
        ) : (
          <div className="sermons-grid">
            {filteredSermons.map((sermon, index) => (
              <div key={index} className="sermon-card">
                {sermon.thumbnail && (
                  <div className="sermon-image">
                    <img src={sermon.thumbnail} alt={sermon.title} />
                  </div>
                )}

                <div className="sermon-content">
                  <h3>{sermon.title}</h3>

                  <p className="sermon-meta">
                    {sermon.speaker} · {sermon.month} {sermon.year}
                  </p>

                  <div className="sermon-actions">
                    {sermon.audio && (
                      <a
                        href={sermon.audio}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline"
                      >
                        Listen
                      </a>
                    )}
                    {sermon.video && (
                      <a
                        href={sermon.video}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                      >
                        Watch
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default Sermons
