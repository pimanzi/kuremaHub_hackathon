import { FaLinkedinIn, FaInstagram, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => {
    return (
        <section className="bg-primary flex flex-col gap-7 pb-5">
            <div className="flex flex-col md:flex-row gap-10 justify-between px-4 md:px-40 py-10">
                <div className="flex flex-col gap-6">
                    <div className="w-52">
                        <img src="../public/images/logoHub.png" alt="logo" className="w-full" />
                    </div>

                    <div>
                        <h1 className="text-white text-lg">Celebrating art, creativity, and innovation</h1>
                        <h1 className="text-white text-lg">Explore, rate, and own inspiring artwork</h1>
                    </div>

                    <div className="flex items-center gap-6">
                        <FaLinkedinIn className="text-white text-xl" />
                        <FaInstagram className="text-white text-xl" />
                    </div>
                </div>

                <div className="flex flex-col gap-5">
                    <h1 className="text-white text-2xl font-bold">Get In Touch</h1>
                    <div className="flex flex-col gap-5">
                        <div className="flex items-center gap-6">
                            <FaPhoneAlt className="text-white text-xl" />
                            <p className="text-white text-lg">+250 790101642</p>
                        </div>
                        <div className="flex items-center gap-6">
                            <MdEmail className="text-white text-xl" />
                            <p className="text-white text-lg">Kurema Hub Email Address</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Match the <hr /> with the container's padding and width */}
            <hr className="border-t border-white mx-40" />

            <div>
                <p className="text-center text-white">© 2025. ALL RIGHTS RESERVED</p>
            </div>
        </section>
    );
}

export default Footer;