var express = require("express");
var router = express.Router();
var passport = require("passport");
var axios = require("axios");

// mongoose schema
var Whitelist = require('../models/whitelist');
var Teacher = require('../models/teacher');

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
		req.session.googleid = data.id;
		req.session.username = data.displayName;
		req.session.userimgurl = data.image.url;
		req.session.useremails = data.emails;  // an array, each element is an object: {value, type}

		res.redirect("http://localhost:3000/");
	}
);

module.exports = router;