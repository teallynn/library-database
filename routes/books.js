var express = require('express');
var router = express.Router();
var Book = require('../models').Book;

/* GET books listing. */
router.get('/', function(req, res, next) {
  Book.findAll().then(function(books) {
    res.render('books/books', { books: books });
  })
});

router.get('/new', function(req, res, next) {
  res.render('books/books_new');
});

router.get('/:filter', (req, res) => {
  res.render('');
});

module.exports = router;
