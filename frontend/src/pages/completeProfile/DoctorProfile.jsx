import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../common/Context'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
const apiUrl = import.meta.env.VITE_API_URL
import "./DoctorProfile.scss"
const DoctorProfile = () => {
    const { currentUser, loading, setLoading } = useContext(Context)
    const [treatmentName, setTreatmentName] = useState('')
    const [treatmentArr, setTreatmentArr] = useState([])
    const [doctorProfileData, setDoctorProfileData] = useState()
    const username = currentUser.username
    const [doctorNumber, setDoctorNumber] = useState('')
    const [doctorEmail, setDoctorEmail] = useState('')
    const [matchPassword, setMatchPassword] = useState('')
    const fetchDoctorData = async () => {
        try {
            if (currentUser.role === 'Doctor') {
                const response = await axios.get(`${apiUrl}/get_doctor_schema_data?username=${username}`)
                if (response.data.doctorData) {
                    const doctorProfile = response.data.doctorData
                    setDoctorProfileData(doctorProfile)
                    setDoctorEmail(doctorProfile.email)
                    setDoctorNumber(doctorProfile.contact)
                }
            }
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        fetchDoctorData()
    }, [currentUser])
    const addTreatment = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.put(`${apiUrl}/update_treatment_array/${username}`, { treatmentName: treatmentName })
            setTreatmentArr(response.data.treatmentArray)
            alert(response.data.message)
        }
        catch (e) {
            console.log(e)
        } finally {
            fetchDoctorData()
        }
    }

    const handleRemoveTreatment = async (id, treat) => {
        try {
            const response = await axios.put(`${apiUrl}/delete_treatment_data/${id}`, { treatmentName: treat })
            console.log(response)
        } catch (e) {
            console.log(e)
        } finally {
            fetchDoctorData()
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = { contact: doctorNumber, email: doctorEmail, matchPassword: matchPassword }
        try {
            const response = await axios.put(`${apiUrl}/update_doctor_profile/${username}`, data)
            if (response.data.message) {
                alert(response.data.message)
            }
        } catch (e) {
            console.log(e)
        } finally {
            fetchDoctorData()
        }
    }
    return (
        <div className='doctor-profile-component'>
            <form onSubmit={addTreatment} className='treatment-update'>
                <label>Add Treatment</label>
                <div>
                    <input value={treatmentName} onChange={(e) => setTreatmentName(e.target.value)} placeholder='Enter treatment to do...' required />
                    <button type='submit'>Add</button>
                </div>
                <ul>
                    {doctorProfileData && Array.isArray(doctorProfileData.treatment) && doctorProfileData.treatment.length > 0 ? (doctorProfileData.treatment.map((treat, index) => {
                        return <li key={`treat${index}`}>{treat} <CancelOutlinedIcon style={{ color: "red", padding: "0px", margin: "0px", fontSize: "16px" }} onClick={() => handleRemoveTreatment(doctorProfileData._id, treat)} /></li>
                    })) : <li>No treatment Add</li>}
                </ul>
            </form>
            <form onSubmit={handleSubmit} className='doctor-profile-update'>
                <div>
                    <label>Update Contact</label>
                    <input type='number' value={doctorNumber} onChange={(e) => setDoctorNumber(e.target.value)} placeholder='Enter new contact' />
                </div>
                <div>
                    <label>Update Email</label>
                    <input type='text' value={doctorEmail} onChange={(e) => setDoctorEmail(e.target.value)} placeholder='Enter new email' />
                </div>
                <div>
                    <label>Password</label>
                    <input type='password' required value={matchPassword} onChange={(e) => setMatchPassword(e.target.value)} placeholder='Enter your password' />
                </div>
                <button type='submit'>Update</button>
            </form>

        </div>
    )
}

export default DoctorProfile