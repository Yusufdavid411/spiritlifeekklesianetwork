// ============================================
// PUBLIC WEBSITE - EVENTS PAGE
// Purpose: Display upcoming events
// Route: /events
// Fetches: Events from backend API
// ============================================

import React, { useState, useEffect } from "react"
import { events as eventsAPI } from "../../services/api"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import "./website.css"

const Events = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
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
      console.error("Error fetching events:", error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }

  const getSampleEvents = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    
    return [
      {
        id: 1,
        title: "Sunday Worship Service",
        location: "Main Sanctuary",
        start_date: tomorrow.toISOString(),
        description: "Join us for our weekly worship service and ministry time."
      },
      {
        id: 2,
        title: "Prayer Meeting",
        location: "Fellowship Hall",
        start_date: new Date(tomorrow.getTime() + 86400000).toISOString(),
        description: "Come and pray with us as we seek God's face together."
      }
    ]
  }

  return (
    <div className="events-page">
      <Navbar />
      
      <main className="page-content">
        <h1>Events</h1>

        {loading ? (
          <p>Loading events...</p>
        ) : events.length === 0 ? (
          <p>No events scheduled yet.</p>
        ) : (
          <div className="events-list">
            {events.map(event => (
              <div key={event.id} className="event-card">
                <div className="event-image-wrapper">
                  {event.image?.image_url && (
                    <img src={event.image.image_url} alt={event.title} className="event-image" />
                  )}
                </div>
                <div className="event-details">
                  <div className="event-date">
                    {event.start_datetime ? new Date(event.start_datetime).toLocaleString() : ""}
                  </div>
                  <h3>{event.title}</h3>
                  {event.location && <p className="location">📍 {event.location}</p>}
                  <p>{event.description}</p>
                  {event.is_repeat && event.repeat_day && (
                    <p className="repeat-info">Repeats: {event.repeat_day}</p>
                  )}
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

export default Events
