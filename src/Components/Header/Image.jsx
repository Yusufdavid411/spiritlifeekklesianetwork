import React, { useState, useEffect, useRef } from 'react';
import './header.css';

// Image URLs (replace these with your actual image sources)
const images = [
  "/img/img1.jfif",
  "/img/img5.jpeg",
  "/img/img3.jfif",
	"/img/img1.jfif",
  "/img/img5.jpeg",
  "/img/img3.jfif",
	"/img/img1.jfif",
  "/img/img5.jpeg",
  "/img/img3.jfif",
	"/img/img1.jfif",
  "/img/img5.jpeg",
  "/img/img3.jfif",
	"/img/img1.jfif",
  "/img/img5.jpeg",
  "/img/img3.jfif",
	"/img/img1.jfif",
  "/img/img5.jpeg",
  "/img/img3.jfif"
];

const Image = () => {
  const imagesToShow = 1;  // Number of images to display at a time
  const delay = 5000;      // Delay for auto-slide (in ms)
  const [currentIndex, setCurrentIndex] = useState(images.length); // Start at the first cloned image
  const totalImages = images.length;

  // Cloned images array for seamless circular transition
  const carouselImages = [
    ...images.slice(-imagesToShow),  // Clone the last few images at the beginning
    ...images,
    ...images.slice(0, imagesToShow) // Clone the first few images at the end
  ];

  // Auto-slide timer
  const autoSlideRef = useRef();
  const startX = useRef(0); // Starting x position for touch start
  const endX = useRef(0);   // Ending x position for touch end

  // Go to the next slide
  const goToNextSlide = () => setCurrentIndex((prev) => prev + 1);

  // Go to the previous slide
  const goToPrevSlide = () => setCurrentIndex((prev) => prev - 1);

  // Auto-slide effect with cleanup
  useEffect(() => {
    autoSlideRef.current = setInterval(goToPrevSlide, delay);
    return () => clearInterval(autoSlideRef.current);
  }, []);

  // Circular effect for the cloned images
  useEffect(() => {
    if (currentIndex === totalImages + imagesToShow) {
      setTimeout(() => setCurrentIndex(imagesToShow), 0);
    } else if (currentIndex === 0) {
      setTimeout(() => setCurrentIndex(totalImages), 0);
    }
  }, [currentIndex, totalImages, imagesToShow]);

  // Touch handlers for swiping
  const handleTouchStart = (e) => {
    clearInterval(autoSlideRef.current); // Stop auto-slide on touch
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    endX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (startX.current - endX.current > 50) {
      goToNextSlide(); // Swipe left
    }
    if (endX.current - startX.current > 50) {
      goToPrevSlide(); // Swipe right
    }
    autoSlideRef.current = setInterval(goToNextSlide, delay); // Restart auto-slide
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
          <div className="img" id="img">
						<img
            key={index}
            src={img}
            alt={`Slide ${index + 1}`}
            className="carousel-image"
            style={{ width: `${100 / imagesToShow}%` }}
          />
					</div>
        ))}
      </div>
      <button className="prev-button" onClick={goToPrevSlide}>&#10094;</button>
      <button className="next-button" onClick={goToNextSlide}>&#10095;</button>
    </div>
  );
};

export default Image;
