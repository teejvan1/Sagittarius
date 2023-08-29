import React from 'react'
import { Link } from 'react-router-dom'

import './ChatRoom.css'

import { generate } from 'random-words'

const Enter = () => {
  const first = generate()
  const secondS = generate()
  const secondL = secondS.charAt(0).toUpperCase() + secondS.slice(1)
  const whole = first + secondL
  return (
    <>
      <div className='Enter'>
        <div className='Enter_Header'>
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
        <h1 className='Enter_h1'>Enter the chatroom</h1>
        <div className='Enter_form'>
          <form action='/chat'>
            <input type='hidden' name='username' value={whole} />
            <input type='hidden' name='room' value='chatroom' />
            <button>Enter</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Enter
