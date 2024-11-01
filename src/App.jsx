import './App.css';
import Header from './Components/Header/Header';
import Aside from './Components/Aside/Aside';
import Section from './Components/Section/Section';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faYoutube, faTelegram, faInstagram, faLocationDot } from '@fortawesome/free-brands-svg-icons';


function App() {

  return (
    
    <div className="content" id="content">

      <Header />

      <Aside />

      <Section />

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
          <FontAwesomeIcon icon={faLocationDot} bounce />
        </div>

        <p>Study Notes Study Notes Study Notes Study Notes</p>

      </footer>

    </div>

  )

}

export default App;