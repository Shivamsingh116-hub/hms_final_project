import React, { useContext, useState } from 'react'
// import imgIcon from './1600w-oz1ox2GedbU.jpg'
import { data, Link, useNavigate } from 'react-router-dom'
const apiUrl = import.meta.env.VITE_API_URL
import './Register.scss'
import axios from 'axios'
import { Context } from '../../common/Context'
import Loader from '../../common/Loader'
import Modal from '../../Modal'
const Register = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [contact, setContact] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('User')
    const [message, setMessage] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const { popupModal, setPopupModal, loading, setLoading } = useContext(Context)
    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        const data = { username: username, contact: contact, name: name, password: password, email: email, role: role }
        try {
            const response = await axios.post(`${apiUrl}/registration_data`, data)
            if (response.data.message) {
                setPopupModal(true)
                setMessage(response.data.message)
            } else if (response.data.err) {
                setPopupModal(true)
                setMessage(response.data.message)
            }
            if (response.data.is_signin) {
                navigate('/signin')
            }

        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className='register-component'>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder='Enter username here...' />
                </div>
                <div>
                    <label>Name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder='Enter name here...' />
                </div>
                <div>
                    <label>Contact No</label>
                    <input value={contact} onChange={(e) => setContact(e.target.value)} type="number" placeholder='Enter contact here...' />
                </div>
                <div>
                    <label>Email id</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder='Enter email here...' />
                </div>
                <div>
                    <label>Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Enter password here...' />
                </div>
                <div>
                    <label>Confirm Password</label>
                    <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder='Enter password again...' />
                </div>
                <select value={role} required onChange={(e) => setRole(e.target.value)}>
                    <option value='Register as' disabled>Register as</option>
                    <option>User</option>
                    <option>Doctor</option>
                    <option>Pharmacist</option>
                </select>
                <button type="submit">Register</button>
                <p>If already registerd? <Link to='/signin' className='register-link'>Signin</Link></p>
            </form>
            {loading ? <Loader /> : <p style={{ display: "none" }}>no</p>}
            {popupModal && <Modal message={message} onClose={() => setPopupModal(false)} duration={3000} />}
        </div>
    )
}

export default Register