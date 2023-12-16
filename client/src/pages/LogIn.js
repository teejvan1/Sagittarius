import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './LogIn.css'
import Navbar from '../components/Navbar'
import loginImg from '../images/login.webp'

import { UserContext } from '../App'

const LogIn = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { state, dispatch } = useContext(UserContext)

  const postData = () => {
    fetch('/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          console.log('Error' + data.error)
        } else {
          localStorage.setItem('jwt', data.token)
          localStorage.setItem('user', JSON.stringify(data.user))
          dispatch({ type: 'USER', payload: data.user })
          navigate('/')
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <>
      <Navbar />
      <div className='LogIn'>
        <div className='left'>
          <img src={loginImg} alt='' />
        </div>
        <div className='right'>
          <p>USER LOGIN</p>
          <input
            type='text'
            placeholder='Email'
            value={email}
            required
            onChange={e => {
              setEmail(e.target.value)
            }}
          />
          <input
            type='text'
            placeholder='Password'
            value={password}
            required
            autocomplete='off'
            onChange={e => {
              setPassword(e.target.value)
            }}
          />
          <button onClick={() => postData()}>LOGIN</button>
          <h5>
            <Link to='/signup'>
              <span>Create Account</span>
            </Link>
          </h5>
        </div>
      </div>
    </>
  )
}

export default LogIn
