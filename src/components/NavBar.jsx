import { IoIosArrowDown } from "react-icons/io";

const NavBar = () => {
    return (
        <section className="flex justify-between gap-10 items-center w-5/6 bg-gray-200 mx-auto px-9  py-5 rounded-full mt-10">
            <div className="w-40">
                <img src="../public/images/logoHub.png" alt="logo" className="w-full"/>
            </div>

            <div>
                <ul className="flex gap-10 text-2xl">
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
    )
}

export default NavBar