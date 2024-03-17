const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BooksSchema = new mongoose.Schema({
  BooksName: { type: String },
  isbn: { type: String },
  rating: { type: Number },
  author: { type: String },
  genre: { type: String }
});

const Book = mongoose.model('Book', BooksSchema);

module.exports = Book;
