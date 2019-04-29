var express = require('express');
var router = express.Router();
var teacherRouter = require('./teacherRouter');

// mongoose schema
var Whitelist = require('../models/whitelist');
var Teacher = require('../models/teacher');

router.get('/logout', function (req, res, next) {
    req.session.destroy(() => {
        res.status(200).send();
    });
});

router.get('/session', function (req, res, next) {
    if (!req.session.googleid) {
        res.status(200).send({
            session: undefined
        });
    }
    else {
        let criteria = req.session.useremails.map(email => {
            return { email: email.value };
        });
        let identity = "outsider";
        Whitelist.find({ $or: criteria }, (err, docs) => {
            if (docs.length !== 0) {
                identity = "candidate";
            }
            Teacher.where("googleid", req.session.googleid).exec((err, docs) => {
                req.session.teacherid = undefined;
                if (docs.length !== 0) {
                    identity = "teacher";
                    req.session.teacherid = docs[0]._id;
                }
                req.session.identity = identity;

                res.status(200).send({
                    session: req.session
                });
            });
        });
    }
});

router.use("/teachers", teacherRouter);



// FOR TESTING

router.get('/connection', function (req, res, next) {
    if (!req.session.googleid) {
        res.send(false);
    }
    else {
        res.send(true);
    }
});

module.exports = router;
