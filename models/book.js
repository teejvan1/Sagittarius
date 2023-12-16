const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  author: {
    type: String,
    required: true,
  },
  postedBy: {
    type: ObjectId,
    ref: 'User',
  },
  upvotes: [{ type: ObjectId, ref: 'User' }],
  downvotes: [{ type: ObjectId, ref: 'User' }],
})

const Book = mongoose.model('Book', bookSchema)

module.exports = Book
