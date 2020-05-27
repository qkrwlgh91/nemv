var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const jwt = require('jsonwebtoken');
const cfg = require('../../../config')

router.use('/sign', require('./sign'))
router.use('/register', require('./register'))
router.use('/site', require('./site'))

const verifyToken = (t) => {
  console.log('t : ' + t)
  return new Promise((resolve, reject) => {
    if (!t) resolve({ id: 'guest', name: '손님', lv: 3 })
    if ((typeof t) !== 'string') reject(new Error('문자가 아닌 토큰입니다.'))
    console.log('t.length : ' + t.length)
    if (t.length < 20) resolve({ id: 'guest', name: '손님', lv: 3 })
    jwt.verify(t, cfg.secretKey, (err, v) => {
      if (err) reject(err)
      resolve(v)
    })
  })
}
router.all('*', function(req, res, next) {
  // 토큰 검사
  const token = req.headers.authorization
  // const token = req.headers.authorization.split(' ')[1]
  verifyToken(token)
    .then(v => {
      req.user = v
      next()
    })
    .catch(e => res.send({ success: false, msg: e.message }))
});
router.use('/page', require('./page'))
router.use('/manage', require('./manage'))

router.use('/test', require('./test'))
router.all('*', function(req, res, next) {
  if (req.user.lv > 0) return res.send({ success: false, msg: '권한이 없습니다. test'})
  next()
})

router.use('/user', require('./user'))

router.all('*', function(req, res, next) {
  next(createError(404, '존재하지 않는 api 입니다.'));
});

module.exports = router;
