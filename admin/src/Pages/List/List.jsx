import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = () => {
  const url = import.meta.env.VITE_BACKEND_HOST_URL;
  const [list, setList] = useState([]);

  // Fetch the list when the component mounts
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/Admincause/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching list");
      }
    } catch (error) {
      toast.error("Server Error");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  // Function to remove food item
  const removeFood = async (id) => {
    try {
      const response = await axios.delete(`${url}/api/Admincause/remove/${id}`);
      console.log("Delete Response:", response.data); // Debugging
      if (response.data.success) {
        toast.success("Cause removed successfully!");
        setList(list.filter((item) => item._id !== id)); // Update state
      } else {
        toast.error("Failed to remove Cause");
      }
    } catch (error) {
      toast.error("Error removing food");
      console.error("Delete Error:", error); // Debugging
    }
  };
  

  return (
    <div className="list add flex-col">
      <p>All Causes List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b></b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className="list-table-format">
            <img
            src={`${url}/uploads/causePhoto/${item.image}`}
            alt={item.name}
           className="w-full h-64 object-cover rounded-lg mb-4 shadow-md"
           />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>₹{item.price}</p>
            <p onClick={() => removeFood(item._id)} className="cursor">
              X
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
