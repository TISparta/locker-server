require('dotenv').config()
const koa = require('koa')
const bodyParser = require('koa-bodyparser')
const helmet = require('koa-helmet')
const respond = require('koa-respond')
const mongoose = require('mongoose')
const router = require('./router')
const app = new koa()

app.use(helmet())
app.use(bodyParser({
  enableTypes: ['json'],
  jsonLimit: '1mb',
  strict: true,
  onerror: function (err, ctx) {
    ctx.throw('Body parse error', 422)
  }
}))
app.use(respond())
router(app)

mongoose.connect(process.env.NODE_ENV === 'development' ? 'mongodb://localhost/locker' : process.env.DB_URI, {
  useCreateIndex: true,
  useNewUrlParser: true
}).then(db => console.log('Database connected'))
.catch(err => console.error(err))

let port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Running in port ${port}`)
})
