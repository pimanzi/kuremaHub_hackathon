import { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { CiMenuBurger } from "react-icons/ci";
import { AiOutlineClose } from "react-icons/ai"; // Import close icon

const NavBar = () => {
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
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="flex justify-center">
            <section className={`flex justify-between items-center bg-gray-200 py-4 px-8 z-[9999] fixed transition-all duration-300 ${isScrolled ? 'w-3/4 rounded-full' : 'w-full rounded-none'}`}>
                <div className="w-40">
                    <img src="../public/images/logoHub.png" alt="logo" className="w-full" />
                </div>

                {/* Hamburger Menu Icon */}
                <div className="md:hidden flex items-center">
                    <CiMenuBurger className="text-2xl cursor-pointer" onClick={toggleMenu} />
                </div>

                {/* Navigation Links and Buttons */}
                <div className="hidden md:flex justify-between items-center gap-10 text-xl w-full">
                    <ul className="flex gap-10 flex-grow justify-center">
                        <li className="flex items-center">Home</li>
                        <li className="flex items-center">About</li>
                        <li className="flex items-center">Arts</li>
                        <li className="flex items-center">Contact</li>
                    </ul>
                    <div className="flex gap-4 items-center">
                        <p>EN</p>
                        <IoIosArrowDown />
                        <button className="bg-gray-300 py-2 px-4 rounded-full">Get Started</button>
                    </div>
                </div>
            </section>

            {/* Off-canvas Menu */}
            {isMenuOpen && (
                <div className="fixed top-0 right-0 w-64 h-full bg-gray-200 shadow-lg z-[10000] transition-transform transform translate-x-0">
                    <div className="flex justify-between items-center p-4">
                        <h2 className="text-xl font-bold">Menu</h2>
                        <AiOutlineClose className="text-2xl cursor-pointer" onClick={toggleMenu} />
                    </div>
                    <ul className="flex flex-col items-start p-4">
                        <li className="py-2 hover:bg-gray-300 w-full text-left">Home</li>
                        <li className="py-2 hover:bg-gray-300 w-full text-left">About</li>
                        <li className="py-2 hover:bg-gray-300 w-full text-left">Arts</li>
                        <li className="py-2 hover:bg-gray-300 w-full text-left">Contact</li>
                    </ul>
                    <div className="flex flex-col items-start p-4">
                        <p className="py-2">EN</p>
                        <IoIosArrowDown className="py-2" />
                        <button className="bg-gray-300 py-2 px-4 rounded-full">Get Started</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default NavBar;