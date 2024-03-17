const express = require('express');
const router = express.Router();

const middleware = require('../../middleware');
const bookController = require('../../controllers/bookController');

/**
 * Get a list of books
 */
router.get(
    '/books',
    middleware.isAuthenticated,
    bookController.getAllBooks
);

/**
 * Get more details about a specific book
 */
router.get(
    '/books/:bookId',
    middleware.isAuthenticated,
    bookController.getBookById
);

/**
 * Create a new book book
 */
router.post(
    '/books',
    middleware.isAuthenticated,
    bookController.createBook
);

/**
 * Update a book 
 */
router.put(
    '/books/:id',
    middleware.isAuthenticated,
    bookController.updateBookById
);


/**
 * Delete a book 
 */
router.delete(
    '/books/:id',
    middleware.isAuthenticated,
    bookController.deleteBookById
);

module.exports = router;
