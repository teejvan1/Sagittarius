import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../pages/SignUp.css'
import Navbar from '../components/Navbar'
import signupImg from '../images/signup.webp'

const mbtiList = [
  'ESTJ',
  'ENTJ',
  'ESFJ',
  'ENFJ',
  'ISTJ',
  'ISFJ',
  'INTJ',
  'INFJ',
  'ESTP',
  'ESFP',
  'ENTP',
  'ENFP',
  'ISTP',
  'ISFP',
  'INTP',
  'INFP',
]

const sunSignList = [
  'Aries',
  'Taurus',
  'Gemini',
  'Cancer',
  'Leo',
  'Virgo',
  'Libra',
  'Scorpio',
  'Sagittarius',
  'Capricorn',
  'Aquarius',
  'Pisces',
]

const SignUp = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mbti, setMbti] = useState('')
  const [sunsign, setSunsign] = useState('')

  const postData = e => {
    e.preventDefault()
    fetch('/signup', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
        mbti,
        sunsign,
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          console.log('Error' + data.error)
        } else {
          navigate('/login')
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  return (
    <>
      <Navbar />
      <div className='SignUp'>
        <form className='signup-card' onSubmit={e => postData(e)}>
          <p className='welcome'>Welcome aboard</p>
          <label htmlFor='name'>First Name</label>
          <input
            id='name'
            type='text'
            value={name}
            placeholder='Your first name'
            required
            autocomplete='off'
            onChange={e => {
              setName(e.target.value)
            }}
          />
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            type='text'
            value={email}
            placeholder='Your Email'
            required
            autocomplete='off'
            onChange={e => {
              setEmail(e.target.value)
            }}
          />
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            value={password}
            placeholder='Your password'
            required
            autocomplete='off'
            onChange={e => {
              setPassword(e.target.value)
            }}
          />
          <label htmlFor='mbti'>MBTI personality</label>

          <select
            id='mbti'
            value={mbti}
            required
            onChange={e => {
              setMbti(e.target.value)
            }}
          >
            <option value=''>Choose your mbti personality</option>
            {mbtiList.map(mbti => (
              <option value={mbti.toLowerCase()}>{mbti}</option>
            ))}
          </select>
          <Link className='mbti' to='/mbti'>
            Know more about MBTI
          </Link>
          <label htmlFor='sunsign'>Sun Sign</label>
          <select
            id='sunsign'
            value={sunsign}
            required
            onChange={e => {
              setSunsign(e.target.value)
            }}
          >
            <option value=''>Choose your Sun Sign</option>
            {sunSignList.map(sunsign => (
              <option value={sunsign.toLowerCase()}>{sunsign}</option>
            ))}
          </select>
          <button>SignUp</button>
          <h5>
            Already have an account?
            <Link to='/login'> &nbsp;Login</Link>
          </h5>
        </form>
      </div>
    </>
  )
}

export default SignUp
