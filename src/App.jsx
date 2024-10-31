import './App.css'
import Header from './Components/Header/header'
import Aside from './Components/Aside/aside'
import Section from './Components/Section/section'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faHeadphones, faBookBible, faFilm, faPhone, faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons';


function App() {

  return (
    
    <div className="content" id="content">

      <Header />

      <Aside />

      <Section/>

      <footer>

        <div className="social" id="social">

          <div className="icon">
            <FontAwesomeIcon icon={faPlay} />
          </div>
          <div className="icon">
            <FontAwesomeIcon icon={faHandHoldingDollar} />
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