import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
const apiUrl = import.meta.env.VITE_API_URL
export const Context = createContext()
const ContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState('')
    const [doctorsData, setDoctorsData] = useState([])
    const [signinButton, setSigninButton] = useState(false)
    const [loading, setLoading] = useState(false)
    const [chooseDoctor, setChooseDoctor] = useState('')
    const [doctorProfileData, setDoctorProfileData] = useState()
    const [popupModal, setPopupModal] = useState(false)
    const fetchProtected = async () => {
        const token = localStorage.getItem("token")
        if (token) {
            setSigninButton(true)
            try {
                const response = await axios.get(`${apiUrl}/protected?token=${token}`)
                if (response.data.userData) {
                    setCurrentUser(response.data.userData)
                }
            }
            catch (e) {
                console.log(e)
            }
        }
    }

    useEffect(() => {
        fetchProtected()
    }, [apiUrl]);

    return (
        <Context.Provider value={{ popupModal, setPopupModal, doctorProfileData, setDoctorProfileData, doctorsData, setDoctorsData, loading, setLoading, chooseDoctor, setChooseDoctor, currentUser, setCurrentUser, signinButton, setSigninButton }}>
            {children}
        </Context.Provider>
    )
}
export default ContextProvider