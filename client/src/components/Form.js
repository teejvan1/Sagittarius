import React, { useState } from 'react'
import { socket } from '../socket'

import './Form.css'

const Form = () => {
  const [value, setValue] = useState('')

  function onSubmit(event) {
    event.preventDefault()
    setValue('')
    socket.emit('text', event.target[0].value)
  }

  return (
    <form className='Form' onSubmit={onSubmit}>
      <input
        required
        autoFocus
        value={value}
        placeholder='Type your message here...'
        onChange={e => setValue(e.target.value)}
      />
      <button type='submit'>Send</button>
    </form>
  )
}

export default Form
