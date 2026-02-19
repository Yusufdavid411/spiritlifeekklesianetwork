// ============================================
// HOME PAGE
// Final version
// - Events show date + time + venue
// - Events modal supports download & social sharing
// - Rhema modal behavior preserved
// ============================================

import React, { useEffect, useRef, useState } from "react"
import { events as eventsAPI, rhemaMeditations } from "../../services/api"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Reels from "../components/Aside/Aside"
import TypingAnimation from "../components/TypingAnimation"
import RhemaModal from "../components/RhemaModal"
import "./home.css"

const Home = () => {
  // EVENTS STATE
  const [events, setEvents] = useState([])
  const [loadingEvents, setLoadingEvents] = useState(true)
  const [activeEvent, setActiveEvent] = useState(null)

  // RHEMA STATE
  const [todayRhema, setTodayRhema] = useState(null)
  const [loadingRhema, setLoadingRhema] = useState(true)
  const [activeRhema, setActiveRhema] = useState(null)

  // HERO IMAGE SLIDER
  const [currentSlide, setCurrentSlide] = useState(0)

  const heroImages = [
    "/img/hero/img00.jpg",
    "/img/hero/img0.jpg",
    "/img/hero/img1.jpg",
    "/img/hero/img2.jpg",
    "/img/hero/img3.jpg",
    "/img/hero/img4.jpg",
    "/img/hero/img5.jpg",
    "/img/hero/img6.jpg",
    "/img/hero/img7.jpg",
  ]

  // ============================================
  // SCROLL REVEAL EFFECT
  // ============================================

  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal")

    const revealOnScroll = () => {
      const windowHeight = window.innerHeight

      revealElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top

        if (elementTop < windowHeight - 80) {
          el.classList.add("active")
        }
      })
    }

    window.addEventListener("scroll", revealOnScroll)
    revealOnScroll()

    return () => window.removeEventListener("scroll", revealOnScroll)
  }, [])



  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroImages.length)
    }, 5000) // change every 5 seconds

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    fetchEvents()
    fetchTodayRhema()
  }, [])

  const fetchEvents = async () => {
    try {
      const response = await eventsAPI.getAll()

      const eventsData =
        response?.data?.events ||
        response?.data ||
        []

      console.log("Events:", eventsData)

      setEvents(Array.isArray(eventsData) ? eventsData : [])
    } catch (err) {
      console.error("Events fetch failed:", err)
      setEvents([]) // prevent crash
    } finally {
      setLoadingEvents(false)
    }
  }


  const fetchTodayRhema = async () => {
    try {
      const response = await rhemaMeditations.getAll()
      const list = response?.data?.rhemaMeditation || []
      const today = new Date().toISOString().split("T")[0]
      const item = list.find(r => r.created_at.startsWith(today)) || list[0]
      setTodayRhema(item || null)
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingRhema(false)
    }
  }

  const downloadImage = async (url, title) => {
    const res = await fetch(url)
    const blob = await res.blob()
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = `${title}.jpg`
    link.click()
    URL.revokeObjectURL(link.href)
  }

  const shareText = (event) =>
    `${event.title}
    📅 ${new Date(event.start_datetime).toLocaleDateString()}
    ⏰ ${new Date(event.start_datetime).toLocaleTimeString()}
    📍 ${event.location || ""}

    ${getImageUrl(event)}

    ${window.location.origin}`

  const getImageUrl = (event) => {
    return event?.image?.image_url || ""
  }


  return (
    <div className="home">
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="hero">
        <div className="hero-slider">
          {heroImages.map((img, index) => (
            <div
              key={index}
              className={`hero-slide ${index === currentSlide ? "active" : ""}`}
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}
        </div>

        <div className="hero-overlay" />

        <div className="hero-content">
          <h1 className="hero-title">SPIRITLIFE EKKLESIA NETWORK</h1>
          <div className="vision-badge">HOUSE OF GLORY</div>
          <div className="hero-subtitle">
            <TypingAnimation
              text="A Ministry with a vision to be, and raise men in whom God can entrust his counsel in all spheres of life as ordained and not suffer loss"
              speed={33}
            />
          </div>
        </div>
        <div className="hero-divider" />
      </section>


      {/* ================= EVENTS ================= */}
      <section className="home-events reveal">
        <h2 className="home-section-title">Programs & Events</h2>

        {loadingEvents ? (
          <div className="events-grid">
            {[1, 2, 3].map(i => (
              <div key={i} className="event-skeleton unified-rhema-card" />
            ))}
          </div>
        ) : (
          <div className="events-grid">
            {events.map(event => (
              <div
                key={event.id}
                className="unified-rhema-card"
                onClick={() => setActiveEvent(event)}
              >
                <div className="rhema-image-box small">
                  
                  {event.image?.image_url ? (
                  <img
                    src={event.image.image_url}
                    alt={event.title}
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = "none"
                      const fallback = document.createElement("div")
                      fallback.className = "image-fallback"
                      fallback.innerText = event.title
                      e.target.parentNode.appendChild(fallback)
                    }}
                  />
                ) : (
                  <div className="image-fallback">
                    {event.title}
                  </div>
                )}

                </div>

                <div className="rhema-text">
                  <h4>{event.title}</h4>

                  {/* EVENT DATE */}
                  <p className="rhema-date">
                    📅 {new Date(event.start_datetime).toLocaleDateString()}
                  </p>

                  {/* ✅ EVENT TIME ADDED */}
                  <p className="rhema-date">
                    ⏰ {new Date(event.start_datetime).toLocaleTimeString()} (WAT)
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

      {/* ================= HOME RHEMA ================= */}
      <section className="home-rhema reveal">
        <h2 className="home-section-title">Today’s Rhema Meditation</h2>

        {loadingRhema ? (
          <div className="event-skeleton unified-rhema-card" />
        ) : todayRhema && (
          <div
            className="unified-rhema-card"
            onClick={() => setActiveRhema(todayRhema)}
          >
            <div className="rhema-image-box">
              <img src={todayRhema.image?.image_url} alt={todayRhema.title} />
            </div>

            <div className="rhema-text">
              <h4>{todayRhema.title}</h4>
              <p className="rhema-date">
                {new Date(todayRhema.created_at).toDateString()}
              </p>
              <p>{todayRhema.content?.substring(0, 180)}...</p>

              <a
                href="/rhema-meditations"
                className="view-all-btn"
                onClick={(e) => e.stopPropagation()}
              >
                View All Rhema
              </a>
            </div>
          </div>
        )}
      </section>

      <Reels />




      {/* .................Modals........................... */}

      {/* ================= EVENT MODAL ================= */}
      {activeEvent && (
        <div
          className="event-modal-backdrop"
          onClick={() => setActiveEvent(null)}
        >
          <div className="event-modal" onClick={e => e.stopPropagation()}>
            <button
              className="event-modal-close"
              onClick={() => setActiveEvent(null)}
            >
              ✕
            </button>

            <div className="rhema-image-box">
              {activeEvent.image?.image_url ? (
                <img
                  src={activeEvent.image.image_url}
                  alt={activeEvent.title}
                  onError={(e) => {
                    e.target.style.display = "none"
                    const fallback = document.createElement("div")
                    fallback.className = "image-fallback"
                    fallback.innerText = activeEvent.title
                    e.target.parentNode.appendChild(fallback)
                  }}
                />
              ) : (
                <div className="image-fallback">
                  {activeEvent.title}
                </div>
              )}
            </div>

            <h3>{activeEvent.title}</h3>

            <p className="rhema-date">
              📅 {new Date(activeEvent.start_datetime).toLocaleDateString()} <br />
              ⏰ {new Date(activeEvent.start_datetime).toLocaleTimeString()}
            </p>

            {activeEvent.location && (
              <p className="event-location">📍 {activeEvent.location}</p>
            )}

            <div className="modal-actions">
              <button
                className="btn-download"
                onClick={() =>
                  activeEvent.image?.image_url &&
                  downloadImage(
                    activeEvent.image.image_url,
                    activeEvent.title
                  )
                }
              >
                Download Image
              </button>

              <div className="share-buttons">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(
                    shareText(activeEvent)
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>

                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    activeEvent.image.image_url
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>

                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    shareText(activeEvent)
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  X
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= RHEMA MODAL ================= */}
      {activeRhema && (
        <RhemaModal
          rhema={activeRhema}
          onClose={() => setActiveRhema(null)}
        />
      )}

      <a
        href="https://wa.me/+2349094600075"
        className="whatsapp-float"
        target="_blank"
        rel="noreferrer"
      >
        💬
      </a>











      

      <Footer />
    </div>
  )
}

export default Home
