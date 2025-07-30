import ReactSimplyCarousel from 'react-simply-carousel';
import { useState, useEffect } from 'react'; // `useEffect` for auto-scrolling
import React from 'react';
import './aside.css'; // Assuming this file contains the carousel and modal styles
import ReactPlayer from 'react-player';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight, faTimes } from '@fortawesome/free-solid-svg-icons';
import confetti from 'canvas-confetti'; // 🎉 Added for celebration effect

// 🎥 + 📸 Carousel Items
const items = [
  {
    id: 1,
    title: 'item #2',
    img: (
      <div className="videos">
        <ReactPlayer
          className="video"
          muted={true} // This will be controlled with state below
          playing={true}
          loop={true}
          url='img/10years.mp4'
        />
      </div>
    )
  },
  { id: 2, title: 'item #4', img: (<a><img src='/img/blessing.jpg' alt="logo" /></a>) },
  { id: 3, title: 'item #1', img: (<a><img src='/img/10yrsphoto.jpg' alt="Deep Touch" /></a>) },
  { id: 4, title: 'item #2', img: (<a><img src='/img/deeptouch0.jpg' alt="Deep Touch" /></a>) },
  { id: 5, title: 'item #3', img: (<a><img src='/img/supernaturalshift0.jpg' alt="Supernatural Shift" /></a>) },
  { id: 6, title: 'item #4', img: (<a><img src='/img/nugget.jpg' alt="logo" /></a>) },
];

const Aside = () => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0); // Tracks current slide
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal open/close
  const [modalIndex, setModalIndex] = useState(0); // Current modal index

  const [isVideoMuted, setIsVideoMuted] = useState(true); // 🔇 Controls mute
  const [hasInteracted, setHasInteracted] = useState(false); // 👆 Only fire once

  // 🎉 Detect first screen interaction to unmute video and trigger confetti
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasInteracted) {
        setIsVideoMuted(false); // 🔊 Unmute video
        setHasInteracted(true); // ☝️ Prevent multiple triggers
        runConfetti();          // 🎉 Fire confetti
      }
    };

    window.addEventListener('click', handleFirstInteraction);
    return () => window.removeEventListener('click', handleFirstInteraction);
  }, [hasInteracted]);

  // 🎉 Launch confetti
  const runConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 }
    });

    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.3 }
      });
    }, 500);
  };

  // Open modal
  const openModal = (index) => {
    setModalIndex(index);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Close modal if clicking outside
  const handleOutsideClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) closeModal();
  };

  // Navigate modal prev
  const handlePrev = () => {
    setModalIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1));
  };

  // Navigate modal next
  const handleNext = () => {
    setModalIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  return (
    <aside>
      <ReactSimplyCarousel
        activeSlideIndex={activeSlideIndex}
        onRequestChange={setActiveSlideIndex}
        itemsToShow={2}
        itemsToScroll={1}
        className="slide"
        forwardBtnProps={{
          className: "btn",
          children: <FontAwesomeIcon icon={faCaretRight} className="icon-btn" fade />,
        }}
        backwardBtnProps={{
          className: "btn",
          children: <FontAwesomeIcon icon={faCaretLeft} className="icon-btn" fade />,
        }}
        responsiveProps={[
          {
            itemsToShow: 3,
            itemsToScroll: 1,
            minWidth: 700,
          },
        ]}
        speed={200}
        easing="linear"
      >
        {items.map((item, index) => (
          <div
            className="items"
            key={item.id}
            onClick={() => openModal(index)}
          >
            {/* Custom logic for item #1 to unmute */}
            {item.id === 1 ? (
              <div className="videos">
                <ReactPlayer
                  className="video"
                  muted={isVideoMuted}
                  playing={true}
                  loop={true}
                  url='img/10years.mp4'
                />
                {/* 🔊 Hint Message */}
                {isVideoMuted && (
                  <div className="unmute-hint">
                    <p>🎉 Tap anywhere to unmute & celebrate 10 years!</p>
                  </div>
                )}
              </div>
            ) : (
              item.img
            )}
          </div>
        ))}
      </ReactSimplyCarousel>

      {/* Modal Section */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleOutsideClick}>
          <div className='img-container'>
            <div className="modal-content">
              {/* ❌ Close Button */}
              <button className="close-btn" onClick={closeModal}>
                <FontAwesomeIcon icon={faTimes} />
              </button>

              {/* 📸 Current Modal Item */}
              <div className="modal-item">
                {items[modalIndex].img}
              </div>

              {/* ⬅️➡️ Navigation */}
              <button className="modal-prev-button" onClick={handlePrev}>
                <FontAwesomeIcon icon={faCaretLeft} />
              </button>
              <button className="modal-next-button" onClick={handleNext}>
                <FontAwesomeIcon icon={faCaretRight} />
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Aside;
