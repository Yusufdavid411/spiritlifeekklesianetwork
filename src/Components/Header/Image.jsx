import React, { useState, useEffect } from 'react';
import './header.css';

const images = [
  "/img/img1.jfif",
  "/img/img5.jpeg",
  "/img/img3.jfif"
];

const Image = () => {
  const [currentIndex, setCurrentIndex] = useState(images.length);
  const imagesToShow = 2;
  const delay = 4000;

  const totalImages = images.length;
  const carouselImages = [
    ...images.slice(-imagesToShow),  // Clone last few images at the beginning
    ...images,
    ...images.slice(0, imagesToShow) // Clone first few images at the end
  ];

  // Slide to the next set of images
  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  // Slide to the previous set of images
  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  // Auto-slide effect
  useEffect(() => {
    const slideInterval = setInterval(goToNextSlide, delay);
    return () => clearInterval(slideInterval);
  }, []);

  // Handle the circular transition effect
  useEffect(() => {
    if (currentIndex === totalImages + imagesToShow) {
      setTimeout(() => setCurrentIndex(imagesToShow), 0);  // Jump to the beginning clone without visible transition
    } else if (currentIndex === 0) {
      setTimeout(() => setCurrentIndex(totalImages), 0);   // Jump to the end clone without visible transition
    }
  }, [currentIndex, totalImages, imagesToShow]);

  return (
    <div className="carousel">
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
