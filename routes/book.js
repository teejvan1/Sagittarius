const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const Book = require('../models/book')

router.post('/addbook', requireLogin, (req, res) => {
  const { name, author } = req.body

  if (!name || !author) {
    return res.status(422).json({ error: 'Please add all the fields' })
  }

  req.user.password = undefined

  const book = new Book({
    name,
    author,
    postedBy: req.user,
  })

  book
    .save()
    .then(result => {
      res.json({ book: result })
    })
    .catch(err => console.log(err))
})

router.get('/allbooks', (req, res) => {
  Book.find()
    .populate('postedBy', '_id name')
    .then(books => {
      books.sort(
        (a, b) =>
          b.upvotes.length -
          b.downvotes.length -
          (a.upvotes.length - a.downvotes.length)
      )

      res.json({ books })
    })
    .catch(err => {
      console.log(err)
    })
})

router.get('/mybooks', requireLogin, (req, res) => {
  Book.find({ postedBy: req.user._id })
    .populate('postedBy', '_id name')
    .then(mybooks => {
      res.json({ mybooks })
    })
    .catch(err => {
      console.log(err)
    })
})

router.put('/upvote', requireLogin, (req, res) => {
  Book.findByIdAndUpdate(
    req.body.bookId,
    {
      $push: { upvotes: req.user._id },
    },
    {
      new: true,
    }
  )
    .then(result => {
      res.json(result)
    })
    .catch(err => {
      return res.status(422).json({ error: err })
    })
  // .exec((err, result) => {
  //   if (err) {
  //     return res.status(422).json({ error: err })
  //   } else {
  //     res.json(result)
  //   }
  // })
})

router.put('/undoupvote', requireLogin, (req, res) => {
  Book.findByIdAndUpdate(
    req.body.bookId,
    {
      $pull: { upvotes: req.user._id },
    },
    {
      new: true,
    }
  )
    .then(result => {
      res.json(result)
    })
    .catch(err => {
      return res.status(422).json({ error: err })
    })
})

router.put('/downvote', requireLogin, (req, res) => {
  Book.findByIdAndUpdate(
    req.body.bookId,
    {
      $push: { downvotes: req.user._id },
    },
    {
      new: true,
    }
  )
    .then(result => {
      res.json(result)
    })
    .catch(err => {
      return res.status(422).json({ error: err })
    })
})

router.put('/undodownvote', requireLogin, (req, res) => {
  Book.findByIdAndUpdate(
    req.body.bookId,
    {
      $pull: { downvotes: req.user._id },
    },
    {
      new: true,
    }
  )
    .then(result => {
      res.json(result)
    })
    .catch(err => {
      return res.status(422).json({ error: err })
    })
})

router.delete('/deletebook/:bookId', requireLogin, (req, res) => {
  Book.findOne({ _id: req.params.bookId })
    .populate('postedBy', '_id')
    .then(book => {
      if (!book) {
        return res.status(422).json({ error: err })
      }

      if (book.postedBy._id.toString() === req.user._id.toString()) {
        book
          .deleteOne()
          .then(result => {
            res.json(result)
          })
          .catch(err => {
            console.log(err)
          })
      }
    })
    .catch(err => {
      return res.status(422).json({ error: err })
    })
})

module.exports = router
