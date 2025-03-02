import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './component/home/Home'
import Navbar from './component/navbar/Navbar'
import Treatment from './component/treatment/Treatment'
import Signin from './pages/signinregister/Signin'
import Register from './pages/signinregister/Register'
import Treatment1 from './pages/treatment1/Treatment1'
import Treatment2 from './pages/treatment2/Treatment2'
import Appointment1 from './pages/appointment1/Appointment1'
import Appointment2 from './pages/appointment2/Appointment2'
import Contact from './component/contact/Contact'
import Billing from './pages/billing/Billing'
import Doctor from './component/doctor/Doctor'
import DoctorProfile from './pages/completeProfile/doctorProfile'
import About from './pages/about/About'
import Billing2 from './component/billing2/Billing2'
const apiUrl = import.meta.env.VITE_API_URL
const App = () => {

  useEffect(async () => {
    fetch(`${apiUrl}/wakeup/ping`)
      .then(res => console.log("Backend Waking Up"))
      .catch(err => console.error("Error waking backend:", err));
  }, [])
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/treatment' element={<Treatment />} />
        <Route path='/about' element={<About />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/register' element={<Register />} />
        <Route path='/treatment1' element={<Treatment1 />} />
        <Route path='/treatment2' element={<Treatment2 />} />
        <Route path='/appointment1' element={<Appointment1 />} />
        <Route path='/appointment2' element={<Appointment2 />} />
        <Route path='/doctor' element={<Doctor />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/billing' element={<Billing />} />
        <Route path='/completeProfile' element={<DoctorProfile />} />
        <Route path='/billing2' element={<Billing2 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App