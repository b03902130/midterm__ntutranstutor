var express = require('express');
var router = express.Router();
var teacherRouter = require('./teacherRouter');
var courseRouter = require('./courseRouter');
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
    if (req.session.googleid) {
        tools.refreshSession(req, res, () => {
            res.status(200).send({ session: req.session });
        })
    }
    else {
        res.status(200).send({ session: undefined });
    }
});

router.get('/connection', function (req, res, next) {
    if (!req.session.googleid) {
        res.send({ connection: false });
    }
    else {
        res.send({ connection: true });
    }
});

router.use("/teachers", teacherRouter);
router.use("/courses", courseRouter);


module.exports = router;
