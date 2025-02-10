import React, { useContext, useEffect, useState } from 'react'
import './Contact.scss'
import { Context } from '../../common/Context';
import axios from 'axios';
import Loader from '../../common/Loader';
const apiUrl = import.meta.env.VITE_API_URL
const Contact = () => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [senderNumber, setSenderNumber] = useState('')
  const [registerNumber, setRegisterNumber] = useState('')
  const [isquery, setIsquery] = useState(1)
  const [feedback, setFeedback] = useState('')
  const [query, setquery] = useState('')
  const { currentUser, loading, setLoading } = useContext(Context)
  const [feedbackArray, setFeedbackArray] = useState([])
  const username = currentUser.username
  const name = currentUser.name
  const sendMessage = () => {
    console.log("njk")
  }
  const handleSubmitReview = async (e) => {
    e.preventDefault()
    try {
      if (isquery === 1) {
        const response = await axios.post(`${apiUrl}/add_query`, { query: query, username: username, name: name })
        alert(response.data.message)
      } else {
        const response = await axios.post(`${apiUrl}/add_feedback`, { feedback: feedback, username: username, name: name })
        alert(response.data.message)
      }
    } catch (e) {
      console.log(e)
    } finally {
      fetchFeedback()
      if (isquery === 1) {
        setquery('')
      } else {
        setFeedback('')
      }
    }
  }
  const fetchFeedback = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${apiUrl}/get_feedback_data`)
      if (response.data.feedbackData) {
        setFeedbackArray(response.data.feedbackData)
      }
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchFeedback()
  }, [currentUser])
  console.log(feedbackArray)
  return (
    <div id='contact-component'>
      <form onSubmit={handleSubmitReview} id='query-feedback-container'>
        <div id='switch-button'>
          <button type="button" onClick={() => {
            if (isquery === 1) {
              setIsquery(2)
            }
          }}>Feedback</button>
          <button type="button" onClick={() => {
            if (isquery === 2) {
              setIsquery(1)
            }
          }}>Query</button>
        </div>
        {isquery === 1 ? (<textarea required value={query} onChange={(e) => setquery(e.target.value)} rows='10' cols="50" placeholder="Enter your query..">
        </textarea>) : (<textarea required value={feedback} onChange={(e) => setFeedback(e.target.value)} rows='10' cols="50" placeholder="Enter your feedback..">
        </textarea>)}
        <button type='submit'>Submit</button>
      </form>
      <div id='feedback-show-container'>
        {feedbackArray.length > 0 ? (feedbackArray.map((feedbackMsg, index) => {
          let timeStamp = new Date(feedbackMsg.createdAt)
          const date = timeStamp.toISOString().split('T')[0]
          const time = timeStamp.toTimeString().split('T')[0].replace("GM", "")
          return <div key={`feedbackMsg${index}`}>
            <p>{feedbackMsg.feedback}</p>
            <h3>{feedbackMsg.name}</h3>
            <span>
              <p>{time}</p>
              <p>{date}</p>
            </span>
          </div>
        })) : <div><p>No feedback</p></div>}
      </div>
      {loading ? <Loader /> : <p style={{ display: "none" }}>hdchgc</p>}
    </div>
  )
}

export default Contact