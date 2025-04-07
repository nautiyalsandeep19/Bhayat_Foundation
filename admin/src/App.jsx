import React from 'react'
import Navbar from './Component/Navbar/Navbar'
import Sidebar from './Component/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './Pages/Add/Add'
import List from './Pages/List/List'
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import GetExcel from './Pages/GetExcel/GetExcel'
import CurrentFundRaise from './Pages/CurrentFundRaise/CurrentFundRaise'
import EditVolunteer from './Pages/EditVolunteer/EditVolunteer'
import VolunteerIDCard from './Pages/EditVolunteer/VolunteerIDCard'

const App = () => { 

  const url = import.meta.env.VITE_BACKEND_HOST_URL;
  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr />
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path='/add' element={<Add url={url}/>}/>
          <Route path='/list' element={<List url={url}/>}/>
          <Route path='/remove' element={<List url={url}/>}/>
          <Route path='/GetExcel' element={<GetExcel url={url}/>}/>
          <Route path='/currentfundraisers' element={<CurrentFundRaise />}/>
          <Route path='/EditVolunteer' element={<EditVolunteer />}/>
          <Route path='/VolunteerIDCard' element={<VolunteerIDCard />}/>
        </Routes>
      </div>
    </div>
  )
}

export default App