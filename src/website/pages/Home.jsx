// ============================================
// HOME PAGE
// Updates:
// - Maintains original background
// - Faster event rendering with skeletons
// - Unified image styling (same as Rhema)
// - Full image display (no crop)
// ============================================

import React, { useEffect, useRef, useState } from "react"
import { events as eventsAPI } from "../../services/api"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import TypingAnimation from "../components/TypingAnimation"
import "./home.css"

const Home = () => {
  // EVENTS STATE
  const [events, setEvents] = useState([])
  const [loadingEvents, setLoadingEvents] = useState(true)
  const [activeEvent, setActiveEvent] = useState(null)

  // VIDEO
  const videoRef = useRef(null)
  const [isMuted, setIsMuted] = useState(false)

  // Play hero video immediately
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = false
      videoRef.current.play().catch(() => {
        videoRef.current.muted = true
        setIsMuted(true)
      })
    }
  }, [])

  const toggleMute = () => {
    setIsMuted(prev => {
      if (videoRef.current) videoRef.current.muted = !prev
      return !prev
    })
  }

  // Fetch events immediately
  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const response = await eventsAPI.getAll()

      const list = Array.isArray(response?.data?.events)
        ? response.data.events
        : []

      setEvents(list)
    } catch (err) {
      console.error("Failed to fetch events:", err)
    } finally {
      // Stop loading as soon as response returns
      setLoadingEvents(false)
    }
  }

  return (
    <div className="home">
      <Navbar />

      {/* ================= HERO SECTION ================= */}
      <section className="hero">
        <video
          ref={videoRef}
          className="hero-video"
          autoPlay
          loop
          playsInline
          muted={isMuted}
        >
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>

        <div className="hero-overlay" />

        {/* Mute Button */}
        <button className="mute-btn" onClick={toggleMute}>
          {isMuted ? "🔇" : "🔊"}
        </button>

        <div className="hero-content">
          <h1 className="hero-title">SPIRIT LIFE EKKLESIA NETWORK</h1>

          <div className="vision-badge">HOUSE OF GLORY</div>

          <div className="hero-subtitle">
            <TypingAnimation
              text="A Ministry with a vision to be, and raise men in whom God can entrust his counsel in all spheres of life as ordained and not suffer loss"
              speed={28}
            />
          </div>
        </div>
      </section>

      {/* ================= EVENTS SECTION ================= */}
      <section className="home-events">
        <h2 className="home-section-title">Programs & Events</h2>

        {loadingEvents ? (
          // Instant skeleton UI (no delay)
          <div className="events-skeleton-grid">
            {[1, 2, 3].map(i => (
              <div key={i} className="event-skeleton unified-rhema-card" />
            ))}
          </div>
        ) : events.length === 0 ? (
          <p className="no-events">No upcoming events at the moment.</p>
        ) : (
          <div className="events-grid">
            {events.map(event => (
              <div
                key={event.id}
                className="event-card unified-rhema-card"
                onClick={() => setActiveEvent(event)}
              >
                {/* FULL IMAGE (same pattern as Rhema) */}
                <div className="rhema-image-box small">
                  {event.image?.image_url && (
                    <img
                      src={event.image.image_url}
                      alt={event.title}
                    />
                  )}
                </div>

                <div className="rhema-text">
                  <h4>{event.title}</h4>

                  <p className="rhema-date">
                    {new Date(event.start_datetime).toLocaleDateString()}
                  </p>

                  {event.location && (
                    <p className="event-location">📍 {event.location}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ================= EVENT MODAL ================= */}
      {activeEvent && (
        <div
          className="event-modal-backdrop"
          onClick={() => setActiveEvent(null)}
        >
          <div
            className="event-modal"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="event-modal-close"
              onClick={() => setActiveEvent(null)}
            >
              ✕
            </button>

            <div className="rhema-image-box">
              {activeEvent.image?.image_url && (
                <img
                  src={activeEvent.image.image_url}
                  alt={activeEvent.title}
                />
              )}
            </div>

            <h3>{activeEvent.title}</h3>

            <p className="rhema-date">
              {new Date(activeEvent.start_datetime).toLocaleString()}
            </p>

            {activeEvent.location && (
              <p className="event-location">📍 {activeEvent.location}</p>
            )}

            <p className="event-description">
              {activeEvent.description}
            </p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default Home
