import React, { useState, useEffect, useRef } from 'react';
import './header.css';

const images = [
  "/img/Pst_Jude.png",
  "/img/klc.jfif",
  "/img/sup-klc.jfif",
	"/img/Pst Jude 1.jpg",
  "/img/Pst_Jude.png",
  "/img/klc.jfif",
  "/img/sup-klc.jfif",
	"/img/Pst Jude 1.jpg",
  "/img/Pst_Jude.png",
  "/img/klc.jfif",
  "/img/sup-klc.jfif",
	"/img/Pst Jude 1.jpg",
  "/img/Pst_Jude.png",
  "/img/klc.jfif",
  "/img/sup-klc.jfif",
	"/img/Pst Jude 1.jpg",
  "/img/Pst_Jude.png",
  "/img/klc.jfif",
  "/img/sup-klc.jfif",
	"/img/Pst Jude 1.jpg",
];

const Image1 = () => {
  const imagesToShow = 1;
  const delay = 3000;
  const [currentIndex, setCurrentIndex] = useState(images.length);
  const [modalOpen, setModalOpen] = useState(false);         // New: Modal visibility
  const [zoomLevel, setZoomLevel] = useState(1);             // New: Image zoom level
  const [modalImageIndex, setModalImageIndex] = useState(0); // New: Current image in modal view

  const totalImages = images.length;

  const carouselImages = [
    ...images.slice(-imagesToShow),
    ...images,
    ...images.slice(0, imagesToShow)
  ];

  const autoSlideRef = useRef();
  const startX = useRef(0);
  const endX = useRef(0);
  

  const goToNextSlide = () => setCurrentIndex((prev) => prev + 1);
  const goToPrevSlide = () => setCurrentIndex((prev) => prev - 1);

  useEffect(() => {
    autoSlideRef.current = setInterval(goToNextSlide, delay);
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

  // New: Function to open modal and set modal image
  const openModal = (index) => {
    setModalOpen(true);
    setModalImageIndex(index);
  };

  // New: Function to close modal and reset zoom
  const closeModal = () => {
    setModalOpen(false);
    setZoomLevel(1);
  };

  // New: Function to download the current modal image
  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = images[modalImageIndex];
    link.download = `Image-${modalImageIndex + 1}`;
    link.click();
  };

  // New: Function to go to the next image in modal
  const goToNextModalImage = () => {
    setModalImageIndex((prevIndex) => (prevIndex + 1) % totalImages);
  };

  // New: Function to go to the previous image in modal
  const goToPrevModalImage = () => {
    setModalImageIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
  };

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
          <div className="img">
            <img
            key={index}
            src={img}
            alt={`Slide ${index + 1}`}
            className="carousel-image"
            style={{ width: `${100 / imagesToShow}%` }}
            onClick={() => openModal(index % totalImages)} // New: Open modal on image click
          />
          </div>
        ))}
      </div>
      <button className="prev-button" onClick={goToPrevSlide}>&#10094;</button>
      <button className="next-button" onClick={goToNextSlide}>&#10095;</button>

      {/* New: Modal Overlay */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <img
              src={images[modalImageIndex]}
              alt={`Modal Image ${modalImageIndex + 1}`}
              style={{ transform: `scale(${zoomLevel})` }}
            />
            <div className="modal-buttons">
              <button onClick={downloadImage}>Download</button>
              <button onClick={() => setZoomLevel((prev) => Math.min(prev + 0.2, 3))}>Zoom In</button>
              <button onClick={() => setZoomLevel((prev) => Math.max(prev - 0.2, 1))}>Zoom Out</button>
              <button onClick={closeModal}>Close</button>
              <button onClick={goToPrevModalImage}>Previous</button>
              <button onClick={goToNextModalImage}>Next</button>
              <a href="https://example.com/more-images" target="_blank" rel="noopener noreferrer">More Images</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Image1;
