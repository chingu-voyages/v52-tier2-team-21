import React, { useState, useEffect } from "react";
import axios from "axios";

interface AutocompleteProps {
  value: string;
  onChange: (value: string) => void;
}

const Autocomplete: React.FC<AutocompleteProps> = ({ value, onChange }) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [addressList, setAddressList] = useState<string[]>([]);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(
          "https://data.lacity.org/api/views/4ca8-mxuh/columns.json"
        );

        const data = response.data;
        console.log("API Response:", data);

        const addressField = data.find(
          (field: any) =>
            field.name.toLowerCase().includes("address") || 
            field.description?.toLowerCase().includes("address")
        );

        if (addressField) {
          const addresses =
            addressField.cachedContents?.top.map((item: any) => item.item) || [];
          console.log("Fetched Addresses:", addresses); 
          setAddressList(addresses);
        } else {
          console.error("Address field not found in the dataset");
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddresses();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    onChange(query);

    if (query) {
      const filteredSuggestions = addressList.filter((addr) =>
        addr?.toLowerCase().includes(query.toLowerCase())
      );
      console.log("Filtered Suggestions:", filteredSuggestions); 
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion);
    setSuggestions([]);
  };

  return (
    <div className="relative w-full max-w-lg">
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder="Enter your address"
        className="w-full max-w-lg p-4 mb-4 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />

      {suggestions.length > 0 && (
        <ul className="absolute bg-white border border-gray-300 mt-1 rounded-lg max-h-40 overflow-y-auto shadow-lg z-10 w-full">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="p-2 cursor-pointer hover:bg-blue-100 hover:text-blue-800"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
