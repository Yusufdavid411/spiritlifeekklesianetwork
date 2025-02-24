import React from 'react'
import './header.css'
import Logo from './Logo'
import Navbar from './Navbar'

const Header = () => {
  return (
    <header>

      <div className="navigation" id="navigation">

        <Logo />

        <Navbar />

      </div>

      <div className="vision" id="vision">
        <span>VISION STATEMENT :</span>
        <marquee behavior="" direction="left">A Ministry with a vision to be, and raise men in whom God can entrust his counsel in all spheres of life as ordained and not suffer loss</marquee>
      </div>

    </header>
  );
}

export default Header;