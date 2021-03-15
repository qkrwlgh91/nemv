var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const Board = require('../../../models/boards')
const Article = require('../../../models/articles')

router.post('/:_board', (req, res, next) => {
  const _board = req.params._board
  if (!_board) return res.send({ success: false, msg: '게시판이 선택되지 않았습니다' }) // 나중에 400 bad request 처리 예제
  const { title, content } = req.body
  Board.findOne({ _id: _board })
    .then(r => {
      if (!r) return res.send({ success: false, msg: '잘못된 게시판입니다' })
      if (r.lv < req.user.lv) return res.send({ success: false, msg: '권한이 없습니다' })
      const atc = {
        title,
        content,
        _board,
        ip: req.ip,
        _user: null
      }
      if (req.user._id) atc._user = req.user._id
      return Article.create(atc)
    })
    .then(r => {
      res.send({ success: true, d: r, token: req.token })
    })
    .catch(e => {
      res.send({ success: false, msg: e.message })
    })
})

router.get('/list/:_board', (req, res, next) => {
  const _board = req.params._board

  const f = {}
  if (_board) f._board = _board

  Article.find(f).select('_content').populate('_user', '-pwd')
    .then(rs => {
      res.send({ success: true, ds: rs, token: req.token })
    })
    .catch(e => {
      res.send({ success: false, msg: e.message })
    })
});

router.get('/read/:_id', (req, res, next) => {
  const _id = req.params._id

  Article.findById(_id).select('content')
    .then(r => {
      res.send({ success: true, d: r, token: req.token })
    })
    .catch(e => {
      res.send({ success: false, msg: e.message })
    })
})

router.put('/:_id', (req, res, next) => {
  if (!req.user._id) return res.send({ success: false, msg: '손님은 수정이 안돼요' })
  const _id = req.params._id
  Article.findById(_id)
    .then(r => {
      if (!r) throw new Error('게시물이 없습니다.')
      if (r._user.toString() !== req.user._id) throw new Error('본인 작성 게시물만 수정가능 합니다.')
      return Article.findOneAndUpdate({ _id }, { $set: req.body }, { new: true })
    })
    .then(r => {
      res.send({ success: true, d: r, token: req.token })
    })
    .catch(e => {
      res.send({ success: false, msg: e.message })
    })
})

router.delete('/:_id', (req, res, next) => {
  if (!req.user._id) return res.send({ success: false, msg: '손님은 삭제가 안돼요' })
  const _id = req.params._id
  Article.findById(_id).populate('_user', 'lv')
    .then(r => {
      if (!r) throw new Error('게시물이 없습니다.')
      if (r._user) {
        if (r._user._id.toString() !== req.user._id) {
          if (r._user.lv < req.user.lv) throw new Error('권한이 없습니다.')
        }
      }
      return Article.deleteOne({ _id })
    })
    .then(r => {
      res.send({ success: true, token: req.token })
    })
    .catch(e => {
      res.send({ success: false, msg: e.message })
    })
})

router.all('*', function(req, res, next) {
  next(createError(404, '존재하지 않는 board index'));
});

module.exports = router;
