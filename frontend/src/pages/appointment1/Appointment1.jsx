import React, { useContext, useEffect, useState } from 'react'
import './Appointment1.scss'
import image from './4710.jpg_wh1200.jpg'
import { Context } from '../../common/Context'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import DeleteIcon from '@mui/icons-material/Delete';
import Loader from '../../common/Loader'
const apiUrl = import.meta.env.VITE_API_URL
const Appointment1 = () => {
  const { chooseDoctor, currentUser, loading, setLoading } = useContext(Context)
  const doctorName = chooseDoctor.doctorName
  const [patientName, setPatientName] = useState(currentUser.name)
  const patientDoctorUsername = chooseDoctor.doctorUsername
  const [patientContact, setPatientContact] = useState(currentUser.contact)
  const [patientEmail, setPatientEmail] = useState(currentUser.email)
  const [patientAlternateContact, setPatientAlternateContact] = useState('')
  const [patientAppointmentDate, setPatientAppointmentDate] = useState('')
  const [patientMessage, setPatientMessage] = useState('')
  const [patientTreatment, setPatientTreatment] = useState('')
  const [patientAppointmentData, setPatientAppointmentData] = useState([])
  const [status, setStatus] = useState('pending')
  const navigate = useNavigate()
  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/get_patient_appointment_data?username=${currentUser.username}`)
      if (response) {
        setPatientAppointmentData(response.data.patientAppointmentData)
        // console.log(response)
      }
    } catch (e) {
      console.log(e)
    }

  }
  console.log(patientAppointmentData)
  const location = useLocation()
  useEffect(() => {
    fetchData()
  }, [currentUser])
  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const data = {
      status: status,
      name: patientName, doctorName: doctorName, contact:
        patientContact, email: patientEmail, doctorUsername: patientDoctorUsername,
      username: currentUser.username,
      treatment: patientTreatment, message: patientMessage,
      appointmentDate: patientAppointmentDate, alternateContact: patientAlternateContact
    }
    try {
      const response = await axios.post(`${apiUrl}/add_patient_appointment`, data)
      if (!response.data.is_add) {
        alert(response.data.message)
      }
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
      fetchData()
    }

  }
  console.log(chooseDoctor)
  const handleDelete = async (appointment_id) => {
    setLoading(true)
    try {
      const response = await axios.delete(`${apiUrl}/delete_appointment_data/${appointment_id}`)
      if (response) {
        console.log(response)
      }
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
      fetchData()
    }
  }
  return (
    <div className='appointment1-component'>
      <img src={image} alt='img'></img>
      <form onSubmit={handleFormSubmit}>
        <h1>Book Appointment</h1>
        <div className='input-containers'>
          <div className='input-items'>
            <div>
              <label>Name</label>
              <input value={patientName} onChange={(e) => setPatientName(e.target.value)} type='text' placeholder='Enter your name' required />
            </div>
            <div>
              <label>Contact</label>
              <input value={patientContact} onChange={(e) => setPatientContact(e.target.value)} type='number' placeholder='Enter your contact' required />
            </div>

            <div>
              <label>Email</label>
              <input value={patientEmail} onChange={(e) => setPatientEmail(e.target.value)} type='text' placeholder='Enter your email' />
            </div>
            <div>
              <label>Alterate Contact</label>
              <input value={patientAlternateContact} type='number' required onChange={(e) => setPatientAlternateContact(e.target.value)} placeholder='Enter your name' />
            </div>
          </div>
          <div className='input-items'>
            <div>
              <label>Doctor</label>
              <input type='text' value={chooseDoctor.doctorName} required onFocus={() => {
                navigate('/doctor')
              }} placeholder='Choose doctor...' />
            </div>
            <div>
              <label>Treatment</label>
              <select value={patientTreatment} required onChange={(e) => setPatientTreatment(e.target.value)}>
                {Array.isArray(chooseDoctor.treatmentAvail) && chooseDoctor.treatmentAvail.length > 0 ? (
                  <>
                    <option value='' disabled>Select Treatment</option>
                    {chooseDoctor.treatmentAvail.map((treat, index) => {
                      return <option key={`treatAvail${index}`}>{treat}</option>
                    })}
                  </>) : <option value="" disabled>No treatment avail</option>}
              </select>
            </div>
            <div>
              <label>Date</label>
              <input value={patientAppointmentDate} onChange={(e) => setPatientAppointmentDate(e.target.value)} type="date" placeholder='Enter your name' />
            </div>
            <div>
              <label>Message</label>
              <input value={patientMessage} onChange={(e) => setPatientMessage(e.target.value)} type='text' placeholder='Enter your name' />
            </div>

          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
      <div className='appointment-show'>
        {patientAppointmentData.length > 0 ? (
          patientAppointmentData.map((appointmentData, index) => {
            return <section key={`appointmentData${index}`}>
              <h2>Dr. {appointmentData.doctorName}</h2>
              <p>Name: {appointmentData.name}</p>
              <p>Treatment: {appointmentData.treatment}</p>
              <p>Contact: {appointmentData.contact}</p>
              <p>Alternate Contact: {appointmentData.alternateContact}</p>
              <p>Email: {appointmentData.email}</p>
              <p>Message: {appointmentData.message}</p>
              <p>Appointment Date: {appointmentData.appointmentDate}</p>
              <div className='status'>
                {appointmentData.status === 'pending' ? (<p style={{ backgroundColor: "#ffc107" }}>Pending</p>) : appointmentData.status === 'Accept' ? (<p style={{ color: "white", backgroundColor: "#28a745" }}>Accept</p>) : (<p style={{ color: "white", backgroundColor: "#c82333" }}>Reject</p>)}
                <DeleteIcon style={{ color: "#dc3545" }} onClick={() => {
                  handleDelete(appointmentData._id)
                }} />
              </div>
            </section>
          })
        ) : <p>No appointment submit..</p>}
      </div>
      {loading ? <Loader /> : <p style={{ display: "none" }}>dgs</p>}
    </div>
  )
}

export default Appointment1