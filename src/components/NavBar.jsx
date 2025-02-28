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

<<<<<<< HEAD
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
=======
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="flex justify-center">
            <section className={`flex justify-between items-center bg-gray-200 py-4 px-8 z-[9999] fixed transition-all duration-300 ${isScrolled ? 'w-full rounded-none' : 'w-3/4 rounded-full'}`}>
                <div className="w-40">
                    <img src="../public/images/logoHub.png" alt="logo" className="w-full" />
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
                            <a href="#" className="">Home</a>
                        </li>
                        <li className="py-2 hover:bg-gray-300 w-full text-left pl-5">
                            <a href="#" className="">About</a>
                        </li>
                        <li className="py-2 hover:bg-gray-300 w-full text-left pl-5">
                            <a href="#" className="">Arts</a>
                        </li>
                        <li className="py-2 hover:bg-gray-300 w-full text-left pl-5">
                            <a href="#" className="">Contact</a>
                        </li>
                    </ul>
                    <div className="flex flex-col items-start p-4">
                        <p className="py-2">EN</p>
                        <IoIosArrowDown className="py-2" />
                        <button className="bg-gray-300 py-2 px-4 rounded-full">Get Started</button>
                    </div>
                </div>

                {/* Navigation Links and Buttons */}
                <div className="hidden md:flex justify-between items-center gap-10 text-xl w-full">
                    <ul className="flex gap-10 flex-grow justify-center">
                        <li className="flex items-center">
                            <a href="#" className="hover:border-b border-black px-5">Home</a>
                        </li>
                        <li className="flex items-center">
                            <a href="#" className="hover:border-b border-black px-5">About</a>
                        </li>
                        <li className="flex items-center">
                            <a href="#" className="hover:border-b border-black px-5">Arts</a>
                        </li>
                        <li className="flex items-center">
                            <a href="#" className="hover:border-b border-black px-5">Contact</a>
                        </li>
                    </ul>
                    <div className="flex gap-4 items-center">
                        <p>EN</p>
                        <IoIosArrowDown />
                        <button className="bg-gray-300 py-2 px-4 rounded-full">Get Started</button>
                    </div>
                </div>
            </section>
>>>>>>> b775dd246f94abefe8a2711c934647a3fb22146a
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
              onClick={() => scrollToSection('home')}
            >
              Home
            </li>
            <li
              className="flex items-center text-primary hover:scale-x-110 transition-all duration-150 hover:cursor-pointer"
              onClick={() => scrollToSection('about')}
            >
              About
            </li>
            <li
              className="flex items-center text-primary hover:scale-x-110 transition-all duration-150 hover:cursor-pointer"
              onClick={() => scrollToSection('features')}
            >
              Features
            </li>
            <li
              className="flex items-center text-primary hover:scale-x-110 transition-all duration-150 hover:cursor-pointer"
              onClick={() => scrollToSection('arts')}
            >
              Arts
            </li>
            <li
              className="flex items-center text-primary hover:scale-x-110 transition-all duration-150 hover:cursor-pointer"
              onClick={() => scrollToSection('faq')}
            >
              FAQ
            </li>
            <li
              className="flex items-center text-primary hover:scale-x-110 transition-all duration-150 hover:cursor-pointer"
              onClick={() => scrollToSection('contact')}
            >
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
              <a href="#home">Home</a>
            </li>
            <li className="py-2 hover:bg-gray-300 w-full text-left text-primary">
              <a href="#about">About</a>
            </li>
            <li className="py-2 hover:bg-gray-300 w-full text-left text-primary">
              <a href="#features">Features</a>
            </li>
            <li className="py-2 hover:bg-gray-300 w-full text-left text-primary">
              <a href="#arts">Arts</a>
            </li>
            <li className="py-2 hover:bg-gray-300 w-full text-left text-primary">
              <a href="#faq">FAQ</a>
            </li>
            <li className="py-2 hover:bg-gray-300 w-full text-left text-primary">
              <a href="#contact">Contact</a>
            </li>
          </ul>
          <div className="flex flex-col items-start p-4">
            <p className="py-2">EN</p>
            <IoIosArrowDown className="py-2" />
            <button
              onClick={() => navigate('/catalogue')}
              className="bg-primary text-neutral-white py-2 px-4 rounded-full"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
