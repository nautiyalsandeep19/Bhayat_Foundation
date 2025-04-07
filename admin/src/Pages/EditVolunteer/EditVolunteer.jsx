import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import VolunteerIDCard from "./VolunteerIDCard";
import "./EditVolunteer.css"

const EditVolunteer = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [selectedVolunteerId, setSelectedVolunteerId] = useState(null);
  const [position, setPosition] = useState("");
  const [validity, setValidity] = useState("");
  const [message, setMessage] = useState("");
  const url = import.meta.env.VITE_BACKEND_HOST_URL;
  const [updatedVolunteerIds, setUpdatedVolunteerIds] = useState(
    JSON.parse(localStorage.getItem("updatedVolunteers")) || []
  );
  const [activeVolunteer, setActiveVolunteer] = useState(null);
  const cardRef = useRef();

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await axios.get(`${url}/api/volunteer/all`);
        setVolunteers(response.data);
      } catch (error) {
        console.error("Error fetching volunteers:", error);
      }
    };

    fetchVolunteers();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!selectedVolunteerId) {
      setMessage("Please select a volunteer to update.");
      return;
    }

    try {
      const response = await axios.patch(
        `${url}/api/volunteer/update/${selectedVolunteerId}`,
        { position, validity }
      );

      if (response.status === 200) {
        setMessage("Position and Validity updated successfully!");
        const newUpdatedIds = [...updatedVolunteerIds, selectedVolunteerId];
        setUpdatedVolunteerIds(newUpdatedIds);
        localStorage.setItem("updatedVolunteers", JSON.stringify(newUpdatedIds));
        setPosition("");
        setValidity("");
        setSelectedVolunteerId(null);

        const updatedResponse = await axios.get(`${url}/api/volunteer/all`);
        setVolunteers(updatedResponse.data);
      }
    } catch (error) {
      console.error("Error updating position:", error);
      setMessage("Error updating position.");
    }
  };

  const handleDownload = async (volunteer) => {
    try {
      setActiveVolunteer(volunteer);

      setTimeout(async () => {
        if (!cardRef.current) {
          console.error("Card reference not found!");
          return;
        }

        const canvas = await html2canvas(cardRef.current, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
        });

        const imageData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const imgProps = pdf.getImageProperties(imageData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imageData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${volunteer.name}_ID_Card.pdf`);

        setActiveVolunteer(null);
      }, 500);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen Main_Div ">
      <h1 id="table_heading">Edit Volunteer Positions</h1>

      <div className="overflow-auto">
        <table className="w-full border-collapse border border-gray-600 shadow-md ">
          <thead >
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Position</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {volunteers.map((volunteer) => (
              <tr key={volunteer._id}>
                <td>{volunteer.serialno}</td>
                <td>{volunteer.name}</td>
                <td>{volunteer.email}</td>
                <td>{volunteer.position || "Not Assigned"}</td>
                <td >
                  <button
                    className="bg-yellow-500 text-black px-2 py-1 m-1 rounded"
                    onClick={() => {
                      setSelectedVolunteerId(volunteer._id);
                      setPosition(volunteer.position || "");
                      setValidity(volunteer.validity || "");
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-blue-500 text-white px-2 py-1 m-1 rounded"
                    onClick={() => handleDownload(volunteer)}
                  >
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedVolunteerId && (
        <form onSubmit={handleUpdate} className="mt-4">
          <label className="block text-white">Position:</label>
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            placeholder="Enter Position"
            className="w-full p-2 my-2 border border-gray-600 rounded text-black"
          />

          <label className="block text-white">Validity:</label>
          <input
            type="text"
            value={validity}
            onChange={(e) => setValidity(e.target.value)}
            placeholder="MM-DD-YYYY"
            className="w-full p-2 my-2 border border-gray-600 rounded text-black"
          />

          <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded mt-2">
            Update Position & Validity
          </button>
        </form>
      )}

      {message && <p className="text-green-400 mt-2">{message}</p>}

      {/* Hidden VolunteerIDCard Component for Rendering */}
      {activeVolunteer && (
        <div style={{ position: "fixed", top: "-9999px", left: "-9999px" }}>
          <div ref={cardRef}>
            <VolunteerIDCard
              volunteer={activeVolunteer}
              editNumber={activeVolunteer.serialno}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EditVolunteer