var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/garage', function (req, res, next) {
  res.render('index');
});

router.get('/cool', function (req, res, next) {
  res.send('youre so cool!');
});

module.exports = router;
