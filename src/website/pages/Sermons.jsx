// ============================================
// PUBLIC WEBSITE – SERMONS PAGE
// Data Source: Google Sheet (CSV)
// Features:
// - Live search
// - Latest sermons shown first
// - Auto-changing background images
// - Extract thumbnail from link
// - YouTube popup video player
// - Default thumbnail fallback image
// ============================================

import React, { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import axios from "axios"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import "./sermons.css"

// Change your background images here anytime
const backgroundImages = [
  { id: 1, image: "/img/hero/img00.jpg" },
  { id: 2, image: "/img/hero/img7.jpg" },
  { id: 3, image: "/img/gal/img7.jpg" },
]

// This image will show if a sermon thumbnail is empty or broken
const defaultThumbnail = "/img/hero/img00.jpg"

// Proper CSV parser for Google Sheet data
const parseCSV = csvText => {
  const rows = []
  let row = []
  let value = ""
  let insideQuotes = false

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i]
    const nextChar = csvText[i + 1]

    if (char === '"' && insideQuotes && nextChar === '"') {
      value += '"'
      i++
    } else if (char === '"') {
      insideQuotes = !insideQuotes
    } else if (char === "," && !insideQuotes) {
      row.push(value.trim())
      value = ""
    } else if ((char === "\n" || char === "\r") && !insideQuotes) {
      if (char === "\r" && nextChar === "\n") i++

      row.push(value.trim())

      if (row.some(item => item !== "")) {
        rows.push(row)
      }

      row = []
      value = ""
    } else {
      value += char
    }
  }

  row.push(value.trim())

  if (row.some(item => item !== "")) {
    rows.push(row)
  }

  return rows
}

// Clean text values
const cleanText = value => {
  return value ? String(value).trim() : ""
}

// Clean links
const cleanUrl = value => {
  const url = cleanText(value)

  if (!url) return ""

  if (
    url.startsWith("/") ||
    url.startsWith("http://") ||
    url.startsWith("https://")
  ) {
    return url
  }

  return `https://${url}`
}

// Extract YouTube video ID from different YouTube link formats
const getYouTubeVideoId = value => {
  const url = cleanUrl(value)

  if (!url) return ""

  try {
    const parsedUrl = new URL(url)
    const hostname = parsedUrl.hostname.replace("www.", "")

    if (hostname === "youtu.be") {
      return parsedUrl.pathname.split("/")[1] || ""
    }

    if (hostname.includes("youtube.com")) {
      if (parsedUrl.pathname.includes("/shorts/")) {
        return parsedUrl.pathname.split("/shorts/")[1]?.split("/")[0] || ""
      }

      if (parsedUrl.pathname.includes("/embed/")) {
        return parsedUrl.pathname.split("/embed/")[1]?.split("/")[0] || ""
      }

      if (parsedUrl.pathname.includes("/live/")) {
        return parsedUrl.pathname.split("/live/")[1]?.split("/")[0] || ""
      }

      return parsedUrl.searchParams.get("v") || ""
    }
  } catch (error) {
    return ""
  }

  return ""
}

// Extract Google Drive file ID
const getGoogleDriveFileId = value => {
  const url = cleanUrl(value)

  if (!url.includes("drive.google.com")) return ""

  return (
    url.match(/\/file\/d\/([^/]+)/)?.[1] ||
    url.match(/[?&]id=([^&]+)/)?.[1] ||
    ""
  )
}

// Convert any image/video link into a thumbnail image
const getThumbnailFromLink = value => {
  const url = cleanUrl(value)

  if (!url) return ""

  const youtubeId = getYouTubeVideoId(url)

  if (youtubeId) {
    return `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
  }

  const driveId = getGoogleDriveFileId(url)

  if (driveId) {
    return `https://drive.google.com/thumbnail?id=${driveId}&sz=w1000`
  }

  return url
}

// Backup thumbnail for YouTube if maxresdefault is not available
const getBackupThumbnail = value => {
  const youtubeId = getYouTubeVideoId(value)

  if (youtubeId) {
    return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
  }

  return defaultThumbnail
}

// Get the best thumbnail for each sermon
const getBestThumbnail = (thumbnail, video) => {
  const thumbnailFromSheet = getThumbnailFromLink(thumbnail)

  if (thumbnailFromSheet) {
    return thumbnailFromSheet
  }

  const thumbnailFromVideo = getThumbnailFromLink(video)

  if (thumbnailFromVideo) {
    return thumbnailFromVideo
  }

  return defaultThumbnail
}

// Convert video link to embeddable popup link
const getVideoEmbedUrl = value => {
  const url = cleanUrl(value)

  if (!url) return ""

  const youtubeId = getYouTubeVideoId(url)

  if (youtubeId) {
    return `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`
  }

  const driveId = getGoogleDriveFileId(url)

  if (driveId) {
    return `https://drive.google.com/file/d/${driveId}/preview`
  }

  return url
}

const Sermons = () => {
  const [sermons, setSermons] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [bgIndex, setBgIndex] = useState(0)
  const [activeVideo, setActiveVideo] = useState(null)

  const previousBgIndex =
    bgIndex === 0 ? backgroundImages.length - 1 : bgIndex - 1

  useEffect(() => {
    fetchSermons()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex(prev => (prev + 1) % backgroundImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (activeVideo) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [activeVideo])

  useEffect(() => {
    const closeWithEscape = e => {
      if (e.key === "Escape") {
        setActiveVideo(null)
      }
    }

    window.addEventListener("keydown", closeWithEscape)

    return () => {
      window.removeEventListener("keydown", closeWithEscape)
    }
  }, [])

  const fetchSermons = async () => {
    const url =
      "https://docs.google.com/spreadsheets/d/18OVONeRvroB2xmxzFNIHQrQGYhRgdC5sTV9BqoOT368/gviz/tq?tqx=out:csv"

    try {
      const response = await axios.get(url)
      const rows = parseCSV(response.data)

      // Remove header row
      const dataRows = rows.slice(1)

      const parsed = dataRows
        .map((row, index) => {
          const year = cleanText(row[0])
          const month = cleanText(row[1])
          const title = cleanText(row[2])
          const audio = cleanUrl(row[3])
          const video = cleanUrl(row[4])
          const speaker = cleanText(row[5])
          const thumbnailFromSheet = cleanText(row[6])

          if (!title) return null

          const thumbnail = getBestThumbnail(thumbnailFromSheet, video)
          const backupThumbnail = getBackupThumbnail(video)

          return {
            id: `${title}-${index}`,
            year,
            month,
            title,
            audio,
            video,
            speaker,
            thumbnail,
            backupThumbnail,
          }
        })
        .filter(Boolean)
        .reverse()

      setSermons(parsed)
    } catch (err) {
      console.error("Failed to fetch sermons:", err)
    } finally {
      setLoading(false)
    }
  }

  const openVideo = sermon => {
    const embedUrl = getVideoEmbedUrl(sermon.video)

    if (!embedUrl) {
      alert("Video link is not available for this sermon.")
      return
    }

    setActiveVideo({
      title: sermon.title,
      embedUrl,
    })
  }

  const filteredSermons = sermons.filter(sermon => {
    const q = searchTerm.toLowerCase()

    return (
      sermon.title.toLowerCase().includes(q) ||
      sermon.speaker.toLowerCase().includes(q) ||
      `${sermon.month} ${sermon.year}`.toLowerCase().includes(q)
    )
  })

  return (
    <>
      <Navbar />

      <div className="sermons-page">
        <div
          className="sermons-bg sermons-bg-previous"
          style={{
            backgroundImage: `url(${backgroundImages[previousBgIndex].image})`,
          }}
        />

        <div
          key={bgIndex}
          className="sermons-bg sermons-bg-current"
          style={{
            backgroundImage: `url(${backgroundImages[bgIndex].image})`,
          }}
        />

        <main className="page-content">
          <div className="sermons-header">
            <h1>SERMONS</h1>

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
              {filteredSermons.map(sermon => (
                <div key={sermon.id} className="sermon-card reveal">
                  <div className="sermon-image">
                    <img
                      src={sermon.thumbnail || defaultThumbnail}
                      alt={sermon.title}
                      onError={e => {
                        const img = e.currentTarget

                        if (!img.dataset.triedBackup && sermon.backupThumbnail) {
                          img.dataset.triedBackup = "true"
                          img.src = sermon.backupThumbnail
                          return
                        }

                        if (!img.dataset.triedDefault) {
                          img.dataset.triedDefault = "true"
                          img.src = defaultThumbnail
                        }
                      }}
                    />
                  </div>

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
                        <button
                          type="button"
                          className="btn-primary"
                          onClick={() => openVideo(sermon)}
                        >
                          Watch
                        </button>
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

      {activeVideo &&
        createPortal(
          <div className="video-modal">
            <div
              className="video-modal-backdrop"
              onClick={() => setActiveVideo(null)}
            />

            <div className="video-modal-box">
              <button
                type="button"
                className="video-modal-close"
                onClick={() => setActiveVideo(null)}
              >
                ×
              </button>

              <h3>{activeVideo.title}</h3>

              <div className="video-frame-wrap">
                <iframe
                  src={activeVideo.embedUrl}
                  title={activeVideo.title}
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  )
}

export default Sermons