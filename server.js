require('dotenv').config()
const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const mongoose = require('mongoose')
const router = require('./router')

require('./passport')

const db = process.env.NODE_ENV === 'development' ? 'mongodb://localhost/locker' : process.env.DB_URI
const app = express()

// Handlebars
app.set('views', path.join(__dirname, './views'))
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs'
}))
app.set('view engine', '.hbs')

// Middlewares
app.use(express.urlencoded({
  extended: false
}))
app.use(express.json())
app.use(require('morgan')('combined'))
app.use(require('cookie-parser')())
app.use(require('body-parser').urlencoded({ extended: true }))
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    url: db,
    ttl: 1 * 24 * 60 * 60
  })
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(require('connect-flash')())
app.use(require('helmet')())

// Upload images
app.use(require('multer')({
  dest: path.join(__dirname, './public/upload/tmp')
}).single('image'))

// Static files
app.use('/public', express.static(path.join(__dirname, './public')))

// DB
mongoose.connect(db, {
  useCreateIndex: true,
  useNewUrlParser: true
}).then(db => console.log('Database connected'))
  .catch(err => console.error(err))

// Custom Middlewares
app.use((req, res, next) => {
  req.info = {}
  req.info.error = req.flash('error')
  req.info.success = req.flash('success')
  req.info.user = req.user
  next()
})

// Routes
router(app)

let port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Running in port ${port}`)
})
