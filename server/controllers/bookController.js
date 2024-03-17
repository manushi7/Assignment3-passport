const mongoose = require('mongoose');
var express = require('express');
const Book = require('../models/book'); 

/**
 * Get a list of books
 *
 * @param {Object} req - The request object 
 * @param {res} res - The response object.
 *
 * @returns {Array[Object]} Each Object has a book ID, title and status.
 *
 * @throws statusCode: 500  
 */
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * Get more details about a specific book
 *
 * @param {Object} req - The request object 
 * @param {res} res - The response object.
 *
 * @returns {Array[object]} Each object contains a Book object with
   Book ID, title, description, status, assignedTo
 *
 * @throws statusCode: 500  
 */
exports.getBookById = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        res.json(book);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

/**
 * Create a book 
 *
 * @param {Object} req - The request object 
 * @param {res} res - The response object.
 *
 *
 * @returns {Object} Book 
 * @throws statusCode: 500  
 */
exports.createBook = async (req, res) => {
    console.log('TRYING TO CREATE BOOKS')
  try {
    const { title, genre } = req.body; 
    const newBook = await Book.create({title, genre});

    res.json(newBook);
  } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * Update a book assignee
 *
 * @param {Object} req - The request object 
 * @param {res} res - The response object.
 *
 *
 * @returns {Object} Book 
 * @throws statusCode: 500  
 */
exports.updateBookById = async (req, res) => {
  try {
    const { id } = req.params; 
    const { title, genre } = req.body; 
      const updatedBook = await Book.findAndUpdate(
          id,
          { title, genre },
          { new: true }
      );

    res.json(updatedBook);
  } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Internal Server Error' });
  }
};


exports.deleteBookById = async (req, res) => {
  try {
      const { id } = req.params; 
      const deleteBook = await Book.findByIdAndDelete(id);
      res.json(deleteBook);
  } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Internal Server Error' });
  }
};
