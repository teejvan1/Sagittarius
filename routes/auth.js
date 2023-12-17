const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/keys')

router.post('/signup', (req, res) => {
  const { name, email, password, mbti, sunsign } = req.body
  if (!name || !email || !password || !mbti || !sunsign) {
    return res.status(422).json({ error: 'please add all the fields' })
  }
  User.findOne({ email: email })
    .then(savedUser => {
      if (savedUser) {
        return res
          .status(422)
          .json({ error: 'User already exists with that email' })
      }
      bcrypt.hash(password, 8).then(hashedPassword => {
        const user = new User({
          name,
          email,
          password: hashedPassword,
          mbti,
          sunsign,
        })
        user
          .save()
          .then(user => {
            res.json({ message: 'saved successfully' })
          })
          .catch(err => {
            console.log(err)
          })
      })
    })
    .catch(err => {
      console.log(err)
    })
})

router.post('/login', (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(422).json({ error: 'please add email or password' })
  }
  User.findOne({ email: email })
    .then(savedUser => {
      if (!savedUser) {
        return res.status(422).json({ error: ' Invalid Email' })
      }
      bcrypt.compare(password, savedUser.password).then(doMatch => {
        if (doMatch) {
          const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET)
          const { _id, name, email, mbti, sunsign } = savedUser
          res.json({ token, user: { _id, name, email, mbti, sunsign } })
        } else {
          return res.status(422).json({ error: ' Invalid password' })
        }
      })
    })
    .catch(err => {
      console.log(err)
    })
})

module.exports = router
