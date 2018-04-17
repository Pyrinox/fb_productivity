var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html');
});


router.get('/overview', function(req, res, next) {
	console.log("HLSKJFLKSDJFLSss")
	res.render('overview.html')
});

module.exports = router;
