import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { socket } from '../socket'
import { useContentsContext } from '../hooks/useContentsContext'

import './Chat.css'
import Form from './Form.js'

function ChatRoom() {
  const { contents, dispatch } = useContentsContext()
  const [searchParams] = useSearchParams()

  const username = searchParams.get('username')
  const room = searchParams.get('room')

  useEffect(() => {
    fetch('/message')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then(data => {
        console.log(data)
        dispatch({ type: 'SET_CONTENT', payload: data })
      })
      .catch(error => {
        console.error('Error fetching message data:', error)
      })

    socket.on('message', onMessage)

    function onMessage(message) {
      fetch('/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          return response.json()
        })
        .then(data => {
          dispatch({ type: 'CREATE_CONTENT', payload: data })
        })
        .catch(error => {
          console.error('Error creating message content:', error)
        })
    }

    socket.emit('join', { username, room })

    return () => {
      socket.off('message', onMessage)
    }
  }, [dispatch, room, username])

  return (
    <div className='ChatRoom'>
      <div className='ChatRoom_Header'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke-width='1.5'
          stroke='currentColor'
          class='w-6 h-6'
        >
          <path
            stroke-linecap='round'
            stroke-linejoin='round'
            d='M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25'
          />
        </svg>

        <h1>Sagittarius</h1>

        <div className='link-container'>
          <Link to='/'>HOME</Link>
          <Link to='/books'>BOOKS</Link>
          <Link to='/compatibility'>COMPATIBILITY</Link>
          <Link to='/chatroom'>CHATROOM</Link>
        </div>
      </div>
      <div className='chats'>
        {contents &&
          contents.map(content => (
            <div className='content'>
              <h2>{content.name}</h2>
              <p>{content.content}</p>
              <br />
            </div>
          ))}

        <Form />
      </div>
    </div>
  )
}

export default ChatRoom
