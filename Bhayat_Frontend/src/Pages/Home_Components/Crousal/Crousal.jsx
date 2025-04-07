import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Crousal = () => {
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
  
    return (
        <div>
            <Carousel data-bs-theme="dark" className="w-full min-h-[50vh] md:min-h-[70vh] lg:min-h-[80vh] rounded-lg overflow-hidden shadow-lg">
                {causes.map((cause, index) => (
                    <Carousel.Item key={index} className="relative w-full h-full">
                        <div
                            className="relative w-full min-h-[50vh] md:min-h-[70vh] lg:min-h-[80vh] bg-cover bg-center bg-no-repeat flex items-center"
                            style={{
                                backgroundImage: `url(${url}/uploads/causePhoto/${cause.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat'
                            }}
                        >
                            <div className="absolute bottom-4 md:bottom-8 right-4 md:right-8 w-full md:w-2/3 lg:w-1/3 max-w-md h-auto bg-black bg-opacity-50 text-white p-4 md:p-6 lg:p-8 rounded-lg flex flex-col justify-end">
                                <h5 className="text-xl md:text-2xl lg:text-4xl font-bold mb-2 md:mb-4">{cause.name}</h5>
                                <p className="text-sm md:text-lg lg:text-xl mb-2 md:mb-4 line-clamp-2">{cause.description}</p>
                                <p className="text-md md:text-lg lg:text-xl font-semibold text-gray-300 mb-2 md:mb-4">Goal: ₹ {cause.price}</p>
                                <button
                                    onClick={() => handleDonateClick(cause)}
                                    className="px-4 md:px-6 py-2 md:py-3 bg-red-800 text-white text-md md:text-lg font-semibold rounded hover:bg-red-900"
                                >
                                    Donate Now
                                </button>
                            </div>
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
  
            <marquee 
                className="bg-black text-white mt-1 py-3 text-lg md:text-xl font-bold tracking-wide"
                scrollamount="10" 
                behavior="scroll" 
                direction="left"
            >
                🌟 Bhayat is a nonprofit organization dedicated to uplifting underprivileged communities through education, healthcare, and social welfare initiatives.🌟
            </marquee>
        </div>
    );
}

export default Crousal;