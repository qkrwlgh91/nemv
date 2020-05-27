var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const User = require('../../../models/users')

router.post('/', (req, res) => {
  const u = req.body
  if (!u.id) return res.send({ success: false, msg: '아이디가 없습니다.'})
  if (!u.pwd) return res.send({ success: false, msg: '비밀번호가 없습니다.'})
  if (!u.name) return res.send({ success: false, msg: '이름이 없습니다.'})

  User.findOne({ id: u.id })
    .then((r) => {
      if (r) throw new Error('이미 존재하는 아이디입니다.')
      return User.create(u)
    })
    .then((r) => {
      res.send({ success: true, token: r })
    })
    .catch((e) => {
      res.send({ success: false, msg: e.message })
    })
})

router.all('*', function(req, res, next) {
  next(createError(404, '존재하지 않는 페이지입니다.'));
});

module.exports = router;
