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
        </div>
    );
}

export default NavBar;