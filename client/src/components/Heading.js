import React from 'react'
import './Heading.css'

const Heading = props => {
  return (
    <div className='Heading'>
      <h1
        style={{ backgroundColor: props.bg, marginTop: props.marginTop }}
        className='Homeh1'
      >
        {props.text}
      </h1>
    </div>
  )
}

export default Heading
