// ============================================
// HOME PAGE
// Final version
// - Events show date + time + venue
// - Events modal supports download & social sharing
// - Rhema modal behavior preserved
// ============================================

import React, { useEffect, useRef, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons"
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons"
import { events as eventsAPI, rhemaMeditations } from "../../services/api"
import {
  getProgramEventAnalytics,
  getRhemaAnalytics,
  hasLikedProgramEvent,
  hasLikedRhema,
  likeProgramEventOnce,
  likeRhemaOnce,
  recordProgramEventWatch,
  recordRhemaView,
} from "../../services/engagementAnalytics"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import TypingAnimation from "../components/TypingAnimation"
import RhemaModal from "../components/RhemaModal"
import "./home.css"
import MinistrySlider from "../components/MinistrySlider"
import Reel from "../components/Reel";

const RECURRING_EVENT_DAYS = [
  { matcher: /deep\s*touch/i, weekday: 5 },
  { matcher: /supernatural\s*shift/i, weekday: 0 },
]

const getNextWeekday = (weekday, sourceDate = new Date()) => {
  const date = new Date(sourceDate)
  date.setHours(12, 0, 0, 0)

  const daysUntilNext = (weekday - date.getDay() + 7) % 7
  date.setDate(date.getDate() + daysUntilNext)

  return date
}

const getEventDate = (event) => {
  const eventDate = event?.start_datetime ? new Date(event.start_datetime) : new Date()
  const recurringEvent = RECURRING_EVENT_DAYS.find(({ matcher }) =>
    matcher.test(event?.title || "")
  )

  if (!recurringEvent) return eventDate

  const nextDate = getNextWeekday(recurringEvent.weekday)
  nextDate.setHours(
    eventDate.getHours(),
    eventDate.getMinutes(),
    eventDate.getSeconds(),
    eventDate.getMilliseconds()
  )

  return nextDate
}

const formatEventDate = (event) =>
  getEventDate(event).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  })

const formatEventTime = (event) =>
  getEventDate(event).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  })

const EventMeta = ({ event }) => (
  <div className="event-meta" aria-label={`${event.title} schedule`}>
    <div className="event-meta-item">
      <span>Date</span>
      <strong>{formatEventDate(event)}</strong>
    </div>

    <div className="event-meta-item">
      <span>Time</span>
      <strong>{formatEventTime(event)} WAT</strong>
    </div>

    {event.location && (
      <div className="event-meta-item">
        <span>Venue</span>
        <strong>{event.location}</strong>
      </div>
    )}
  </div>
)

const formatNumber = (value) => new Intl.NumberFormat("en").format(value || 0)

const getYoutubeId = (url) => {
  if (!url) return null

  if (url.includes("shorts")) {
    return url.split("shorts/")[1]?.split("?")[0]
  }

  if (url.includes("watch?v=")) {
    return url.split("watch?v=")[1]?.split("&")[0]
  }

  if (url.includes("youtu.be/")) {
    return url.split("youtu.be/")[1]?.split("?")[0]
  }

  if (url.includes("embed/")) {
    return url.split("embed/")[1]?.split("?")[0]
  }

  return null
}

const getProgramImage = (item) => {
  const videoId = getYoutubeId(item.videoUrl)

  if (videoId) {
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
  }

  return item.imageUrl || item.image?.image_url || ""
}

const getTimestampValue = (value) => {
  if (value?.seconds) {
    return value.seconds * 1000
  }

  if (value) {
    return new Date(value).getTime()
  }

  return 0
}

const Home = () => {
  // EVENTS STATE
  const [events, setEvents] = useState([])
  const [loadingEvents, setLoadingEvents] = useState(true)
  const [activeEvent, setActiveEvent] = useState(null)
  const viewedProgramKeysRef = useRef(new Set())

  // RHEMA STATE
  const [todayRhema, setTodayRhema] = useState(null)
  const [loadingRhema, setLoadingRhema] = useState(true)
  const [activeRhema, setActiveRhema] = useState(null)
  const viewedHomeRhemaKeysRef = useRef(new Set())

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
    const elements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target); // animate once only
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [events, todayRhema]);



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

      if (Array.isArray(eventsData)) {
        const apiProgramItems = await Promise.all(
          eventsData.map(async (event, index) => {
            const eventId = event.id || `event-${index}`
            const analytics = await getProgramEventAnalytics(eventId)

            return {
              ...event,
              id: eventId,
              key: `api-event-${eventId}`,
              source: "api-event",
              watchCount: analytics.watchCount,
              likeCount: analytics.likeCount,
              liked: hasLikedProgramEvent(eventId),
              sortTime: getTimestampValue(event.start_datetime),
            }
          })
        )

        setEvents(apiProgramItems.sort((a, b) => (b.sortTime || 0) - (a.sortTime || 0)))
      } else {
        setEvents([])
      }
    } catch (err) {
      console.error("Events fetch failed:", err)
      setEvents([])
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

      if (!item) {
        setTodayRhema(null)
        return
      }

      const rhemaId = item.id || "home-rhema"
      const analytics = await getRhemaAnalytics(rhemaId)

      setTodayRhema({
        ...item,
        id: rhemaId,
        key: `rhema-${rhemaId}`,
        viewCount: analytics.viewCount,
        likeCount: analytics.likeCount,
        liked: hasLikedRhema(rhemaId),
      })
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
    Date: ${formatEventDate(event)}
    Time: ${formatEventTime(event)} WAT
    Venue: ${event.location || ""}

    ${getImageUrl(event)}

    ${window.location.origin}`

  const getImageUrl = (event) => {
    return getProgramImage(event)
  }

  const updateProgramCounter = (key, field) => {
    setEvents((currentEvents) =>
      currentEvents.map((event) =>
        event.key === key ? { ...event, [field]: (event[field] || 0) + 1 } : event
      )
    )
  }

  const updateProgramLiked = (key, liked) => {
    setEvents((currentEvents) =>
      currentEvents.map((event) =>
        event.key === key ? { ...event, liked } : event
      )
    )
  }

  const recordProgramImpression = async (event) => {
    if (!event || viewedProgramKeysRef.current.has(event.key)) return

    viewedProgramKeysRef.current.add(event.key)
    try {
      const counted = await recordProgramEventWatch(event.id, event)

      if (counted) {
        updateProgramCounter(event.key, "watchCount")
      }
    } catch (err) {
      viewedProgramKeysRef.current.delete(event.key)
      console.error("Program impression tracking failed:", err)
    }
  }

  const openProgram = (event) => {
    setActiveEvent(event)
  }

  const likeProgram = async (clickEvent, event) => {
    clickEvent.stopPropagation()

    if (event.liked) return

    updateProgramLiked(event.key, true)

    try {
      const liked = await likeProgramEventOnce(event.id, event)

      if (liked) {
        updateProgramCounter(event.key, "likeCount")
      }
    } catch (err) {
      updateProgramLiked(event.key, false)
      console.error("Program like failed:", err)
    }
  }

  const getActiveProgram = () => {
    return events.find((event) => event.key === activeEvent?.key) || activeEvent
  }

  const renderProgramEngagement = (event) => (
    <div className="home-program-engagement">
      <div className="home-program-engagement-item">
        <button
          aria-label={event.liked ? "Already liked" : "Like this program"}
          className={`home-program-icon ${event.liked ? "liked" : ""}`}
          onClick={(clickEvent) => likeProgram(clickEvent, event)}
          type="button"
        >
          <FontAwesomeIcon icon={event.liked ? solidHeart : regularHeart} />
        </button>
        <span>{formatNumber(event.likeCount)}</span>
      </div>

      <div className="home-program-engagement-item">
        <span className="home-program-icon static">
          <FontAwesomeIcon icon={faEye} />
        </span>
        <span>{formatNumber(event.watchCount)}</span>
      </div>
    </div>
  )

  const updateHomeRhemaCounter = (field) => {
    setTodayRhema((currentRhema) =>
      currentRhema
        ? { ...currentRhema, [field]: (currentRhema[field] || 0) + 1 }
        : currentRhema
    )
  }

  const updateHomeRhemaLiked = (liked) => {
    setTodayRhema((currentRhema) =>
      currentRhema ? { ...currentRhema, liked } : currentRhema
    )
  }

  const recordHomeRhemaImpression = async (rhema) => {
    if (!rhema || viewedHomeRhemaKeysRef.current.has(rhema.key)) return

    viewedHomeRhemaKeysRef.current.add(rhema.key)

    try {
      const counted = await recordRhemaView(rhema.id, rhema)

      if (counted) {
        updateHomeRhemaCounter("viewCount")
      }
    } catch (err) {
      viewedHomeRhemaKeysRef.current.delete(rhema.key)
      console.error("Home Rhema view tracking failed:", err)
    }
  }

  const likeHomeRhema = async (event) => {
    event.stopPropagation()

    if (!todayRhema || todayRhema.liked) return

    updateHomeRhemaLiked(true)

    try {
      const liked = await likeRhemaOnce(todayRhema.id, todayRhema)

      if (liked) {
        updateHomeRhemaCounter("likeCount")
      }
    } catch (err) {
      updateHomeRhemaLiked(false)
      console.error("Home Rhema like failed:", err)
    }
  }

  const renderHomeRhemaEngagement = (rhema) => (
    <div className="home-program-engagement">
      <div className="home-program-engagement-item">
        <button
          aria-label={rhema.liked ? "Already liked" : "Like this Rhema"}
          className={`home-program-icon ${rhema.liked ? "liked" : ""}`}
          onClick={likeHomeRhema}
          type="button"
        >
          <FontAwesomeIcon icon={rhema.liked ? solidHeart : regularHeart} />
        </button>
        <span>{formatNumber(rhema.likeCount)}</span>
      </div>

      <div className="home-program-engagement-item">
        <span className="home-program-icon static">
          <FontAwesomeIcon icon={faEye} />
        </span>
        <span>{formatNumber(rhema.viewCount)}</span>
      </div>
    </div>
  )

  useEffect(() => {
    if (loadingEvents || events.length === 0) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          const eventKey = entry.target.getAttribute("data-program-event-key")
          const event = events.find((programEvent) => programEvent.key === eventKey)

          if (event) {
            recordProgramImpression(event)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.45,
      }
    )

    const cards = document.querySelectorAll("[data-program-event-key]")
    cards.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [events, loadingEvents])

  useEffect(() => {
    if (loadingRhema || !todayRhema) return undefined

    const card = document.querySelector("[data-home-rhema-key]")
    if (!card) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            recordHomeRhemaImpression(todayRhema)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.45 }
    )

    observer.observe(card)

    return () => observer.disconnect()
  }, [loadingRhema, todayRhema])


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
      <section className="home-events reveal reveal-left">
        <h2 className="home-section-title">Programs & Events</h2>

        {loadingEvents ? (
          <div className="events-grid">
            {[1, 2, 3].map(i => (
              <div key={i} className="event-skeleton unified-rhema-card" />
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="events-empty-state">
            <h3>No programs or events uploaded yet</h3>
            <p>Scheduled programs and events will appear here.</p>
          </div>
        ) : (
          <div className="events-grid">
            {events.map(event => (
              <div
                key={event.key}
                className="unified-rhema-card"
                data-program-event-key={event.key}
                onClick={() => openProgram(event)}
              >
                <div className="rhema-image-box small">
                  
                  {getProgramImage(event) ? (
                  <img
                    src={getProgramImage(event)}
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
                  <EventMeta event={event} />
                  {renderProgramEngagement(event)}
                </div>
              </div>
            ))}
            <Reel youtubeId="U3c0SAUTK-Q" /> 
          </div>
        )}

      </section>


      {/* ================= HOME RHEMA ================= */}
      <section className="home-rhema reveal reveal-right">
        <h2 className="home-section-title">Today’s Rhema Meditation</h2>

        {loadingRhema ? (
          <div className="event-skeleton unified-rhema-card" />
        ) : todayRhema && (
          <div
            className="unified-rhema-cardhome"
            data-home-rhema-key={todayRhema.key}
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

              {renderHomeRhemaEngagement(todayRhema)}

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

      <MinistrySlider/>



      <Footer />










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
              {getProgramImage(getActiveProgram()) ? (
                <img
                  src={getProgramImage(getActiveProgram())}
                  alt={getActiveProgram().title}
                  onError={(e) => {
                    e.target.style.display = "none"
                    const fallback = document.createElement("div")
                    fallback.className = "image-fallback"
                    fallback.innerText = getActiveProgram().title
                    e.target.parentNode.appendChild(fallback)
                  }}
                />
              ) : (
                <div className="image-fallback">
                  {getActiveProgram().title}
                </div>
              )}
            </div>

            <h3>{getActiveProgram().title}</h3>
            <EventMeta event={getActiveProgram()} />

            {renderProgramEngagement(getActiveProgram())}

            <div className="modal-actions">
              <button
                className="btn-download"
                onClick={() =>
                  getProgramImage(getActiveProgram()) &&
                  downloadImage(
                    getProgramImage(getActiveProgram()),
                    getActiveProgram().title
                  )
                }
              >
                Download Image
              </button>

              <div className="share-buttons">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(
                    shareText(getActiveProgram())
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>

                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    getProgramImage(getActiveProgram())
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>

                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    shareText(getActiveProgram())
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
          engagement={renderHomeRhemaEngagement(todayRhema || activeRhema)}
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



    </div>
  )
}

export default Home
