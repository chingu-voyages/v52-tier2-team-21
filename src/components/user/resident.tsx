import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Autocomplete from '../user/Autocomplete';
import Header from "../../container/Header";

const UserPanel: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    timeslot: '',
  });
  const [status] = useState('pending');
  const navigate = useNavigate();

  const handleSubmit = () => {
    const requests = JSON.parse(localStorage.getItem('requests') || '[]');
    requests.push({ ...formData, status });
    localStorage.setItem('requests', JSON.stringify(requests));
    alert('Request submitted! Confirmation will be sent soon.');
    navigate('/app/dashboard');
  };

  return (
    <div>
     <Header/>
     <div className="flex flex-col items-center p-8 max-w-full bg-[#81BFDA] min-h-screen">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Solar Panel Request</h2>
        
        <input
          type="text"
          placeholder="Name"
          className="w-full max-w-lg p-4 mb-4 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        
        <input
          type="email"
          placeholder="Email"
          className="w-full max-w-lg p-4 mb-4 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        
        <input
          type="tel"
          placeholder="Phone"
          className="w-full max-w-lg p-4 mb-4 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
        
        <Autocomplete
          value={formData.address}
          onChange={(address) => setFormData({ ...formData, address })}
          

        />
        
        <input
          type="text"
          placeholder="Preferred Timeslot"
          className="w-full max-w-lg p-4 mb-4 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={formData.timeslot}
          onChange={(e) => setFormData({ ...formData, timeslot: e.target.value })}
        />
        
        <p className="text-sm text-gray-600 mb-6 text-center">
          Preferred timeslot is indicative. Confirmation will be sent.
        </p>
        
        <button
          onClick={handleSubmit}
          className="w-full max-w-lg p-4 bg-gradient-to-tr from-cyan-600 to-cyan-400 text-white rounded-lg shadow-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default UserPanel;
