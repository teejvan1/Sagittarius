const express = require('express')
const router = express.Router()

const Conversation = require('../models/Conversation')
const requireLogin = require('../middleware/requireLogin')

router.post('/conversations', (req, res) => {
  const { senderId, receiverId } = req.body
  Conversation.findOne({ members: [senderId, receiverId] })
    .then(existingConversation => {
      if (existingConversation) {
        return res.json({ message: 'Conversation already exists' })
      }
      const newConversation = new Conversation({
        members: [senderId, receiverId],
      })
      newConversation
        .save()
        .then(savedConversation => {
          res.json(savedConversation)
        })
        .catch(err => {
          console.log(err)
        })
    })
    .catch(err => {
      console.log(err)
    })
})

router.get('/conversations/:userId', async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    })
    res.status(200).json(conversation)
  } catch (errr) {
    res.status(500).json(err)
  }
})

router.get(
  '/conversations/find/:firstUserId/:secondUserId',
  async (req, res) => {
    try {
      const conversation = await Conversation.findOne({
        members: { $all: [req.params.firstUserId, req.params.secondUserId] },
      })
      res.status(200).json(conversation)
    } catch (err) {
      res.status(500).jsom(err)
    }
  }
)

module.exports = router
