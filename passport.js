const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

passport.use(new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {
  console.log(email, process.env.USERNAME)
  console.log(password, process.env.PASSWORD)
  if (email !== process.env.USERNAME) {
    return done(null, false, {
      message: 'Usuario no encontrado!'
    })
  }
  if (password !== process.env.PASSWORD) {
    return done(null, false, {
      message: 'Contraseña Incorrecta!'
    })
  }
  return done(null, { username: process.env.USERNAME })

}))

passport.serializeUser((user, done) => {
  done(null, user.username)
})

passport.deserializeUser((username, done) => {
  done(null, { username: process.env.USERNAME })
})
