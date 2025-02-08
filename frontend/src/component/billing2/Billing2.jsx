import React, { useContext, useEffect, useState } from 'react'
import './Billing2.scss'
const pythonApiUrl = import.meta.env.VITE_PYTHON_URL
const apiurl = import.meta.env.VITE_API_URL
import image from './pngtree-image-of-futuristic-medical-hospital-room-picture-image_2736851.jpg'
import axios from 'axios'
import { Context } from '../../common/Context'
const Billing2 = () => {
    const [medicineArr, setMedicineArr] = useState([])
    const [medicineName, setMedicineName] = useState('')
    const [selectMedicine, setSelectMedicine] = useState('')
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [billArr, setBillArr] = useState([])
    const [totalBill, setTotalBill] = useState(0)
    const { currentUser } = useContext(Context)
    const pharmacistUsername = currentUser.username
    const handleChange = async (medicineSearch) => {
        try {
            const response = await axios.get(`${pythonApiUrl}/billing2data/search_medicine?medicineSearch=${medicineSearch}`)
            if (response.data.medicineData) {
                setMedicineArr(response.data.medicineData)
            } else {
                setMedicineArr([])
            }
        } catch (e) {
            console.log(e)
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setBillArr([...billArr, selectMedicine])
        setMedicineName('')
    }
    const handleBillSubmit = async () => {
        const data = { username: username, billArr: billArr, name: name, totalBill: totalBill, pharmacistShop: pharmacistUsername }
        try {
            const response = await axios.post(`${apiurl}/add_billing_data`, data)
            console.log(response)
            if (response.data.message) {
                alert(response.data.message)
            }
        }
        catch (e) {
            console.log(e)
        } finally {
            setBillArr([])
            setUsername('')
            setName('')
            setTotalBill(0)
        }
    }
    useEffect(() => {
        const sum = billArr.reduce((acc, medicine) => acc + medicine.price, 0);
        setTotalBill(sum);
    }, [billArr])


    // waste
    return (
        <div className='billing2-component'>
            <img src={image} alt='img' />
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input required value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter your name...' />
                </div>
                <div>
                    <label>Username</label>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Enter your username...' />
                </div>
                <div>
                    <label>Meidicine</label>
                    <input required className='medicine-search-bar' type="search" value={medicineName} onChange={(e) => {
                        setMedicineName(e.target.value)
                        handleChange(e.target.value)
                    }} placeholder='Enter medicine name...' />
                    {medicineArr.length > 0 && (<ul className='search-medicine-recommend'>
                        {medicineArr.map((medicine, index) => {
                            return <li onClick={() => {
                                setMedicineName(medicine.name)
                                setSelectMedicine(medicine)
                                setMedicineArr([])
                            }} key={`medicineName${index}`}>{medicine.name}</li>
                        })}
                    </ul>)}
                </div>
                <button type='submit'>Add</button>
                <span>Total Bill: <p>{totalBill}</p></span>
            </form>
            <div className='current-billing-process'>
                <h3>Name: {name ? <p>{name}</p> : <p>Null</p>}</h3>
                <ul>
                    <ul style={{ fontWeight: "500" }}>
                        <li>S.No</li>
                        <li>Medicine Name</li>
                        <li>Supplements</li>
                        <li>Size</li>
                        <li>Price</li>
                    </ul>
                    {billArr.length > 0 ? (billArr.map((medicineArray, index) => {
                        return <ul>
                            <li>{index + 1}</li>
                            <li >{medicineArray.name}</li>
                            <li>{medicineArray.short_composition1}</li>
                            <li>{medicineArray.pack_size_label}</li>
                            <li>{medicineArray.price}</li>
                        </ul>
                    })) : <ul>
                        <li>0</li>
                        <li>Null</li>
                        <li>Null</li>
                        <li>Null</li>
                        <li >Null</li>
                    </ul>}
                </ul>
                <span>Total bill: <p>{totalBill}</p></span>
                <button onClick={handleBillSubmit}>Add Bill</button>
            </div>
        </div>
    )
}

export default Billing2