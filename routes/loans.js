var express = require('express');
var router = express.Router();
var Loan = require('../models').Loan;
var Book = require('../models').Book;
var Patron = require('../models').Patron;


/* GET all loans listing. */
router.get('/', function(req, res, next) {
  Loan.findAll(
    {
     include: [Book, Patron]
   }
  ).then(function(loans) {
    res.render('loans/loans', { loans: loans, pageTitle: 'All Loans' });
  });
});

/* GET checked out loans listing. */
router.get('/out', function(req, res, next) {
  Loan.findAll(
    {
     include: [Book, Patron],
     where: { returned_on: null }
    }
  )
    .then(function(loans) {
      res.render('loans/loans', { loans: loans, pageTitle: 'Checked Out' });
    })
});

/* GET overdue loans listing. */
router.get('/overdue', function(req, res, next) {
  Loan.findAll(
    {
     include: [Book, Patron],
     where: {
       returned_on: null,
       return_by: { $lt: Date.now() }
       }
    }
  )
    .then(function(loans) {
      res.render('loans/loans', { loans: loans, pageTitle: 'Overdue' });
    })
});

/*GET return book page - update loan */
router.get('/return:id', function(req, res, next) {
  Loan.find(
    {
     include: [Book, Patron],
     where: { id: req.params.id }
   }
  ).then(function(loan) {
    let date = new Date();
    let day = date.getDate();
    let week = day + 7;
    let month = (date.getMonth() < 10 ? '0' : '') + (date.getMonth() + 1);
    let year = date.getFullYear();
    let today = year + '-' + month + '-' + day;
    res.render('loans/return_book', { loan: loan, pageTitle: 'Return Book', today: today });
  });
});

/* GET new loan */
router.get('/new', function(req, res, next) {
  Book.findAll().then(function(books) {
    let allBooks = books;
    let date = new Date();
    let day = date.getDate();
    let week = day + 7;
    let month = (date.getMonth() < 10 ? '0' : '') + (date.getMonth() + 1);
    let year = date.getFullYear();
    let today = year + '-' + month + '-' + day;
    let nextWeek = year + '-' + month + '-' + week;
    Patron.findAll().then(function(patrons) {
      res.render('loans/loans_new.pug', { books: allBooks, patrons: patrons, today: today, nextWeek: nextWeek });
    });
  });
});


/* POST new loan */
router.get('/new', function(req, res, next) {
  res.render('loans/loans_new.pug');
});


module.exports = router;
