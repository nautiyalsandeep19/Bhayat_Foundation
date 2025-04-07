import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaFacebook, FaWhatsapp, FaInstagram } from 'react-icons/fa';


const Programs = () => {
  const navigate = useNavigate();
  const url = import.meta.env.VITE_BACKEND_HOST_URL;
  const [causes, setCauses] = useState([]);
  const [fundraisers, setFundraisers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchCauses = async () => {
      try {
        const response = await axios.get(`${url}/api/Admincause/list`);
        if (response.data.success) {
          setCauses(response.data.data);
        } else {
          toast.error("Failed to fetch causes.");
        }
      } catch (error) {
        toast.error("Error fetching data.");
      }
    };
    fetchCauses();
  }, []);

  useEffect(() => {
    const fetchFundraisers = async () => {
      try {
        const response = await axios.get(`${url}/api/currentfundraisers`);
        if (response.data.success) {
          setFundraisers(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching fundraisers:", error);
      }
    };
    fetchFundraisers();
  }, []);

  const handleDonateClick = (cause, fundraiser) => {
    navigate('/Donate', { state: { cause, fundraiser } });
  };

  const handleShare = (platform, link) => {
    const encodedLink = encodeURIComponent(link);
    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedLink}`;
        break;
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${encodedLink}`;
        break;
      case 'instagram':
        toast.info("Instagram sharing is not supported via browser links.");
        return;
      default:
        return;
    }

    window.open(shareUrl, '_blank');
  };

  const filteredCauses = causes.filter((cause) =>
    cause.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredFundraisers = fundraisers.filter((fundraiser) =>
    fundraiser.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      {/* Search */}
      <input
        type="text"
        placeholder="Search Causes or Fundraisers By Name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full sm:w-[400px] p-3 border border-gray-300 rounded-md shadow-md mb-10"
      />

      {/* Causes Section */}
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8">Explore Our Causes</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-screen-xl mx-auto">
        {filteredCauses.map((cause, index) => (
          <div
            key={index}
            className="bg-white shadow-xl rounded-lg overflow-hidden flex flex-col w-full transform transition duration-300 hover:scale-105"
          >
            <img
              src={`${url}/uploads/causePhoto/${cause.image}`}
              alt={cause.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 text-center mb-2">{cause.name}</h3>
              <p className="text-gray-600 text-center mb-4 line-clamp-2 flex-grow">{cause.description}</p>

              {/* Share Buttons */}
               <div className="flex justify-center gap-4 mb-4">
  <button
    onClick={() => handleShare('facebook', `${window.location.origin}/programs/cause/${cause._id}`)}
    className="text-blue-600 hover:text-blue-800 text-xl bg-gray-200 hover:bg-gray-300"
    title="Share on Facebook"
  >
    <FaFacebook />
  </button>
  <button
    onClick={() => handleShare('whatsapp', `${window.location.origin}/programs/cause/${cause._id}`)}
    className="text-green-500 hover:text-green-700 text-xl bg-gray-200 hover:bg-gray-300"
    title="Share on WhatsApp"
  >
    <FaWhatsapp />
  </button>
  <button
    onClick={() => handleShare('instagram')}
    className="text-pink-500 hover:text-pink-700 text-xl bg-gray-200 hover:bg-gray-300"
    title="Instagram (Copy link manually)"
  >
    <FaInstagram />
  </button>
             </div>


              <button
                onClick={() => handleDonateClick(cause)}
                className="mt-auto px-4 py-2 text-white font-semibold rounded bg-gray-600 hover:bg-gray-800 transition w-full"
              >
                Donate Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Marquee */}
      <div className="w-full my-10">
        <marquee
          className="bg-black text-white py-3 px-4 text-sm sm:text-lg font-semibold tracking-wide"
          scrollamount="8"
          behavior="scroll"
          direction="left"
        >
          ⭐ Eshita Kannjilal just donated ₹30 &nbsp;&nbsp;|&nbsp;&nbsp;
          ⭐ Yuvraj Singh just donated ₹1,100 &nbsp;&nbsp;|&nbsp;&nbsp;
          ⭐ Deep Banerjee just donated ₹500 &nbsp;&nbsp;|&nbsp;&nbsp;
          ⭐ Jahan Ara just donated ₹4,000 &nbsp;&nbsp;|&nbsp;&nbsp;
          ⭐ Isha Gupta just donated ₹500 &nbsp;&nbsp;|&nbsp;&nbsp;
          ⭐ RAJESH KUMAR SAXENA just donated ₹1,000 &nbsp;&nbsp;|&nbsp;&nbsp;
          ⭐ Deepthi Syamanaboina just donated ₹500
        </marquee>
      </div>

      {/* Fundraisers Section */}
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">Current Fundraisers</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-screen-xl mx-auto mb-10">
        {filteredFundraisers.length > 0 ? (
          filteredFundraisers.map((fundraiser) => (
            <div
              key={fundraiser._id}
              className="bg-white rounded-lg shadow-xl overflow-hidden transition-transform duration-300 hover:scale-105"
            >
              <img
                src={`${url}/uploads/RecentFundPhoto/${fundraiser.image}`}
                alt={fundraiser.name}
                className="w-full h-52 sm:h-60 object-cover"
              />
              <div className="p-5 flex flex-col">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 text-center mb-2">{fundraiser.name}</h3>
                <p className="text-gray-600 text-sm text-center line-clamp-2 mb-4">{fundraiser.description}</p>

                {/* Share Buttons */}
                <div className="flex justify-center gap-4 mb-4 ">
                  <button
                    onClick={() => handleShare('facebook', `${window.location.origin}/programs/fundraiser/${fundraiser._id}`)}
                    className="text-blue-600 hover:text-blue-800 bg-gray-200 hover:bg-gray-300"
                    title="Share on Facebook"
                  >
                    <FaFacebook />
                  </button>
                  <button
                    onClick={() => handleShare('whatsapp', `${window.location.origin}/programs/fundraiser/${fundraiser._id}`)}
                    className="text-green-500 hover:text-green-700 bg-gray-200 hover:bg-gray-300"
                    title="Share on WhatsApp"
                  >
                   <FaWhatsapp />
                  </button>
                  <button
                    onClick={() => handleShare('instagram')}
                    className="text-pink-500 hover:text-pink-700 bg-gray-200 hover:bg-gray-300"
                    title="Share on Instagram"
                  >
                    <FaInstagram />
                  </button>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${(fundraiser.raised / fundraiser.goal) * 100}%` }}
                  />
                </div>
                <p className="text-center text-lg font-semibold text-gray-800 mt-3">
                  ₹{fundraiser.goal.toLocaleString()} Goal
                </p>
                <button
                  onClick={() => handleDonateClick(null, fundraiser)}
                  className="w-full mt-4 py-2 bg-gray-600 text-white rounded-md font-bold hover:bg-gray-800 transition"
                >
                  Donate Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600">
            No fundraisers match your search.
          </p>
        )}
      </div>
    </div>
  );
};

export default Programs;
