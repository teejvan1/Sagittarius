import React, { useEffect, useState } from 'react'
import './Messages.css'
import axios from 'axios'
import { format } from 'timeago.js'

const Message = ({ message, own }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const getUser = async (req, res) => {
      fetch(`/user/${message.sender}`, {
        method: 'get',
      })
        .then(res => res.json())
        .then(result => {
          setUser(result.user)
        })
        .catch(err => console.log(err))
    }
    getUser()
  }, [])
  return (
    <div className={own ? 'Message own' : 'Message'}>
      <div className='messageTop'>
        <p className='user'>{user?.name}</p>
        <p className='text'>{message.text}</p>
      </div>
      <div className='messageBottom'>{format(message.createdAt)}</div>
    </div>
  )
}

export default Message
