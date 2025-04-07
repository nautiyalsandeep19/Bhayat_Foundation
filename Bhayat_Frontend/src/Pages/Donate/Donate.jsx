import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Donate.css';

const Donate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { fundraiser, cause } = location.state || {};

  const donationData = fundraiser || cause;
  const donationId = fundraiser ? fundraiser._id : cause ? cause._id : null;
  const url = import.meta.env.VITE_BACKEND_HOST_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      fullname: e.target.fullname.value,
      mobile: e.target.mobile.value,
      email: e.target.email.value,
      message: e.target.message.value,
      donationId,
      donationType: fundraiser ? 'Fundraiser' : 'Cause',
      amount: 500,
    };

    try {
      const response = await fetch(`${url}/api/donate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate('/Payment', { state: formData });
      } else {
        alert('Failed to submit the donation. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting donation:', error);
      alert('An error occurred while connecting to the server.');
    }
  };

  return (
    <div
    className="flex flex-col md:flex-row w-full px-4 py-6 md:px-8 items-stretch justify-center gap-6 mt-[250px] lg:mt-0 md:mt-0 "
    id="donate_main_div"
  >
    {/* Left Side - Fundraiser or Cause Details */}
    {donationData && (
      <div className="w-full md:w-1/2 bg-white h-fit shadow-md rounded-lg p-4 md:p-6 border border-gray-200 flex flex-col justify-start ">
        <img
          src={`${url}/uploads/${fundraiser ? 'RecentFundPhoto' : 'causePhoto'}/${donationData.image}`}
          alt={donationData.name}
          className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-md mb-4 shadow"
        />
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-2">
          {donationData.name}
        </h2>
        <p className="text-gray-700 mb-3 text-sm sm:text-base leading-relaxed line-clamp-6">
          {donationData.description}
        </p>
        {fundraiser && (
          <>
            <p className="text-sm sm:text-base font-semibold text-red-600">
              ₹{fundraiser.goal.toLocaleString()}
            </p>
            <p className="text-sm sm:text-base font-semibold text-gray-600">
              Days Left: {fundraiser.daysLeft}
            </p>
            <div className="w-full bg-gray-200 rounded-full h-3 mt-3 overflow-hidden">
              <div
                className="bg-green-500 h-full transition-all duration-300"
                style={{ width: `${(fundraiser.raised / fundraiser.goal) * 100}%` }}
              ></div>
            </div>
          </>
        )}
      </div>
    )}
  
    {/* Right Side - Donation Form */}
    <div className="w-full md:w-1/2 flex justify-center h-fit">
      <form
        id="form"
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-4 sm:p-5 md:p-6 shadow-md rounded-lg border border-gray-200"
      >
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-center">
          Your Details
        </h2>
  
        <label htmlFor="fullname" className="block text-gray-700 mb-1">
          Name*
        </label>
        <input
          type="text"
          id="fullname"
          name="fullname"
          placeholder="e.g., Praveen Negi"
          required
          className="w-full p-2 border border-gray-300 rounded mb-3 text-sm sm:text-base"
        />
  
        <label htmlFor="mobile" className="block text-gray-700 mb-1">
          Mobile Number*
        </label>
        <input
          type="tel"
          id="mobile"
          name="mobile"
          pattern="[0-9]{10}"
          placeholder="e.g., 7078*****"
          required
          className="w-full p-2 border border-gray-300 rounded mb-3 text-sm sm:text-base"
        />
  
        <label htmlFor="email" className="block text-gray-700 mb-1">
          Email*
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="e.g., example@gmail.com"
          required
          className="w-full p-2 border border-gray-300 rounded mb-3 text-sm sm:text-base"
        />
  
        <label htmlFor="message" className="block text-gray-700 mb-1">
          Type Message here*
        </label>
        <input
          type="text"
          id="message"
          name="message"
          placeholder="Type Here..."
          required
          className="w-full p-2 border border-gray-300 rounded mb-4 text-sm sm:text-base"
        />
  
        <button
          type="submit"
          className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded transition"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
  
  );
};

export default Donate;
