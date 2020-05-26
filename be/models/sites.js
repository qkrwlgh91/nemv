const mongoose = require('mongoose')
const cfg = require('../../config')
 mongoose.set('useCreateIndex', true)
const siteSchema = new mongoose.Schema({
  title: { type: String, default: '등록필요' },
  copyright: { type: String, default: '등록 필요' },
  dark: { type: Boolean, default: false }
})
 const Site = mongoose.model('Site', siteSchema)
 Site.findOne()
  .then(r => {
    if (!r) return Site.create({ title: '등록 필요'})
    return Promise.resolve(r)
  })
  .then(r => {
    if (r) console.log(`${r.title} site is created`)
  })
  .catch(e => console.error(e.message))
 module.exports = Site
