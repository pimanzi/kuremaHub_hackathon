import { FiUser } from "react-icons/fi";
import { CiLock } from "react-icons/ci";
import { useState } from "react";

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="min-h-screen flex flex-col md:flex-row overflow-hidden">
            {/* Left Side - Hero Section */}
            <div className="relative w-full md:w-1/2 flex flex-col items-center justify-center text-white p-8 overflow-hidden">
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/90 z-10"></div>
                
                {/* Background Image */}
                <div 
                    className="absolute inset-0 bg-[url('/images/Eric.jpg')] 
                    bg-cover bg-center bg-no-repeat"
                ></div>

                {/* Content */}
                <div className="relative z-20 max-w-lg text-center">
                    <h2 className="text-3xl font-bold mb-6">
                        <div className="w-12 h-[3px] bg-sinc-orange mx-auto my-2"></div>
                    </h2>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        The easiest way to manage your events.
                    </h1>
                </div>
            </div>

            {/* Right Side - Registration Form */}
            <div className="w-full md:w-1/2 min-h-screen bg-white flex items-center justify-center p-6">
                <div className="bg-gray-300/50 p-8 rounded-lg shadow-lg w-full max-w-md flex flex-col gap-5">
                    {/* Logo at the top center */}
                    <div className="flex justify-center mb-4">
                        <img src="/images/logoHub.png" alt="Logo" className="w-32" />
                    </div>
                    <h2 className="text-2xl font-bold text-black mb-4">Sign Up</h2>
                    <p className="text-black mb-6">Enter your credentials below!</p>

                    <div>
                        <input
                            type="text"
                            placeholder="First Name"
                            className="pl-10 py-2 rounded-lg w-full bg-gray-300 text-black"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="Last Name"
                            className="pl-10 py-2 rounded-lg w-full bg-gray-300 text-black"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>

                    <div className="relative">
                        <FiUser className="absolute ml-2 mt-2 text-black" />
                        <input
                            type="text"
                            placeholder="Email or username"
                            className="pl-10 py-2 rounded-lg w-full bg-gray-300 text-black"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="relative mb-4">
                        <CiLock className="absolute ml-2 mt-2 text-black" />
                        <input
                            type="password"
                            placeholder="Password"
                            className="pl-10 py-2 rounded-lg w-full bg-gray-300 text-black"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        className="w-full py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-500 transition duration-200"
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Register;