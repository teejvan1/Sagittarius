import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useBooksContext } from '../hooks/useBooksContext'

import './Books.css'

function Books() {
  const { books, dispatch } = useBooksContext()
  const [Name, setName] = useState('')
  const [Author, setAuthor] = useState('')

  function onSubmit() {
    setName('')
    setAuthor('')
  }

  useEffect(() => {
    fetch('https://sagittarius.onrender.com/book')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then(data => {
        dispatch({ type: 'SET_BOOK', payload: data })
      })
      .catch(error => {
        console.error('Error fetching book data:', error)
      })
  }, [dispatch])

  return (
    <div className='Books'>
      <div className='Books_Header'>
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
      <h1 className='Booksh1'>Share your favorite books</h1>
      <form
        method='post'
        action='https://sagittarius.onrender.com/book'
        className='books_upload'
        onSubmit={onSubmit}
      >
        <label for='name'> Name of the book</label>
        <input
          type='text'
          id='name'
          name='name'
          placeholder='Enter the name of the book'
          required
          onChange={e => setName(e.target.value)}
        />

        <label for='author'> Author of the book</label>
        <input
          type='text'
          id='author'
          name='author'
          placeholder='Enter the name of the author'
          required
          onChange={e => setAuthor(e.target.value)}
        />

        <button>Send</button>
      </form>
      <div className='books_collection'>
        {books &&
          books.map(book => (
            <div className='book'>
              <h1>
                {book.name} by {book.author}
              </h1>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Books
