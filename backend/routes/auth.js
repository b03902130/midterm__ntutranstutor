var express = require("express");
var router = express.Router();
var passport = require("passport");
var axios = require("axios");

// mongoose schema
var Whitelist = require('../models/whitelist');
var Teacher = require('../models/teacher');
var tools = require('./tools');

var Department = require('../models/department');
var departmentName2Id = {};
var departmentId2Name = {};
var departmentNames = [];
var departmentInfo = {};
Department.find().exec().catch(err => { dealServerError(err, res); }).then(docs => {
    docs.forEach(doc => {
        departmentName2Id[doc.name] = doc.id;
        departmentId2Name[doc.id] = doc.name;
    });
    departmentNames = Object.keys(departmentName2Id);
    departmentInfo = {
        name2id: departmentName2Id,
        id2name: departmentId2Name,
        names: departmentNames
    }
});

var Subject = require('../models/subject');
var subjectName2Id = {};
var subjectId2Name = {};
var subjectNames = [];
var subjectInfo = {};
Subject.find().exec().catch(err => { dealServerError(err, res); }).then(docs => {
    docs.forEach(doc => {
        subjectName2Id[doc.name] = doc.id;
        subjectId2Name[doc.id] = doc.name;
    });
    subjectNames = Object.keys(subjectName2Id);
    subjectInfo = {
        name2id: subjectName2Id,
        id2name: subjectId2Name,
        names: subjectNames
    }
});


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
		req.session.departmentInfo = departmentInfo;
        req.session.subjectInfo = subjectInfo;

		tools.refreshSession(req, res, () => {
			res.redirect("http://localhost:3000/");
		});
	}
);

module.exports = router;