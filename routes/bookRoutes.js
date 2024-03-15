// routes/bookRoutes.js

const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// POST /api/books - Create a new book
router.post('/', bookController.createBook);

// GET /api/books - Get all books
router.get('/', bookController.getAllBooks);

// GET /api/books/:id - Get a book by ID
router.get('/:id', bookController.getBookById);

// PUT /api/books/:id - Update a book by ID
router.put('/:id', bookController.updateBook);

// DELETE /api/books/:id - Delete a book by ID
router.delete('/:id', bookController.deleteBook);


module.exports = router;

