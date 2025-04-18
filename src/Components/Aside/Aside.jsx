import ReactSimplyCarousel from 'react-simply-carousel';
import { useState, useEffect } from 'react'; // `useEffect` for auto-scrolling
import React from 'react';
import './aside.css'; // Assuming this file contains the carousel and modal styles
import ReactPlayer from 'react-player';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight, faTimes } from '@fortawesome/free-solid-svg-icons'; // Added `faTimes` for close button
// import { faCircleDown } from '@fortawesome/free-regular-svg-icons'

const items = [
  { id: 1, title: 'item #2', img: (<div className="videos"><ReactPlayer className="video" url='https://youtube.com/shorts/APUm_UaDjqg?si=Zozt1010PlQ5KIXr' /></div>) },
  { id: 2, title: 'item #4', img: (<a ><img src='/img/easter.jpg' alt="logo" /></a>) },
  { id: 3, title: 'item #1', img: (<a ><img src='/img/deeptouch.jpg' alt="logo" /></a>) },
  { id: 4, title: 'item #3', img: (<a ><img src='/img/super.jpg' alt="logo" /></a>) },
  { id: 5, title: 'item #4', img: (<a ><img src='/img/nugget.jpg' alt="logo" /></a>) },
  // { id: 6, title: 'item #2', img: (<a ><img src='/img/klc.jfif' alt="logo" /></a>) },
];

const Aside = () => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0); // Tracks current slide for carousel
  const [isModalOpen, setIsModalOpen] = useState(false); // Tracks whether modal is open
  const [modalIndex, setModalIndex] = useState(0); // Tracks the index of the item displayed in the modal

  // Auto-scroll functionality
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setActiveSlideIndex((prevIndex) => (prevIndex + 1) % items.length); 
  //   }, 3000); // Changes slide every 3 seconds

  //   return () => clearInterval(interval); 
  // }, []);

  // Open modal and set the modal index
  const openModal = (index) => {
    setModalIndex(index);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // New: Close modal when clicking outside of the image area
  const handleOutsideClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) closeModal();
  };

  // Navigate to the previous item in the modal
  const handlePrev = () => {
    setModalIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1));
  };

  // Navigate to the next item in the modal
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
            onClick={() => openModal(index)} // Opens modal when clicked
          >
            {item.img}
          </div>
        ))}
      </ReactSimplyCarousel>

      {/* Modal Section */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleOutsideClick}>
          <div className='img-container'>
            <div className="modal-content">
              {/* Close Button */}
              <button className="close-btn" onClick={closeModal}>
                <FontAwesomeIcon icon={faTimes} />
              </button>

              {/* New: Download Button
              <a href={items[modalIndex]} download>
                <FontAwesomeIcon icon={faCircleDown} bounce className="icon" />
              </a> */}

              {/* Display Current Modal Item */}
              <div className="modal-item">
                {items[modalIndex].img}
              </div>

              {/* Navigation Buttons */}
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
