import React, { useState, useEffect, useRef } from 'react';
import './aside.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleDown } from '@fortawesome/free-regular-svg-icons'
import { faRightFromBracket, faLink } from '@fortawesome/free-solid-svg-icons'

const images = [
  "/img/klc.jfif",
  "/img/sup-klc.jfif",
	"/img/Pst Jude 1.jpg",
  "/img/klc.jfif",
  "/img/sup-klc.jfif",
	"/img/Pst Jude 1.jpg",
  "/img/klc.jfif",
  "/img/sup-klc.jfif",
	"/img/Pst Jude 1.jpg",
  "/img/klc.jfif",
  "/img/sup-klc.jfif",
	"/img/Pst Jude 1.jpg",
  "/img/klc.jfif",
  "/img/sup-klc.jfif",
	"/img/Pst Jude 1.jpg",
  "/img/klc.jfif",
  "/img/sup-klc.jfif",
	"/img/Pst Jude 1.jpg",
  "/img/klc.jfif",
  "/img/sup-klc.jfif",
	"/img/Pst Jude 1.jpg",
  "/img/klc.jfif",
  "/img/sup-klc.jfif",
	"/img/Pst Jude 1.jpg",
  "/img/klc.jfif",
  "/img/sup-klc.jfif",
	"/img/Pst Jude 1.jpg",
  "/img/klc.jfif",
  "/img/sup-klc.jfif",
	"/img/Pst Jude 1.jpg",
];

const Image = () => {

  const delay = 5000;
  const [imagesToShow, setImagesToShow] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(images.length);
  const [modalOpen, setModalOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const totalImages = images.length;

  const carouselImages = [
    ...images.slice(-imagesToShow),
    ...images,
    ...images.slice(0, imagesToShow)
  ];

  const autoSlideRef = useRef();
  const startX = useRef(0);
  const endX = useRef(0);
  const modalImageRef = useRef();

  const goToNextSlide = () => setCurrentIndex((prev) => prev + 1);
  const goToPrevSlide = () => setCurrentIndex((prev) => prev - 1);

  useEffect(() => {
    autoSlideRef.current = setInterval(goToPrevSlide, delay);
    return () => clearInterval(autoSlideRef.current);
  }, []);

  useEffect(() => {
    if (currentIndex === totalImages + imagesToShow) {
      setTimeout(() => setCurrentIndex(imagesToShow), 0);
    } else if (currentIndex === 0) {
      setTimeout(() => setCurrentIndex(totalImages), 0);
    }
  }, [currentIndex, totalImages, imagesToShow]);

  const handleTouchStart = (e) => {
    clearInterval(autoSlideRef.current);
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    endX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (startX.current - endX.current > 50) goToNextSlide();
    if (endX.current - startX.current > 50) goToPrevSlide();
    autoSlideRef.current = setInterval(goToNextSlide, delay);
  };

  // New: Function to open the modal and display the clicked image
  const openModal = (index) => {
    setModalOpen(true);
    setModalImageIndex(index);
  };

  // New: Function to close the modal
  const closeModal = () => {
    setModalOpen(false);
    setZoomLevel(1);
  };

  // New: Close modal when clicking outside of the image area
  const handleOutsideClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) closeModal();
  };

  // New: Functions to navigate images within the modal
  const goToNextModalImage = () => {
    setModalImageIndex((prevIndex) => (prevIndex + 1) % totalImages);
  };

  const goToPrevModalImage = () => {
    setModalImageIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
  };

  // New: Function to adjust zoom level in modal
  // const handleZoom = (inOut) => {
  //   setZoomLevel((prev) => Math.max(1, Math.min(3, prev + inOut * 0.2)));
  // };

  // New: Support for pinch-to-zoom on touch devices
  const handlePinchZoom = (e) => {
    if (e.scale) {
      setZoomLevel((prev) => Math.max(1, Math.min(3, prev * e.scale)));
    }
  };


  // New: Function to set the number of images based on screen width
  useEffect(() => {
    const updateImagesToShow = () => {
      if (window.innerWidth <= 700) {
        setImagesToShow(3);  // Show 1 image on mobile screens
      } else if (window.innerWidth <= 1000) {
        setImagesToShow(3);  // Show 2 images on tablet screens
      } else {
        setImagesToShow(4);
      }
    };

    updateImagesToShow(); // Set initial value

    // Add event listener for window resize
    window.addEventListener("resize", updateImagesToShow);

    // Clean up event listener on component unmount
    return () => window.removeEventListener("resize", updateImagesToShow);
  }, []);


  return (
    <div className="carousel" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
      
      <div
        className="carousel-container"
        style={{
          transform: `translateX(-${currentIndex * (100 / imagesToShow)}%)`,
          transition: currentIndex === imagesToShow || currentIndex === totalImages ? "none" : "transform 0.5s ease-in-out"
        }}
      >
        {carouselImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index + 1}`}
            className="carousel-image"
            style={{ 
              width: `${100 / imagesToShow}%`,
              // margin: `${1 / imagesToShow}px`
            }}
            onClick={() => openModal(index % totalImages)}
          />
        ))}
      </div>
      <button className="prev-button" onClick={goToPrevSlide}>&#10094;</button>
      <button className="next-button" onClick={goToNextSlide}>&#10095;</button>

      {/* Modal Overlay */}
      {modalOpen && (
        <div className="modal-overlay" onClick={handleOutsideClick}>
          <div className="overlay-container">
            
            <div className="modal-buttons">

              {/* Zoom In Button */}
              {/* <button onClick={() => handleZoom(1)}>
                <img src="zoom-in-icon.png" alt="Zoom In" />
              </button> */}
              
              {/* Zoom Out Button */}
              {/* <button onClick={() => handleZoom(-1)}>
                <img src="zoom-out-icon.png" alt="Zoom Out" />
              </button> */}

              {/* Close Modal Button */}
              <button onClick={closeModal}>
                <FontAwesomeIcon icon={faRightFromBracket} flip="horizontal" className="icon" />
              </button>

              {/* New: Download Button */}
              <a href={images[modalImageIndex]} download>
                <FontAwesomeIcon icon={faCircleDown} bounce className="icon" />
              </a>

              {/* Link to More Images */}
              <a href="https://example.com/more-images" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faLink} className="icon" />
              </a>

            </div>

            <div className="modal-content">

              <div className="img-container">

                <img
                  ref={modalImageRef}
                  src={images[modalImageIndex]}
                  alt={`Modal Image ${modalImageIndex + 1}`}
                  style={{ transform: `scale(${zoomLevel})` }}
                  onTouchStart={(e) => (e.touches.length > 1 ? e.preventDefault() : null)}
                  onTouchMove={(e) => e.touches.length > 1 && handlePinchZoom(e)}
                />

              </div>

              <button className="modal-prev-button" onClick={goToPrevModalImage}>&#10094;</button>
              <button className="modal-next-button" onClick={goToNextModalImage}>&#10095;</button>
            
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Image;
