import React, { useEffect, useState } from 'react'
import "./Add.css"
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'
const Add = () => {

    const url = import.meta.env.VITE_BACKEND_HOST_URL;
    const [image,setImage]=useState(false);
    const [data,setData]=useState({
        name:"",
        description:"",
        price:"",
        category:"Education"
    })

    const onChangeHandler=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
        setData(data=>({...data,[name]:value}))
    }


    const onSubmitHandler= async (event)=>{
        event.preventDefault();
        const formData = new FormData();
        formData.append("name",data.name)
        formData.append("description",data.description)
        formData.append("price",Number(data.price))
        formData.append("category",data.category)
        formData.append("image",image)

        const response = await axios.post(`${url}/api/Admincause/add`,formData);
        if(response.data.success){
            setData({
                name:"",
                description:"",
                price:"",
                category:"Education"
            })
            toast.success("Cause added successfully! Thank you for your contribution.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });
            setImage(false)
        }
        else{
            toast.error(response.data.message)
        }
    }

  return (
    <>
    
    <div className='add'>
        <form className='flex-col' onSubmit={onSubmitHandler}>
            <div className="add-img-upload flex-col">
                <p>Upload Image</p>
                <label htmlFor="image">
                    <img src={image ? URL.createObjectURL(image):assets.upload_area} alt="" />
                </label>
                <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required />
            </div>
            <div className='add-product-name'>
            <p>Cause Title</p>
            <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here...' />
            </div>
            <div className="add-product-description flex-col">
                <p>Cause Description</p>
                <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write Content Here...' required></textarea>
            </div>
            <div className="add-category-price">
                <div className="add-category flex-col">
                    <p>Cause Category</p>
                    <select onChange={onChangeHandler} value={data.category} name="category">
                        <option value="Education">Education</option>
                        <option value="Hospital">Hospital</option>
                        <option value="Disaster">Disaster</option>
                        <option value="Child Welfare">Child Welfare</option>
                        <option value="Women Welfare">Women Welfare</option>
                    </select>
                </div>
                <div className="add-price flex-col">
                    <p>Cause Donation Amount</p>
                    <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='₹ 20'/>
                </div>
            </div>
            <button type='submit' className='add-btn'>Add</button>
        </form>
    </div>
    </>
  )
}

export default Add 