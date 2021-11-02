const router = require("express").Router()
const User = require("../models/User.js")
const bcrypt = require("bcrypt")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy

//signup
router.post("/signup", (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, 10)
  User.findOne({username : req.body.username}, (err, dbuser) => {
    if(err) { return console.log(err) }
    if(dbuser) { return res.json({ message: "이미 존재하는 아이디 입니다." }) }
    const user = new User(req.body)
    user.save((err, suc) => {
      if(err) { return console.log(err)}
      console.log("newUser: ", suc.username)
      res.json(suc)
    })
  })
})

//login
passport.use(new LocalStrategy(
  (username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if(err) { return done(err) }
      if(!user) { 
        return done(null, false, { message: "존재하지 않는 아이디"})
      }
      if(!bcrypt.compareSync(password, user.password)) {
        return done(null, false, { message: "비번확인"})
      }
      return done(null, user)
    })
  }
))

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user)
  })
})

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if(err) { return next(err) }
    if(!user) { return res.json(info)}
    req.logIn(user, (err) => {
      if(err) { return next(err) }
      if(req.body.remember){
        req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000
      }
      return res.json(user)
    })
  })(req, res, next)
})

//logout
router.get("/logout", (req, res) => {
  req.logout()
  res.redirect("/")
})

//get
router.get("/", (req, res) => {
  if(!req.user) {
    return res.redirect("/login")
  }
  res.render("user.ejs")
})

module.exports = router