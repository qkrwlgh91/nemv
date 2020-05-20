var express = require('express');
var createError = require('http-errors');
var router = express.Router();

router.all('*', function(req, res, next) {
  console.log(req.hearders);
  console.log(req.path);
  if (req.path === '/xxx') return res.send({ status: 'OK' })
  next();
});

router.get('/hello', function(req, res, next) {
  res.send({ msg: 'hello', b: 2 });
});

router.use('/test', require('./test'))
router.use('/user', require('./user'))

router.all('*', function(req, res, next) {
  next(createError(404, '존재하지 않는 api 입니다.'));
});

module.exports = router;
