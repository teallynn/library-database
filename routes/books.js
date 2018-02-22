var express = require('express');
var router = express.Router();
var Book = require('../models').Book;
var Loan = require('../models').Loan;
var Patron = require('../models').Patron;

/* GET books listing. */
router.get('/', function(req, res, next) {
  Book.findAll()
    .then(function(books) {
    res.render('books/books', { books: books, pageTitle: 'All Books' });
  })
});

/* GET checked out books listing. */
router.get('/out', function(req, res, next) {
  Loan.findAll({
     include: [Book, Patron],
     where: { returned_on: null }
   }
  )
    .then(function(loans) {
      let books = loans.map((loan) => loan.Book);
      res.render('books/books', { books: books, pageTitle: 'Checked Out' });
  })
});

/* GET overdue books listing. */
router.get('/overdue', function(req, res, next) {
  Loan.findAll({
    include: [Book, Patron],
    where: {
      returned_on: null,
      return_by: { isBefore: Date.now() }
      }
    }
  )
    .then(function(loans) {
      let books = loans.map((loan) => loan.Book);
      res.render('books/books', { books: books, pageTitle: 'Overdue' });
  })
});

router.get('/new', function(req, res, next) {
  res.render('books/books_new');
});

/* GET individual book */
router.get('/:id', function(req, res, next) {
  Book.find({
    include: [
    {
      model: Loan,
        include: [
          {
            model: Patron,
          }
        ]}
    ],
    where:
      {
        id: req.params.id
      }
    })
    .then(function(book) {
      let loans = book.Loans;
      res.render('books/book_detail', { book: book, loans: loans });
  })
});

router.get('/:filter', (req, res) => {
  res.render('');
});

module.exports = router;
