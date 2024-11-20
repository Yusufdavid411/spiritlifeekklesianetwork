import React, { useState } from 'react'
import './section.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlay, faHeadphones, faBookBible, faFilm, faPhone, faHandHoldingDollar, faDownload } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom"


const Section = () => {

  const [activeItem, setActiveItem] = useState(null); // Track active item
  const [linkPosition, setLinkPosition] = useState('left'); // Track link position
  const [isOverlayVisible, setOverlayVisible] = useState(false); // Manage overlay visibility
  const [overlayContent, setOverlayContent] = useState({}); // Content for the overlay
  const navigate = useNavigate();


  const handleItemClick = (itemId, position) => {
    setActiveItem(activeItem === itemId ? null : itemId); // Toggle item visibility
    setLinkPosition(position); // Set the position for the links (left or right)
  };


  // Show overlay with flyer details
  const showOverlay = (imageUrl, accountNumber, bankName) => {
    setOverlayContent({ imageUrl, accountNumber, bankName });
    setOverlayVisible(true);
  };

  // Hide overlay
  const hideOverlay = () => {
    setOverlayVisible(false);
  };

  const navigateTo = (path) => {
    setActiveItem(null); // Close the link options
    navigate(path); // Navigate using React Router
  };

  return (
    
    <section>

      <div className="container" onClick={() => handleItemClick(1, 'right')}>
        
        <div className="icon">
          <FontAwesomeIcon icon={faPlay} />
        </div>
        <div className="text">
          <p>Messages (Audio and Videos)</p>
        </div>

        {activeItem === 1 && (
          <div className="arrow-container">
            <div className={`link-options ${linkPosition}`}>

              {/* First Link: Navigate to TablePage */}
              <div
                className="link-option"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveItem(null); // Close the link options
                  navigateTo("/Messages");
                }}
              >
                messages
              </div>

            </div>

          </div>
        )}

      </div>

      <div className="container" onClick={() => handleItemClick(2, 'right')}>
        
        <div className="icon">
          <FontAwesomeIcon icon={faHeadphones} />
        </div>
        <div className="text">
          <p>Streaming</p>
        </div>

        {activeItem === 2 && (
          <div className="arrow-container">
            <div className={`link-options ${linkPosition}`}>
              <a href="https://youtube.com/@judezakwoyi?si=scCwEitMSw9Dc7iA" target="_blank" rel="noopener noreferrer" className="link-option">YouTube</a>
              <a href="https://t.me/SpiritLifemessages" target="_blank" rel="noopener noreferrer" className="link-option">Telegram</a>
            </div>
          </div>
        )}

      </div>

      <div className="container" onClick={() => handleItemClick(3, 'right')}>
        
        <div className="icon">
          <FontAwesomeIcon icon={faBookBible} />
        </div>
        <div className="text">
          <p>Books/Articles Study Materials</p>
        </div>

        {activeItem === 3 && (
          <div className={`link-options ${linkPosition}`}>
            <a href="/" target="_blank" rel="noopener noreferrer" className="link-option">Books</a>
            <a href="/" target="_blank" rel="noopener noreferrer" className="link-option">Articles</a>
            <a href="/" target="_blank" rel="noopener noreferrer" className="link-option">Study Materials</a>
          </div>
        )}

      </div>

      <div className="container" onClick={() => handleItemClick(4, 'right')}>
        <div className="icon">
          <FontAwesomeIcon icon={faFilm} />
        </div>
        <div className="text">
          <p>Drama & Movies</p>
        </div>

        {activeItem === 4 && (
          <div className={`link-options ${linkPosition}`}>
            <a href="/" target="_blank" rel="noopener noreferrer" className="link-option">Drama</a>
            <a href="/" target="_blank" rel="noopener noreferrer" className="link-option">Movies</a>
          </div>
        )}

      </div>

      <div className="container" onClick={() => handleItemClick(5, 'right')}>
        <div className="icon">
          <FontAwesomeIcon icon={faPhone} />
        </div>
        <div className="text">
          <p>Inquiries & Comments</p>
        </div>

        {activeItem === 5 && (
          <div className={`link-options ${linkPosition}`}>
            <a href="/" target="_blank" rel="noopener noreferrer" className="link-option">Inquiries</a>
            <a href="/" target="_blank" rel="noopener noreferrer" className="link-option">Comments</a>
          </div>
        )}

      </div>

      <div className="container" onClick={() => handleItemClick(6, 'right')}>
        
        <div className="icon">
          <FontAwesomeIcon icon={faHandHoldingDollar} />
        </div>
        <div className="text">
          <p>Donations (Giving)</p>
        </div>

        {activeItem === 6 && (
          <div className={`link-options ${linkPosition}`}>

            <div
              className="link-option"
              onClick={(e) => {
                e.stopPropagation();
                showOverlay(
                  '/img/sup-klc.jfif', // Flyer image URL
                  '1234567890', // Account number
                  'Demo Bank' // Bank name
                );
              }}
            >
              Giving
            </div>

            <div
              className="link-option"
              onClick={(e) => {
                e.stopPropagation();
                showOverlay(
                  '/img/sup-klc.jfif', // Flyer image URL
                  '1234567890', // Account number
                  'Demo Bank' // Bank name
                );
              }}
            >
              KLC Support
            </div>

          </div>
        )}

      </div>

      {/* Overlay Component */}
      {isOverlayVisible && (
        <div className="overlay" onClick={hideOverlay}>
          <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
            <img src={overlayContent.imageUrl} alt="Flyer" className="flyer-image" />
            <div className="overlay-buttons">
              <button
                onClick={() => navigator.clipboard.writeText(overlayContent.accountNumber)}
              >
                Copy Account Number
              </button>
              <button
                onClick={() => navigator.clipboard.writeText(overlayContent.bankName)}
              >
                Copy Bank
              </button>
              <button
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = overlayContent.imageUrl;
                  link.download = 'flyer.jpg';
                  link.click();
                }}
              >
                <FontAwesomeIcon icon={faDownload} bounce />
              </button>
              <button onClick={hideOverlay}>Exit</button>
            </div>
          </div>
        </div>
      )}

    </section>

  )
}

export default Section;