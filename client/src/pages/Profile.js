import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import './Profile.css'
import Navbar from '../components/Navbar'
import Heading from '../components/Heading'

import { UserContext } from '../App'

const Profile = () => {
  const { state, dispatch } = useContext(UserContext)
  const [data, setData] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetch('/mybooks', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
      .then(res => res.json())
      .then(result => {
        setData(result.mybooks)
      })
  }, [])

  return (
    <div className='Profile'>
      <Navbar />

      {state ? (
        <div className='card'>
          <div className='details'>
            <h1>{state.name}</h1>
            <h2>
              {state.mbti.toUpperCase()},{' '}
              {state.sunsign.charAt(0).toUpperCase() + state.sunsign.slice(1)}
            </h2>
          </div>
          <p
            className='logout'
            onClick={() => {
              localStorage.clear()
              dispatch({ type: 'CLEAR' })
              navigate('/')
            }}
          >
            LogOut
          </p>
        </div>
      ) : (
        'loading...'
      )}

      <div className='books_collection'>
        {data.map(item => (
          <div className='book_space'>
            <div className='book'>
              <h1>{item.name}</h1>
              <h2>by {item.author}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Profile
