// ============================================
// RHEMA MODAL
// FIX:
// - Explicit Download Image button
// ============================================

import React from "react"
import "./rhemaModal.css"

const RhemaModal = ({ rhema, onClose }) => {
  const downloadImage = async () => {
    try {
      const res = await fetch(rhema.image?.image_url)
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${rhema.title}.jpg`
      a.click()
      URL.revokeObjectURL(url)
    } catch (e) {
      alert("Failed to download image")
    }
  }

  return (
    <div className="rhema-modal-backdrop" onClick={onClose}>
      <div className="rhema-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        <img
          src={rhema.image?.image_url}
          alt={rhema.title}
          className="modal-image"
        />

        <h2>{rhema.title}</h2>
        <p className="modal-date">
          {new Date(rhema.created_at).toDateString()}
        </p>

        <div className="modal-writeup">{rhema.content}</div>

        {/* ✅ DOWNLOAD BUTTON */}
        <button className="btn-download" onClick={downloadImage}>
          Download Image
        </button>
      </div>
    </div>
  )
}

export default RhemaModal
