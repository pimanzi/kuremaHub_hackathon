// src/components/Index.jsx
import HeroSection from "@/components/Hero1"; // Correct import for HeroSection
import Logo from "@/components/Logo"; // Assuming Logo is defined in Login.jsx

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Left Side - Hero Section */}
      <div className="w-full md:w-1/2 min-h-[40vh] md:min-h-screen">
        <HeroSection />
      </div>
      
      {/* Right Side - Login Form */}
      <div className="w-full md:w-1/2 min-h-[60vh] md:min-h-screen bg-black flex items-center justify-center p-6">
        <Logo/>
      </div>
    </div>
  );
};

export default Index;