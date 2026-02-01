// ============================================
// ABOUT PAGE – SPIRITLIFE EKKLESIA NETWORK
// Focus: Ministry identity, vision, leadership
// ============================================

import React from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import "./about.css"

const About = () => {
  return (
    <div className="about-page">
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="about-hero">
        <div className="about-hero-content">
          <div className="about-image">
            <img src="/img/Pst Jude 1.jpg" alt="Reverend Jude Zakwoyi" />
          </div>

          <div className="about-intro">
            <h1>Reverend Jude Zakwoyi</h1>
            <h3>Lead Minister & Visionary</h3>

            <p className="about-core">
              Commissioned to raise men in whom God can entrust His counsel.
            </p>
          </div>
        </div>
      </section>

      {/* ================= ABOUT MINISTRY ================= */}
      <section className="about-section">
        <h2>About the Ministry</h2>

        <p>
          SpiritLife Ekklesia Network is a Word-centered ministry committed
          to the raising of believers who walk in truth, spiritual accuracy,
          and divine alignment.
        </p>

        <p>
          The ministry exists out of a burden for depth — a call to raise men
          and women who are grounded in God’s counsel and able to represent
          His mind across all spheres of life.
        </p>
      </section>

      {/* ================= VISION / MANDATE ================= */}
      <section className="about-section about-cards">
        <div className="about-card">
          <h3>Vision</h3>
          <p>
            To be and raise men in whom God can entrust His counsel in all
            spheres of life.
          </p>
        </div>

        <div className="about-card">
          <h3>Mandate</h3>
          <p>
            Teaching, discipleship, spiritual formation, and alignment with
            divine order through the ministry of the Word.
          </p>
        </div>

        <div className="about-card">
          <h3>Assignment</h3>
          <p>
            Raising believers who live out God’s counsel with maturity,
            integrity, and spiritual responsibility.
          </p>
        </div>
      </section>

      {/* ================= LEAD MINISTER ================= */}
      <section className="about-section">
        <h2>The Lead Minister</h2>

        <p>
          Reverend Jude Zakwoyi is a teacher of the Word with a strong apostolic
          burden for truth, order, and spiritual maturity.
        </p>

        <p>
          His ministry is marked by depth, clarity, and a passion for raising
          believers who understand and live by the counsel of God rather than
          religious tradition.
        </p>
      </section>

      {/* ================= MINISTRY EXPRESSION ================= */}
      <section className="about-section">
        <h2>How the Ministry Expresses Itself</h2>

        <ul className="about-list">
          <li>Word-based teachings and sermons</li>
          <li>Rhema Meditations</li>
          <li>Discipleship and spiritual training</li>
          <li>Corporate gatherings and worship</li>
          <li>Digital ministry outreach</li>
        </ul>
      </section>

      {/* ================= LOCATION ================= */}
      <section className="about-section">
        <h2>Location & Reach</h2>

        <p>
          SpiritLife Ekklesia Network is rooted in Abuja, Nigeria, and reaches
          lives across nations through the ministry of the Word and digital
          platforms.
        </p>
      </section>

      {/* ================= CLOSING ================= */}
      <section className="about-closing">
        <p>
          SpiritLife Ekklesia Network is a place for those hungry for truth,
          order, and spiritual depth.
        </p>
      </section>

      <Footer />
    </div>
  )
}

export default About
