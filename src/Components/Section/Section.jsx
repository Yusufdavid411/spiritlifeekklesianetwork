import React, { useState } from 'react'
import './section.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlay, faHeadphones, faBookBible, faFilm, faPhone, faHandHoldingDollar, faDownload, faArrowLeft, faLink } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast';
// test

const Section = () => {

  const [activeItem, setActiveItem] = useState(null); // Track active item
  const [linkPosition, setLinkPosition] = useState('left'); // Track link position
  const [isOverlayVisible, setOverlayVisible] = useState(false); // Manage overlay visibility
  const [overlayContent, setOverlayContent] = useState({}); // Content for the overlay
  const [isCurrencyOverlayVisible, setCurrencyOverlayVisible] = useState(false); // Currency overlay
  const [selectedCurrency, setSelectedCurrency] = useState([]); // NEW: State to store selected currency details
  const navigate = useNavigate();


  // Separate currency lists for MINISTRY and GOD'S SERVANT
  const ministryCurrencies = [
    { name: "Naira", accountNumber: "0751940803" },
    { name: "USD", accountNumber: "0751940810" },
    { name: "Pounds (GBS)", accountNumber: "0751940834" },
    { name: "Euros", accountNumber: "0751940827" },
  ];


  const servantCurrencies = [
    { name: "Naira", accountNumber: "9128474017" },
    { name: "USD", accountNumber: "1021179101" },
  ];


  const handleItemClick = (itemId, position) => {
    setActiveItem(activeItem === itemId ? null : itemId); // Toggle item visibility
    setLinkPosition(position); // Set the position for the links (left or right)
  };


  // Show overlay with flyer details
  const showOverlay = (imageUrl, accountNumber, bankName, currencyList) => {
    setOverlayContent({ imageUrl, accountNumber, bankName });
    setSelectedCurrency(currencyList);
    setOverlayVisible(true);
  };


  // Hide overlay
  const hideOverlay = () => {
    setOverlayVisible(false);
  };

  // Show currency overlay
  const showCurrencyOverlay = () => {
    setCurrencyOverlayVisible(true);
  };

  // Hide currency overlay
  const hideCurrencyOverlay = () => {
    setCurrencyOverlayVisible(false);
  };

  const bankNameClick = (bankName) => {
    navigator.clipboard.writeText(bankName)
    toast(`${bankName} copied to clipboard!`)
  }

  // Handle currency click
  const handleCurrencyClick = (accountNumber, name) => {
    navigator.clipboard.writeText(accountNumber);
    toast(`${name}(${accountNumber}) copied to clipboard!`)
    // alert(`Account number ${accountNumber} copied to clipboard!`);
    hideCurrencyOverlay(); // Close currency overlay after selection
  };

  const navigateTo = (path) => {
    setActiveItem(null); // Close the link options
    navigate(path); // Navigate using React Router
  };

  return (
    
    <section>

      <div className="container" onClick={() => handleItemClick(1, 'left')}>
        
        <div className="icon">
          <FontAwesomeIcon icon={faPlay} />
        </div>
        <div
          className="text"
          onClick={(e) => {
            e.stopPropagation();
            setActiveItem(null); // Close the link options
            navigateTo("/Years");
          }}>
          <p>Messages (Audio and Videos)</p>
        </div>
      </div>

      <div className="container" onClick={() => handleItemClick(2, 'left')}>
        
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
              <a href="https://www.facebook.com/judejerryzakwoyi/" target="_blank" rel="noopener noreferrer" className="link-option">FaceBook</a>
            </div>
          </div>
        )}

      </div>

      <div className="container" onClick={() => handleItemClick(3, 'left')}>
        
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

      <div className="container" onClick={() => handleItemClick(4, 'left')}>
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

      <div className="container" onClick={() => handleItemClick(5, 'left')}>
        <div className="icon">
          <FontAwesomeIcon icon={faPhone} />
        </div>
        <div className="text">
          <p>Inquiries & Comments</p>
        </div>

        {activeItem === 5 && (
          <div className={`link-options ${linkPosition}`}>
            <a href="https://wa.me/9094600075" target="_blank" rel="noopener noreferrer" className="link-option">WhatsApp</a>
            <a  href="mailto:spiritlifeekklesianetwork@gmail.com" target="_blank" rel="noopener noreferrer" className="link-option">Send us an EMAIL</a>
            <a href="/" target="_blank" rel="noopener noreferrer" className="link-option">Comment</a>
          </div>
        )}

      </div>

      <div className="container" onClick={() => handleItemClick(6, 'left')}>
        <div className="icon">
          <FontAwesomeIcon icon={faHandHoldingDollar} />
        </div>
        <div className="text">
          <p>Donations (Giving)</p>
        </div>

        {activeItem === 6 && (
          <div className={`link-options ${linkPosition}`}>
            {/* Ministry Donation */}
            <div
              className="link-option"
              onClick={(e) => {
                e.stopPropagation();
                showOverlay(
                  '/img/minflyer.jpg',
                  '07519408**',
                  'GT BANK',
                  ministryCurrencies // NEW: Pass MINISTRY currency list
                );
              }}
            >
              MINISTRY
            </div>

            {/* God's Servant Donation */}
            <div
              className="link-option"
              onClick={(e) => {
                e.stopPropagation();
                showOverlay(
                  '/img/fcmb.jpg',
                  '91284740**',
                  'FCMB BANK',
                  servantCurrencies // NEW: Pass SERVANT currency list
                );
              }}
            >
              GOD'S SERVANT
            </div>
          </div>
        )}
      </div>

      {/* Overlay Component */}
      {isOverlayVisible && (
        <div className="overlay" onClick={hideOverlay}>
          <Toaster />
          <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
            <div className="flyer-image">
              <div className="flyer-items">
                <div onClick={hideOverlay} className='exit'>
                  <FontAwesomeIcon icon={faArrowLeft} className="option-icon-btn" />
                </div>
                <div
                  className='download'
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = overlayContent.imageUrl;
                    link.download = 'flyer.jpg';
                    link.click();
                  }}
                >
                  <FontAwesomeIcon icon={faDownload} bounce />
                </div>
              </div>
              <img src={overlayContent.imageUrl} alt="Flyer" className="image" />
            </div>
            <div className="overlay-buttons">
              <button onClick={showCurrencyOverlay}>
                <FontAwesomeIcon icon={faLink} /> Copy Account Number
              </button>
              <button onClick={() => bankNameClick(overlayContent.bankName)}>
                <FontAwesomeIcon icon={faLink} /> Copy Bank
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Currency Overlay with Selected Currency Details */}
      {isCurrencyOverlayVisible && (
        <div className="overlay" onClick={hideCurrencyOverlay}>
          <div className="currency-content" onClick={(e) => e.stopPropagation()}>
            <h3>Select Currency</h3>
            <ul className="currency-list">
              {selectedCurrency.map((currency, index) => (
                <li
                  key={index}
                  className="currency-item"
                  onClick={() => handleCurrencyClick(currency.accountNumber, currency.name)}
                >
                  {currency.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>

  )
}

export default Section;
