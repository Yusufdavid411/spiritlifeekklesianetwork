// ============================================
// RHEMA MEDITATIONS PAGE
// Updated UI:
// - Unified image styling
// - Smaller featured rhema
// - Clear section separation
// - Dark / purple theme
// ============================================

import React, { useEffect, useRef, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons"
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons"
import { rhemaMeditations } from "../../services/api"
import {
  getRhemaAnalytics,
  hasLikedRhema,
  likeRhemaOnce,
  recordRhemaView,
} from "../../services/engagementAnalytics"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import RhemaModal from "../components/RhemaModal"
import "./rhemaPage.css"

const RhemaMeditations = () => {
  const [rhemas, setRhemas] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedRhema, setSelectedRhema] = useState(null)
  const [todayRhema, setTodayRhema] = useState(null)
  const viewedRhemaKeysRef = useRef(new Set())

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

      const enriched = await Promise.all(
        sorted.map(async (rhema, index) => {
          const rhemaId = rhema.id || `rhema-${index}`
          const analytics = await getRhemaAnalytics(rhemaId)

          return {
            ...rhema,
            id: rhemaId,
            key: `rhema-${rhemaId}`,
            viewCount: analytics.viewCount,
            likeCount: analytics.likeCount,
            liked: hasLikedRhema(rhemaId),
          }
        })
      )

      setRhemas(enriched)

      // Detect today’s rhema or fallback to latest
      const today = new Date().toISOString().split("T")[0]
      const todayItem = enriched.find(
        r => new Date(r.created_at).toISOString().split("T")[0] === today
      )

      setTodayRhema(todayItem || enriched[0] || null)
    } catch (err) {
      console.error("Failed to fetch rhema:", err)
    } finally {
      setLoading(false)
    }
  }

  const formatNumber = (value) => new Intl.NumberFormat("en").format(value || 0)

  const updateRhemaCounter = (key, field) => {
    setRhemas((currentRhemas) =>
      currentRhemas.map((rhema) =>
        rhema.key === key ? { ...rhema, [field]: (rhema[field] || 0) + 1 } : rhema
      )
    )

    setTodayRhema((currentRhema) =>
      currentRhema?.key === key
        ? { ...currentRhema, [field]: (currentRhema[field] || 0) + 1 }
        : currentRhema
    )
  }

  const updateRhemaLiked = (key, liked) => {
    setRhemas((currentRhemas) =>
      currentRhemas.map((rhema) =>
        rhema.key === key ? { ...rhema, liked } : rhema
      )
    )

    setTodayRhema((currentRhema) =>
      currentRhema?.key === key ? { ...currentRhema, liked } : currentRhema
    )
  }

  const recordRhemaImpression = async (rhema) => {
    if (!rhema || viewedRhemaKeysRef.current.has(rhema.key)) return

    viewedRhemaKeysRef.current.add(rhema.key)

    try {
      const counted = await recordRhemaView(rhema.id, rhema)

      if (counted) {
        updateRhemaCounter(rhema.key, "viewCount")
      }
    } catch (err) {
      viewedRhemaKeysRef.current.delete(rhema.key)
      console.error("Rhema view tracking failed:", err)
    }
  }

  const likeRhema = async (event, rhema) => {
    event.stopPropagation()

    if (rhema.liked) return

    updateRhemaLiked(rhema.key, true)

    try {
      const liked = await likeRhemaOnce(rhema.id, rhema)

      if (liked) {
        updateRhemaCounter(rhema.key, "likeCount")
      }
    } catch (err) {
      updateRhemaLiked(rhema.key, false)
      console.error("Rhema like failed:", err)
    }
  }

  const getCurrentRhema = (rhema) => {
    return rhemas.find((item) => item.key === rhema?.key) || rhema
  }

  const renderRhemaEngagement = (rhema) => (
    <div className="rhema-engagement">
      <div className="rhema-engagement-item">
        <button
          aria-label={rhema.liked ? "Already liked" : "Like this Rhema"}
          className={`rhema-icon-btn ${rhema.liked ? "liked" : ""}`}
          onClick={(event) => likeRhema(event, rhema)}
          type="button"
        >
          <FontAwesomeIcon icon={rhema.liked ? solidHeart : regularHeart} />
        </button>
        <span>{formatNumber(rhema.likeCount)}</span>
      </div>

      <div className="rhema-engagement-item">
        <span className="rhema-icon-btn static">
          <FontAwesomeIcon icon={faEye} />
        </span>
        <span>{formatNumber(rhema.viewCount)}</span>
      </div>
    </div>
  )

  useEffect(() => {
    if (loading || rhemas.length === 0) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          const rhemaKey = entry.target.getAttribute("data-rhema-key")
          const rhema = rhemas.find((item) => item.key === rhemaKey)

          if (rhema) {
            recordRhemaImpression(rhema)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.45 }
    )

    const cards = document.querySelectorAll("[data-rhema-key]")
    cards.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [loading, rhemas])

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
              data-rhema-key={todayRhema.key}
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

                {renderRhemaEngagement(todayRhema)}
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
                    data-rhema-key={rhema.key}
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
                      {renderRhemaEngagement(rhema)}
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
          engagement={renderRhemaEngagement(getCurrentRhema(selectedRhema))}
          rhema={getCurrentRhema(selectedRhema)}
          onClose={() => setSelectedRhema(null)}
        />
      )}

      <Footer />
    </div>
  )
}

export default RhemaMeditations
