const router = require("express").Router()
const user = require("./user.js")

router.use("/user", user)

router.get("/login", (req, res) => {
  if(req.user) {
		res.redirect("/user")
	} else {
		res.render("login.ejs")
	}
})

router.get("/signup", (req, res) => {
	if(req.user) {
		res.redirect("/user")
	} else {
		res.render("signup.ejs")
	}
})

router.get("/", (req, res) => {
	let user = req.user
	res.render("index.ejs", {user})
})

module.exports = router