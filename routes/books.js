var express = require('express');
var router = express.Router();

/* GET books listing. */
router.get('/', function(req, res, next) {
  res.redirect('/books/all');
});

router.get('/all', function(req, res, next) {
  res.render('books.pug');
});

router.get('/new', function(req, res, next) {
  res.render('new-book.pug');
});

module.exports = router;
