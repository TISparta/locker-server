const router = require('express').Router()
const passport = require('passport')

isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next()
  req.flash('error', 'Necesitas logearte')
  res.redirect('/login')
}

module.exports = app => {
  router.get('/', isAuthenticated, async (req, res) => {
    res.render('./landing', req.info)
  })
  router.get('/login', async (req, res) => {
    res.render('./login', req.info)
  })
  router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true
  }), async (req, res) => {
    req.flash('success', 'Ingreso exitoso')
    return res.redirect('/')
  })
  router.get('/locations', isAuthenticated, async (req, res) => {
    return res.redirect('/', req.info)
  })
  app.use(router)
}
