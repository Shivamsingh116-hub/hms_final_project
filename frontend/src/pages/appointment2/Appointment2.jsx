import React, { useContext, useEffect, useState } from 'react'
import './Appointment2.scss'
import { Context } from '../../common/Context'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import DeleteIcon from '@mui/icons-material/Delete';
import Loader from '../../common/Loader'
import Modal from '../../Modal'
const apiUrl = import.meta.env.VITE_API_URL
const Appointment2 = () => {
  const {popupModal,setPopupModal, chooseDoctor, currentUser, loading, setLoading } = useContext(Context)
  const [patientAppointmentData, setPatientAppointmentData] = useState([])
  const username = currentUser.username
  const [status, setStatus] = useState('')
  const [message, setMessage] = useState('')
  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${apiUrl}/get_patient_appointment_for_doctor_section?username=${username}`)
      if (response) {
        setPatientAppointmentData(response.data)
      }
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchData()
  }, [currentUser])
  const handleDelete = async (appointment_id) => {

    try {
      const response = await axios.delete(`${apiUrl}/delete_appointment_data/${appointment_id}`)
      if (response) {
        console.log(response)
      }
    } catch (e) {
      console.log(e)
    } finally {
      fetchData()
    }
  }
  const handleSubmit = async (appointmentId) => {
    try {
      const response = await axios.put(`${apiUrl}/update_appointment_status/${appointmentId}`, { status: status })
      if (response.data.message) {
        setPopupModal(true)
        setMessage(response.data.message)
      }
    } catch (e) {
      console.log(e)
    } finally {
      fetchData()
    }
  }
  return (
    <div className='appointment2-component'>
      <div className='appointment-show'>
        {patientAppointmentData.length > 0 ? (
          patientAppointmentData.filter((appointmentDataStaus) => appointmentDataStaus.status !== 'Reject').map((appointmentData, index) => {
            return <section key={`appointmentData${index}`}>
              <h2>{appointmentData.name}</h2>
              <p>Dr. {appointmentData.doctorName}</p>
              <p>Treatment: {appointmentData.treatment}</p>
              <p>Contact: {appointmentData.contact}</p>
              <p>Alternate Contact: {appointmentData.alternateContact}</p>
              <p>Email: {appointmentData.email}</p>
              <p>Message: {appointmentData.message}</p>
              <p>Appointment Date: {appointmentData.appointmentDate}</p>
              <p>Status: {appointmentData.status}</p>
              <form onSubmit={(e) => {
                e.preventDefault()
                handleSubmit(appointmentData._id)
              }}>
                <button type='submit' onClick={() => setStatus('Accept')} style={{ color: "white", backgroundColor: "#28a745" }}>Accept</button>
                <button type='submit' onClick={() => setStatus('Reject')} style={{ color: "white", backgroundColor: "#c82333" }}>Reject</button>
              </form>
            </section>
          })
        ) : <p>No appointment submit..</p>}
      </div>
      {loading ? <Loader /> : <p style={{ display: "none" }}>dgs</p>}
      {popupModal && <Modal message={message} onClose={() => setPopupModal(false)} duration={3000} />}

    </div>
  )
}

export default Appointment2