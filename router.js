const router = require('express').Router()
const passport = require('passport')
const User = require('./models/User')
const Bicycle = require('./models/Bicycle')
const Locations = require('./models/Locations')
const fs = require('fs-extra')
const path = require('path')

isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next()
  req.flash('error', 'Necesitas logearte')
  res.redirect('/login')
}

function pad (s) {
  console.log(s)
  let t = '' + s
  if (t.length == 1) return '0' + t;
  return t;
}

async function getLastLocations () {
  const bicycle = await Bicycle.find({})
  let locations = []
  for (let b of bicycle) {
    const point = await Locations.findOne({bicycle: b._id }).sort({ created_at: -1 })
    if (point) {
      let pib = b.toJSON()
      let add = {}
      let date = new Date(point.created_at)
      let time = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate() + '|' +
        date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
      add.lat = point.lat
      add.lng = point.lng
      add.time = time
      add.bicycle_code = pib.code
      add.bicycle_brand = pib.brand
      if (process.env.NODE_ENV === 'development') {
        add.bicycle_image_url = 'http://localhost:3000/public/upload/' + pib.code + pib.ext
      } else {
        add.bicycle_image_url = 'http://178.128.216.229/public/upload' + pib.code + pib.ext
      }
      locations.push(add)
    }
  }
  return locations
}

module.exports = app => {

  router.get('/test', async (req, res) => {
    res.render('./test', req.info)
  })

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
    const locations = await getLastLocations()
    req.info.locations = locations
    return res.render('./locations', {
      layout: false,
      locations: locations
    })
  })
  router.get('/newBicycle', isAuthenticated, async (req, res) => {
    return res.render('./addBicycle', req.info)
  })
  router.post('/newBicycle', isAuthenticated, async (req, res) => {
    const body = req.body
    const code = body['code']
    const brand = body['brand']
    const found = await Bicycle.findOne({ code: code })
    if (!code || !body['brand']) {
      const viewModel = req.body
      viewModel.error = 'Debes rellenar todos los campos'
      return res.render('./addBicycle', viewModel)
    }
    if (found) {
      const viewModel = req.body
      viewModel.error = 'El código ya está en uso'
      return res.render('./addBicycle', viewModel)
    }

    const imageTempPath = req.file.path
    const ext = path.extname(req.file.originalname).toLowerCase()
    const targetPath = path.resolve(`public/upload/${code}${ext}`)

    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
      await fs.rename(imageTempPath, targetPath)
      const bicycle = new Bicycle({
        'code': code,
        'brand': brand,
        'ext': ext
      })
      await bicycle.save();
      req.flash('success', 'Bicicleta agregada exitosamente')
      return res.redirect('/')
    } else {
      await fs.unlink(imageTempPath)
      req.flash('error', 'Formato no válido')
      return res.redirect('/newBicycle')
    }
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

    const l = []
    for (let point of locations) {
      let add = point.toJSON()
      let date = new Date(point.created_at)
      let time = date.getFullYear()+'-' + pad(date.getMonth()+1) + '-'+ pad(date.getDate()) + '  ' +
        pad(date.getHours()) + ':' + pad(date.getMinutes()) + ':' + pad(date.getSeconds());
      add.lat = point.lat
      add.lng = point.lng
      add.time = time
      const user = await User.findOne({ googleId: point.googleId })
      add.givenName = user.givenName
      add.familyName = user.familyName
      add.email = user.email
      l.push(add)
    }
    req.info.bicycle = bicycle
    req.info.locations = l
    return res.render('./infoBicycle', req.info)
  })
  // To call by the application
  router.post('/loginGmail', async (req, res) => {
    const body = req.body
    if (!body['givenName'] || !body['familyName'] || !body['email'] ||
      !body['googleId']) {
      res.statusCode = 400;
      return res.send({ 'message': 'Some field are empty' })
    }
    const found = await User.findOne({ googleId: body['googleId'] })
    if (found) return res.send({ 'message': 'OK' })
    const user = new User(body)
    await user.save()
    return res.send({ 'message': 'OK. User created' })
  })
  // To call by the application
  router.post('/flip', async (req, res) => {
    const body = req.body
    if (!body['code'] || !body['lat'] || !body['lng'] || !body['state'] || !body['googleId']) {
      res.statusCode = 400;
      return res.send({'message': 'Some field are empty'})
    }
    const bicycle = await Bicycle.findOne({ code: body['code'] })
    if (!bicycle) {
      res.statusCode = 400;
      return res.send({ 'message': 'Bicycle not registered' })
    }
    const user = await User.findOne({ googleId: body['googleId'] })
    if (!user) {
      res.statusCode = 400;
      return res.send({ 'message': 'The User does not exists'})
    }
    const location = new Locations({
      'bicycle': bicycle._id,
      'lat': body['lat'],
      'lng': body['lng'],
      'state': body['state'],
      'googleId': body['googleId']
    })
    await location.save()
    return res.send({ 'message': 'OK' })
  })
  // To call by the application
  router.get('/history/:googleId', async (req, res) => {
    const googleId = req.params.googleId
    const _history = await Locations.find({googleId: googleId }).sort({ created_at: -1 })
    const history = []
    for (let h of _history) {
      let add = h.toJSON()
      delete add._id
      delete add.id
      delete add.__v
      delete add.googleId
      const bicycle = await Bicycle.findOne({ _id: add.bicycle })
      let pib = bicycle.toJSON()
      add.bicycle_code = pib.code
      add.bicycle_brand = pib.brand
      if (process.env.NODE_ENV === 'development') {
        add.bicycle_image_url = 'http://localhost:3000/public/upload/' + pib.code + pib.ext
      } else {
        add.bicycle_image_url = 'http://178.128.216.229/public/upload' + pib.code + pib.ext
      }
      delete add.bicycle
      history.push(add)
    }
    return res.send({ 'history': history })
  })
  // To call by the application
  router.get('/allLocations', async (req, res) => {
    const locations = await getLastLocations()
    return res.send({'locations': locations })
  })
  app.use(router)
}
