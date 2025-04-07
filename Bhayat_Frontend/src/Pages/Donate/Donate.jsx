import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Donate.css';

const Donate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { fundraiser, cause } = location.state || {};

  const donationData = fundraiser || cause;
  const donationId = fundraiser ? fundraiser._id : cause ? cause._id : null;

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
      const response = await fetch('http://localhost:1000/api/donate', {
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
      className="flex flex-col md:flex-row w-full p-4 md:p-8 items-center justify-center gap-8"
      id="donate_main_div"
    >
      {/* Left Side - Fundraiser or Cause Details */}
      {donationData && (
        <div className="w-full md:w-1/2 p-4 bg-white shadow-lg rounded-lg flex flex-col items-start border border-gray-200">
          <img
            src={`http://localhost:1000/uploads/${fundraiser ? 'RecentFundPhoto' : 'causePhoto'}/${donationData.image}`}
            alt={donationData.name}
            className="w-full h-56 md:h-64 object-cover rounded-lg mb-4 shadow-md"
          />
          <h2 className="text-xl md:text-3xl font-bold mb-2 text-gray-800">
            {donationData.name}
          </h2>
          <p className="text-gray-700 mb-2 text-base md:text-lg leading-relaxed line-clamp-6">
            {donationData.description}
          </p>
          {fundraiser && (
            <>
              <p className="text-base md:text-lg font-semibold text-red-600">
                ₹{fundraiser.goal.toLocaleString()}
              </p>
              <p className="text-base md:text-lg font-semibold text-gray-600">
                Days Left: {fundraiser.daysLeft}
              </p>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden mt-3">
                <div
                  className="bg-green-500 h-full"
                  style={{ width: `${(fundraiser.raised / fundraiser.goal) * 100}%` }}
                ></div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Right Side - Donation Form */}
      <div className="w-full md:w-1/2 form-container flex justify-center">
        <form
          id="form"
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-4 md:p-6 shadow-lg rounded-lg border border-gray-200"
        >
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center">
            Your Details
          </h2>

          <label htmlFor="fullname" className="block text-gray-700">
            Name*
          </label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            placeholder="e.g., Praveen Negi"
            required
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />

          <label htmlFor="mobile" className="block text-gray-700">
            Mobile Number*
          </label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            pattern="[0-9]{10}"
            placeholder="e.g., 7078*****"
            required
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />

          <label htmlFor="email" className="block text-gray-700">
            Email*
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="e.g., example@gmail.com"
            required
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />

          <label htmlFor="message" className="block text-gray-700">
            Type Message here*
          </label>
          <input
            type="text"
            id="message"
            name="message"
            placeholder="Type Here..."
            required
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />

          <button
            type="submit"
            className="w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Donate;
