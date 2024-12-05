import { useEffect, useState } from "react";
import "./Form.css";

type Inputs = {
  name: string;
  email: string;
  phone: string;
  address: string;
  timeslot: string;
};

// const addresses = [
//   "Virginia1","Virginia2","Virginia3","Virginia4","Virginia5","Virginia6",
// ]


const Form = () => {
  const [addresses, setAddresses] = useState([null]);

  const [inputs, setInputs] = useState<Inputs>({
    name: "",
    email: "",
    phone: "",
    address: "",
    timeslot: "9am",
  });

  const [correctAddress, setCorrectAddress] = useState(false);
  const [showAddressTip, setShowAddressTip] = useState(false);

  useEffect(() => {
    fetch("https://data.lacity.org/api/views/4ca8-mxuh/columns.json")
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error", error));
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      inputs.name !== "" &&
      inputs.email !== "" &&
      inputs.phone !== "" &&
      inputs.address !== "" &&
      inputs.timeslot !== ""
    ) {
      const userKey = `user_${inputs.email}`; // Use the email as a unique key
      const storedData = localStorage.getItem(userKey);
      if (storedData) {
        alert("You have already submitted the form");
      } else {
        localStorage.setItem(userKey, JSON.stringify(inputs));

        // Success alert
        alert(
          `Form submitted successfully for ${inputs.name} and data saved to localStorage!`
        );

        // Clear the form
        setInputs({
          name: "",
          email: "",
          phone: "",
          address: "",
          timeslot: "9am", // Reset to default timeslot
        });
      }
    } else {
      alert("Please fill out all fields before submitting.");
    }
  };

  return (
    <div className="w-80">
      <form
        className="grid [&>*]:block [&>input]:mt-2 [&>input]:mb-4 [&>input]:py-2 [&>input]:px-4"
        method="POST"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={inputs.name}
          placeholder="John"
          onChange={handleInputChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={inputs.email}
          placeholder="John@gmail.com"
          onChange={handleInputChange}
        />
        <label htmlFor="phone">Phone</label>
        <input
          type="phone"
          id="phone"
          name="phone"
          value={inputs.phone} 
          placeholder="+4 445 01 9363"
          onChange={handleInputChange}
        />
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          value={inputs.address}
          placeholder="St.Lius 437"
          onChange={handleInputChange}
        />
        {!correctAddress && showAddressTip && <div>Incorrect address</div>}
        <label htmlFor="timeslot">Timeslot</label>
        <select
          name="timeslot"
          id="timeslot"
          value={inputs.timeslot} // Bind input to state
          onChange={handleInputChange}
        >
          <option value="9am">9AM</option>
          <option value="10am">10AM</option>
          <option value="11am">11AM</option>
          <option value="12am">12AM</option>
          <option value="1pm">1PM</option>
          <option value="2pm">2PM</option>
          <option value="3pm">3PM</option>
          <option value="4pm">4PM</option>
          <option value="5pm">5PM</option>
          <option value="6pm">6PM</option>
        </select>
        <input
          type="submit"
          value="Submit"
          className="border border-black w-24"
        />
      </form>
    </div>
  );
};

export default Form;
