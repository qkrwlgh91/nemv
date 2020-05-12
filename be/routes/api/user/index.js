var express = require('express');
var createError = require('http-errors');
var router = express.Router();

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

router.get('/', function(req, res, next) {
  console.log(req.query)
  console.log(req.body)
  res.send({ users: us })
});

router.post('/', (req, res, next) => {
  console.log(req.query)
  console.log(req.body)
  res.send({ success: true, msg: 'post ok' })
});

router.put('/', (req, res, next) => {
  console.log(req.query)
  console.log(req.body)
  res.send({ success: true, msg: 'put ok' })
});

router.delete('/', (req, res, next) => {
  console.log(req.query)
  console.log(req.body)
  res.send({ success: true, msg: 'del ok' })
});

router.get('/confirm', function(req, res, next) {
  res.send({ msg: 'confirm', d: 4 });
});

router.all('*', function(req, res, next) {
  next(createError(404, '존재하지 않는 api 입니다.'));
});

module.exports = router;
