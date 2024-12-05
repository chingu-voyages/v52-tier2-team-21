import React from 'react';
import logo from './logo.svg';
import './App.css';

// Components
import Appointment from './components/appointment-request/Appointment';

function App() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      {/* <h1 className="text-3xl font-bold text-blue-600">Hello Team Member !</h1> */}
      <Appointment />
    </div>
  );
}

export default App;
