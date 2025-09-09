import ReactSimplyCarousel from 'react-simply-carousel';
import { useState, useEffect, useRef } from 'react';
import React from 'react';
import './aside.css';
import ReactPlayer from 'react-player';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight, faTimes } from '@fortawesome/free-solid-svg-icons';
import confetti from 'canvas-confetti';

const items = [
  {
    id: 1,
    title: 'item #1',
    img: null // placeholder, we'll handle this separately
  },
  { id: 2, title: 'item #2', img: (<a><img src='/img/RevJude.jpg' alt="logo" /></a>) },
  { id: 3, title: 'item #3', img: (<a><img src='/img/10yrsphoto.jpg' alt="Deep Touch" /></a>) },
  { id: 4, title: 'item #4', img: (<a><img src='/img/deeptouch0.jpg' alt="Deep Touch" /></a>) },
  { id: 5, title: 'item #5', img: (<a><img src='/img/supernaturalshift0.jpg' alt="Supernatural Shift" /></a>) },
  { id: 6, title: 'item #6', img: (<a><img src='/img/nugget.jpg' alt="logo" /></a>) },
];

const Aside = () => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  const playerRef = useRef(null); // direct reference to player

  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasInteracted) {
        setIsVideoMuted(false);
        setHasInteracted(true);
        runConfetti();
      }
    };

    const handleConfettiOnClick = () => {
      if (hasInteracted) {
        runConfetti();
      }
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('scroll', handleFirstInteraction);
    window.addEventListener('click', handleConfettiOnClick);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
      window.removeEventListener('click', handleConfettiOnClick);
    };
  }, [hasInteracted]);

  const runConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 }
    });

    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const colors = ['#bb0000', '#ffffff', '#00bb00', '#0000bb'];

    (function frame() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return;

      confetti({
        particleCount: 2,
        angle: 90,
        spread: 60,
        origin: { y: 1 },
        colors,
        shapes: ['circle'],
        gravity: 0.4,
        scalar: 1.2,
        ticks: 200,
      });

      requestAnimationFrame(frame);
    })();
  };

  const openModal = (index) => {
    setModalIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) closeModal();
  };

  const handlePrev = () => {
    setModalIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1));
  };

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
            {item.id === 1 ? (
              <div className="videos">
                <ReactPlayer
                  ref={playerRef}
                  className="video"
                  muted={isVideoMuted}
                  playing={true}
                  loop={true}
                  url="img/10years.mp4"
                  // width="100%"
                  // height="100%"
                />
                {isVideoMuted && (
                  <div className="unmute-hint">
                    <p>🎉 Tap or scroll to unmute & celebrate 10 years!</p>
                  </div>
                )}
              </div>
            ) : (
              item.img
            )}
          </div>
        ))}
      </ReactSimplyCarousel>

      {isModalOpen && (
        <div className="modal-overlay" onClick={handleOutsideClick}>
          <div className='img-container'>
            <div className="modal-content">
              <button className="close-btn" onClick={closeModal}>
                <FontAwesomeIcon icon={faTimes} />
              </button>

              <div className="modal-item">
                {modalIndex === 0 ? (
                  <div className="videos">
                    <ReactPlayer
                      muted={false}
                      playing={true}
                      loop={true}
                      url="img/10years.mp4"
                      width="100%"
                      height="100%"
                    />
                  </div>
                ) : (
                  items[modalIndex].img
                )}
              </div>

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
