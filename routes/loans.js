var express = require('express');
var router = express.Router();

/* GET loans listing. */
router.get('/', function(req, res, next) {
  res.render('loans');
});

router.get('/new', function(req, res, next) {
  res.render('new-loan.pug');
});

module.exports = router;
