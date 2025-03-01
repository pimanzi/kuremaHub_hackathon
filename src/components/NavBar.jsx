import { useState, useEffect } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { CiMenuBurger } from 'react-icons/ci';
import { AiOutlineClose } from 'react-icons/ai'; // Import close icon
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (section) => {
    // Implement scroll logic here
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex justify-center">
      <section
        className={`flex justify-between items-center bg-gray-200 py-4 px-8 z-[9999] fixed transition-all duration-300 ${
          isScrolled ? 'w-[80vw] rounded-full' : 'w-full rounded-none'
        }`}
      >
        <div className="w-40">
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
            <h2 className="text-xl font-bold">Menu</h2>
            <AiOutlineClose className="text-2xl cursor-pointer" onClick={toggleMenu} />
          </div>
          <ul className="flex flex-col items-start p-4">
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

export default NavBar;