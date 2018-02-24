var express = require('express');
var router = express.Router();
var Patron = require('../models').Patron;
var Book = require('../models').Book;
var Loan = require('../models').Loan;


/**************************** GET patrons listing. **************************/
router.get('/', function(req, res, next) {
  Patron.findAll().then(function(patrons) {
    res.render('patrons/patrons', { patrons: patrons });
  })

});

/********************** GET new patron form ******************************/
router.get('/new', function(req, res, next) {
  let patron = Patron.build();
  res.render('patrons/patrons_new', { patron: patron, pageTitle: 'New Patron' });
});

/************************* POST create new patron *************************/
router.post('/', function(req, res, next) {
  Patron.create(req.body)
        .then(function(patron) {
          res.redirect('/patrons');
        })
        .catch(function(err) {
          if(err.name === "SequelizeValidationError") {
            let patron = Patron.build();
            res.render('patrons/patrons_new', { patron: patron, pageTitle: 'New Patron', errors: err ? err.errors : [] });
          } else {
          console.log(err);
        };
        });
});

/************************* GET individual patron ****************************/
router.get('/:id', function(req, res, next) {
  Patron.find({
    include: [
    {
      model: Loan,
        include: [Book, Patron]
      }
    ],
    where:
      {
        id: req.params.id
      }
    }).then(function(patron) {
      let loans = patron.Loans;
      res.render('patrons/patron_detail', { patron: patron, loans: loans });
  });
});

/************************* POST update patron ****************************/
router.post('/:id', function(req, res, next) {
  Patron.find({
    include: [
    {
      model: Loan,
        include: [Book, Patron]
      }
    ],
    where:
      {
        id: req.params.id
      }
    }).then(function(patron) {
      return patron.update(req.body);
    }).then(function(patron) {
      res.redirect('/patrons');
    }).catch(function(err) {
      if(err.name === "SequelizeValidationError") {
        Patron.find({
          include: [
          {
            model: Loan,
              include: [Book, Patron]
            }
          ],
          where:
            {
              id: req.params.id
            }
          }).then(function(patron) {
            let loans = patron.Loans;
            res.render('patrons/patron_detail', { patron: patron, loans: loans, errors: err ? err.errors : [] });
        });
      } else {
      console.log(err);
    };
    });
});

module.exports = router;
