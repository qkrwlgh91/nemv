var express = require('express');
var createError = require('http-errors');
var router = express.Router();

router.get('/', function(req, res, next) {
  console.log(req.headers);
  res.send({ msg: 'test main', c: 3 });
});

router.get('/confirm', function(req, res, next) {
  res.send({ msg: 'confirm', d: 4 });
});

router.all('*', function(req, res, next) {
  next(createError(404, '존재하지 않는 api 입니다.'));
});

module.exports = router;
