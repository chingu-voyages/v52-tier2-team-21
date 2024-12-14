import React, { useEffect, useState } from 'react';
import Header from "../../container/Header";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState<any[]>([]);
  useEffect(() => {
    const savedRequests = JSON.parse(localStorage.getItem('requests') || '[]');
    setRequests(savedRequests);
  }, []);

  const handleCancelRequest = (index: number) => {
    const updatedRequests = requests.filter((_, i) => i !== index); 
    setRequests(updatedRequests);
    localStorage.setItem("requests", JSON.stringify(updatedRequests)); 
    toast.success("Appointment request canceled!")
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center p-8 max-w-full bg-[#81BFDA] min-h-screen">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Dashboard</h2>
        
        <p className="text-lg mb-4">You have submitted <strong>{requests.length}</strong> requests.</p>
        
        <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-4">
        {requests.length > 0 ? (
        requests.map((request, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 mb-4 flex justify-between items-center"
          >
            <div>
              <p><strong>Name:</strong> {request.name}</p>
              <p><strong>Email:</strong> {request.email}</p>
              <p><strong>Address:</strong> {request.address}</p>
              <p><strong>Timeslot:</strong> {
                request.timeslot?.split("-")?.length == 2 ?
              `${moment(request.timeslot?.split("-")[0])?.format("YYYY-MM-DD")} - ${request?.timeslot?.split("-")[1]}` :
              request.timeslot?.toUpperCase()
              }</p>
              <p><strong>Status:</strong> {request.status}</p>
            </div>
            <button
              onClick={() => handleCancelRequest(index)}
              className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No appointment requests available.</p>
      )}
      <button
          onClick={() => {
            navigate('/app/resident')
          }}
          className="w-full max-w-lg p-4 bg-gradient-to-tr from-cyan-600 to-cyan-400 text-white rounded-lg shadow-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none"
        >
          Add Request
        </button>
        </div>
        
      </div>
    </div>
  );
};

export default Dashboard;
