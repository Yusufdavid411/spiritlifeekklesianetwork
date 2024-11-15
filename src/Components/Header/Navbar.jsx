import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';


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

        <li onClick={() => handleItemClick(1, 'left')}>

          Rhema Meditations

          {activeItem === 1 && (
            <div className={`link-options ${linkPosition}`}>
              <div className="link-optional">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="link-option">Facebook</a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="link-option">Twitter</a>
              </div>

              <div><FontAwesomeIcon icon={faCaretRight} className="option-icon-btn" /></div>
            </div>
          )}

        </li>

        <li onClick={() => handleItemClick(2, 'left')}>

          Bible Reading Plan

          {activeItem === 2 && (
            <div className={`link-options ${linkPosition}`}>
              <div className="link-optional">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="link-option">Facebook</a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="link-option">Twitter</a>
              </div>

              <div><FontAwesomeIcon icon={faCaretRight} className="option-icon-btn" /></div>
            </div>
          )}
          
        </li>

        <li>Assignments</li>
        <li>Personal Study Notes</li>
      </ul>

      <ul>
        <li>Contact : +2349094600075</li>
      </ul>
  </nav>
  )
}

export default Navbar