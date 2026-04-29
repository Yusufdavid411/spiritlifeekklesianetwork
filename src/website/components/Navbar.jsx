import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./navbar.css"

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [departmentsOpen, setDepartmentsOpen] = useState(false)
  const navigate = useNavigate()

  // ✅ FIXED: Department paths now match App.jsx routes
  const departments = [
    { name: "Zoe Streams (Music)", path: "/departments/zoestreams" },
    { name: "Spiritlife Kingdom Parables (Drama)", path: "/departments/drama" },
    { name: "The Publishers (Media)", path: "/departments/media" },
    { name: "Evangelism", path: "/departments/evan" },
    { name: "Children", path: "/departments/child" },
    { name: "Prayer", path: "/departments/prayer" },
    { name: "Ushering/Sanctuary", path: "/departments/ushering" },
    { name: "Protocol", path: "/departments/protocol" },
    { name: "Welfare", path: "/departments/welfare" },
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
          className={`hamburger ${mobileMenuOpen ? "active" : ""}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Navigation Menu */}
        <ul className={`nav-menu ${mobileMenuOpen ? "active" : ""}`}>

          <li className="nav-item">
            <a className="nav-link" onClick={() => handleNavClick("/")}>
              Home
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link" onClick={() => handleNavClick("/about")}>
              About
            </a>
          </li>

          {/* Departments Dropdown */}
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" onClick={toggleDepartments}>
              Departments
              <span className={`dropdown-icon ${departmentsOpen ? "open" : ""}`}>
                ▼
              </span>
            </a>

            {departmentsOpen && (
              <ul className="dropdown-menu">
                {departments.map((dept, index) => (
                  <li key={index} className="dropdown-item">
                    <a onClick={() => handleNavClick(dept.path)}>
                      {dept.name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li className="nav-item">
            <a className="nav-link" onClick={() => handleNavClick("/sermons")}>
              Sermons
            </a>
          </li>

          <li className="nav-item">
            <a
              className="nav-link"
              onClick={() => handleNavClick("/rhema-meditations")}
            >
              Rhema Meditation
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link contact" href="tel:+2349094600075">
              📞 Contact Us
            </a>
          </li>

        </ul>
      </div>
    </nav>
  )
}

export default Navbar
