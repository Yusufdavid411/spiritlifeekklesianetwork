// ============================================
// RHEMA MODAL COMPONENT
// Purpose: Display full rhema meditation with download option
// Features:
// - Full image display
// - Complete writeup
// - Download image functionality
// - Close button
// ============================================

import React from "react"
import "./rhemaModal.css"

const RhemaModal = ({ rhema, onClose }) => {
  const handleDownload = async () => {
    try {
      const response = await fetch(rhema.image_url)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${rhema.title.replace(/\s+/g, "-")}.jpg`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error("Error downloading image:", error)
      alert("Failed to download image")
    }
  }

  const handleBackdropClick = (e) => {
    if (e.target.className === "rhema-modal-backdrop") {
      onClose()
    }
  }

  return (
    <div className="rhema-modal-backdrop" onClick={handleBackdropClick}>
      <div className="rhema-modal">
        {/* Close Button */}
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        {/* Modal Content */}
        <div className="modal-content">
          {/* Image Section */}
          <div className="modal-image-section">
            <img src={rhema.image_url} alt={rhema.title} className="modal-image" />
          </div>

          {/* Text Content Section */}
          <div className="modal-text-section">
            <h2 className="modal-title">{rhema.title}</h2>
            
            <p className="modal-date">
              {new Date(rhema.created_at).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
              })}
            </p>

            <div className="modal-writeup">
              {rhema.content}
            </div>

            {/* Download Button */}
            <button onClick={handleDownload} className="btn-download">
              📥 Download Image
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RhemaModal
