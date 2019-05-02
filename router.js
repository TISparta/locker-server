const router = require('express').Router()
const passport = require('passport')
const User = require('./models/User')
const Bicycle = require('./models/Bicycle')
const Locations = require('./models/Locations')

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
  router.get('/logout', isAuthenticated, async (req, res) => {
    req.logout()
    req.flash('success', 'Sesión cerrada')
    res.redirect('/login')
  })
  router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true
  }), async (req, res) => {
    req.flash('success', 'Ingreso exitoso')
    return res.redirect('/')
  })
  router.get('/locations', isAuthenticated, async (req, res) => {
    return res.render('./locations', req.info)
  })
  router.get('/newBicycle', isAuthenticated, async (req, res) => {
    return res.render('./addBicycle', req.info)
  })
  router.post('/newBicycle', isAuthenticated, async (req, res) => {
    const body = req.body
    const code = body['code']
    const found = await Bicycle.findOne({ code: code })
    if (!code || !body['brand'] || !body['color']) {
      const viewModel = req.body
      viewModel.error = 'Debes rellenar todos los campos'
      return res.render('./addBicycle', viewModel)
    }
    if (found) {
      const viewModel = req.body
      viewModel.error = 'El código ya está en uso'
      return res.render('./addBicycle', viewModel)
    }
    const bicycle = new Bicycle(body)
    await bicycle.save()
    req.flash('success', 'Bicicleta agregada exitosamente')
    return res.redirect('/')
  })
  router.get('/bicycle', isAuthenticated, async (req, res) => {
    const bicycle = await Bicycle.find({})
    req.info.bicycle = bicycle
    console.log(bicycle)
    res.render('./bicycle', req.info)
  })
  router.get('/bicycle/:code', isAuthenticated, async (req, res) => {
    const code = req.params.code
    const bicycle = await Bicycle.findOne({ code: code })
    if (!bicycle) {
      return res.send({
        'message': 'Bicycle not found'
      })
    }
    const locations = await Locations.find({ bicycle: bicycle._id }).sort({ created_at: 'desc' })
    req.info.bicycle = bicycle
    req.info.locations = locations
    console.log(locations)
    return res.render('./infoBicycle', req.info)
  })
  router.post('/login', async (req, res) => {
    const body = req.body
    if (!body['givenName'] || !body['familyName'] || !body['email'] ||
        !body['googleId']) {
      return res.send({ 'message': 'Some field are empty' })
    }
    const found = await User.findOne({ googleId: body['googleId'] })
    if (found) return res.send({ 'message': 'OK' })
    const user = new User(body)
    await user.save()
    return res.send({ 'message': 'OK. User created' })
  })
  router.post('/flip', async (req, res) => {
    const body = req.body
    if (!body['code'] || !body['lat'] || !body['lng'] || !body['state']) {
      return res.send({'message': 'Some field are empty'})
    }
    const bicycle = await Bicycle.findOne({ code: body['code'] })
    if (!bicycle) {
      return res.send({ 'message': 'Bicycle not registered' })
    }
    const location = new Locations({
      'bicycle': bicycle._id,
      'lat': body['lat'],
      'lng': body['lng'],
      'state': body['state']
    })
    await location.save()
    return res.send({ 'message': 'OK' })
  })
  app.use(router)
}
