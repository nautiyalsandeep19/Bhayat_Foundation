import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaFacebook, FaWhatsapp, FaInstagram } from "react-icons/fa";
import { toast } from "react-toastify";

const Support_Fundraise = () => {
  const navigate = useNavigate();
  const [fundraisers, setFundraisers] = useState([]);
  const url = import.meta.env.VITE_BACKEND_HOST_URL;

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

  const handleDonateClick = (fundraiser) => {
    navigate("/Donate", { state: { fundraiser } });
  };

  const handleShare = (platform, shareLink) => {
    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareLink)}`;
        break;
      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareLink)}`;
        break;
      case "instagram":
        navigator.clipboard.writeText(shareLink);
        toast.info("Link copied to clipboard for Instagram.");
        return;
      default:
        return;
    }

    window.open(shareUrl, "_blank");
  };

  return (
    <div className="px-6 py-10">
      <h2 className="text-4xl font-bold text-center mb-6 pb-5">Current Fundraisers :</h2>

      <div className="grid grid-cols-1 m-auto sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full lg:w-[90%] h-fit">
        {fundraisers.length > 0 ? (
          fundraisers.map((fundraiser) => {
            const shareLink = `${window.location.origin}/programs/fundraiser/${fundraiser._id}`;
            return (
              <div
  key={fundraiser._id}
  className="bg-white w-full sm:w-full rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2 group relative"
>

                {/* Image Section */}
                <div className="relative">
                  <img
                    src={`${url}/uploads/RecentFundPhoto/${fundraiser.image}`}
                    alt={fundraiser.name}
                    className="w-full h-[200px] object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-orange-100 text-orange-600 text-xs font-semibold px-2 py-1 rounded-md">
                    Tax Benefits Available
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{fundraiser.name}</h3>
                  <p className="text-gray-600 text-sm mt-2 line-clamp-4">{fundraiser.description}</p>

                  {/* Share Buttons */}
                   <div className="flex justify-center gap-4 mt-4">
                    <button
                      onClick={() => handleShare("facebook", shareLink)}
                      className="text-blue-600 hover:text-blue-800 text-xl bg-gray-200 hover:bg-gray-300"
                      title="Share on Facebook"
                    >
                      <FaFacebook />
                    </button>
                    <button
                      onClick={() => handleShare("whatsapp", shareLink)}
                      className="text-green-500 hover:text-green-700 text-xl bg-gray-200 hover:bg-gray-300"
                      title="Share on WhatsApp"
                    >
                      <FaWhatsapp />
                    </button>
                    <button
                      onClick={() => handleShare("instagram", shareLink)}
                      className="text-pink-500 hover:text-pink-700 text-xl bg-gray-200 hover:bg-gray-300"
                      title="Copy link for Instagram"
                    >
                      <FaInstagram />
                    </button>
                  </div>

                  {/* Fundraiser Info */}
                  <div className="flex justify-between text-sm text-gray-500 mt-3">
                    <p>⏳ {fundraiser.daysLeft} Days Left</p>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-3 ">
                    <div
                      className="bg-gray-500 h-2 rounded-full"
                      style={{ width: `${(fundraiser.raised / fundraiser.goal) * 100}%` }}
                    ></div>
                  </div>

                  {/* Raised Amount */}
                  <p className="text-md font-bold mt-2 ">
                    ₹{fundraiser.goal.toLocaleString()} Goal
                  </p>

                  {/* Donate Button */}
                  <button
                    onClick={() => handleDonateClick(fundraiser)}
                    className="mt-6 bg-gray-500 text-white font-bold py-2 px-6 rounded-md hover:bg-gray-600 transition w-full"
                  >
                    Donate Now
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center col-span-full text-gray-600">No fundraisers available</p>
        )}
      </div>
    </div>
  );
};

export default Support_Fundraise;
