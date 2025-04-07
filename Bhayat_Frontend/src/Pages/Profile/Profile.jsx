import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import VolunteerIDCard from "../VolunteerIDCard/VolunteerIDCard";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [volunteer, setVolunteer] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const url = import.meta.env.VITE_BACKEND_HOST_URL;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${url}/api/user/profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (res.data.success && res.data.volunteer) {
          setVolunteer(res.data.volunteer);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProfile();
      setTimeout(() => {
        navigate("/"); // Redirect to home after 3 seconds
      }, 50000);
    }
  }, [user, navigate]);

  if (!user)
    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold text-gray-700">
        Please log in to view your profile.
      </div>
    );

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold text-blue-500">
        Loading profile...
      </div>
    );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-lg w-full p-6 bg-white rounded-2xl shadow-lg text-center">
        <h1 className="text-3xl font-bold text-gray-800">Welcome, {user.name} 🎉</h1>
        <p className="mt-2 text-gray-600">
          {volunteer
            ? "You're an amazing volunteer! Here’s your ID Card:"
            : "You are registered as a regular user."}
        </p>

        {volunteer && (
          <div className="mt-4">
            <VolunteerIDCard volunteer={volunteer} />
          </div>
        )}

        <p className="mt-4 text-sm text-gray-500 animate-pulse hidden">
          Redirecting to Home Page...
        </p>
      </div>
    </div>
  );
};

export default Profile;
