import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faPhone } from "@fortawesome/free-solid-svg-icons";
import { departments } from "../../data/departments";
import "./navbar.css";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Sermons", path: "/sermons" },
  { label: "Rhema Meditation", path: "/rhema-meditations" },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [departmentsOpen, setDepartmentsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const closeMenus = () => {
    setMobileMenuOpen(false);
    setDepartmentsOpen(false);
  };

  const handleNavClick = (path) => {
    navigate(path);
    closeMenus();
  };

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return location.pathname.startsWith(path);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <button className="navbar-logo" onClick={() => handleNavClick("/")} type="button">
          <img src="/img/logo.png" alt="SpiritLife Ekklesia Network" />
        </button>

        <button
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          className={`hamburger ${mobileMenuOpen ? "active" : ""}`}
          onClick={() => setMobileMenuOpen((isOpen) => !isOpen)}
          type="button"
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`nav-menu ${mobileMenuOpen ? "active" : ""}`}>
          <div className="nav-links">
            {navLinks.map((link) => (
              <button
                className={`nav-link ${isActive(link.path) ? "active" : ""}`}
                key={link.path}
                onClick={() => handleNavClick(link.path)}
                type="button"
              >
                {link.label}
              </button>
            ))}

            <div
              className={`nav-dropdown ${departmentsOpen ? "open" : ""}`}
              onMouseEnter={() => setDepartmentsOpen(true)}
              onMouseLeave={() => setDepartmentsOpen(false)}
            >
              <button
                className={`nav-link dropdown-toggle ${
                  location.pathname.startsWith("/departments") ? "active" : ""
                }`}
                onClick={() => setDepartmentsOpen((isOpen) => !isOpen)}
                type="button"
              >
                Departments
                <FontAwesomeIcon icon={faChevronDown} />
              </button>

              <div className="departments-menu">
                <div className="departments-menu-intro">
                  <span>Ministry Arms</span>
                  <strong>Explore Departments</strong>
                </div>

                <div className="departments-grid">
                  {departments.map((department) => (
                    <button
                      className="department-nav-card"
                      key={department.value}
                      onClick={() => handleNavClick(`/departments/${department.value}`)}
                      type="button"
                    >
                      <span>{department.label}</span>
                      <small>{department.badge}</small>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <a className="nav-contact" href="tel:+2349094600075" onClick={closeMenus}>
            <FontAwesomeIcon icon={faPhone} />
            Contact Us
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
