var express = require('express');
var router = express.Router();

/* GET patrons listing. */
router.get('/', function(req, res, next) {
  res.render('patrons');
});

/* GET new patron listing. */
router.get('/new', function(req, res, next) {
  res.render('new-patron');
});

module.exports = router;
