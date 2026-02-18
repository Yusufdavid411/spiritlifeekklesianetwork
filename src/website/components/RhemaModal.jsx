// ============================================
// RHEMA MODAL
// - Download Image
// - Share Buttons (WhatsApp, Facebook, X, Instagram Copy)
// ============================================

import React from "react"
import "./rhemaModal.css"

const RhemaModal = ({ rhema, onClose }) => {

  const getImageUrl = () => {
    return rhema?.image?.image_url || ""
  }

  const downloadImage = async () => {
    try {
      const res = await fetch(getImageUrl())
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

  const shareText = `
${rhema.title}

${rhema.content}

${getImageUrl()}

${window.location.origin}
`

  return (
    <div className="rhema-modal-backdrop" onClick={onClose}>
      <div className="rhema-modal" onClick={e => e.stopPropagation()}>
        
        <button className="modal-close" onClick={onClose}>✕</button>

        <img
          src={getImageUrl()}
          alt={rhema.title}
          className="modal-image"
        />

        <h2>{rhema.title}</h2>

        <p className="modal-date">
          {new Date(rhema.created_at).toDateString()}
        </p>

        <div className="modal-writeup">{rhema.content}</div>

        {/* DOWNLOAD BUTTON */}
        <button className="btn-download" onClick={downloadImage}>
          Download Image
        </button>

        {/* SHARE SECTION */}
        <div className="share-section">
          
          <h4>Share on all Social Media</h4>

          <div className="share-buttons">

            {/* WhatsApp */}
            <a
              href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>

            {/* Facebook */}
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getImageUrl())}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>

            {/* X (Twitter) */}
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              X
            </a>

            {/* Instagram (copy link) */}
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                navigator.clipboard.writeText(shareText(rhema))
              }}
            >
              Instagram
            </a>

          </div>
        </div>

      </div>
    </div>
  )
}

export default RhemaModal
