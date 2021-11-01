const express = require("express")
const app = express()
if(process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}

app.use(express.static("public"))
app.use(express.json())
app.set("view engine", "ejs")

//db
const mongoose = require("mongoose")
mongoose.connect(process.env.DATABASE_URL,{ 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})

//passport
const session = require("express-session")
const passport = require("passport")
const MongoStore = require("connect-mongo")

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.DATABASE_URL
  }),
  cookie: {
    sameSite: "lax"
  }
}))
app.use(passport.initialize())
app.use(passport.session())

const router = require("./routes/index.js")
app.use(router)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))