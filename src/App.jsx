import './App.css'
import Header from './Components/Header/Header'
import Aside from './Components/Aside/Aside'
import Section from './Components/Section/Section';
import Footer from './Components/Footer/Footer';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Messages from "./Components/Section/Messages/Messages";
// Departments
import ZoeStreams from './Components/Header/Departments/ZoeStreams';
import Drama from './Components/Header/Departments/Drama';



function App() {

  return (

    <div className="content" id="content">
      <Router>


        <Header />

        <Routes future={{ v7_relativeSplatPath: true }}>

          <Route path="/" element={

            <div>

              <Aside />

              <Section />

            </div>
            
          } />

          <Route path="Messages/*" element={<Messages />} />
          <Route path="ZoeStreams/*" element={<ZoeStreams />} />
          <Route path="Drama/*" element={<Drama />} />

        </Routes>

        <Footer />


      </Router>

    </div>

  )

}

export default App;