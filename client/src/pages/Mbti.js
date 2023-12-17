import React from 'react'
import './Mbti.css'
import Navbar from '../components/Navbar'
import Heading from '../components/Heading'
import MbtiBlock from '../components/EachBlock'

const extrovert = [
  'Gain energy or ‘recharge’ through social interaction.',
  'Enjoy having a wide circle of friends and acquaintances.',
  'Generally feel comfortable in the company of others.',
  'Are perceived as ‘outgoing’ or sociable by others.',
]

const introvert = [
  'Gain energy or ‘recharge’ through alone time.',
  'Prefer to maintain a small circle of close friends.',
  'Generally feel most comfortable while alone.',
  'Are perceived as quiet or reserved by others.',
]

const intuitive = [
  'Are ‘big pictures’ thinkers.',
  'Are quick to recognize patterns and make connections between abstract ideas.',
  'Are more concerned with theories than with concrete facts and observations.',
  'Focus the majority of their attention on conceptualizing future possibilities.',
]

const sensor = [
  'Prefer dealing with the physical world of objects to the intangible world of ideas.',
  'Are realistic and down-to-earth in their observations.',
  'Prefer learning facts first and theory second.',
  'Focus the majority of their attention on either the past or the present moment.',
]

const feeler = [
  'Prefer to make decisions based on how they feel.',
  'Value interpersonal harmony extremely highly.',
  'Are naturally in tune with the feelings of others.',
  'Are more comfortable dealing with feelings than with ‘cold, hard facts’.',
]

const thinker = [
  'Prefer to make decisions based on logic.',
  'Value accuracy over harmony.',
  'Are not naturally in tune with the feelings of others.',
  'Feel more comfortable dealing with hard logic and facts than with emotions.',
]

const perceiver = [
  'Prefer to leave decisions open-ended.',
  'Work in bursts of energy (often as a deadline approaches).',
  'Feel trapped inside of strict plans or routines.',
  'Prefer exploring various possibilities to settling on just one option',
]

const judger = [
  'Enjoy having decisions made.',
  'Work toward goals steadily and consistently.',
  'Enjoy following specific plans or routines.',
  'Prefer settling on one option to exploring various possibilities.',
]

const mbti = () => {
  return (
    <div className='Mbti'>
      <Navbar />

      <div className='block-container'>
        <MbtiBlock title='E is for Extrovert' sentences={extrovert} />
        <MbtiBlock title='I is for Introvert' sentences={introvert} />
        <MbtiBlock title='N is for Intuitive' sentences={intuitive} />
        <MbtiBlock title='S is for Sensor' sentences={sensor} />
        <MbtiBlock title='F is for Feeler' sentences={feeler} />
        <MbtiBlock title='T is for Thinker' sentences={thinker} />
        <MbtiBlock title='P is for Perceiver' sentences={perceiver} />
        <MbtiBlock title='J is for Judger' sentences={judger} />
      </div>
    </div>
  )
}

export default mbti
