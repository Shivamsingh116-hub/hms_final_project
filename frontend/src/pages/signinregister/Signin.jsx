import React, { useContext, useEffect, useState } from 'react'
import imgIcon from './1600w-oz1ox2GedbU.jpg'
import './Signin.scss'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


import { Context } from '../../common/Context'
import Loader from '../../common/Loader'
const apiUrl = import.meta.env.VITE_API_URL
const Signin = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { setCurrentUser, setSigninButton, loading, setLoading } = useContext(Context)
    const handleFormSubmit = async (e) => {
        e.preventDefault()
        const data = { username: username, password: password }
        try {
            setLoading(true)
            const response = await axios.post(`${apiUrl}/signin_data`, data)
            if (response.data.Token) {
                setSigninButton(true)
                navigate('/')
                localStorage.setItem("token", response.data.Token)
                const token = response.data.Token
                try {
                    const response = await axios.get(`${apiUrl}/protected?token=${token}`)
                    setCurrentUser(response.data.userData)
                } catch (e) {
                    console.log(e)
                }
            } else if (response.data.message) {
                alert(response.data.message)
            }
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='signin-component'>
            <form onSubmit={handleFormSubmit}>
                <img src={imgIcon} alt='img' />
                <div>
                    <label>Username</label>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder='Enter your username' />
                </div>
                <div>
                    <label>Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Enter your password' />
                </div>
                <button type="submit">Signin</button>
                <p>New user? <Link to='/register' className='register-link'>Register here</Link></p>
            </form>
            {loading && <Loader />}
        </div>
    )
}

export default Signin