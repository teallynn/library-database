var express = require('express');
var router = express.Router();
var Patron = require('../models').Patron;
var Book = require('../models').Book;
var Loan = require('../models').Loan;


/* GET patrons listing. */
router.get('/', function(req, res, next) {
  Patron.findAll().then(function(patrons) {
    res.render('patrons/patrons', { patrons: patrons });
  })

});

/* POST create new patron */
router.post('/', function(req, res, next) {
  Patron.create(req.body).then(function(patron) {
    res.redirect('/patrons/' + patron.id);
  });
});


/* Create new patron form */
router.get('/new', function(req, res, next) {
  res.render('patrons/patrons_new', { patron: {} });
});


/* GET individual patron */
router.get('/:id', function(req, res, next) {
  Patron.find({
    include: [
    {
      model: Loan,
        include: [
          {
            model: Book,
          }
        ]}
    ],
    where:
      {
        id: req.params.id
      }
    }).then(function(patron) {
      let loans = patron.Loans;
      res.render('patrons/patron_detail', { patron: patron, loans: loans });
  })
});


module.exports = router;
