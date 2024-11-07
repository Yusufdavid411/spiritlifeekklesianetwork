import React from 'react'
import './footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faYoutube, faTelegram, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';



const Footer = () => {
  return (
    <footer>

      <div className="social" id="social">

        <a href="https://youtube.com/@judezakwoyi?si=scCwEitMSw9Dc7iA" className="icon">
          <FontAwesomeIcon icon={faYoutube} />
        </a>
        <a href="https://www.facebook.com/judejerryzakwoyi/" className="icon">
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a href="https://t.me/SpiritLifemessages" className="icon">
          <FontAwesomeIcon icon={faTelegram} />
        </a>
        <a href="https://www.instagram.com/jude_zakwoyi?igsh=dnhoMnd3Y3IybDM3" className="icon">
          <FontAwesomeIcon icon={faInstagram} />
        </a>

      </div>

      <div className="map" id="map">
        <a href='https://maps.app.goo.gl/D7TuiLhUn7ig83d46'>
          <FontAwesomeIcon icon={faLocationDot} rotation={180} bounce style={{color: "red"}} />
        </a>
      </div>

      <p>SPIRITLIFE EKKLESIA NETWORK, YUV ACADEMY CHIKA, PHASE 3, ALONG AIRPORT ROAD ABUJA</p>

    </footer>
  )
}

export default Footer