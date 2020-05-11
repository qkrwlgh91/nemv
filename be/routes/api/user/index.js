var express = require('express');
var createError = require('http-errors');
var router = express.Router();

router.get('/', function(req, res, next) {
  const us = [
    {
      name: '김김김',
      age: 14
    },
    {
      name: '이이이',
      age: 24
    }
  ]
  res.send({ users: us })
});

router.get('/confirm', function(req, res, next) {
  res.send({ msg: 'confirm', d: 4 });
});

router.all('*', function(req, res, next) {
  next(createError(404, '존재하지 않는 api 입니다.'));
});

module.exports = router;
