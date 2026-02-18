import React from "react"
import "./footer.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faFacebook,
  faYoutube,
  faTiktok,
  faTelegram,
  faInstagram,
  faSquareThreads,
} from "@fortawesome/free-brands-svg-icons"
import { faLocationDot } from "@fortawesome/free-solid-svg-icons"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* ================= MINISTRY INFO ================= */}
        <div className="footer-section">
          <h3 className="footer-title">SpiritLife Ekklesia Network</h3>
          <p className="footer-text">
            A Ministry with a vision to be, and raise men in whom God can entrust his counsel in all spheres of life as ordained and not suffer loss
          </p>
          
          <h5> Social Media handle <p>@JUDE ZAKWOYI</p></h5>

          <div className="footer-socials">
            <a
              href="https://youtube.com/@judezakwoyi?si=scCwEitMSw9Dc7iA"
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faYoutube} />
            </a>
            <a
              href="https://www.facebook.com/judejerryzakwoyi/"
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a
              href="https://t.me/SpiritLifemessages"
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faTelegram} />
            </a>
            <a
              href="https://www.instagram.com/jude_zakwoyi?igsh=dnhoMnd3Y3IybDM3"
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a
              href="https://www.threads.net/@jude_zakwoyi"
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faSquareThreads} />
            </a>
            <a
              href="https://www.tiktok.com/@judezakwoyi?_t=ZM-8skmJ16vqSs&_r=1"
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faTiktok} />
            </a>
          </div>
        </div>

        {/* ================= QUICK LINKS ================= */}
        <div className="footer-section">
          <h4 className="footer-subtitle">Quick Links</h4>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About the Ministry</a></li>
            <li><a href="/sermons">Sermons</a></li>
            <li><a href="/rhema-meditations">Rhema Meditations</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* ================= SERVICE TIMES ================= */}
        <div className="footer-section">
          <h4 className="footer-subtitle">Service Times</h4>
          <ul className="footer-times">
            <li>SUPERNATURAL SHIFT — SUNDAYS 08:00 AM (WAT)</li>
            <li>DEEP TOUCH _ FRIDAYS 04:00 PM (WAT)</li>
          </ul>
        </div>

        {/* ================= LOCATION ================= */}
        <div className="footer-section">
          <h4 className="footer-subtitle">Location</h4>

          <a
            href="https://maps.app.goo.gl/D7TuiLhUn7ig83d46"
            target="_blank"
            rel="noreferrer"
            className="footer-location"
          >
            <FontAwesomeIcon icon={faLocationDot} />
            <span>
              YUV Academy, Chika Phase 3,<br />
              Along Airport Road, Abuja
            </span>
          </a>
        </div>

      </div>

      {/* ================= COPYRIGHT ================= */}
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} SpiritLife Ekklesia Network · All rights reserved
        </p>
        <span>Built to spread the Gospel of Christ</span>
      </div>
    </footer>
  )
}

export default Footer
