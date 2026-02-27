// ============================================
// ELITE MINISTRY SLIDER
// Infinite loop + modal + swipe + autoplay
// ============================================

import React, { useEffect, useRef, useState } from "react"
import "./ministrySlider.css"

const images = [
  { src: "/img/gal/img0.jpg", caption: "Worship Moments" },
  { src: "/img/gal/img1.jpg", caption: "Teaching Session" },
  { src: "/img/gal/img2.jpg", caption: "Prayer Gathering" },
  { src: "/img/gal/img3.jpg", caption: "Word Conference" },
  { src: "/img/gal/img4.jpg", caption: "Deep Touch Service" },
  { src: "/img/gal/img5.jpg", caption: "Sunday Gathering" },
  { src: "/img/gal/img6.jpg", caption: "Prophetic Atmosphere" },
  { src: "/img/gal/img7.jpg", caption: "Ministry Impact" },
]

const MinistrySlider = () => {
  const sliderRef = useRef(null)
  const modalRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(null)
  const [autoPlay, setAutoPlay] = useState(true)

  const extendedImages = [...images, ...images] // seamless loop

  // AUTO SLIDE INFINITE
  useEffect(() => {
    const slider = sliderRef.current
    if (!slider) return

    const interval = setInterval(() => {
      const card = slider.querySelector(".slide-item")
      const cardWidth = card?.offsetWidth + 20 || 300

      slider.scrollLeft += cardWidth

      if (slider.scrollLeft >= slider.scrollWidth / 2) {
        slider.scrollLeft = 0
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // MODAL AUTOPLAY
  useEffect(() => {
    if (activeIndex === null || !autoPlay) return

    const interval = setInterval(() => {
      nextImage()
    }, 4000)

    return () => clearInterval(interval)
  }, [activeIndex, autoPlay])

  const openModal = (index) => {
    setActiveIndex(index)
  }

  const closeModal = () => {
    setActiveIndex(null)
  }

  const nextImage = () => {
    setActiveIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const downloadImage = () => {
    const link = document.createElement("a")
    link.href = images[activeIndex].src
    link.download = "ministry.jpg"
    link.click()
  }

  // TOUCH SWIPE
  useEffect(() => {
    const modal = modalRef.current
    if (!modal) return

    let startX = 0

    const touchStart = (e) => {
      startX = e.touches[0].clientX
    }

    const touchEnd = (e) => {
      let endX = e.changedTouches[0].clientX
      if (startX - endX > 50) nextImage()
      if (endX - startX > 50) prevImage()
    }

    modal.addEventListener("touchstart", touchStart)
    modal.addEventListener("touchend", touchEnd)

    return () => {
      modal.removeEventListener("touchstart", touchStart)
      modal.removeEventListener("touchend", touchEnd)
    }
  }, [activeIndex])

  return (
    <>
      <section className="elite-slider">
        <h2 className="slider-title">Pictorial Excerpts</h2>

        <div className="slider-track" ref={sliderRef}>
          {extendedImages.map((img, index) => (
            <div
              key={index}
              className="slide-item"
              onClick={() => openModal(index % images.length)}
            >
              <img src={img.src} alt="" />
              <div className="caption-overlay">
                {img.caption}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MODAL */}
      {activeIndex !== null && (
        <div className="elite-modal" onClick={closeModal}>
          <div
            className="elite-modal-content"
            onClick={(e) => e.stopPropagation()}
            ref={modalRef}
          >
            <button className="close-btn" onClick={closeModal}>×</button>

            <button className="nav left" onClick={prevImage}>‹</button>

          
            <img
              src={images[activeIndex].src}
              alt=""
              className="modal-image fade-in"
            />
          

            <button className="nav right" onClick={nextImage}>›</button>

            <div className="modal-caption">
              {images[activeIndex].caption}
            </div>

            <button className="download-btn" onClick={downloadImage}>
              Download
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default MinistrySlider