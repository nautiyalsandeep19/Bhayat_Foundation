import React from 'react'
import "./Home.css"
import { useState,useEffect } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import SupportFundraise from '../Support_Fundraise/Support_Fundraise.jsx';
import DonationCategories from '../DonationCategories/DonationCategories.jsx';
import Blog from '../Home_Components/Blog/Blog.jsx';
import JoinUs from '../Home_Components/JoinUs/JoinUs.jsx';
import Contact from '../Home_Components/Contact/Contact.jsx';
import Trusted_platform from '../Home_Components/Trusted_Platform/Trusted_platform.jsx';
import FandQ from '../Home_Components/F&Q/FandQ.jsx'; 
import Explore_Cause from '../Home_Components/Explore_Cause/Explore_Cause.jsx';
import Crousal from '../Home_Components/Crousal/Crousal.jsx';

const Home = () => {
  const navigate = useNavigate();
  // Cause coming from the backend ************* Fetch causes from the backend

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
//((********)) Cause coming from the backend

//crousal navigate 
const handleDonateClick = (cause) => {
  navigate('/Donate', { state: { cause } });
};

  return (
        <>
    <Crousal causes={causes} url={url}/>
    <DonationCategories/>
    <Explore_Cause causes={causes} url={url}/>
    <SupportFundraise causes={causes} url={url}/>
    <Trusted_platform/>
    <Blog/>
    <JoinUs/>
    <Contact/>
    <FandQ/>
     
      
</>
  )
}

export default Home