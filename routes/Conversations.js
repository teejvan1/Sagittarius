const express = require('express')
const router = express.Router()

const Conversation = require('../models/Conversation')
const requireLogin = require('../middleware/requireLogin')

router.post('/conversations', requireLogin, async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  })
  try {
    const savedConversation = await newConversation.save()
    res.status(200).json(savedConversation)
  } catch (err) {
    res.status(500).json(err)
  }
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
