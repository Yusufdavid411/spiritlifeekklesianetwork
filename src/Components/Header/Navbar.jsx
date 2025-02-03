import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';


const Navbar = () => {

  const [activeItem, setActiveItem] = useState(null); // Track active item
  const [linkPosition, setLinkPosition] = useState('left'); // Track link position

  const handleItemClick = (itemId, position) => {
    setActiveItem(activeItem === itemId ? null : itemId); // Toggle item visibility
    setLinkPosition(position); // Set the position for the links (left or right)
  };

  return (
    <nav>
      <ul>

        <li onClick={() => handleItemClick(1, 'left')} className="hover-item">

          <a href="https://t.me/+Rnn_SXSO4YTOa_X0">Rhema Meditations</a>

          {/* {activeItem === 1 && (
            <div className={`link-options ${linkPosition}`}>
              <div className="link-optional">
                <a href="https://t.me/+Rnn_SXSO4YTOa_X0" target="_blank" rel="noopener noreferrer" className="link-option"></a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="link-option">Twitter</a>
              </div>

              <div><FontAwesomeIcon icon={faCaretRight} className="option-icon-btn" /></div>
            </div>
          )} */}

        </li>

        <li onClick={() => handleItemClick(2, 'left')}>

          Bible Reading Plan

          {activeItem === 2 && (
            <div className={`link-options ${linkPosition}`}>
              {/* <div className="link-optional"> */}
                {/* <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="link-option">Facebook</a> */}
                {/* <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="link-option">Twitter</a> */}
              {/* </div> */}

              <div><FontAwesomeIcon icon={faCaretRight} className="option-icon-btn" /></div>
            </div>
          )}
          
        </li>

        <li onClick={() => handleItemClick(2, 'left')}>

          Departments

          {activeItem === 2 && (
            <div className={`link-options ${linkPosition}`}>
              <div className="link-optional">
                <a href="/" target="_blank" rel="noopener noreferrer" className="link-option">Zoe Streams <br /> (Music Department)</a>
                <a href="/" target="_blank" rel="noopener noreferrer" className="link-option">Kingdom Parables <br /> (Drama Department)</a>
                <a href="/" target="_blank" rel="noopener noreferrer" className="link-option">The </a>
                <a href="/" target="_blank" rel="noopener noreferrer" className="link-option"></a>
                <a href="/" target="_blank" rel="noopener noreferrer" className="link-option"></a>
                <a href="/" target="_blank" rel="noopener noreferrer" className="link-option"></a>
                <a href="/" target="_blank" rel="noopener noreferrer" className="link-option"></a>
                <a href="/" target="_blank" rel="noopener noreferrer" className="link-option"></a>
                <a href="/" target="_blank" rel="noopener noreferrer" className="link-option"></a>
              </div>

              <div><FontAwesomeIcon icon={faCaretRight} className="option-icon-btn" /></div>
            </div>
          )}
          
        </li>

        <li>Personal Study Notes</li>
      </ul>

      <ul>

        <li onClick={() => handleItemClick(5, 'left')}>

          Contact : +2349094600075

          {activeItem === 5 && (
            <div className={`link-options ${linkPosition}`}>
              <div className="link-optional">
                <a href="tel:+2349094600075" target="_blank" rel="noopener noreferrer" className="link-option">Call</a>
                {/* <a href="https://wa.me/9094600075" target="_blank" rel="noopener noreferrer" className="link-option">WhatsApp</a> */}
              </div>

              <div><FontAwesomeIcon icon={faCaretRight} className="option-icon-btn" /></div>
            </div>
          )}

        </li>
      </ul>
  </nav>
  )
}

export default Navbar