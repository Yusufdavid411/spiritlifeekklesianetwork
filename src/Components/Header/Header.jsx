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

      <p className="vision" id="vision"><span>VISION STATEMENT:</span> A Ministry with a vision to be, and raise men in whom God can entrust his counsel in all sphere of life as ordained and not suffer lost</p>

    </header>
  );
}
 
export default Header;