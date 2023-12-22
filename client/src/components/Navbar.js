import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'
import logo from '../images/logo.png'

import { UserContext } from '../App'

function Header() {
  const navigate = useNavigate()
  const { state, dispatch } = useContext(UserContext)
  const [modalOpen, setModalOpen] = useState(false)

  const renderList = () => {
    if (state) {
      return [
        <Link key='home' className='navlink' to='/'>
          Home
        </Link>,
        <Link key='makefriends' className='navlink' to='/makefriends'>
          Make Friends
        </Link>,
        <Link key='books' className='navlink' to='/books'>
          Books
        </Link>,
        <Link key='compatibility' className='navlink' to='/compatibility'>
          Compatibility
        </Link>,
        <Link key='chats' className='navlink' to='/chats'>
          Chats
        </Link>,
        <Link key='profile' className='navlink' to='/profile'>
          {state.name}
        </Link>,
      ]
    } else {
      return [
        <Link key='home' className='navlink' to='/'>
          Home
        </Link>,
        <Link key='makefriends' className='navlink' to='/makefriends'>
          Make Friends
        </Link>,
        <Link key='books' className='navlink' to='/books'>
          Books
        </Link>,
        <Link key='compatibility' className='navlink' to='/compatibility'>
          Compatibility
        </Link>,
        <Link key='login' className='navlink' to='/login'>
          LogIn
        </Link>,
      ]
    }
  }
  return (
    <div>
      <div className='Header'>
        <div className='Header_container'>
          <Link className='logoLink' to='/'>
            <h1>
              <img src={logo} alt='' />
              &nbsp;Sagittarius
            </h1>
          </Link>

          <div className='link-container'>{renderList()}</div>
        </div>
      </div>
    </div>
  )
}

export default Header
