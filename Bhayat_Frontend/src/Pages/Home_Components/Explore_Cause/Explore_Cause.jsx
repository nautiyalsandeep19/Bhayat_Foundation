import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaFacebook, FaWhatsapp, FaInstagram } from 'react-icons/fa';

const Explore_Cause = () => {
  const navigate = useNavigate();
  const url = import.meta.env.VITE_BACKEND_HOST_URL;
  const [causes, setCauses] = useState([]);

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

  const handleDonateClick = (cause) => {
    navigate('/Donate', { state: { cause } });
  };

  const handleShare = (platform, url) => {
    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`;
        break;
      case 'instagram':
        navigator.clipboard.writeText(url);
        toast.info("Link copied to clipboard for Instagram.");
        return;
      default:
        return;
    }

    window.open(shareUrl, '_blank');
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-50 pb-16">
      {/* Heading */}
      <div className="text-center py-10">
        <h1 className="text-4xl font-bold mb-2 text-gray-800">Explore Our Causes:</h1>
        <p className="text-2xl text-gray-600">Recent Causes</p>
      </div>

      {/* Grid of Causes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl px-4">
        {causes.map((cause, index) => {
          const shareLink = `${window.location.origin}/programs/cause/${cause._id}`;
          return (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg flex flex-col transition-transform duration-300 hover:-translate-y-2"
            >
              {/* Image */}
              <img
                src={`${url}/uploads/causePhoto/${cause.image}`}
                alt={cause.name}
                className="w-full h-56 object-cover rounded-t-lg"
              />

              {/* Content */}
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-center text-gray-800 mb-2">{cause.name}</h3>
                <p className="text-sm text-gray-600 text-center line-clamp-2 flex-grow">
                  {cause.description}
                </p>

                {/* Share Buttons */}
                 <div className="flex justify-center gap-4 mt-4">
                  <button
                    onClick={() => handleShare('facebook', shareLink)}
                    className="text-blue-600 bg-gray-200 hover:bg-gray-300 hover:text-blue-800 text-xl"
                    title="Share on Facebook"
                  >
                    <FaFacebook />
                  </button>
                  <button
                    onClick={() => handleShare('whatsapp', shareLink)}
                    className="text-green-500 bg-gray-200 hover:bg-gray-300 hover:text-green-700 text-xl"
                    title="Share on WhatsApp"
                  >
                    <FaWhatsapp />
                  </button>
                  <button
                    onClick={() => handleShare('instagram', shareLink)}
                    className="text-pink-500 bg-gray-200 hover:bg-gray-300 hover:text-pink-700 text-xl"
                    title="Copy link for Instagram"
                  >
                    <FaInstagram />
                  </button>
                </div>
              </div>

              {/* Button */}
              <div className="p-4">
                <button
                  onClick={() => handleDonateClick(cause)}
                  className="w-full bg-gray-600 hover:bg-gray-800 text-white py-2 rounded-md font-semibold transition"
                >
                  Donate Now
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Marquee */}
      <div className="w-full mt-14">
        <marquee
          className="bg-black text-white py-4 text-lg sm:text-xl font-semibold tracking-wide"
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
    </div>
  );
};

export default Explore_Cause;
