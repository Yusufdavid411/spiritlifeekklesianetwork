import './App.css'
import Aside from './Components/Aside/Aside'
import Header from './Components/Header/Header'


function App() {

  return (
    <>
      <div className="content" id="content">

        <Header />

        <Aside />

        <section>
        </section>

        <footer>

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

        </footer>

      </div>
    </>
  )
  
}

export default App
