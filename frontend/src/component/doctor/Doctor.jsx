import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import "./Doctor.scss"
import image from "./Default-Profile-Picture-Transparent.png"
import { Context } from '../../common/Context'
import Loader from '../../common/Loader'
const apiUrl = import.meta.env.VITE_API_URL
const Doctor = () => {
  const { signinButton, setChooseDoctor, doctorsData, setDoctorsData } = useContext(Context)
  const navigate = useNavigate()
  const location = useLocation()
  const fetcyhData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/get_doctor_data`)
      if (response.data.doctorsData) {
        setDoctorsData(response.data.doctorsData)
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {

    fetcyhData()
  }, [location.pathname])
  return (
    <div className='doctors-profile-show-component'>

      {doctorsData.length > 0 ? (doctorsData.map((doctor, index) => {
        return <section key={`doctorProfileShow${index}`}>
          <h1>{doctor.name}</h1>
          <img src={image} alt='img' />
          <ul>
            {Array.isArray(doctor.treatment) && doctor.treatment.length > 0 ? (<>
              <p>Treatments: </p>
              {doctor.treatment.map((treat, index) => {
                return <li key={`treatment${index}`}>{treat}{index !== doctor.treatment.length - 1 && ","}</li>
              })}
            </>) : <li>No treatment available</li>}
          </ul>
          <p>Email: {doctor.email}</p>
          <p>Contact: {doctor.contact}</p>
          <button onClick={() => {
            setChooseDoctor({ doctorUsername: doctor.username, doctorName: doctor.name, treatmentAvail: doctor.treatment })
            if (signinButton) {
              navigate('/appointment1')
            } else {
              alert("Login for further process")
              navigate('/signin')

            }
          }}>Book Appointment</button>
        </section>
      })) : <p>No doctors register here...</p>}
    </div>
  )
}

export default Doctor