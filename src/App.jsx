import './App.css'
import Header from './Components/Header/Header'
import Aside from './Components/Aside/Aside'
import Section from './Components/Section/Section';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faYoutube, faTelegram, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';


function App() {

  return (
    
    <div className="content" id="content">

      <Header />

      <Aside />

      <Section />

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

    </div>

  )

}

export default App;