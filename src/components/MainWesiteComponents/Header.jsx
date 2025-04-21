import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import arrow from "../../images/arrow.svg";
import logo from "../../images/rippfarm-white-logo.png";
import menubar from "../../images/menu-bar.svg";
import closeicon from "../../images/close.svg";
import twitter from '../../images/twitter.svg';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const buttonMobileClass = "px-[7px] py-[4px] text-[12px]";

  return (
    <header className="w-full bg-[#0B1F42] text-white fixed top-0 z-50 border-b border-[#bde1ff1f] bg-[#11203d]">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between px-4 py-4 md:py-5">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="h-6 lg:h-8 w-auto" />
        </Link>

        {/* Mobile CTA */}
        <div className="flex items-center space-x-3 md:hidden">
          <a href="#" className="p-[3px] bg-white rounded inline-block">
            <img src={twitter} className="h-3 w-3" alt="twitter" />
          </a>
          <Button text="Start now" link="/user/register" className={`btnPrimary  ${buttonMobileClass}`} />
          <Button text="Log in" link="/user/login" className={`btnSecondary ${buttonMobileClass}`} />
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <img
            src={isMobileMenuOpen ? closeicon : menubar}
            alt="menu"
            className="w-6 h-6"
          />
        </button>

        {/* Navigation */}
        <div
          className={`flex-col md:flex-row md:flex items-start md:items-center md:space-x-[10px] lg:space-x-8 md:static absolute top-full left-0 w-full md:w-auto bg-[#0B1F42] transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'flex px-6 pb-6 pt-4 space-y-4 md:space-y-0' : 'hidden md:flex'
          }`}
        >
          {/* Links */}
          <Link to="/About" className="cursor-pointer">About</Link>
          <Link to="/Product" className="cursor-pointer">Product</Link>
          <Link to="/Unique" className="cursor-pointer">Unique</Link>
          {/* <Link to="/Support" className="cursor-pointer">Support</Link> */}

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="#" className="p-[3px] bg-white rounded inline-block">
              <img src={twitter} className="h-3 w-3" alt="twitter" />
            </a>
            <Button text="Start Now" link="/user/register" className="btnPrimary " />
            <Button text="Log In" link="/user/login" className="btnSecondary" />
          </div>
        </div>
      </div>
      <div className="glow large"></div>
    </header>
  );
};

export default Header;
