import React, { useState, useEffect } from 'react';
import './header.css'; // Make sure to create this CSS file

// Sample images - replace with your own image URLs
const images = [
  "/img/img1.jfif",
  "/img/img5.jpeg",
  "/img/img3.jfif"
];

const Image = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const delay = 3000; // time in ms for auto-slide (3 seconds)

  // Function to handle slide movement
  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Auto-slide effect
  useEffect(() => {
    const slideInterval = setInterval(goToNextSlide, delay);

    // Clear interval on component unmount
    return () => clearInterval(slideInterval);
  }, [currentIndex]);

  // Touch handlers for mobile swipe
  let startX;
  const handleTouchStart = (e) => {
    startX = e.touches[0].clientX;
  };
  
  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) goToNextSlide(); // Swipe left
    if (endX - startX > 50) goToPrevSlide(); // Swipe right
  };

  return (
    <div className="carousel" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <div className="carousel-container">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index + 1}`}
            className={`carousel-image ${index === currentIndex ? "active" : ""}`}
          />
        ))}
      </div>
      <button className="prev-button" onClick={goToPrevSlide}>&#10094;</button>
      <button className="next-button" onClick={goToNextSlide}>&#10095;</button>
    </div>
  );
};

export default Image;
