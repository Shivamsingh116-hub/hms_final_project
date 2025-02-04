import React from 'react'
import './Billing.scss'
import image from './pngtree-image-of-futuristic-medical-hospital-room-picture-image_2736851.jpg'
const Billing = () => {
  return (
    <div className='billing-component'>
      <img style={{ width: "100%", height: "70%" }} src={image} alt='img' />
      <div className='billing-show'>
        
      </div>
    </div>
  )
}

export default Billing