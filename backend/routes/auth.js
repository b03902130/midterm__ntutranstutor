var express = require("express");
var router = express.Router();
var passport = require("passport");
var axios = require("axios");

/* GET Google Authentication API. */
router.get(
	"/google",
	passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
	"/google/callback",
	passport.authenticate("google", { failureRedirect: "/", session: false }),
	async function (req, res) {
		var token = req.user.token;
		const { data } = await axios.get("https://www.googleapis.com/plus/v1/people/me?access_token=" + token);
		
		// establish a session
		req.session.userid = data.id;
		
		// these should be insert into database, use userid as primary key
		let userid = data.id;
		let username = data.displayName;
		let userimgurl = data.image.url;
		
		res.redirect("http://localhost:3000/home");
		// res.redirect("http://linux1.csie.ntu.edu.tw:8765?token=" + token);
		// when production, change port to 5678
	}
);

module.exports = router;