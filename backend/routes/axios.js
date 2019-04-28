var express = require('express');
var router = express.Router();

// mongoose schema
var Message = require('../models/message');

router.get('/logout', function (req, res, next) {
    req.session.destroy(() => {
        res.send("Successfully logged out");
    });
});

// test if session already established for a user
router.get('/session', function (req, res, next) {
    if (!req.session.userid) {
        res.send({
            user: undefined
        });
    }
    else {
        res.send({
            user: {
                name: req.session.username,
                imgurl: req.session.userimgurl
            }
        });
    }
});


// FOR TESTING

router.get('/connected', function (req, res, next) {
    if (!req.session.userid) {
        res.send(false);
    }
    else {
        res.send(true);
    }
});

router.get('/create', function (req, res, next) {
    const message = new Message({ sender: "Leo", receiver: "Jardin", body: "meow" });
    message.save(err => {
        if (err) console.error(err);
        res.send("created");
    })
});

router.get('/retrieve', function (req, res, next) {
    Message.find().exec((err, docs) => {
        res.send(docs);
    });
});

module.exports = router;
