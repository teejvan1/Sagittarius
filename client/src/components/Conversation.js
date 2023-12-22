import axios from 'axios'
import { useEffect, useState } from 'react'
import './Conversation.css'

const Conversation = ({ conversation, currentUser }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const friendId = conversation.members.find(
      member => member !== currentUser._id
    )

    const getUser = async (req, res) => {
      try {
        const res = await axios(`/user/${friendId}`)
        setUser(res.data.user)
      } catch (err) {
        console.log(err)
      }
    }
    getUser()
  }, [currentUser, conversation])
  return (
    <div className='Conversation'>
      <p className='conversationName'>{user?.name}</p>
    </div>
  )
}

export default Conversation
