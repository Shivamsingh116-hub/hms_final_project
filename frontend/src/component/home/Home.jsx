import React from 'react'
import './Home.scss'
import homeimg from './image.png'
const Home = () => {
    return (
        <div className='home-component'>
            <div className='first-container'>
                <img src={homeimg} alt='img' />
                <div className='welcome-section'><h1>Wecome to Our Medical Care</h1>
                    <p>Our hospital management software aims to optimize the delivery of healthcare services through efficient management of hospital resources, improving patient care, and ensuring smooth workflows across various departments."</p>
                </div>
            </div>
        </div>
    )
}

export default Home