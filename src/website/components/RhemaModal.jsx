// ============================================
// RHEMA MODAL
// Purpose: Display full rhema meditation
// Fixes:
// - Correct image source
// - Proper centered modal
// - Scrollable content
// - Reliable close behavior
// ============================================

import React from "react"
import "./rhemaModal.css"

const RhemaModal = ({ rhema, onClose }) => {
  // Close modal when clicking backdrop
  const handleBackdropClick = (e) => {
    if (e.target.classList.contains("rhema-modal-backdrop")) {
      onClose()
    }
  }

  return (
    <div className="rhema-modal-backdrop" onClick={handleBackdropClick}>
      <div className="rhema-modal-container">

        {/* Close Button */}
        <button
          className="rhema-modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Image */}
        {rhema.image?.image_url && (
          <div className="rhema-modal-image">
            <img
              src={rhema.image.image_url}
              alt={rhema.title}
            />
          </div>
        )}

        {/* Content */}
        <div className="rhema-modal-content">
          <h2>{rhema.title}</h2>

          <p className="rhema-modal-date">
            {new Date(rhema.created_at).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <div className="rhema-modal-text">
            {rhema.content}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RhemaModal
