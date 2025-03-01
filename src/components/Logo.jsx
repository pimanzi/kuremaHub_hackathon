// src/components/Logo.jsx
import { Triangle } from "lucide-react";

const Logo = () => {
  return (
    <div className="flex items-center justify-center w-16 h-16 bg-black rounded-xl">
      <Triangle className="w-8 h-8 text-sinc-orange" />
    </div>
  );
};

export default Logo;