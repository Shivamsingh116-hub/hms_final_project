import React, { useContext, useEffect, useState } from 'react'
import './Billing.scss'
import image from './pngtree-image-of-futuristic-medical-hospital-room-picture-image_2736851.jpg'
import axios from 'axios'
import { Context } from '../../common/Context'
const pythonApiUrl = import.meta.env.VITE_PYTHON_URL
const Billing = () => {
  const { currentUser } = useContext(Context)
  const [billArr, setBillArr] = useState([])
  const [billDataArr, setBillDataArr] = useState([])
  const username = currentUser.username
  const fetchBilling = async () => {
    try {
      const response = await axios.get(`${pythonApiUrl}/billingdata/get_billing_data?username=${username}`)
      if (response.data.billingData) {
        setBillDataArr(response.data.billingData)
      }
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    fetchBilling()
  }, [currentUser])
  return (
    <div className='billing-component'>
      <img style={{ width: "100%", height: "70%" }} src={image} alt='img' />
      <div className='billing-show'>
        {billDataArr.length > 0 ? (billDataArr.map((billData, index) => {
          let parsedData = billData.billArr
          if (typeof parsedData !== "object") {
            parsedData = JSON.parse(parsedData)
          }
          return <section key={`billdata${index}`}>
            <h2>Name: {billData.name}</h2>
            <ul>
              <ul style={{ fontWeight: "500" }}>
                <li>S.No</li>
                <li>Medicine Name</li>
                <li>Supplements</li>
                <li>Size</li>
                <li>Price</li>
              </ul>
              {parsedData.length > 0 && parsedData.map((medicineArray, index) => {
                return <ul key={`medicineData${index}`}>
                  <li>{index + 1}</li>
                  <li >{medicineArray.name}</li>
                  <li>{medicineArray.short_composition1}</li>
                  <li>{medicineArray.pack_size_label}</li>
                  <li>{medicineArray.price}</li>
                </ul>
              })}
            </ul>
            <span>Total Bill: <p>{billData.totalBill}</p></span>
          </section>
        })) : <p>No bills</p>}
      </div>
    </div>
  )
}

export default Billing