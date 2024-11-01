import './App.css'
import Header from './Components/Header/Header'
import Aside from './Components/Aside/Aside'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlay, faHeadphones, faBookBible, faFilm, faPhone, faHandHoldingDollar, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faYoutube, faTelegram, faInstagram } from '@fortawesome/free-brands-svg-icons';


function App() {

  return (
    
    <div className="content" id="content">

      <Header />

      <Aside />

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

      <footer>

        <div className="social" id="social">

          <div className="icon">
            <FontAwesomeIcon icon={faYoutube} />
          </div>
          <div className="icon">
            <FontAwesomeIcon icon={faFacebook} />
          </div>
          <div className="icon">
            <FontAwesomeIcon icon={faTelegram} />
          </div>
          <div className="icon">
            <FontAwesomeIcon icon={faInstagram} />
          </div>

        </div>

        <div className="map" id="map">
          <FontAwesomeIcon icon={faLocationDot} bounce style={{color: "red",}} />
        </div>

        <p>Study Notes Study Notes Study Notes Study Notes</p>

      </footer>

    </div>

  )

}

export default App;