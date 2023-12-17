import React from 'react'
import './EachBlock.css'

const MbtiBlock = ({ title, sentences }) => {
  return (
    <div className='EachBlock'>
      <h2>{title}</h2>
      <ul className='sentence-container'>
        {sentences.map(sentence => (
          <li>{sentence}</li>
        ))}
      </ul>
    </div>
  )
}

export default MbtiBlock
