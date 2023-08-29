import React from 'react'
import { Link } from 'react-router-dom'

import './Home.css'
import section1 from '../images/section1.webp'
import section2 from '../images/section2.webp'
import section3 from '../images/section3.webp'
import section4 from '../images/section4.webp'

function Home() {
  return (
    <div className='Home'>
      <div className='Home_Header'>
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
      <h1 className='Homeh1'>Welcome to the world of Sagittarians</h1>
      <section className='section1'>
        <div className='section1_div section1_img'>
          <img src={section1} alt='' />
        </div>
        <div className='section1_div section1_text'>
          <p>
            Sagittarius, also known as the Archer, is represented by the symbol
            of a bow and arrow. He shoots his arrow at some distant goal,
            gallops off in pursuit, and when he finds his arrow shoots it again,
            always keeping on the move. As an archer, Sagittarius is said never
            to fail in hitting the mark and this depiction alludes to the power
            of prophecy, hence, the claim that seers and prophets are born in
            this sign.
          </p>
        </div>
      </section>

      <section className='section2'>
        <div className='section2_div section2_text'>
          <p>
            Sagittarius generally love travelling, seeing new places and meeting
            new people. If you are a Sagittarius, you will probably find that as
            you grow older you want to travel. Sagittarius people need plenty of
            freedom, because they want to experience as much of life as they
            can. They are unhappy when tied down to a routine, and happiest when
            starting off on something new.
          </p>
        </div>
        <div className='section2_div section2_img'>
          <img src={section2} alt='' />
        </div>
      </section>

      <section className='section3'>
        <div className='section3_div section3_img'>
          <img src={section3} alt='' />
        </div>
        <div className='section3_div section3_text'>
          <p>
            When somebody needs help, they will do immediately what is needed
            and they do not expect gratitude or anything in return. They do not
            need much money for themselves because they do not have the need to
            show off and they are definitely not systematic money savers. They
            defend their pride even at the cost of material losses. They spoil
            their "image" by their uncompromising fight for justice when they
            cannot restrain themselves from aggressive behaviour. Other people
            around them often fail to notice that they hardly ever fight for
            themselves.
          </p>
        </div>
      </section>

      <section className='section4'>
        <div className='section4_div section4_text'>
          <p>
            Sagittarius is ruled by expansive Jupiter, the largest planet in our
            solar system. As a result, this sign can be “larger than life.”
            Jupiter is one of the gas giants. Jupiter was the most widely
            revered god in ancient Roman times, often referred to as Jupiter
            Optimus Maximus (literally translating to “all good” and “all
            powerful”). Not surprisingly, his was the largest temple in Rome. In
            fact, Jupiter was the mythic god of the feast.
          </p>
        </div>
        <div className='section4_div section4_img'>
          <img src={section4} alt='' />
        </div>
      </section>

      <footer className='footer'>
        Social Links:
        <a href='https://www.facebook.com/sagittarius1111'>
          <ion-icon name='logo-facebook'></ion-icon>
        </a>
      </footer>
    </div>
  )
}

export default Home
