var express = require('express');
var router = express.Router();
var Loan = require('../models').Loan;
var Book = require('../models').Book;
var Patron = require('../models').Patron;
var moment = require('moment');


/************************** GET all loans listing. ************************/
router.get('/', function(req, res, next) {
  Loan.findAll(
    {
     include: [Book, Patron]
   }
  ).then(function(loans) {
    res.render('loans/loans', { loans: loans, pageTitle: 'All Loans' });
  });
});

/************** GET checked out loans listing. ************************/
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

/******************* GET overdue loans listing. ************************/
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

/*************** GET return-book page - update loan ***********************/
router.get('/return:id', function(req, res, next) {
  Loan.find(
    {
     include: [Book, Patron],
     where: { id: req.params.id },
   }
  ).then(function(loan) {
    loan.returned_on = moment().format('YYYY-MM-DD');
    res.render('loans/return_book', { loan: loan, pageTitle: 'Return Book' });
  });
});

/*************** POST return-book page - update loan ***********************/
router.post('/return:id', function(req, res, next) {
  Loan.find({
     include: [Book, Patron],
     where:
      {
        id: req.params.id
      }
    }).then(function(loan) {
        loan.returned_on = req.body.returned_on;
        loan.save().then(function(loan) {
            res.redirect('/loans');
        }).catch(function(err) {
          if(err.name === "SequelizeValidationError") {
            Loan.find(
              {
               include: [Book, Patron],
               where: { id: req.params.id },
             }
            ).then(function(loan) {
              loan.returned_on = moment().format('YYYY-MM-DD');
              res.render('loans/return_book', { loan: loan, pageTitle: 'Return Book', errors: err ? err.errors : [] });
          });
         } else {
            console.log(err);
          }
        });
    });
});

/************************ GET new loan *********************************/
router.get('/new', function(req, res, next) {
  let loan = Loan.build({
    loaned_on: moment().format('YYYY-MM-DD'),
    return_by: moment().add(7, 'days').format('YYYY-MM-DD')
  });
  Book.findAll().then(function(books) {
    let allBooks = books;
    Patron.findAll().then(function(patrons) {
      res.render('loans/loans_new.pug', { books: allBooks, patrons: patrons, loan: loan, pageTitle: 'New Loan' });
    });
  });
});

/**************************** POST new loan *****************************/
router.post('/', function(req, res, next) {
  Loan.create(req.body)
      .then(function(loan) {
        res.redirect('/loans');
      })
      .catch(function(err) {
        if(err.name === "SequelizeValidationError") {
          let loan = Loan.build({
            loaned_on: moment().format('YYYY-MM-DD'),
            return_by: moment().add(7, 'days').format('YYYY-MM-DD')
          });
          Book.findAll().then(function(books) {
            let allBooks = books;
            Patron.findAll().then(function(patrons) {
              res.render('loans/loans_new.pug', { books: allBooks, patrons: patrons, loan: loan, pageTitle: 'New Loan', errors: err ? err.errors : [] });
            });
          });
        } else {
        console.log(err);
      }
      });
});

module.exports = router;
