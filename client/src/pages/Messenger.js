import { useEffect, useState, useContext, useRef } from 'react'
import axios from 'axios'
import './Messenger.css'
import { io } from 'socket.io-client'

import Navbar from '../components/Navbar'
import Conversation from '../components/Conversation.js'
import Message from '../components/Message.js'

import { UserContext } from '../App'

const Messenger = () => {
  const [conversations, setConversations] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [arrivalMessage, setArrivalMessage] = useState(null)

  const { state, dispatch } = useContext(UserContext)

  const socket = useRef()
  const scrollRef = useRef()

  useEffect(() => {
    // ws://localhost:4000
    //https://sagittarius-353a4636ce62.herokuapp.com/
    socket.current = io('https://sagittarius-353a4636ce62.herokuapp.com')
    socket.current.on('getMessage', data => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      })
    })
  }, [])

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages(prev => [...prev, arrivalMessage])
  }, [arrivalMessage, currentChat])

  useEffect(() => {
    socket.current.emit('addUser', state?._id)
  }, [state])

  useEffect(() => {
    const getConversations = () => {
      fetch(`/conversations/${state?._id}`, {
        method: 'get',
      })
        .then(res => res.json())
        .then(result => {
          setConversations(result)
        })
        .catch(err => console.log(err))
    }
    getConversations()
  }, [state])

  useEffect(() => {
    const getMessages = () => {
      fetch(`/messages/${currentChat?._id}`, {
        method: 'get',
      })
        .then(res => res.json())
        .then(result => {
          setMessages(result)
        })
        .catch(err => console.log(err))
    }
    getMessages()
  }, [currentChat])

  const handleSubmit = async e => {
    e.preventDefault()
    const message = {
      sender: state._id,
      text: newMessage,
      conversationId: currentChat._id,
    }

    const receiverId = currentChat.members.find(member => member !== state._id)

    socket.current.emit('sendMessage', {
      senderId: state._id,
      receiverId,
      text: newMessage,
    })

    try {
      const res = await axios.post('/messages', message)
      setMessages([...messages, res.data])
      setNewMessage('')
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  })

  return (
    <div className='Messenger'>
      <Navbar />
      <div className='messenger-container'>
        <div className='chatMenu'>
          <div className='chatMenuWrapper'>
            {conversations.map(conversation => (
              <div
                key={conversation._id}
                onClick={() => setCurrentChat(conversation)}
              >
                <Conversation conversation={conversation} currentUser={state} />
              </div>
            ))}
          </div>
        </div>

        <div className='chatBox'>
          <div className='chatBoxWrapper'>
            {currentChat ? (
              <>
                <div className='chatBoxTop'>
                  {messages.map(message => (
                    <div key={message._id} ref={scrollRef}>
                      <Message
                        message={message}
                        own={message.sender === state._id}
                      />
                    </div>
                  ))}
                </div>
                <div className='chatBoxBottom'>
                  <textarea
                    className='chatMessageInput'
                    placeholder='Write Something...'
                    onChange={e => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className='chatSubmitButton' onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span>Open a conversation to start a chat</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Messenger
