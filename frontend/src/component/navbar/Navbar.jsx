import React, { useContext, useEffect, useRef, useState } from 'react'
import imgIcon from './1600w-oz1ox2GedbU.jpg'
import { Link, useNavigate } from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout';
import { Context } from '../../common/Context'
import MenuIcon from '@mui/icons-material/Menu';
import './Navbar.scss'
const Navbar = () => {
    const [menuClassname, setMenuClassname] = useState('passive')
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const containerRef = useRef(null)
    const { signinButton, currentUser, setSigninButton } = useContext(Context)
    const[tokenSearch,setSearchToken]=useState(false)
    const role = currentUser.role
    const user = [{ path: "/", navItem: "Home" },
    { path: "/appointment1", navItem: "Appointment" }, { path: "/billing", navItem: "Billing" }, { path: "/about", navItem: "About" }, { path: "/doctor", navItem: "Doctor" }, { path: "/contact", navItem: "Contact" },]
    const doctor = [{ path: "/", navItem: "Home" },
    { path: "/appointment2", navItem: "Appointment" }, { path: "/completeProfile", navItem: "Profile" }, { path: "/about", navItem: "About" }, { path: "/contact", navItem: "Contact" },]
    const pharmacist = [{ path: "/", navItem: "Home" }, { path: "/billing2", navItem: "Billing" }, { path: "/contact", navItem: "Contact" }]
    const withoutLoginNavbar = [{ path: "/", navItem: "Home" }, { path: "/about", navItem: "About" }, { path: "/contact", navItem: "Contact" },]
    const matchLogin = { User: user, Doctor: doctor, Pharmacist: pharmacist }

    const handleSignin = () => {
        if (signinButton) {
            localStorage.setItem("token", '')
            navigate('/')
            setSigninButton(false)
        } else {
            navigate('/signin')
        }
        navigate('/signin')
    }
    useEffect(() => {
        setMenuClassname('passive')
        if (localStorage.getItem('token')) {
            setSigninButton(true)
        }
    }, [location.pathname])
    const handleMenuBtn = () => {
        if (menuClassname === 'passive') {
            setMenuClassname('active')
        } else {
            setMenuClassname('passive')
        }
    }
    useEffect(() => {
        function handleClickOutside(event) {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setMenuClassname('passive')
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    
    }, [])

    return (
        <nav>
            <img src={imgIcon} alt='icon' />
            {currentUser && signinButton ? (
                <ul ref={containerRef} className={menuClassname}>
                    {matchLogin[role].map((item, index) => {
                        return <li key={`userSign${index}`}><Link to={item.path} className='link-item'>{item.navItem}</Link></li>
                    })}
                </ul>
            ) : (<ul ref={containerRef} className={menuClassname}>
                {withoutLoginNavbar.map((item, index) => {
                    return <li key={`nosign${index}`}><Link to={item.path} className='link-item'>{item.navItem}</Link></li>
                })}
            </ul>)}
            <div className='buttons'>
                <button className='signin-btn' onClick={handleSignin}>{signinButton ? <LogoutIcon /> : "Signin"}</button>
                <button onClick={handleMenuBtn} className='menu-btn'><MenuIcon /></button>
            </div>
        </nav >
    )
}

export default Navbar