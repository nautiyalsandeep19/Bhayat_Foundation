import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Volunteer = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [panCard, setPanCard] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    panCard: "",
    state: "",
    address: "",
    image: ""
  });

  const navigate = useNavigate();

  // 🔥 Get logged-in user data from AuthContext
  const { user } = useContext(AuthContext);

  // 🔥 Auto-fill email if user is logged in
  useEffect(() => {
    if (user && user.email) {
      setEmail(user.email);
    }
  }, [user]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
  
    if (file) {
      if (file.size > 1024 * 1024) { // 1MB limit
        setFieldErrors({...fieldErrors, image: "File size is too large. Maximum allowed size is 1MB."});
        setSelectedFile(null);
      } else {
        setFieldErrors({...fieldErrors, image: ""});
        setSelectedFile(file);
      }
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {...fieldErrors};

    // Validate each field
    if (!name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    } else {
      newErrors.name = "";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    } else {
      newErrors.email = "";
    }

    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else {
      newErrors.password = "";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else {
      newErrors.confirmPassword = "";
    }

    if (!panCard.trim()) {
      newErrors.panCard = "PAN Card number is required";
      isValid = false;
    } else {
      newErrors.panCard = "";
    }

    if (!state) {
      newErrors.state = "Please select a state";
      isValid = false;
    } else {
      newErrors.state = "";
    }

    if (!address.trim()) {
      newErrors.address = "Address is required";
      isValid = false;
    } else {
      newErrors.address = "";
    }

    if (!selectedFile) {
      newErrors.image = "Please upload an image";
      isValid = false;
    } else {
      newErrors.image = "";
    }

    setFieldErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // First validate all required fields
    if (!validateForm()) {
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
    if (!passwordRegex.test(password)) {
      setError("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.");
      return;
    }
  
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
  
    setError("");
  
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("panCard", panCard);
    formData.append("state", state);
    formData.append("address", address);
    formData.append("image", selectedFile);
  
    try {
      const response = await axios.post("http://localhost:1000/api/volunteer/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      if (response.status === 201) {
        const { serialNo } = response.data;
        setShowPopup(true);
        // Hide popup and navigate after 4 seconds
        setTimeout(() => {
          setShowPopup(false);
          navigate("/"); // Navigate to home page
        }, 4000);
      } else {
        setMessage("Form submission failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Form submission failed. Please try again.");
    }
  };

  return (
    <>
      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
            <p className="text-lg font-semibold text-center bg-green-600">
              Thank you! Your details have been submitted. Your ID Card will be generated after a few days.
            </p>
          </div>
        </div>
      )}

      <section className="max-w-3xl p-6 mx-auto my-20 rounded-md shadow-md dark:bg-gray-500 mt-20">
        <h1 className="text-xl font-bold text-black capitalize dark:text-black">Volunteer Details</h1>
 
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {message && <p className="text-green-500 mt-2">{message}</p>}

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-black">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-500 focus:outline-none"
              />
              {fieldErrors.name && <p className="text-red-500 text-sm mt-1">{fieldErrors.name}</p>}
            </div>

            <div>
              <label className="text-black">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-500 focus:outline-none"
                readOnly={!!user?.email} 
              />
              {fieldErrors.email && <p className="text-red-500 text-sm mt-1">{fieldErrors.email}</p>}
            </div>

            <div>
              <label className="text-black">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-500 focus:outline-none"
              />
              {fieldErrors.password && <p className="text-red-500 text-sm mt-1">{fieldErrors.password}</p>}
            </div>

            <div>
              <label className="text-black">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-500 focus:outline-none"
              />
              {fieldErrors.confirmPassword && <p className="text-red-500 text-sm mt-1">{fieldErrors.confirmPassword}</p>}
            </div>

            <div>
              <label className="text-black">Pan Number</label>
              <input
                type="text"
                value={panCard}
                onChange={(e) => setPanCard(e.target.value)}
                className="block w-full px-4 py-2 mt-2 bg-white border rounded-md"
              />
              {fieldErrors.panCard && <p className="text-red-500 text-sm mt-1">{fieldErrors.panCard}</p>}
            </div>

            <div>
              <label className="text-black">State</label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-500 focus:outline-none"
              >
                <option value="">Select State</option>
                <option value="Delhi">Delhi</option>
                <option value="Uttarakhand">Uttarakhand</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Punjab">Punjab</option>
                <option value="Bihar">Bihar</option>
                <option value="Haryana">Haryana</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="West Bengal">West Bengal</option>
                <option value="Kerala">Kerala</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
              </select>
              {fieldErrors.state && <p className="text-red-500 text-sm mt-1">{fieldErrors.state}</p>}
            </div>

            <div>
              <label className="text-black">Address</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-500 focus:outline-none"
              />
              {fieldErrors.address && <p className="text-red-500 text-sm mt-1">{fieldErrors.address}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-white">Image</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="text-black mt-2"
              />
              {fieldErrors.image && <p className="text-red-500 text-sm mt-1">{fieldErrors.image}</p>}
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-6 py-2 text-white bg-black rounded-md focus:outline-none"
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Volunteer;