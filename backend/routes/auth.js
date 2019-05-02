var express = require("express");
var router = express.Router();
var passport = require("passport");
var axios = require("axios");

// mongoose schema
var Whitelist = require('../models/whitelist');
var Teacher = require('../models/teacher');
var tools = require('./tools');

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
		req.session.name = data.displayName;
		req.session.imgurl = data.image.url;
		req.session.emails = data.emails.map(email => email.value);  // an array, each element is an object: {value, type}

		tools.refreshSession(req, res, () => {
			res.redirect("http://localhost:3000/");
		});
	}
);

module.exports = router;