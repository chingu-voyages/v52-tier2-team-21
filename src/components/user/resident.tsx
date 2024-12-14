import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Autocomplete from '../user/Autocomplete';
import Header from "../../container/Header";
import { ToastContainer, toast } from 'react-toastify';
import Select from 'react-select';
import moment from 'moment';

type AddressOption = {
  value: string;
  label: string;
};

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
  const [addressOpt, setAddressOpt] = useState<any>([])
  const [selectedAddress,setSelectedAddress] = useState<string>("")

  useEffect(() => {
    const fetchAddresses = async () => {
      const response = await fetch('https://data.lacity.org/resource/4ca8-mxuh.json');
      const data = await response.json();
      const addresses = data.map((item: any) => ({
        value: item.hse_nbr,
        label: `${item.str_nm} ${item.hse_dir_cd} ${item.str_sfx_cd}, ${item.hse_nbr}`
      }));

      setAddressOpt(
        [...addresses,
          {value:"Other",
          label:"Other"}
        ])
    };

    fetchAddresses();
  }, []);

  const handleSubmit = () => {
    if(formData?.name == ""){
      toast.error("Kindly enter your name")
      return
    }
    if(formData?.email == ""){
      toast.error("Kindly enter your email")
      return
    }
    if(formData?.phone == ""){
      toast.error("Kindly enter your phone number")
      return
    }
    if(formData?.address == ""){
      toast.error("Kindly enter your address")
      return
    }
    if(formData?.timeslot == ""){
      toast.error("Kindly enter your timeSlot")
      return
    }

    const requests = JSON.parse(localStorage.getItem('requests') || '[]');
    requests.push({ ...formData, status });
    localStorage.setItem('requests', JSON.stringify(requests));
    toast.success("Request submitted! Confirmation will be sent soon.")
    navigate('/app/dashboard');
  };

  return (
    <div>
      <ToastContainer />
      <Header />

      <div className="flex flex-col items-center p-8 max-w-full bg-[#81BFDA] min-h-screen">
        <div className="flex p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
          <svg className="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Information</span>
          <div>
            <span className="font-medium">Important Information Regarding Address Entry</span>
            <ul className="mt-1.5 list-disc list-inside">
              <li>The addresses in the dropdown are formatted as follows: (Street Name, Street Direction, Street Suffix, House Number).</li>
              <li>If your address is not listed in the dropdown menu, please select "Other" and provide your address in the specified format.</li>
            </ul>
          </div>
        </div>
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
        <div className='w-full max-w-lg mb-4'>
          <Select
            styles={{
              control: (provided) => ({
                ...provided,
                padding: '8px',
                borderRadius: "8px"
              }),
            }}
            value={addressOpt?.find((item: AddressOption | null) => item?.label == selectedAddress)}
            options={addressOpt}
            onChange={(select: AddressOption | null) => {
              if (select?.label) {
                setSelectedAddress(select?.label)
                if(select?.label !== "Other"){
                  setFormData({ ...formData, address: select?.label })
                }
              }
              else {
                setSelectedAddress("")
                setFormData({ ...formData, address: "" })
              }
            }}
            isClearable={true}
          />
        </div>

        {selectedAddress == "Other" &&
          <input
          type="tel"
          placeholder="Other Address"
          className="w-full max-w-lg p-4 mb-4 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        />}

        <input
          type="text"
          placeholder="Preferred Timeslot"
          className="w-full max-w-lg p-4 mb-4 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={formData.timeslot?.split("-")[1]}
          onChange={(e) => {
            let date = moment()
            setFormData({ ...formData, timeslot: `${date}-${e.target.value}` })
          }}
        />

        <p className="text-sm text-gray-600 mb-6 text-center">
          Preferred timeslot is indicative. Confirmation will be sent.
        </p>

        <button
          onClick={handleSubmit}
          className="w-full max-w-lg mb-4 p-4 bg-gradient-to-tr from-cyan-600 to-cyan-400 text-white rounded-lg shadow-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none"
        >
          Submit
        </button>
        <button
          onClick={() => {
            navigate('/app/dashboard')
          }}
          className="w-full max-w-lg p-4 bg-gradient-to-tr from-cyan-600 to-cyan-400 text-white rounded-lg shadow-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none"
        >
          View Request
        </button>
      </div>
    </div>
  );
};

export default UserPanel;
