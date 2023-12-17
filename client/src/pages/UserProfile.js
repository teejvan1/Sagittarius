import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import './UserProfile.css'
import Navbar from '../components/Navbar'

import { UserContext } from '../App'
import { useParams } from 'react-router-dom'

const UserProfile = () => {
  const { state, dispatch } = useContext(UserContext)
  const navigate = useNavigate()

  const { userid } = useParams()
  const [userProfile, setUserProfile] = useState(null)

  // console.log(userProfile)

  useEffect(() => {
    fetch(`/user/${userid}`, {
      method: 'get',
    })
      .then(res => res.json())
      .then(result => {
        setUserProfile(result)
      })
  }, [])

  return (
    <div className='UserProfile'>
      <Navbar />

      {userProfile ? (
        <div className='card'>
          <div className='details'>
            <h1>{userProfile.user.name}</h1>
            <h2>
              {userProfile.user.mbti.toUpperCase()},{' '}
              {userProfile.user.sunsign.charAt(0).toUpperCase() +
                userProfile.user.sunsign.slice(1)}
            </h2>
          </div>
        </div>
      ) : (
        'loading...'
      )}

      <div className='books_collection'>
        {userProfile
          ? userProfile.books.map(item => (
              <div key={item._id} className='book_space'>
                <div className='book'>
                  <h1>{item.name}</h1>
                  <h2>by {item.author}</h2>
                </div>
              </div>
            ))
          : 'loading...'}
      </div>
    </div>
  )
}

export default UserProfile
