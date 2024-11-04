import React from 'react'
import './section-style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlay, faHeadphones, faBookBible, faFilm, faPhone, faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons';


const Section = () => {
  return (
    
    <section>

      <div className="container">
        <div className="icon">
          <a href="https://t.me/SpiritLifemessages">
            <FontAwesomeIcon icon={faPlay} />
          </a>
        </div>
        <div className="text">
          <p>Messages (Audio and Videos)</p>
        </div>
      </div>

      <div className="container">
        <div className="icon">
          <FontAwesomeIcon icon={faHeadphones} />
        </div>
        <div className="text">
          <p>Streaming</p>
        </div>
      </div>

      <div className="container">
        <div className="icon">
          <FontAwesomeIcon icon={faBookBible} />
        </div>
        <div className="text">
          <p>Books/Articles Study Materials</p>
        </div>
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