var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const jwt = require('jsonwebtoken')
const moment = require('moment')
const cfg = require('../../../config')

router.use('/sign', require('./sign'))
router.use('/register', require('./register'))
router.use('/site', require('./site'))

const verifyToken = (t) => {
  return new Promise((resolve, reject) => {
    if (!t) resolve({ id: 'guest', name: '손님', lv: 3 })
    if ((typeof t) !== 'string') reject(new Error('문자가 아닌 토큰입니다.'))
    if (t.length < 20) resolve({ id: 'guest', name: '손님', lv: 3 })
    jwt.verify(t, cfg.jwt.secretKey, (err, v) => {
      if (err) reject(err)
      resolve(v)
    })
  })
}

const signToken = (_id, id, lv, name, exp) => {
  return new Promise((resolve, rejet) => {
    const o = {
      issuer: cfg.jwt.issuer,
      subject: cfg.jwt.subject,
      expiresIn: cfg.jwt.expiresIn, // 3 분
      algorithm: cfg.jwt.algorithm,
      expiresIn: exp
    }
    // if (rmb) o.expiresIn = cfg.jwt.expiresInRemember // 7일
    // jwt.sign({ id, lv, name, rmb }, cfg.jwt.secretKey, o, (err, token) => {
    jwt.sign({ _id, id, lv, name }, cfg.jwt.secretKey, o, (err, token) =>  {
      if (err) reject(err)
      resolve(token)
    })
  })
}

const getToken = async(t) => {
  let vt = await verifyToken(t)
  if (vt.lv > 2) return { user: vt, token: null }
  const diff = moment(vt.exp * 1000).diff(moment(), 'seconds')
  // return vt
  console.log(diff)
  const expSec = (vt.exp - vt.iat)
  if (diff > expSec / cfg.jwt.expiresInDiv) return { user: vt, token: null }

  const nt = await signToken(vt._id, vt.id, vt.lv, vt.name, expSec)
  vt = await verifyToken(nt)
  return { user: vt, token: nt }
}

router.all('*', function(req, res, next) {
  // 토큰 검사
  getToken(req.headers.authorization)
    .then((v) => {
      console.log(v)
      req.user = v.user
      req.token = v.token
      next()
    })
    .catch(e => res.send({ success: false, msg: e.message }))
});

router.use('/page', require('./page'))
router.use('/board', require('./board'))
router.use('/article', require('./article'))
router.use('/manage', require('./manage'))

// router.use('/test', require('./test'))
// router.all('*', function(req, res, next) {
//   if (req.user.lv > 0) return res.send({ success: false, msg: '권한이 없습니다. test'})
//   next()
// })

// router.use('/user', require('./user'))

router.all('*', function(req, res, next) {
  next(createError(404, '존재하지 않는 api 입니다.'));
});

module.exports = router;
