import React, { useContext, useEffect, useState } from 'react'
import { io } from "socket.io-client";
import SendIcon from '@mui/icons-material/Send';
import './Contact.scss'
import { Context } from '../../common/Context';
const Contact = () => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [senderNumber, setSenderNumber] = useState('')
  const [registerNumber, setRegisterNumber] = useState('')
  const { currentUser } = useContext(Context)
  const contact = currentUser.contact
  const sendMessage = () => {
    console.log("njk")
  }
  return (
    <div id='contact-component'>
      <div id='select-doctor-contact'>
        <h3>Select Doctor</h3>
        <input placeholder='Select doctor...' />
      </div>
      <div id='chat-container'>
        <h3>Shivam Singh</h3>
        <div>
          Message display
        </div>
        <div>
          <input placeholder='Enter text here...' />
          <button><SendIcon /></button>
        </div>
      </div>
    </div>
  )
}

export default Contact