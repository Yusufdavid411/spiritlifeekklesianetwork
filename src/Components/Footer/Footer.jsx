import React from 'react'
import './footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faYoutube, faTiktok, faTelegram, faInstagram, faSquareThreads } from '@fortawesome/free-brands-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';



const Footer = () => {
  return (
    <footer>

      <div className="container" id="container">

        <div className="social" id="social">

          <a href="https://youtube.com/@judezakwoyi?si=scCwEitMSw9Dc7iA" className="icon">
            <FontAwesomeIcon icon={faYoutube} color='#ff0000'/>
          </a>
          <a href="https://www.facebook.com/judejerryzakwoyi/" className="icon">
            <FontAwesomeIcon icon={faFacebook} color='#3b5998'/>
          </a>
          <a href="https://t.me/SpiritLifemessages" className="icon">
            <FontAwesomeIcon icon={faTelegram} color='#0088cc'/>
          </a>
          <a href="https://www.instagram.com/jude_zakwoyi?igsh=dnhoMnd3Y3IybDM3" className="icon">
            <FontAwesomeIcon icon={faInstagram} color='#c32aa3'/>
          </a>
          <a href="https://www.threads.net/@jude_zakwoyi" className="icon">
            <FontAwesomeIcon icon={faSquareThreads} color='black'/>
          </a>
          <a href="https://www.tiktok.com/@judezakwoyi?_t=ZM-8skmJ16vqSs&_r=1" className="icon">
            <FontAwesomeIcon icon={faTiktok} color='#010101'/>
          </a>

        </div>

        <div className="map" id="map">
          <a href='https://maps.app.goo.gl/D7TuiLhUn7ig83d46'>
            <FontAwesomeIcon icon={faLocationDot} rotation={180} bounce style={{color: "red"}} />
          </a>
        </div>

        <p>SPIRITLIFE EKKLESIA NETWORK, YUV ACADEMY CHIKA, PHASE 3, ALONG AIRPORT ROAD ABUJA</p>


      </div>
      
    </footer>
  )
}

export default Footer