import React from "react";
import logo from "../components/assets/logo_Sample_2.png";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate()

  const handleNavigation = () => {
    navigate('/register'); 
  };
  return (
    <header className="bg-[#ffffff] text-[#1f2937] py-4 shadow-lg" >
      <div className="container mx-auto flex justify-between items-center px-4 shadow-lg"
           style={{
            boxShadow: "0 4px 6px 4px rgba(0, 0, 0, 0.1)",
          }}
      >
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <img
            src={logo}
            alt="Logo"
            className="h-20 w-20"
          />
        </div>

        {/* Get Started Button */}
        <div>
          <button className="bg-yellow-400 text-white font-semibold py-2 px-4 rounded-md hover:bg-yellow-500 transition duration-300"
           onClick={handleNavigation}
          >
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
