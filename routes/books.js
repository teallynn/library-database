var express = require('express');
var router = express.Router();
var Book = require('../models').Book;
var Loan = require('../models').Loan;
var Patron = require('../models').Patron;

/**************************** GET books listing. *************************/
router.get('/', function(req, res, next) {
  Book.findAll()
    .then(function(books) {
    res.render('books/books', { books: books, pageTitle: 'All Books' });
  })
});

/************************ GET checked out books listing.*******************/
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

/*********************** GET overdue books listing.**********************/
router.get('/overdue', function(req, res, next) {
  Loan.findAll({
    include: [Book, Patron],
    where: {
      returned_on: null,
      return_by: { $lt: Date.now() }
      }
    }
  )
    .then(function(loans) {
      let books = loans.map((loan) => loan.Book);
      res.render('books/books', { books: books, pageTitle: 'Overdue' });
  })
});

/***************************** GET new book form.***********************/
router.get('/new', function(req, res, next) {
  let book = Book.build();
  res.render('books/books_new', { book: book, pageTitle: 'New Book' });
});

/***************************** POST new book form.***********************/
router.post('/', function(req, res, next) {
  Book.create(req.body)
      .then(function(book) {
        res.redirect('/books');
      })
      .catch(function(err) {
        if(err.name === "SequelizeValidationError") {
          let book = Book.build();
          res.render('books/books_new', { book: book, pageTitle: 'New Book', errors: err ? err.errors : [] });
        } else {
          console.log(err);
      }
      });
});

/********************** GET individual book details ***********************/
router.get('/:id', function(req, res, next) {
  Book.find({
    include: [
    {
      model: Loan,
        include: [Patron, Book]}
    ],
    where:
      {
        id: req.params.id
      }
    })
    .then(function(book) {
      let loans = book.Loans;
      res.render('books/book_detail', { book: book, loans: loans });
  });
});

/**************************** POST update book ***************************/
router.post('/:id', function(req, res, next){
  Book.find({
    include: [
    {
      model: Loan,
        include: [Patron, Book]}
    ],
    where:
      {
        id: req.params.id
      }
    })
    .then(function(book){
      return book.update(req.body);
  }).then(function(book){
    res.redirect('/books');
  }).catch(function(err){
    if(err.name === "SequelizeValidationError") {
      Book.find({
        include: [
        {
          model: Loan,
            include: [Patron, Book]}
        ],
        where:
          {
            id: req.params.id
          }
        })
        .then(function(book) {
          let loans = book.Loans;
          res.render('books/book_detail', { book: book, loans: loans, errors: err ? err.errors : [] });
      });
    } else {
      console.log(err);
    }
   });
});

module.exports = router;
