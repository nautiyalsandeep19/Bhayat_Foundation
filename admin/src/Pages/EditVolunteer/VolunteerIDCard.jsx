import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { assets } from '../../assets/assets';

const VolunteerIDCard = ({ volunteer, editNumber }) => {
  const cardRef = useRef();
  const url = import.meta.env.VITE_BACKEND_HOST_URL;
  if (!volunteer) return <p className="text-center text-red-500">Volunteer data is missing!</p>;

  const { name, serialno, position, state, validity, image } = volunteer;

  // Format Validity Date
  const formattedValidity = validity
    ? new Date(validity).toLocaleDateString("en-GB") // Format: DD/MM/YYYY
    : "Not Set";

  // Print Function
  const handlePrint = useReactToPrint({
    content: () => cardRef.current,
    documentTitle: `${name}_ID_Card`,
  });

  // Download as PDF Function
  const handleDownload = async () => {
    try {
      const canvas = await html2canvas(cardRef.current, { 
        scale: 2,
        useCORS: true,
        allowTaint: true
      });
      const imageData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imageData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${name}_ID_Card.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* ID Card Preview */}
      <div ref={cardRef} className="w-[350px] bg-white border border-gray-300 rounded-xl p-4 text-center shadow-lg">
        <div className="border-b pb-2 mb-2">
          <img src={assets.logo} alt="BHAYAT NGO" className="h-12 mx-auto" />
          <h1 className="text-red-600 font-bold text-xl">BHAYAT NGO</h1>
          <p className="text-blue-600 font-semibold">संस्था रजिस्ट्रेशन क्र.- 68106/2010</p>
          <p className="text-gray-700 font-semibold">रजिस्ट्रेशन क्र.- {serialno || editNumber}</p>
        </div>

        <div className="flex flex-col items-center my-2"> 
          <div className="border-2 border-red-500 rounded-md p-1">
            <img 
              src={image ? `${url}${image}` : assets.placeholderImage} 
              alt="Volunteer" 
              className="h-24 w-20 object-cover rounded-sm"
              crossOrigin="anonymous"
            />
          </div>
          <div className="flex items-center justify-center bg-red-500 text-white font-bold rounded-full mt-1 py-1 px-2">
            ✓ {position || "Not Assigned"}
          </div>
        </div>

        <div className="text-center mt-2">
          <h2 className="font-bold text-lg">{name?.toUpperCase() || "Unknown"}</h2>
          <p className="text-orange-600 font-bold">{position || "Not Assigned"}</p>
          <p className="text-gray-600">{state || "Unknown"}</p>
          
          {/* Validity Section with Proper Styling */}
          <div className="bg-yellow-100 border border-yellow-500 text-yellow-800 px-2 py-1 mt-2 rounded">
            <strong>Validity:</strong> {formattedValidity}
          </div>
        </div>

        <p className="text-xs text-gray-500 mt-4">*Not for official use</p>
      </div>

      {/* Download & Print Buttons */}
      <div className="flex justify-center mt-4 space-x-4">
        <button 
          onClick={handleDownload} 
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow"
        >
          Download
        </button>
        <button 
          onClick={handlePrint} 
          className="bg-green-500 text-white px-4 py-2 rounded-lg shadow"
        >
          Print
        </button>
      </div>
    </div>
  );
};

export default VolunteerIDCard