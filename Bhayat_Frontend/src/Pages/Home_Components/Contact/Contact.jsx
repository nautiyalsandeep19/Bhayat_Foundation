import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const url = import.meta.env.VITE_BACKEND_HOST_URL; // Ensure you have this in your .env file

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${url}/api/contact`, formData);
      if (response.data.success) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error.response?.data);
      toast.error(error.response?.data?.message || "Failed to send message!");
    }
    setLoading(false);
  };

  return (
    <div className="relative bg-black text-white py-16 px-6 lg:px-32 w-[90%] m-auto top-20">
      <ToastContainer position="top-right" autoClose={3000} />
      
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Content Wrapper */}
      <div className="relative flex flex-col lg:flex-row items-start lg:items-center">
        
        {/* Left Section - Contact Form */}
        <div className="flex-1 mb-8 lg:mb-0 flex flex-col items-center lg:items-start">
          <h2 className="text-3xl font-semibold text-center lg:text-left mb-6 text-white">
            Contact Us
          </h2>

          <form className="w-full max-w-lg space-y-4" onSubmit={handleSubmit}>
            {/* Name Input */}
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 bg-transparent border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Email Input */}
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 bg-transparent border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Message Input */}
            <textarea
              name="message"
              className="w-full h-32 bg-transparent border border-gray-500 text-white p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your message..."
              required
              value={formData.message}
              onChange={handleChange}
            ></textarea>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 text-white font-semibold bg-gray-700 rounded-md hover:bg-gray-800 transition-all transform hover:scale-105"
              disabled={loading}
            >
              {loading ? "Sending..." : "SUBMIT"}
            </button>
          </form>
        </div>

        {/* Right Section - Contact Info */}
        <div className="lg:ml-16 border-l border-gray-500 pl-6">
          <p className="text-orange-500 font-semibold mb-2">ADDRESS:</p>
          <p className="text-gray-300">Dehradun, Uttarakhand</p>

          <p className="text-orange-500 font-semibold mt-4 mb-2">EMAIL ADDRESS:</p>
          <p className="text-gray-300">info@bhayatfoundation.org</p>

          <p className="text-orange-500 font-semibold mt-4 mb-2">PHONE NUMBER:</p>
          <p className="text-gray-300">+91 7078117069</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
