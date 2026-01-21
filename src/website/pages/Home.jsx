// ============================================
// PUBLIC WEBSITE - HOME PAGE
// Purpose: Hero section with background video
// Route: /
// Features:
// - Background video (admin-managed)
// - Typing animations for ministry name/vision
// - Auto-playing video
// ============================================

import React, { useState, useEffect, useRef } from "react"
import { rhemaMeditations, events as eventsAPI } from "../../services/api"
import TypingAnimation from "../components/TypingAnimation"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import "./home.css"

const Home = () => {
  // Use static hero.mp4 video for background
  const [loading, setLoading] = useState(true)
  const [todayRhema, setTodayRhema] = useState(null)
  const [events, setEvents] = useState([])
  const [eventsLoading, setEventsLoading] = useState(true)
  const [eventModal, setEventModal] = useState(null)
  const carouselRef = useRef(null)
  const [carouselIndex, setCarouselIndex] = useState(0)



  // Fetch today's rhema meditation from API
  useEffect(() => {
    fetchTodayRhema()
    fetchEvents()
  }, [])
  const fetchEvents = async () => {
    try {
      const response = await eventsAPI.getAll()
      // API returns { status, message, data: { events: [ ... ] } }
      const eventsData = Array.isArray(response?.data?.events) ? response.data.events : [];
      if (eventsData.length > 0) {
        // Sort by start_datetime
        const sorted = eventsData.sort((a, b) => new Date(a.start_datetime) - new Date(b.start_datetime));
        setEvents(sorted);
      } else {
        setEvents([]);
      }
    } catch (error) {
      setEvents([]);
    } finally {
      setEventsLoading(false);
    }
  }
  // Carousel auto-scroll effect
  useEffect(() => {
    if (!events || events.length === 0) return;
    const interval = setInterval(() => {
      setCarouselIndex(prev => (prev + 1) % events.length);
      if (carouselRef.current) {
        carouselRef.current.scrollTo({
          left: ((carouselIndex + 1) % events.length) * 320, // 320px per card
          behavior: 'smooth'
        });
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [events, carouselIndex]);

  const fetchTodayRhema = async () => {
    try {
      const response = await rhemaMeditations.getAll()
      const rhemas = Array.isArray(response?.data?.rhemaMeditation) ? response.data.rhemaMeditation : [];
      // Get today's date
      const today = new Date().toISOString().split("T")[0];
      let rhema = rhemas.find(r => {
        const rhemaDate = new Date(r.created_at).toISOString().split("T")[0];
        return rhemaDate === today;
      });
      // If no rhema for today, use the latest
      if (!rhema && rhemas.length > 0) {
        rhema = rhemas[0];
      }
      if (rhema) {
        setTodayRhema({
          ...rhema,
          imageUrl: rhema.image?.image_url,
          writeup: rhema.title,
          date: rhema.created_at
        });
      }
    } catch (error) {
      console.error("Error fetching rhema meditation:", error);
    }
  }

  return (
    <div className="home">
      <Navbar />
      
      {/* Hero Section with Background Video */}
      <section className="hero">
        
        {/* Background Video */}
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/video/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dark Overlay */}
        <div className="hero-overlay"></div>

        {/* Hero Content */}
        <div className="hero-content">
          
          {/* Ministry Name - Large Heading */}
          <h1 className="hero-title">
            SPIRIT LIFE EKKLESIA NETWORK
          </h1>

          {/* Vision Badge */}
          <div className="vision-badge">
            HOUSE OF GLORY
          </div>

          {/* Vision Statement */}
          <div className="hero-subtitle">
            <TypingAnimation
              text="A Ministry with a vision to be, and raise men in whom God can entrust his counsel in all spheres of life as ordained and not suffer loss"
              speed={30}
            />
          </div>
        </div>
      </section>



      {/* Event & Announcement Carousel */}
      <section className="home-events-section">
        <div className="events-container">
          <h2 className="events-section-title">Event & Announcement</h2>
          {eventsLoading ? (
            <div className="events-skeletons" style={{ display: 'flex', gap: 16 }}>
              {[1,2,3].map(i => (
                <div key={i} style={{ background: '#fff', minWidth: 120, height: 120, borderRadius: 8, boxShadow: '0 2px 8px #eee', flex: 1 }}></div>
              ))}
            </div>
          ) : events.length === 0 ? (
            <p style={{ color: '#888', background: '#fff', padding: '2rem', borderRadius: 8 }}>No events found.</p>
          ) : (
            <div className="events-carousel" ref={carouselRef} style={{ display: 'flex', overflowX: 'auto', scrollBehavior: 'smooth' }}>
              {events.map((event, idx) => (
                <div
                  key={event.id}
                  className="event-card-home"
                  style={{ minWidth: 120, marginRight: 16, cursor: 'pointer', border: carouselIndex === idx ? '2px solid #04046f' : '1px solid #ccc', background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #eee', padding: 8 }}
                  onClick={() => setEventModal(event)}
                >
                  {event.image?.image_url && (
                    <img src={event.image.image_url} alt={event.title} style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 6, marginBottom: 8 }} />
                  )}
                  <div className="event-date-home" style={{ fontSize: '0.8rem' }}>{event.start_datetime ? new Date(event.start_datetime).toLocaleString() : ""}</div>
                  <h3 style={{ fontSize: '1rem', margin: '4px 0' }}>{event.title}</h3>
                  {event.location && <p className="location-home" style={{ fontSize: '0.85rem' }}>📍 {event.location}</p>}
                  <p style={{ fontSize: '0.85rem', margin: 0 }}>{event.description}</p>
                  {event.is_repeat && event.repeat_day && (
                    <p className="repeat-info" style={{ fontSize: '0.8rem' }}>Repeats: {event.repeat_day}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Event Modal */}
      {eventModal && (
        <div className="event-modal-overlay" onClick={() => setEventModal(null)}>
          <div className="event-modal" onClick={e => e.stopPropagation()} style={{ background: '#fff', padding: 24, borderRadius: 10, maxWidth: 340, margin: '40px auto' }}>
            {eventModal.image?.image_url && (
              <img src={eventModal.image.image_url} alt={eventModal.title} style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 8, marginBottom: 12 }} />
            )}
            <h2 style={{ fontSize: '1.1rem' }}>{eventModal.title}</h2>
            <div style={{ color: '#ff6b4a', fontWeight: 600, fontSize: '0.9rem' }}>{eventModal.start_datetime ? new Date(eventModal.start_datetime).toLocaleString() : ''}</div>
            {eventModal.location && <p style={{ margin: '8px 0', fontSize: '0.85rem' }}>📍 {eventModal.location}</p>}
            <p style={{ fontSize: '0.85rem' }}>{eventModal.description}</p>
            {eventModal.is_repeat && eventModal.repeat_day && (
              <p className="repeat-info" style={{ fontSize: '0.8rem' }}>Repeats: {eventModal.repeat_day}</p>
            )}
            <button onClick={() => setEventModal(null)} style={{ marginTop: 16, background: '#04046f', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: 5 }}>Close</button>
          </div>
        </div>
      )}

      {/* Rhema Meditation Section - after events */}
      <section className="todays-rhema-home">
        <div className="rhema-container">
          {loading ? (
            <div style={{ background: '#fff', minHeight: 120, borderRadius: 8, boxShadow: '0 2px 8px #eee', margin: '1rem 0' }}></div>
          ) : !todayRhema ? (
            <p style={{ color: '#888', background: '#fff', padding: '2rem', borderRadius: 8 }}>Network error or no rhema meditation found.</p>
          ) : (
            <>
              <h2 className="rhema-section-title">Rhema Meditation</h2>
              <div className="rhema-card-home">
                <div className="rhema-image-home">
                  <img src={todayRhema.imageUrl} alt={todayRhema.title} style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 6 }} />
                </div>
                <div className="rhema-content-home">
                  <h3 style={{ fontSize: '1rem' }}>{todayRhema.title}</h3>
                  <p className="rhema-date-home" style={{ fontSize: '0.9rem' }}>
                    {new Date(todayRhema.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric"
                    })}
                  </p>
                  <p className="rhema-preview" style={{ fontSize: '0.9rem' }}>{todayRhema.writeup.substring(0, 150)}...</p>
                  <a href="/rhema-meditations" className="btn-rhema-view" style={{ fontSize: '0.9rem', padding: '6px 16px' }}>
                    View Full Rhema
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Home
