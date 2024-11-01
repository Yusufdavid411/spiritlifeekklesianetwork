import './App.css';
import Header from './Components/Header/Header';
import Aside from './Components/Aside/Aside';
import Section from './Components/Section/Section';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPhone,  faFilm, faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons';
import { faFacebook,  } from '@fortawesome/free-brands-svg-icons';


function App() {

  return (
    
    <div className="content" id="content">

      <Header />

      <Aside />

      <Section />

      <footer>

        <div className="social" id="social">

          <div className="icon">
            <FontAwesomeIcon icon={faPhone} />
          </div>
          <div className="icon">
            <FontAwesomeIcon icon={faFacebook} />
          </div>
          <div className="icon">
            <FontAwesomeIcon icon={faHandHoldingDollar} />
          </div>
          <div className="icon">
            <FontAwesomeIcon icon={faHandHoldingDollar} />
          </div>

        </div>

        <div className="map" id="map">
          <img src="" alt="map" />
        </div>

        <p>Study Notes Study Notes Study Notes Study Notes</p>

      </footer>

    </div>

  )

}

export default App;