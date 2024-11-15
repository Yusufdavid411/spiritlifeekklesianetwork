import React, { useState } from 'react'
import './section-style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlay, faHeadphones, faBookBible, faFilm, faPhone, faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons';


const Section = () => {

  const [activeItem, setActiveItem] = useState(null); // Track active item
  const [linkPosition, setLinkPosition] = useState('left'); // Track link position

  const handleItemClick = (itemId, position) => {
    setActiveItem(activeItem === itemId ? null : itemId); // Toggle item visibility
    setLinkPosition(position); // Set the position for the links (left or right)
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
          <div className={`link-options ${linkPosition}`}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="link-option">Facebook</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="link-option">Twitter</a>
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
          <div className={`link-options ${linkPosition}`}>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="link-option">LinkedIn</a>
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
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="link-option">GitHub</a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="link-option">YouTube</a>
          </div>
        )}

      </div>

      <div className="container">
        <div className="icon">
          <FontAwesomeIcon icon={faFilm} />
        </div>
        <div className="text">
          <p>Drama & Movies</p>
        </div>
      </div>

      <div className="container">
        <div className="icon">
          <FontAwesomeIcon icon={faPhone} />
        </div>
        <div className="text">
          <p>Inquiries & Comments</p>
        </div>
      </div>

      <div className="container">
        <div className="icon">
          <FontAwesomeIcon icon={faHandHoldingDollar} />
        </div>
        <div className="text">
          <p>Donations (Giving)</p>
        </div>
      </div>

    </section>

  )
}

export default Section;