var express = require('express');
var createError = require('http-errors');
var router = express.Router();

router.use('/user', require('./user'))
router.user('/page', require('./page'))

router.all('*', function(req, res, next) {
  next(createError(404, '존재하지 않는 페이지 입니다.'));
})

module.exports = router;
