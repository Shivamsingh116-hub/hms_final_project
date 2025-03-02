import React, { useContext, useEffect, useState } from 'react'
import './Billing.scss'
import image from './pngtree-image-of-futuristic-medical-hospital-room-picture-image_2736851.jpg'
import axios from 'axios'
import { Context } from '../../common/Context'
import Loader from '../../common/Loader'
import Modal from '../../Modal'
const apiurl = import.meta.env.VITE_API_URL
const Billing = () => {
  const {popupModal,setPopupModal, currentUser, loading, setLoading } = useContext(Context)
  const [billArr, setBillArr] = useState([])
  const [billDataArr, setBillDataArr] = useState([])
  const username = currentUser.username
  const [billId, setBillId] = useState('')
  const [message, setMessage] = useState('')
  const fetchBilling = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${apiurl}/get_billing_data?username=${username}`)
      if (response.data.billingData) {
        setBillDataArr(response.data.billingData)
      }
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchBilling()
  }, [currentUser])
  const addBill = async () => {
    try {
      const response = await axios.put(`${apiurl}/add_bill_to_username/${billId}`, { username: username })
      if (response.data.message) {
        setPopupModal(true)
        setMessage(response.data.message)
      }
      if (response.data.is_add) {
        fetchBilling()
      }
    } catch (e) {
      console.log(e)
    }
    setBillId('')
  }
  return (
    <div className='billing-component'>
      <img style={{ width: "100%", height: "70%" }} src={image} alt='img' />

      <div className='billing-show'>
        <div id='add-bill-using-id'>
          <input value={billId} onChange={(e) => setBillId(e.target.value)} placeholder='Enter bill id...' />
          <button onClick={addBill}>Add</button>
        </div>
        {billDataArr.length > 0 ? (billDataArr.map((billData, index) => {
          let parsedData = billData.billArr
          if (typeof parsedData !== "object") {
            parsedData = JSON.parse(parsedData)
          }
          const timeStamp = billData.createdAt
          const date = new Date(timeStamp)
          const billDate = date.toISOString().split('T')[0]
          const billTime = date.toTimeString().split('T')[0].replace("GM", "")
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
            <div className='bill-date-section'>
              <p>{billTime}</p>
              <p>{billDate}</p>
            </div>
          </section>
        })) : <p>No bills</p>}
      </div>
      {loading ? <Loader /> : <p style={{ display: "none" }}>jdf</p>}
      {popupModal && <Modal message={message} onClose={() => setPopupModal(false)} duration={3000} />}

    </div>
  )
}

export default Billing