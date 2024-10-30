import './App.css'
import Aside from './Components/Aside/Aside'
import Header from './Components/Header/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faHeadphones, faBookBible, faFilm, faPhone, faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons';


function App() {

  return (
    <>
      <div className="content" id="content">

        <Header />

        <Aside />

        <section>

          <div className="container">
            <div className="icon">
              <FontAwesomeIcon icon={faPlay} size='1.2x' />
            </div>
            <div className="text">
              <p>Messages (Audio)</p>
            </div>
          </div>

          <div className="container">
            <div className="icon">
              <FontAwesomeIcon icon={faHeadphones} size='1.2x' />
            </div>
            <div className="text">
              <p>Messages (Audio)</p>
            </div>
          </div>

          <div className="container">
            <div className="icon">
              <FontAwesomeIcon icon={faBookBible} size='1.2x' />
            </div>
            <div className="text">
              <p>Messages (Audio)</p>
            </div>
          </div>

          <div className="container">
            <div className="icon">
              <FontAwesomeIcon icon={faFilm} size='1.2x' />
            </div>
            <div className="text">
              <p>Messages (Audio)</p>
            </div>
          </div>

          <div className="container">
            <div className="icon">
              <FontAwesomeIcon icon={faPhone} size='1.2x' />
            </div>
            <div className="text">
              <p>Messages (Audio)</p>
            </div>
          </div>

          <div className="container">
            <div className="icon">
              <FontAwesomeIcon icon={faHandHoldingDollar} size='1.2x' />
            </div>
            <div className="text">
              <p>Messages (Audio)</p>
            </div>
          </div>
          
        </section>

        {/* <footer>

          <div className="social" id="social">
            <div className="icon"></div>
            <div className="icon"></div>
            <div className="icon"></div>
            <div className="icon"></div>
          </div>

          <div className="map" id="map">
            <img src="" alt="map" />
          </div>

          <p>The Vision Notes Study Notes Study Notes Study Notes Study Notes Study Notes Study Notes Study Notes Study Notes</p>

        </footer> */}

      </div>
    </>
  )
  
}

export default App
