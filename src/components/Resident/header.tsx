import React from "react";
import logo from "../assets/Logo.png";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate()

  const handleNavigation = () => {
    navigate('/app/resident'); 
  };
  return (
    <header className="bg-[#81BFDA] bg-opacity-20 shadow-md backdrop-filter backdrop-blur-lg" >
      <div className="container mx-auto flex justify-between items-center px-4 "
          //  style={{
          //   boxShadow: "0 4px 6px 4px rgba(0, 0, 0, 0.1)",
          // }}
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
