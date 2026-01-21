// ============================================
// PUBLIC WEBSITE - RESPONSIVE NAVBAR
// Features:
// - Mobile: Hamburger menu icon
// - Desktop/Tablet: Straight line navigation
// - Departments dropdown
// - Logo on left, nav on right
// ============================================

import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./navbar.css"

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [departmentsOpen, setDepartmentsOpen] = useState(false)
  const navigate = useNavigate()

  // Department links with paths
  const departments = [
    { name: 'Zoe Streams (Music)', path: '/ZoeStreams' },
    { name: 'Kingdom Parables (Drama)', path: '/Drama' },
    { name: 'The Publishers (Media)', path: '/Media' },
    { name: 'Evangelism', path: '/Evan' },
    { name: 'Children', path: '/Child' },
    { name: 'Prayer', path: '/Prayer' },
    { name: 'Ushering/Sanctuary', path: '/Usher' },
    { name: 'Protocol', path: '/Protocol' },
    { name: 'Welfare', path: '/Welfare' }
  ]

  const handleNavClick = (path) => {
    navigate(path)
    setMobileMenuOpen(false)
    setDepartmentsOpen(false)
  }

  const toggleDepartments = (e) => {
    e.stopPropagation()
    setDepartmentsOpen(!departmentsOpen)
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        
        {/* Logo */}
        <div className="navbar-logo">
          <img src="/img/logo.png" alt="Spirit Life Ekklesia Network Logo" />
        </div>

        {/* Hamburger Menu Icon (Mobile) */}
        <div 
          className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Navigation Menu */}
        <ul className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
          
          {/* Home */}
          <li className="nav-item">
            <a 
              className="nav-link"
              onClick={() => handleNavClick('/')}
            >
              Home
            </a>
          </li>

          {/* About */}
          <li className="nav-item">
            <a 
              className="nav-link"
              onClick={() => handleNavClick('/about')}
            >
              About
            </a>
          </li>

          {/* Departments with Dropdown */}
          <li className="nav-item dropdown">
            <a 
              className="nav-link dropdown-toggle"
              onClick={toggleDepartments}
            >
              Departments
              <span className={`dropdown-icon ${departmentsOpen ? 'open' : ''}`}>▼</span>
            </a>

            {/* Dropdown Menu */}
            {departmentsOpen && (
              <ul className="dropdown-menu">
                {departments.map((dept, index) => (
                  <li key={index} className="dropdown-item">
                    <a 
                      onClick={() => handleNavClick(dept.path)}
                    >
                      {dept.name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* Sermons */}
          <li className="nav-item">
            <a 
              className="nav-link"
              onClick={() => handleNavClick('/sermons')}
            >
              Sermons
            </a>
          </li>

          {/* Rhema Meditation */}
          <li className="nav-item">
            <a 
              className="nav-link"
              onClick={() => handleNavClick('/rhema-meditations')}
            >
              Rhema Meditation
            </a>
          </li>

          {/* ...existing code... */}

          {/* Contact */}
          <li className="nav-item">
            <a 
              className="nav-link contact"
              href="tel:+2349094600075"
            >
              📞 +234 909 460 0075
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
