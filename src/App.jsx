import './App.css'
import Header from './Components/Header/Header'
import Aside from './Components/Aside/Aside'
import Section from './Components/Section/Section';
import Footer from './Components/Footer/Footer';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Audio from "./Components/Section/Messages/Audio";
import Video from "./Components/Section/Messages/Video"


function App() {

  return (

    <div className="content" id="content">
      <Router>


        <Header />

        <Routes>

          <Route path="/" element={

            <div>

              <Aside />

              <Section />

            </div>
            
          } />

          <Route path="/Audio" element={<Audio />} />

          <Route path="/Video" element={<Video />} />


        </Routes>

        <Footer />


      </Router>
    </div>

  )

}

export default App;