const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const Book = require('../models/book')
const User = require('../models/user')

router.get('/user/:id', (req, res) => {
  User.findOne({ _id: req.params.id })
    .select('-password')
    .then(user => {
      Book.find({ postedBy: req.params.id })
        .populate('postedBy', '_id name')
        .then(books => {
          res.json({ user, books })
        })
        .catch(err => {
          return res.status(422).json({ error: err })
        })
    })
    .catch(err => {
      return res.status(404).json({ error: 'user not found' })
    })
})

router.get('/makefriends', (req, res) => {
  User.find({ sunsign: 'sagittarius' })
    .select('-password')
    .sort('-createdAt')
    .then(users => {
      res.json({ users })
    })
    .catch(err => {
      console.log(err)
    })
})

module.exports = router
