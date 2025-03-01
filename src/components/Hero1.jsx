// src/components/Hero1.jsx
import React from 'react';

const HeroSection = () => {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center text-white p-8 overflow-hidden">
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/90 z-10"></div>
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80')] 
        bg-cover bg-center"
      ></div>

      {/* Content */}
      <div className="relative z-20 max-w-lg text-center">
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-bold mb-6">
            <span className="text-sinc-orange font-extrabold">Sinc</span>
            <div className="w-12 h-[3px] bg-sinc-orange mx-auto my-2"></div>
          </h2>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            The easiest way to manage your events.
          </h1>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;