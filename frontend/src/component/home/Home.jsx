import React from 'react'
import './Home.scss'
import homeimg from './image.png'
import image4 from './492459-PH6RL3-878.jpg'
import image2 from './26996.jpg'
import image3 from './25285.jpg'
const Home = () => {
    const imageArr = [image2, image3, image4]
    return (
        <div className='home-component'>
            <div className='first-container'>
                <img src={homeimg} alt='img' />
                <div className='welcome-section'><h1>Wecome to Our Medical Care</h1>
                    <p>Our hospital management software aims to optimize the delivery of healthcare services through efficient management of hospital resources, improving patient care, and ensuring smooth workflows across various departments."</p>
                </div>
            </div>
            <div className='second-container'>
                {imageArr.map((item, index) => {
                    return <img style={{ width: "100%" }} key={`homeImageArr${index}`} src={item} alt='img' />
                })}
            </div>
        </div>
    )
}

export default Home