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

  const postData = e => {
    e.preventDefault()
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
        <form className='right' onSubmit={e => postData(e)}>
          <p>USER LOGIN</p>
          <input
            id='email'
            type='text'
            placeholder='Email'
            value={email}
            required
            autoComplete='off'
            onChange={e => {
              setEmail(e.target.value)
            }}
          />
          <input
            id='password'
            type='text'
            placeholder='Password'
            value={password}
            required
            autoComplete='off'
            onChange={e => {
              setPassword(e.target.value)
            }}
          />
          <button>LOGIN</button>
          <h5>
            <Link to='/signup'>
              <span>Create Account</span>
            </Link>
          </h5>
        </form>
      </div>
    </>
  )
}

export default LogIn
