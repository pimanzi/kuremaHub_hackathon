import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowDown } from 'react-icons/io';
import { CiMenuBurger } from 'react-icons/ci';
import { AiOutlineClose } from 'react-icons/ai';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

<<<<<<< HEAD
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);
  };

=======
  // Handle scroll event to change navbar style
>>>>>>> 841b9404b5ffbe663bee1c811e8203b5acf4c7c2
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

<<<<<<< HEAD
  const scrollToSection = (section) => {
    // Implement scroll logic here
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
=======
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
>>>>>>> 841b9404b5ffbe663bee1c811e8203b5acf4c7c2
  };

  return (
    <div
      className={`sticky top-0 z-[9999] transition-all duration-300 ${
        isScrolled ? 'px-0' : 'px-4 md:px-20'
      }`}
    >
      {/* Main navbar */}
      <section
<<<<<<< HEAD
        className={`flex justify-between items-center bg-gray-200 py-4 px-8 z-[9999] fixed transition-all duration-300 ${
          isScrolled ? 'w-[80vw] rounded-full' : 'w-full rounded-none'
=======
        className={`flex justify-between items-center bg-gray-300/60 py-4 px-4 md:px-8 transition-all duration-300 ${
          isScrolled ? 'w-full rounded-none ' : 'rounded-full mt-4'
>>>>>>> 841b9404b5ffbe663bee1c811e8203b5acf4c7c2
        }`}
      >
        {/* Logo */}
        <div className="w-40">
<<<<<<< HEAD
          <img
            src="../public/images/logoHub.png"
            alt="logo"
            className="w-full"
          />
        </div>

        {/* Hamburger Menu Icon */}
        <div className="md:hidden flex items-center">
          <CiMenuBurger className="text-2xl cursor-pointer" onClick={toggleMenu} />
        </div>

        {/* Off-canvas Menu */}
        <div className={`fixed top-0 right-0 w-64 h-full bg-gray-200 shadow-lg z-[10000] transition-transform duration-300 ease-in-out transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex justify-between items-center p-4">
=======
          <div className="flex items-center gap-2">
            <img
              src="../public/images/logoHub.png"
              alt="pen"
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Mobile menu button */}
        <div className={isScrolled ? 'xl:hidden flex' : 'lg:hidden flex'}>
          <CiMenuBurger
            className="text-2xl cursor-pointer"
            onClick={toggleMenu}
          />
        </div>

        {/* Desktop navigation */}
        <div
          className={
            isScrolled
              ? 'hidden xl:flex justify-between items-center gap-10 w-full'
              : 'hidden lg:flex justify-between items-center gap-10 w-full'
          }
        >
          <ul className="flex gap-10 flex-grow justify-center">
            {['Home', 'About', 'Arts', 'Feature', 'FAQ', 'Contact'].map(
              (item) => (
                <li
                  key={item.toLowerCase()}
                  className="flex items-center text-black hover:scale-x-110 transition-all duration-150 cursor-pointer font-medium"
                  onClick={() => scrollToSection(item.toLowerCase())}
                >
                  {item}
                </li>
              )
            )}
          </ul>

          <div className="flex gap-5 items-center">
            <select className="flex items-center py-3 cursor-pointer bg-transparent border-none font-inherit focus:outline-none appearance-none">
              <option value="en">EN</option>
              <option value="es">KNY</option>
              <option value="fr">FR</option>
              <option value="de">DE</option>
            </select>
            <Link to="/catalogue">
              <button className="bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-gray-700 transition-colors font-medium">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-[10000] transition-transform duration-300">
          <div className="flex justify-between items-center p-4 border-b">
>>>>>>> 841b9404b5ffbe663bee1c811e8203b5acf4c7c2
            <h2 className="text-xl font-bold">Menu</h2>
            <AiOutlineClose className="text-2xl cursor-pointer" onClick={toggleMenu} />
          </div>

          <ul className="flex flex-col items-start p-4">
<<<<<<< HEAD
            <li className="py-2 hover:bg-gray-300 w-full text-left pl-5">
              <a href="#home" onClick={() => scrollToSection('home')}>Home</a>
            </li>
            <li className="py-2 hover:bg-gray-300 w-full text-left pl-5">
              <a href="#about" onClick={() => scrollToSection('about')}>About</a>
            </li>
            <li className="py-2 hover:bg-gray-300 w-full text-left pl-5">
              <a href="#features" onClick={() => scrollToSection('features')}>Features</a>
            </li>
            <li className="py-2 hover:bg-gray-300 w-full text-left pl-5">
              <a href="#arts" onClick={() => scrollToSection('arts')}>Arts</a>
            </li>
            <li className="py-2 hover:bg-gray-300 w-full text-left pl-5">
              <a href="#faq" onClick={() => scrollToSection('faq')}>FAQ</a>
            </li>
            <li className="py-2 hover:bg-gray-300 w-full text-left pl-5">
              <a href="#contact" onClick={() => scrollToSection('contact')}>Contact</a>
            </li>
          </ul>
          <div className="flex flex-col items-start p-4">
            <p className="py-2">EN</p>
            <IoIosArrowDown className="py-2" />
            <button
              onClick={() => navigate('/catalogue')}
              className="bg-gray-300 py-2 px-4 rounded-full"
            >
              Get Started
            </button>
=======
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
            <select className="flex items-center py-3 cursor-pointer bg-transparent border-none font-inherit focus:outline-none appearance-none">
              <option value="en">EN</option>
              <option value="es">KNY</option>
              <option value="fr">FR</option>
              <option value="de">DE</option>
            </select>
            <Link to="/catalogue" className="w-full">
              <button className="bg-gray-800 text-white py-2 px-4 rounded-full w-full mt-2">
                Get Started
              </button>
            </Link>
>>>>>>> 841b9404b5ffbe663bee1c811e8203b5acf4c7c2
          </div>
        </div>

        {/* Navigation Links and Buttons */}
        <div className="hidden md:flex justify-between items-center gap-10 text-xl w-full">
          <ul className="flex gap-10 flex-grow justify-center">
            <li className="flex items-center">
              <a href="#home" className="hover:border-b border-black px-5" onClick={() => scrollToSection('home')}>Home</a>
            </li>
            <li className="flex items-center">
              <a href="#about" className="hover:border-b border-black px-5" onClick={() => scrollToSection('about')}>About</a>
            </li>
            <li className="flex items-center">
              <a href="#arts" className="hover:border-b border-black px-5" onClick={() => scrollToSection('arts')}>Arts</a>
            </li>
            <li className="flex items-center">
              <a href="#contact" className="hover:border-b border-black px-5" onClick={() => scrollToSection('contact')}>Contact</a>
            </li>
          </ul>
          <div className="flex gap-4 items-center">
            <p>EN</p>
            <IoIosArrowDown />
            <button
              onClick={() => navigate('/catalogue')}
              className="bg-gray-300 py-2 px-4 rounded-full"
            >
              Get Started
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

<<<<<<< HEAD
export default NavBar;
=======
export default Navbar;
>>>>>>> 841b9404b5ffbe663bee1c811e8203b5acf4c7c2
