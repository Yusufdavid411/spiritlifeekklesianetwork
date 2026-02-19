// ============================================
// ABOUT PAGE – SPIRITLIFE EKKLESIA NETWORK
// Focus: Ministry identity, vision, leadership
// ============================================

import React from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import "./about.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faHandHoldingDollar,
  faArrowLeft,
  faDownload,
  faLink,
} from "@fortawesome/free-solid-svg-icons"
import toast, { Toaster } from "react-hot-toast"

const About = () => {

  // ================= DONATIONS (GIVING) =================
  const [isOverlayVisible, setOverlayVisible] = React.useState(false)
  const [isCurrencyOverlayVisible, setCurrencyOverlayVisible] = React.useState(false)
  const [overlayContent, setOverlayContent] = React.useState({})
  const [selectedCurrency, setSelectedCurrency] = React.useState([])

  const ministryCurrencies = [
    { name: "Naira", accountNumber: "0751940803" },
    { name: "USD", accountNumber: "0751940810" },
    { name: "Pounds (GBS)", accountNumber: "0751940834" },
    { name: "Euros", accountNumber: "0751940827" },
  ]

  const servantCurrencies = [
    { name: "Naira", accountNumber: "9128474017" },
    { name: "USD", accountNumber: "1021179101" },
  ]

  const showOverlay = (imageUrl, bankName, currencyList) => {
    setOverlayContent({ imageUrl, bankName })
    setSelectedCurrency(currencyList)
    setOverlayVisible(true)
  }

  const hideOverlay = () => setOverlayVisible(false)
  const showCurrencyOverlay = () => setCurrencyOverlayVisible(true)
  const hideCurrencyOverlay = () => setCurrencyOverlayVisible(false)

  const bankNameClick = (bankName) => {
    navigator.clipboard.writeText(bankName)
    toast(`${bankName} copied to clipboard!`)
  }

  const handleCurrencyClick = (accountNumber, name) => {
    navigator.clipboard.writeText(accountNumber)
    toast(`${name} (${accountNumber}) copied to clipboard!`)
    hideCurrencyOverlay()
  }

  return (
    <div className="about-page">
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="about-hero">
        <div className="about-hero-content">
          <div className="about-image">
            <img src="/img/hero/img00.jpg" alt="Reverend Jude Zakwoyi" />
          </div>

          <div className="about-intro">
            <h1>Reverend Jude Zakwoyi</h1>
            <h3>Lead Pastor</h3>

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
            A Ministry with a vision to be, and raise men in whom God can entrust his counsel in all spheres of life as ordained and not suffer loss
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
        <h2>The Lead Pastor</h2>

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

      {/* ================= MINISTRY GALLERY SLIDER ================= */}
      <section className="about-section about-gallery">
        <h2>Ministry Gallery</h2>

        <div className="gallery-wrapper">
          <div className="gallery-track">
            {/* Repeat image multiple times for smooth infinite scroll */}
            <img src="/img/gal/img0.jpg" alt="Ministry Moment" />
            <img src="/img/gal/img1.jpg" alt="Ministry Moment" />
            <img src="/img/gal/img2.jpg" alt="Ministry Moment" />
            <img src="/img/gal/img3.jpg" alt="Ministry Moment" />
            <img src="/img/gal/img5.jpg" alt="Ministry Moment" />
            <img src="/img/gal/img4.jpg" alt="Ministry Moment" />
            <img src="/img/gal/img6.jpg" alt="Ministry Moment" />
            <img src="/img/gal/img7.jpg" alt="Ministry Moment" />
          </div>
        </div>
      </section>

      
      {/* ================= DONATIONS (GIVING) ================= */}
      <section className="about-section about-giving">
        <h2>Donations (Giving)</h2>

        <p>
          Your giving supports the work of the ministry and helps advance
          the spread of the Word across lives and nations.
        </p>

        <div className="giving-buttons">
          <button
            onClick={() =>
              showOverlay("/img/minflyer.jpg", "GT BANK", ministryCurrencies)
            }
            >
            <FontAwesomeIcon icon={faHandHoldingDollar} /> Give to Ministry
          </button>

          <button
            onClick={() =>
              showOverlay("/img/fcmb.jpg", "FCMB BANK", servantCurrencies)
            }
            >
            <FontAwesomeIcon icon={faHandHoldingDollar} /> Give to God’s Servant
          </button>
        </div>
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

      {/* ================= GIVING OVERLAYS ================= */}
      {isOverlayVisible && (
        <div className="overlay" onClick={hideOverlay}>
          <Toaster />
          <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
            <div className="flyer-image">
              <div className="flyer-items">
                <div onClick={hideOverlay} className="exit">
                  <FontAwesomeIcon icon={faArrowLeft} />
                </div>
                <div
                  className="download"
                  onClick={() => {
                    const link = document.createElement("a")
                    link.href = overlayContent.imageUrl
                    link.download = "giving.jpg"
                    link.click()
                  }}
                >
                  <FontAwesomeIcon icon={faDownload} />
                </div>
              </div>
              <img
                src={overlayContent.imageUrl}
                alt="Giving Flyer"
                className="image"
              />
            </div>

            <div className="overlay-buttons">
              <button onClick={showCurrencyOverlay}>
                <FontAwesomeIcon icon={faLink} /> Copy Account Number
              </button>
              <button onClick={() => bankNameClick(overlayContent.bankName)}>
                <FontAwesomeIcon icon={faLink} /> Copy Bank
              </button>
            </div>
          </div>
        </div>
      )}



      {isCurrencyOverlayVisible && (
        <div className="overlay" onClick={hideCurrencyOverlay}>
          <div className="currency-content" onClick={(e) => e.stopPropagation()}>
            <h3>Select Currency</h3>
            <ul className="currency-list">
              {selectedCurrency.map((currency, index) => (
                <li
                  key={index}
                  className="currency-item"
                  onClick={() =>
                    handleCurrencyClick(
                      currency.accountNumber,
                      currency.name
                    )
                  }
                >
                  {currency.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default About
