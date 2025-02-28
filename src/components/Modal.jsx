import { useState } from "react";

const Modal = () => {
    const [paymentMethod, setPaymentMethod] = useState("MTN");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const paymentOptions = [
        { value: "MTN", label: "MTN Mobile Money", imgSrc: "../public/images/Momo_Pic.jpg" },
        { value: "Airtel", label: "Airtel Money", imgSrc: "../public/images/Airtel_Money.png" },
        { value: "VISA", label: "VISA/Master Card", imgSrc: "../public/images/pay.jpg" },
    ];

    const handleOptionClick = (value) => {
        setPaymentMethod(value);
        setIsDropdownOpen(false);
    };

    return (
        <div className="w-2/6 bg-gray-700 mx-auto px-10 flex flex-col gap-10 py-10 rounded-lg">
            <div className="flex flex-col gap-3">
                <h1 className="text-white text-2xl font-semibold">Pay with</h1>
                <div className="relative">
                    <div
                        className="bg-gray-900 w-96 h-16 rounded-lg flex items-center px-3 cursor-pointer"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <img 
                            src={paymentOptions.find(option => option.value === paymentMethod)?.imgSrc} 
                            alt={paymentMethod} 
                            className="w-6 h-6 rounded-full mr-2" 
                        />
                        <span className="text-white">{paymentOptions.find(option => option.value === paymentMethod)?.label}</span>
                    </div>
                    {isDropdownOpen && (
                        <div className="absolute left-0 right-0 mt-1 bg-gray-900 rounded-lg shadow-lg z-[9999]">
                            {paymentOptions.map(option => (
                                <div
                                    key={option.value}
                                    className="flex items-center p-2 cursor-pointer hover:bg-gray-800"
                                    onClick={() => handleOptionClick(option.value)}
                                >
                                    <img 
                                        src={option.imgSrc} 
                                        alt={option.label} 
                                        className="w-6 h-6 rounded-full mr-2" 
                                    />
                                    <span className="text-white">{option.label}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div>
                <label className="text-white text-2xl font-semibold">Send To</label>
                <span className="block text-gray-300 relative top-7 left-5">Email</span>
                <input
                    placeholder="example@mail.com"
                    className="w-96 h-16 rounded-lg px-5 pt-5 bg-gray-500"
                />
                <span className="block text-gray-300">We will send your ticket to this address</span>
            </div>

            <div>
                <span className="block text-gray-300 relative top-7 left-5">Phone Number</span>
                <input
                    placeholder="250"
                    className="w-96 h-16 rounded-lg px-5 pt-5 bg-gray-500"
                />
            </div>

            <div className="flex justify-between mt-5">
                <button className="text-gray-300 cursor-pointer bg-red-600 px-8 py-2 rounded-lg">Cancel</button>
                <button className="bg-blue-500 text-white px-5 py-2 rounded-lg cursor-pointer">Pay 10,000 RWF</button>
            </div>
        </div>
    );
};

export default Modal;