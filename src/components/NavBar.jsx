import { useState, useEffect } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { CiMenuBurger } from 'react-icons/ci';
import { AiOutlineClose } from 'react-icons/ai'; // Import close icon
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
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

  return (
    <div className="flex justify-center">
      <section
        className={`flex justify-between items-center bg-gray-200 py-4 px-8 z-[9999] fixed transition-all duration-300 ${
          isScrolled ? 'w-[80vw] rounded-full ' : 'w-full rounded-none'
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
        <div
          className={
            isScrolled
              ? 'xl:hidden flex items-center'
              : 'lg:hidden flex items-center'
          }
        >
          <CiMenuBurger
            className="text-2xl cursor-pointer"
            onClick={toggleMenu}
          />
        </div>

        {/* Navigation Links and Buttons */}
        <div
          className={
            isScrolled
              ? 'hidden xl:flex justify-between items-center gap-10 text-xl w-full'
              : 'hidden lg:flex justify-between items-center gap-10 text-xl w-full'
          }
        >
          <ul className="flex gap-10 flex-grow justify-center">
            <li
              className="flex items-center text-primary hover:scale-x-110 transition-all duration-150 hover:cursor-pointer"
              onClick={() =>
                document
                  .getElementById('home')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              Home
            </li>
            <li
              className="flex items-center text-primary hover:scale-x-110 transition-all duration-150 hover:cursor-pointer"
              onClick={() =>
                document
                  .getElementById('about')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              About
            </li>
            <li
              className="flex items-center text-primary hover:scale-x-110 transition-all duration-150 hover:cursor-pointer"
              onClick={() =>
                document
                  .getElementById('features')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              Features
            </li>
            <li
              onClick={() =>
                document
                  .getElementById('arts')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
              className="flex items-center text-primary hover:scale-x-110 transition-all duration-150 hover:cursor-pointer"
            >
              Arts
            </li>
            <li
              onClick={() =>
                document
                  .getElementById('faq')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
              className="flex items-center text-primary hover:scale-x-110 transition-all duration-150 hover:cursor-pointer"
            >
              FAQ
            </li>
            <li className="flex items-center text-primary hover:scale-x-110 transition-all duration-150 hover:cursor-pointer">
              Contact
            </li>
          </ul>
          <div className="flex gap-4 items-center">
            <p>EN</p>
            <IoIosArrowDown />
            <button
              onClick={() => {
                navigate('/catalogue');
              }}
              className="bg-primary text-neutral-white px-3  py-2 rounded-full hover:bg-accent transition-colors"
            >
              Get started
            </button>
          </div>
        </div>
      </section>

      {/* Off-canvas Menu */}
      {isMenuOpen && (
        <div className="fixed top-0 right-0 w-64 h-full bg-gray-200 shadow-lg z-[10000] duration-150 transition-transform transform translate-x-0">
          <div className="flex justify-between items-center p-4">
            <h2 className="text-xl font-bold">Menu</h2>
            <AiOutlineClose
              className="text-2xl cursor-pointer"
              onClick={toggleMenu}
            />
          </div>
          <ul className="flex flex-col items-start p-4">
            <li className="py-2 hover:bg-gray-300 w-full text-left text-primary">
              <a href="#about">Home</a>
            </li>
            <li className="py-2 hover:bg-gray-300 w-full text-left text-primary">
              About
            </li>
            <li className="py-2 hover:bg-gray-300 w-full text-left text-primary">
              Arts
            </li>

            <li className="py-2 hover:bg-gray-300 w-full text-left text-primary">
              FAQ
            </li>
            <li className="py-2 hover:bg-gray-300 w-full text-left text-primary">
              Contact
            </li>
          </ul>
          <div className="flex flex-col items-start p-4">
            <p className="py-2">EN</p>
            <IoIosArrowDown className="py-2" />
            <button className="bg-gray-300 py-2 px-4 rounded-full">
              Get Started
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
