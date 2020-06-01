var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const Board = require('../../../models/boards')

router.get('/:name', (req, res, next) => {
  const name = req.params.name
  console.log(name)
  Board.findOne({ name })
    .then(r => {
      // 권한으로 못보게 하려면..
      // if (r.lv < req.lv) return res.send({ success: false, msg: `${name} 게시판을 볼 수 있는 자격이 없습니다.`})
      res.send({ success: true, d: r, token: req.token })
    })
    .catch(e => {
      res.send({ success: false, msg: e.message })
    })
});

router.all('*', function(req, res, next) {
  next(createError(404, '존재하지 않는 board index'));
});

module.exports = router;
