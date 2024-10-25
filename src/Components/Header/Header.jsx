import React from 'react'
import './style.css'
import Logo from './Logo'
import Navbar from './Navbar'

const Header = () => {
  return (
    <header>

      <div className="navigation" id="navigation">

        <Logo />

        <Navbar />

      </div>

      <p className="vision" id="vision">The Vision Notes Study Notes Study Notes Study Notes Study Notes</p>

    </header>
  );
}
 
export default Header;