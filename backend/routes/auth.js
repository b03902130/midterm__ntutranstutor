var express = require("express");
var router = express.Router();
var passport = require("passport");
var axios = require("axios");

// mongoose schema
var User = require('../models/user');

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
		req.session.username = data.displayName;
		req.session.userimgurl = data.image.url;
		req.session.useremails = data.emails;  // an array, each element is an object: {value, type}

		// these should be insert into database, use userid as primary key
		let googleid = data.id;
		let name = data.displayName;
		let imgurl = data.image.url;
		User.where('googleid', googleid).exec((err, docs) => {
			if (docs.length === 0) {
				const user = new User({ googleid: googleid, name: name, imgurl: imgurl });
				user.save(err => {
					if (err) console.error(err);
					res.redirect("http://localhost:3000/home");
				});
			}
			else {
				res.redirect("http://localhost:3000/home");
			}
		});
	}
);

module.exports = router;