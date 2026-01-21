// ============================================
// PUBLIC WEBSITE - SERMONS PAGE
// Purpose: Display all sermons
// Route: /sermons
// Fetches: Sermons from backend API
// ============================================

import React, { useState, useEffect } from "react"
import { sermons as sermonsAPI } from "../../services/api"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import "./website.css"

const Sermons = () => {
  const [sermons, setSermons] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSermons()
  }, [])

  const fetchSermons = async () => {
    try {
      const response = await sermonsAPI.getAll()
      console.log("Sermons API Response:", response)
      
      let sermonsData = []
      if (Array.isArray(response.data)) {
        sermonsData = response.data
      } else if (Array.isArray(response)) {
        sermonsData = response
      }

      if (sermonsData.length > 0) {
        setSermons(sermonsData)
      } else {
        console.log("Using sample sermons for development")
        setSermons(getSampleSermons())
      }
    } catch (error) {
      console.error("Error fetching sermons:", error)
      console.log("Using sample sermons for development")
      setSermons(getSampleSermons())
    } finally {
      setLoading(false)
    }
  }

  const getSampleSermons = () => {
    return [
      {
        id: 1,
        title: "The Power of Prayer",
        preacher: "Pastor John",
        description: "Learn how prayer can transform your life and bring you closer to God.",
        cover_image: "https://via.placeholder.com/500x300?text=Power+of+Prayer",
        audio_file: "https://example.com/sermon1.mp3"
      },
      {
        id: 2,
        title: "Grace and Mercy",
        preacher: "Pastor Mary",
        description: "Understanding God's grace and how it applies to our daily lives.",
        cover_image: "https://via.placeholder.com/500x300?text=Grace+Mercy",
        audio_file: "https://example.com/sermon2.mp3"
      }
    ]
  }

  return (
    <div className="sermons-page">
      <Navbar />
      
      <main className="page-content">
        <h1>Sermons</h1>

        {loading ? (
          <p>Loading sermons...</p>
        ) : sermons.length === 0 ? (
          <p>No sermons available yet.</p>
        ) : (
          <div className="sermons-grid">
            {sermons.map(sermon => (
              <div key={sermon.id} className="sermon-card">
                {sermon.imageUrl && (
                  <img src={sermon.imageUrl} alt={sermon.title} />
                )}
                <h3>{sermon.title}</h3>
                <p>{sermon.description}</p>
                {sermon.videoUrl && (
                  <a href={sermon.videoUrl} target="_blank" rel="noopener noreferrer" className="btn">
                    Watch Sermon
                  </a>
                )}
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
