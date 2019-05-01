var express = require('express');
var router = express.Router();
var teacherRouter = require('./teacherRouter');
var tools = require('./tools');

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
        tools.refreshSession(req, res, () => {
            res.status(200).send({
                session: req.session
            });
        });
    }
});

router.get('/connection', function (req, res, next) {
    if (!req.session.googleid) {
        res.send(false);
    }
    else {
        res.send(true);
    }
});

router.use("/teachers", teacherRouter);


module.exports = router;
