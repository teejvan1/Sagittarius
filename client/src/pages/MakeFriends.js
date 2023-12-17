import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import './MakeFriends.css'
import Navbar from '../components/Navbar'
import Heading from '../components/Heading'

import { UserContext } from '../App'

const MakeFriends = () => {
  const { state, dispatch } = useContext(UserContext)
  const [data, setData] = useState([])

  useEffect(() => {
    fetch('/makefriends', {
      method: 'get',
    })
      .then(res => res.json())
      .then(result => {
        if (state) {
          const newData = result.users.filter(item => {
            return item._id !== state._id
          })
          setData(newData)
        } else {
          setData(result.users)
        }
      })
  }, [])
  return (
    <div className='MakeFriends'>
      <Navbar />
      <Heading text='Make new friends here' marginTop='1.2rem' />

      <div className='alluser'>
        {data.map(item => (
          <div key={item._id} className='card-space'>
            <div className='card'>
              <h1>
                <Link
                  to={
                    state
                      ? item._id !== state._id
                        ? '/profile/' + item._id
                        : '/profile'
                      : '/profile/' + item._id
                  }
                >
                  {item.name}
                </Link>
              </h1>
              <h2>
                <Link
                  to={
                    state
                      ? item._id !== state._id
                        ? '/profile/' + item._id
                        : '/profile'
                      : '/profile/' + item._id
                  }
                >
                  {item.mbti.toUpperCase()},{' '}
                  {item.sunsign.charAt(0).toUpperCase() + item.sunsign.slice(1)}
                </Link>
              </h2>

              <p>Send message</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MakeFriends
