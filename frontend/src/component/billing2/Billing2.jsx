import React from 'react'
import './Billing2.scss'
import image from './pngtree-image-of-futuristic-medical-hospital-room-picture-image_2736851.jpg'
const Billing2 = () => {
    return (
        <div className='billing2-component'>
            <img src={image} alt='img' />
            <form>
                <div>
                    <label>Name</label>
                    <input placeholder='Enter your name...' />
                </div>
                <div>
                    <label>Username</label>
                    <input placeholder='Enter your username...' />
                </div>
                <div>
                    <label>Meidicine</label>
                    <input placeholder='Enter medicine name...' />
                </div>
            </form>
        </div>
    )
}

export default Billing2