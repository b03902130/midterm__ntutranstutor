var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var { checkSession, checkAuthorized, dealServerError, organizeOutputWhite } = require('./tools');

var Whitelist = require('../models/whitelist');

// check if the user has privilege to modifiy teacher information
function checkIsRoot(req, res, next) {
	if (req.session.identity !== "root") {
		res.status(200).send("Only root is allowed to access the whitelist");
	}
	next()
}

// RESTFUL API

// get whitelist
router.get('/', checkSession, checkIsRoot, (req, res, next) => {
	Whitelist.find().exec().catch(err => {dealServerError(err, res);}).then(docs => {
		docs = organizeOutputWhite(docs); 
		res.status(200).send({whitelist: docs});
	});
});

// create
router.post('/new', checkSession, checkIsRoot, (req, res, next) => {
	Whitelist.where("gmail", req.body.data.gmail).exec().catch(err => { dealServerError(err, res);}).then(docs => {
		if(docs.length > 0) {
			res.status(400).send("The gmail is already regiested as a root");
		}
		else {
			const whitelist = new Whitelist({ ...req.body.data });	
			whitelist.save().catch(err => { dealServerError(err, res); }).then(doc => {
				res.status(200).send();
			});
		}
	});
});

// destroy
router.get('/:id/delete/', checkSession, checkIsRoot, (req, res, next) => {
	Whitelist.findOneAndDelete({ _id: req.params.id, }).exec().catch(err => {dealServerError(err, res)}).then(doc => {
		if (!doc) {
			res.status(401).send("");
		}
		res.status(200).send(doc);
	});
});

module.exports = router;
