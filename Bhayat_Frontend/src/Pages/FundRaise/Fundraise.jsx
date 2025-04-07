import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Fundraise.css';
import { assets } from '../../myassets.js';

const Fundraise = () => {
  const [step, setStep] = useState(1);
  const [showThankYou, setShowThankYou] = useState(false);
  const url = import.meta.env.VITE_BACKEND_HOST_URL;
  const [formData, setFormData] = useState({
    purpose: '',
    beneficiary: '',
    phone: '',
    fullName: '',
    address: '',
    amount: '',
  });

  const [touched, setTouched] = useState({
    purpose: false,
    beneficiary: false,
    phone: false,
    fullName: false,
    address: false,
    amount: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const isForm1Valid = () => {
    return formData.purpose && formData.beneficiary && formData.phone.length === 10;
  };

  const handleNextClick = () => {
    setTouched({
      purpose: true,
      beneficiary: true,
      phone: true,
    });

    if (isForm1Valid()) setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setTouched({
      fullName: true,
      address: true,
      amount: true,
    });

    if (!formData.fullName || !formData.address || !formData.amount) {
      return;
    }

    try {
      const response = await fetch(`${url}/api/fundraise`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Form submitted successfully');
        setShowThankYou(true);

        // Show popup for 3 seconds and then redirect
        setTimeout(() => {
          setShowThankYou(false);
          navigate('/');
        }, 3000);
      } else {
        alert('Failed to submit data');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <div className="main">
      <div className="container">
        <div className="left-section">
          <img src={assets.fund_raise_banner} alt="" className="donation_img" />
          <h2>Thousands Are Raising Funds Online On Bhayat</h2>
          <h3>You Can Too!</h3>
        </div>
        <div className="right-section">
          <h2>Your Details</h2>

          <div className="stepper">
            <div className="step">
              <div className={`circle ${step >= 1 ? 'active' : ''}`}>1</div>
            </div>
            <div className={`line ${step >= 2 ? 'active' : ''}`} />
            <div className="step">
              <div className={`circle ${step >= 2 ? 'active' : ''}`}>2</div>
            </div>
          </div>

          {step === 1 && !showThankYou && (
  <form>
    <div className="form-group">
      <label htmlFor="purpose">I am raising funds for:</label>
      <input
        type="text"
        name="purpose"
        placeholder="Ex: Health, Education..."
        onChange={handleChange}
        onBlur={handleBlur}
        maxLength={10}
        value={formData.purpose}
        className={`border ${touched.purpose && !formData.purpose ? 'border-red-500' : 'border-gray-300'}`}
      />
      {touched.purpose && !formData.purpose && <p className="text-red-500 text-sm">This field is required</p>}
    </div>

    <div className="form-group">
      <label htmlFor="beneficiary">The raised funds will help:</label>
      <input
        type="text"
        name="beneficiary"
        placeholder="Ex: Myself, Others..."
        onChange={handleChange}
        onBlur={handleBlur}
        maxLength={10}
        value={formData.beneficiary}
        className={`border ${touched.beneficiary && !formData.beneficiary ? 'border-red-500' : 'border-gray-300'}`}
      />
      {touched.beneficiary && !formData.beneficiary && <p className="text-red-500 text-sm">This field is required</p>}
    </div>

    <div className="form-group">
      <label htmlFor="phone">Enter Your Mobile Number:</label>
      <input
        type="tel"
        name="phone"
        placeholder="Enter Your Mobile Number"
        onChange={(e) => {
          const value = e.target.value.replace(/\D/g, ''); // Allow only numbers
          if (value.length <= 10) {
            handleChange({ target: { name: 'phone', value } });
          }
        }}
        onBlur={handleBlur}
        value={formData.phone}
        className={`border ${touched.phone && formData.phone.length !== 10 ? 'border-red-500' : 'border-gray-300'}`}
      />
      {touched.phone && formData.phone.length !== 10 && (
        <p className="text-red-500 text-sm">Enter a valid 10-digit number</p>
      )}
    </div>

    <button 
      type="button" 
      onClick={() => {
        if (!formData.purpose || !formData.beneficiary || formData.phone.length !== 10) {
          alert("Please fill in all fields correctly.");
          return;
        }
        handleNextClick(); // Proceed only if validation passes
      }}
      className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
    >
      Next
    </button>
  </form>
)}


          {step === 2 && !showThankYou && (
            <form onSubmit={handleSubmit}>
              <h2>Additional Information</h2>

              <div className="form-group">
                <label htmlFor="fullName">Enter Your Full Name:</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter Your Full Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={touched.fullName && !formData.fullName ? 'border border-red-500' : ''}
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Enter Your Address:</label>
                <input
                  type="text"
                  name="address"
                  placeholder="Enter Your Address"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={touched.address && !formData.address ? 'border border-red-500' : ''}
                />
              </div>

              <div className="form-group">
                <label htmlFor="amount">Amount You Want to Raise:</label>
                <input
                  type="number"
                  name="amount"
                  placeholder="Enter Amount"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={touched.amount && !formData.amount ? 'border border-red-500' : ''}
                />
              </div>

              <button type="submit">Submit</button>
            </form>
          )}

          {showThankYou && (
            <div className="thank-you-popup">
              <h2>Thank You!</h2>
              <p>Your details have been successfully submitted.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Fundraise;
