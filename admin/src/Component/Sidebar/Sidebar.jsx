import React from 'react'
import "./Sidebar.css"
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink to={"/add"} className="sidebar-option">
          <img src={assets.add_icon} alt="" />
          <p>Add Cause</p>
        </NavLink>
        <NavLink to={"/list"} className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>List Cause</p>
        </NavLink>
        <NavLink to={"/GetExcel"} className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>Download ExcelSheet</p>
        </NavLink>
        <NavLink to={"/currentfundraisers"} className="sidebar-option">
          <img src={assets.add_icon} alt="" />
          <p>Add Current Fundraise</p>
        </NavLink>
        <NavLink to={"/EditVolunteer"} className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>Edit Volunteer</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar