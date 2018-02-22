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
       return_by: { isBefore: Date.now() }
       }
    }
  )
    .then(function(loans) {
      res.render('loans/loans', { loans: loans, pageTitle: 'Overdue' });
    })
});

/* Get new loan */
router.get('/new', function(req, res, next) {
  res.render('loans/loans_new.pug');
});



module.exports = router;
