import './section-style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faHeadphones, faBookBible, faFilm, faPhone, faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons';



import React from 'react'

const Section = () => {
  return (
    <div>
      <section>

        <div className="container">
          <div className="icon">
            <FontAwesomeIcon icon={faPlay} />
          </div>
          <div className="text">
            <p>Messages (Audio)</p>
          </div>
        </div>

        <div className="container">
          <div className="icon">
            <FontAwesomeIcon icon={faHeadphones} />
          </div>
          <div className="text">
            <p>Messages (Audio)</p>
          </div>
        </div>

        <div className="container">
          <div className="icon">
            <FontAwesomeIcon icon={faBookBible} />
          </div>
          <div className="text">
            <p>Messages (Audio)</p>
          </div>
        </div>

        <div className="container">
          <div className="icon">
            <FontAwesomeIcon icon={faFilm} />
          </div>
          <div className="text">
            <p>Messages (Audio)</p>
          </div>
        </div>

        <div className="container">
          <div className="icon">
            <FontAwesomeIcon icon={faPhone} />
          </div>
          <div className="text">
            <p>Messages (Audio)</p>
          </div>
        </div>

        <div className="container">
          <div className="icon">
            <FontAwesomeIcon icon={faHandHoldingDollar} />
          </div>
          <div className="text">
            <p>Messages (Audio)</p>
          </div>
        </div>

      </section>
    </div>
  )
}

export default Section