var express = require('express');
var router = express.Router();
var Loan = require('../models').Loan;

/* GET all loans listing. */
router.get('/', function(req, res, next) {
  Loan.findAll().then(function(loans) {
    res.render('loans/loans', { loans: loans });
  })

});

router.get('/new', function(req, res, next) {
  res.render('loans/loans_new.pug');
});

module.exports = router;
