import React, { useState } from "react";
import Modal from "react-modal"
import { Url } from "url";

Modal.setAppElement("#root");

interface TeamMember {
    name: string;
    role: string;
    bio: string;
    github:string;
    linkedin: string;
  }
  

  const teamMembers: TeamMember[] = [
    { name: "Tushar ", role: "Product Owner", bio: "Loves managing.",github:"em", linkedin:"https://www.linkedin.com/in/tushar-parihar-39702a1bb?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" },
    { name: "Zarrar Hussain Abed", role: "Web Developer", bio: "Passionate about coding", github:"https://github.com/Zarrarabid", linkedin:"https://www.linkedin.com/in/zarrar-abid" },
    { name: "Parykhan Jameel", role: "Web Developer", bio: "Expert in Frontend development", github:"https://github.com/parykhan-jameel", linkedin:"https://linkedin.com/in/parykhan-jameel" },
    { name: " Zhalgas Miyatbekov.", role: "Web Developer", bio: "Just do it", github:"https://github.com/JakeMa4o", linkedin:"https://linkedin.com/in/parykhan-jameel" },
    { name: "Elizabeth Odhiambo", role: "Web Developer", bio: "Loves creating nice UI", github:"https://github.com/akinyiliz", linkedin:"https://linkedin.com/in/elizabethodhiambo/" },



  ];
  
  const Footer: React.FC = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  
    const openModal = (member: TeamMember) => {
      setSelectedMember(member);
      setModalIsOpen(true);
    };
  
    const closeModal = () => {
      setModalIsOpen(false);
      setSelectedMember(null);
    };
  
    return (
      <footer className="bg-gray-200 text-white py-8 w-full">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4 text-[#1f2937] ">Our Team</h2>
        <ul className="flex justify-center gap-6">
          {teamMembers.map((member) => (
            <li
              key={member.name}
              className="cursor-pointer text-lg text-[#1f2937] hover:text-yellow-400"
              onClick={() => openModal(member)}
            >
              {member.name}
            </li>
          ))}
        </ul>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300"
        className="bg-white rounded-lg shadow-lg w-96 p-6 transform transition-transform duration-300 ease-in-out scale-95"
      >
        {selectedMember && (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              {selectedMember.name}
            </h2>
            <h3 className="text-lg font-semibold text-gray-500 mb-4">
              {selectedMember.role}
            </h3>
            <p className="text-gray-600 mb-6">{selectedMember.bio}</p>
            <div className="mt-4 flex justify-center gap-6">
              <a
                href={selectedMember.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                GitHub
              </a>
              <a
                href={selectedMember.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                LinkedIn
              </a>
            </div>
            <button
              onClick={closeModal}
              className="bg-yellow-500 text-white mt-6 py-2 px-6 rounded hover:bg-yellow-600 focus:outline-none"
            >
              Close
            </button>
          </div>
        )}
      </Modal>
    </footer>
  
    );
  };
  
  export default Footer;
