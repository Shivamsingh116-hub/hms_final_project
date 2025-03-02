import React, { useEffect } from 'react'
import ReactDom from 'react-dom'
import './Modal.scss'
const Modal = ({ message, onClose, duration }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, duration)
        return () => clearTimeout(timer)
    }, [onClose, duration])
    return ReactDom.createPortal(
        <div className='notification'>
            <p>{message}</p>
        </div>,
        document.getElementById('portal-root')
    )
}

export default Modal