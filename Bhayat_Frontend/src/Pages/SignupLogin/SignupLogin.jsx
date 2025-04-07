import React, { useState, useContext } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const SignupLogin = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const urlnew = import.meta.env.VITE_BACKEND_HOST_URL;

  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [action, setAction] = useState("Login");
  const [loading, setLoading] = useState(false);

  const toggleAction = () => {
    setAction(action === "Login" ? "Sign Up" : "Login");
    setFormData({ name: "", email: "", password: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url =
        action === "Sign Up"
          ? `${urlnew}/api/user/register`
          : `${urlnew}/api/user/login`;

      const { data } = await axios.post(url, formData);

      if (data.success) {
        localStorage.setItem("token", data.token);
        login(data.token);
        toast.success(`${action} successful! Redirecting...`);

        const wantsToVolunteer =
          localStorage.getItem("wantsToVolunteer") ||
          new URLSearchParams(location.search).get("volunteer");

        setTimeout(() => {
          if (wantsToVolunteer) {
            localStorage.removeItem("wantsToVolunteer");
            navigate("/Volunteer");
          } else {
            navigate("/profile");
          }
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-semibold text-center text-gray-800">{action}</h2>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {action === "Sign Up" && (
            <div>
              <label className="block text-gray-600 font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Enter your name"
              />
            </div>
          )}

          <div>
            <label className="block text-gray-600 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter your password"
            />
          </div>

          {action === "Login" && (
            <div className="text-right">
              <Link to="/forgot-password" className="text-sm text-blue-500 hover:underline">
                Forgot Password?
              </Link>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 mt-4 text-white font-semibold bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-200"
            disabled={loading}
          >
            {loading ? "Processing..." : action}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-700">
          {action === "Login" ? "Don't have an account?" : "Already have an account?"}{" "}
          <button onClick={toggleAction} className="text-blue-500 hover:underline">
            {action === "Login" ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignupLogin;
