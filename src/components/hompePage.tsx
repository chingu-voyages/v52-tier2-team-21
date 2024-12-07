import React from "react";
import { useNavigate } from 'react-router-dom';
import heroImage from "./assets/rb_6380.png";
import Footer from "../components/footer";
import Header from "./header";


const HomePage: React.FC = () => {
  const navigate = useNavigate()

  const handleNavigation = () => {
    navigate('/register'); 
  };
  return (
    <div className="min-h-screen flex flex-col">
      <Header/>
    <main className="flex-grow">
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#ffffff]">
     <div className="flex-grow flex flex-col items-center">
        <img src={heroImage} alt="Hero" className="w-72 h-auto mb-6" /> 
        <h1 className="text-4xl font-bold text-gray-800 text-center leading-relaxed">
          Transforming sunlight into sustainable energy <br/> for a <span className="text-[#3B82F6]">cleaner tomorrow.</span>
        </h1>
        <button
          onClick={handleNavigation}
          className="mt-6 px-8 py-3 bg-[#10B981] text-white text-lg font-semibold rounded hover:bg-green-600 transition duration-300"
        >
         Get Started
       </button>
       </div>
      <Footer/>
    </div>
    </main>
   
    </div>
    
  );
};

export default HomePage;
