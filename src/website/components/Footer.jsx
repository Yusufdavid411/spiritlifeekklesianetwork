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
            Raising men in whom God can entrust His counsel,
            shaping lives for divine purpose across all spheres.
          </p>

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
            <li><a href="/events">Programs & Events</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* ================= SERVICE TIMES ================= */}
        <div className="footer-section">
          <h4 className="footer-subtitle">Service Times</h4>
          <ul className="footer-times">
            <li>🕊️ Sunday Service — 9:00 AM</li>
            <li>🔥 Midweek Service — Wednesday 5:30 PM</li>
            <li>📖 Rhema Meditation — Daily</li>
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
