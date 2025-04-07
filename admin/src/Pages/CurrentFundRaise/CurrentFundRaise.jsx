  import React, { useState } from "react";
  import axios from "axios";
  import { toast } from "react-toastify";
  import "./CurrentFundRaise.css";
  import { assets } from "../../assets/assets";

  const CurrentFundRaise = () => {
    const url = import.meta.env.VITE_BACKEND_HOST_URL;
    const [image, setImage] = useState(null);
    const [fundraiser, setFundraiser] = useState({
      name: "",
      description: "",
      goal: "",
      raised: 0,
      donations: 0,
      daysLeft: "",
    });

    const handleChange = (e) => {
      setFundraiser({ ...fundraiser, [e.target.name]: e.target.value });
    };

    const handleImageUpload = (e) => {
      setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("name", fundraiser.name);
      formData.append("description", fundraiser.description);
      formData.append("goal", Number(fundraiser.goal));
      formData.append("raised", Number(fundraiser.raised));
      formData.append("donations", Number(fundraiser.donations));
      formData.append("daysLeft", Number(fundraiser.daysLeft));
      formData.append("image", image);

      try {
        const response = await axios.post(`${url}/api/currentfundraisers/add`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (response.data.success) {
          setFundraiser({
            name: "",
            description: "",
            goal: "",
            raised: 0,
            donations: 0,
            daysLeft: "",
          });
          setImage(null);
          toast.success("Fundraiser added successfully!");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error(error);
        toast.error("Error adding fundraiser.");
      }
    };

    return (
      <div className="add">
        <form onSubmit={handleSubmit}>
          <div className="add-img-upload flex-col">
            <p>Upload Image</p>
            <label htmlFor="image">
              <img
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                alt="upload-area"
              />
            </label>
            <input
              onChange={handleImageUpload}
              type="file"
              id="image"
              hidden
              required
            />
          </div>

          <div className="add-product-name">
            <label>Current Cause Title</label>
            <input
              type="text"
              name="name"
              placeholder="Type here..."
              value={fundraiser.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="add-product-description">
            <label>Current Cause Description</label><br /><br />
            <textarea
              name="description"
              placeholder="Write Content Here..."
              value={fundraiser.description}
              onChange={handleChange}
              required
              className="description"
            />
          </div>

          <div className="add-category-price">
            <div>
              <label>Current Goal Amount</label>
              <input
                type="number"
                name="goal"
                placeholder="₹ 5000"
                value={fundraiser.goal}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Days Left</label>
              <input
                type="number"
                name="daysLeft"
                placeholder="30"
                value={fundraiser.daysLeft}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="add-btn">Add</button>
        </form>
      </div>
    );
  };

  export default CurrentFundRaise;
