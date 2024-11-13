import React, { useState, useEffect } from 'react';
import './header.css';

// Array of image URLs (replace these with your own images)
const images = [
  "/img/img1.jfif",
  "/img/img5.jpeg",
  "/img/img3.jfif"
];

const Image = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const imagesToShow = 3;  // Number of images to show at a time
  const delay = 3000;      // Delay between auto-slide (in milliseconds)

  // Function to go to the next set of images
  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Function to go to the previous set of images
  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - imagesToShow : prevIndex - 1
    );
  };

  // Auto-slide effect
  useEffect(() => {
    const slideInterval = setInterval(goToNextSlide, delay);
    return () => clearInterval(slideInterval); // Cleanup on unmount
  }, [currentIndex]);

  return (
    <div className="carousel">
      <div className="carousel-container" style={{ transform: `translateX(-${currentIndex * (100 / imagesToShow)}%)` }}>
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index + 1}`}
            className="carousel-image"
            style={{ width: `${100 / imagesToShow}%` }}
          />
        ))}
      </div>
      <button className="prev-button" onClick={goToPrevSlide}>&#10094;</button>
      <button className="next-button" onClick={goToNextSlide}>&#10095;</button>
    </div>
  );
};

export default Image;
