import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import './Books.css'
import Navbar from '../components/Navbar'
import Heading from '../components/Heading'

import { UserContext } from '../App'

function Books() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [author, setAuthor] = useState('')
  const [data, setData] = useState([])

  const { state, dispatch } = useContext(UserContext)

  useEffect(() => {
    fetch('/allbooks', {
      method: 'get',
    })
      .then(res => res.json())
      .then(result => {
        setData(result.books)
      })
  }, [])

  const addBook = e => {
    e.preventDefault()
    fetch('/addbook', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        name,
        author,
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
        } else {
          window.location.reload()
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  const upvoteBook = id => {
    fetch('/upvote', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        bookId: id,
      }),
    })
      .then(res => res.json())
      .then(result => {
        const newData = data.map(item => {
          if (item._id === result._id) {
            return result
          } else {
            return item
          }
        })
        setData(newData)
      })
      .catch(err => console.log(err))
  }

  const undoUpvoteBook = id => {
    fetch('/undoupvote', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        bookId: id,
      }),
    })
      .then(res => res.json())
      .then(result => {
        const newData = data.map(item => {
          if (item._id === result._id) {
            return result
          } else {
            return item
          }
        })
        setData(newData)
      })
      .catch(err => console.log(err))
  }

  const downvoteBook = id => {
    fetch('/downvote', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        bookId: id,
      }),
    })
      .then(res => res.json())
      .then(result => {
        const newData = data.map(item => {
          if (item._id === result._id) {
            return result
          } else {
            return item
          }
        })
        setData(newData)
      })
      .catch(err => console.log(err))
  }

  const undoDownvoteBook = id => {
    console.log('undodownvoted')
    fetch('/undodownvote', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        bookId: id,
      }),
    })
      .then(res => res.json())
      .then(result => {
        const newData = data.map(item => {
          if (item._id === result._id) {
            return result
          } else {
            return item
          }
        })
        setData(newData)
      })
      .catch(err => console.log(err))
  }

  const deleteBook = bookId => {
    fetch(`/deletebook/${bookId}`, {
      method: 'delete',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
      .then(res => res.json)
      .then(result => {
        const newData = data.filter(item => {
          return item._id !== result._id
        })
        setData(newData)
        window.location.reload()
      })
  }

  return (
    <div className='Books'>
      <Navbar />
      <Heading text='Share your favorite books' bg='#14B694' />
      <form className='books_upload' onSubmit={e => addBook(e)}>
        <label htmlFor='name'> Name of the book</label>
        <input
          type='text'
          id='name'
          name='name'
          placeholder='Enter the name of the book'
          autoComplete='off'
          required
          onChange={e => setName(e.target.value)}
        />

        <label htmlFor='author'> Author of the book</label>
        <input
          type='text'
          id='author'
          name='author'
          placeholder='Enter the name of the author'
          autoComplete='off'
          required
          onChange={e => setAuthor(e.target.value)}
        />

        <button>Share</button>
      </form>

      <div className='books_collection'>
        {data.map(item => (
          <div key={item._id} className='book_space'>
            <div className='book'>
              <h1>{item.name}</h1>
              <h2>{item.author}</h2>

              <div className='upvote-box'>
                <div className='delete'>
                  {state && item.postedBy._id === state._id && (
                    <svg
                      height='32'
                      width='32'
                      viewBox='0 0 448 512'
                      xmlns='http://www.w3.org/2000/svg'
                      onClick={() => deleteBook(item._id)}
                    >
                      <path d='M53.21 467c1.562 24.84 23.02 45 47.9 45h245.8c24.88 0 46.33-20.16 47.9-45L416 128H32L53.21 467zM432 32H320l-11.58-23.16c-2.709-5.42-8.25-8.844-14.31-8.844H153.9c-6.061 0-11.6 3.424-14.31 8.844L128 32H16c-8.836 0-16 7.162-16 16V80c0 8.836 7.164 16 16 16h416c8.838 0 16-7.164 16-16V48C448 39.16 440.8 32 432 32z' />
                    </svg>
                  )}
                </div>

                {state ? (
                  item.upvotes.includes(state._id) ? (
                    <>
                      <svg
                        className='svg'
                        height='32'
                        viewBox='0 0 24 24'
                        width='32'
                        xmlns='http://www.w3.org/2000/svg'
                        onClick={() => undoUpvoteBook(item._id)}
                      >
                        <path d='M4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14z' />
                      </svg>
                      <p>{item.upvotes.length - item.downvotes.length}</p>
                      <svg
                        className='svg'
                        height='32'
                        viewBox='0 0 24 24'
                        width='32'
                        xmlns='http://www.w3.org/2000/svg'
                        onClick={() => {
                          undoUpvoteBook(item._id)
                          downvoteBook(item._id)
                        }}
                      >
                        <path d='M20.901 10.566A1.001 1.001 0 0 0 20 10h-4V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v7H4a1.001 1.001 0 0 0-.781 1.625l8 10a1 1 0 0 0 1.562 0l8-10c.24-.301.286-.712.12-1.059zM12 19.399 6.081 12H10V4h4v8h3.919L12 19.399z' />
                      </svg>
                    </>
                  ) : item.downvotes.includes(state._id) ? (
                    <>
                      <svg
                        className='svg'
                        height='32'
                        viewBox='0 0 24 24'
                        width='32'
                        xmlns='http://www.w3.org/2000/svg'
                        onClick={() => {
                          upvoteBook(item._id)
                          undoDownvoteBook(item._id)
                        }}
                      >
                        <path d='M12.781 2.375c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10zM15 12h-1v8h-4v-8H6.081L12 4.601 17.919 12H15z' />
                      </svg>
                      <p>{item.upvotes.length - item.downvotes.length}</p>
                      <svg
                        className='svg'
                        height='32'
                        viewBox='0 0 24 24'
                        width='32'
                        xmlns='http://www.w3.org/2000/svg'
                        onClick={() => undoDownvoteBook(item._id)}
                      >
                        <path d='M20.901 10.566A1.001 1.001 0 0 0 20 10h-4V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v7H4a1.001 1.001 0 0 0-.781 1.625l8 10a1 1 0 0 0 1.562 0l8-10c.24-.301.286-.712.12-1.059z' />
                      </svg>
                    </>
                  ) : (
                    <>
                      <svg
                        className='svg'
                        height='32'
                        viewBox='0 0 24 24'
                        width='32'
                        xmlns='http://www.w3.org/2000/svg'
                        onClick={() => upvoteBook(item._id)}
                      >
                        <path d='M12.781 2.375c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10zM15 12h-1v8h-4v-8H6.081L12 4.601 17.919 12H15z' />
                      </svg>
                      <p>{item.upvotes.length - item.downvotes.length}</p>
                      <svg
                        className='svg'
                        height='32'
                        viewBox='0 0 24 24'
                        width='32'
                        xmlns='http://www.w3.org/2000/svg'
                        onClick={() => downvoteBook(item._id)}
                      >
                        <path d='M20.901 10.566A1.001 1.001 0 0 0 20 10h-4V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v7H4a1.001 1.001 0 0 0-.781 1.625l8 10a1 1 0 0 0 1.562 0l8-10c.24-.301.286-.712.12-1.059zM12 19.399 6.081 12H10V4h4v8h3.919L12 19.399z' />
                      </svg>
                    </>
                  )
                ) : (
                  <p>
                    {item.upvotes.length - item.downvotes.length >= 0
                      ? item.upvotes.length - item.downvotes.length + ' upvote'
                      : item.downvotes.length -
                        item.upvotes.length +
                        ' downvote'}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Books
