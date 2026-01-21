// ============================================
// PUBLIC WEBSITE - ABOUT PAGE
// Purpose: Information about the ministry
// Route: /about
// ============================================

import React from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const About = () => {
  return (
    <div className="about">
      <Navbar />
      
      <main className="about-content">
        <h1>About Our Ministry</h1>
        <p>
          Spirit Life Ekklesia Network is dedicated to serving the body of Christ
          with excellence and integrity.
        </p>
        <p>
          We believe in raising leaders who will transform society for Christ.
        </p>
      </main>

      <Footer />
    </div>
  )
}

export default About
