const Router = require('koa-router')
const router = new Router()

module.exports = app => {
  router.get('/', async function (ctx) {
    ctx.body = 'Hello world'
  })
  app.use(router.routes())
}
