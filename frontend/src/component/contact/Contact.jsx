import React, { useContext, useEffect, useState } from 'react'
import { io } from "socket.io-client";
import { Context } from '../../common/Context';
const socket = io("http://localhost:3000")
const Contact = () => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [senderNumber, setSenderNumber] = useState('')
  const { currentUser } = useContext(Context)
  const contact = currentUser.contact
  useEffect(() => {
    socket.on('receiveMessage', (msg) => {
      setMessages((prevMsg) => [...prevMsg, `Other: ${msg}`])
    })
    socket.on("error", (err) => {
      alert(err);
    });
    return () => {
      socket.off('receiveMessage')
    }
  }, [])
  const sendMessage = () => {
    socket.emit('register', contact)
    socket.emit('sendMessage', { to: senderNumber, message })
    setMessages((prevMsg) => [...prevMsg, `Me: ${message}`])
    setMessage('')
  }

  return (
    <div>
      <h2>Chat</h2>
      <ul>
        {
          messages && messages.map((msg) => {
            return <li>{msg}</li>
          })
        }
      </ul>
      <div>
        <label>Send to </label>
        <input type='number' value={senderNumber} onChange={(e) => setSenderNumber(e.target.value)} placeholder='Enter number her ' />
        <input value={message} onChange={(e) => setMessage(e.target.value)} id='message' placeholder='enter message' />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  )
}

export default Contact