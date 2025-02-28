import { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";

const NavBar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

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

    return (
        <div className="flex justify-center">
            <section className={`flex justify-between gap-10 items-center bg-gray-200 py-4 px-8 rounded-full z-[9999] fixed transition-all duration-300 ${isScrolled ? 'w-full' : 'w-3/4'}`}>
                <div className="w-40">
                    <img src="../public/images/logoHub.png" alt="logo" className="w-full" />
                </div>

                <div>
                    <ul className="flex gap-10 text-xl">
                        <li>Home</li>
                        <li>About</li>
                        <li>Arts</li>
                        <li>Contact</li>
                    </ul>
                </div>

                <div className="flex gap-4 items-center">
                    <p>EN</p>
                    <IoIosArrowDown />
                    <button className="bg-gray-300 py-2 px-4 rounded-full">Get Started</button>
                </div>
            </section>
        </div>
    );
}

export default NavBar;