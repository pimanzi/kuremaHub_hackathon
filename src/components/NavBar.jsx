import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosArrowDown } from 'react-icons/io';
import { CiMenuBurger } from 'react-icons/ci';
import { AiOutlineClose } from 'react-icons/ai';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div
      className={`sticky top-0 z-[9999] transition-all duration-300 ${
        isScrolled ? 'px-0' : 'px-4 md:px-20'
      }`}
    >
      {/* Main navbar */}
      <section
        className={`flex justify-between items-center bg-gray-300/60 py-4 px-4 md:px-8 transition-all duration-300 ${
          isScrolled ? 'w-full rounded-none' : 'rounded-full mt-4'
        }`}
      >
        {/* Logo */}
        <div className="w-40">
          <img src="/images/logoHub.png" alt="Logo" className="w-full h-auto" />
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden flex">
          <CiMenuBurger
            className="text-2xl cursor-pointer"
            onClick={toggleMenu}
          />
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex justify-between items-center gap-10 w-full">
          <ul className="flex gap-10 flex-grow justify-center">
            {['Home', 'About', 'Feature', 'FAQ', 'Contact'].map((item) => (
              <li
                key={item.toLowerCase()}
                className="flex items-center text-black hover:scale-x-110 transition-all duration-150 cursor-pointer font-medium"
                onClick={() => scrollToSection(item.toLowerCase())}
              >
                {item}
              </li>
            ))}
          </ul>

          <div className="flex gap-5 items-center">
            <select className="py-3 cursor-pointer bg-transparent border-none focus:outline-none appearance-none">
              <option value="en">EN</option>
              <option value="kny">KNY</option>
              <option value="fr">FR</option>
              <option value="de">DE</option>
            </select>
            <button
              onClick={() => navigate('/catalogue')}
              className="bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-gray-700 transition-colors font-medium"
            >
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-[10000] transition-transform duration-300">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-bold">Menu</h2>
            <AiOutlineClose
              className="text-2xl cursor-pointer"
              onClick={toggleMenu}
            />
          </div>

          <ul className="flex flex-col items-start p-4">
            {['Home', 'About', 'Arts', 'Contact'].map((item) => (
              <li
                key={item.toLowerCase()}
                className="py-3 hover:bg-gray-100 w-full px-2 rounded-md text-left font-medium cursor-pointer"
                onClick={() => scrollToSection(item.toLowerCase())}
              >
                {item}
              </li>
            ))}
          </ul>

          <div className="flex flex-col items-start p-4 border-t">
            <select className="py-3 cursor-pointer bg-transparent border-none focus:outline-none appearance-none">
              <option value="en">EN</option>
              <option value="kny">KNY</option>
              <option value="fr">FR</option>
              <option value="de">DE</option>
            </select>
            <button
              onClick={() => navigate('/catalogue')}
              className="bg-gray-800 text-white py-2 px-4 rounded-full w-full mt-2"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
