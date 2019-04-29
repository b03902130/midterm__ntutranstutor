var express = require('express');
var router = express.Router();

// mongoose schema
var Message = require('../models/message');
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

function checkSesion(req, res, next) {
    if (!req.session.googleid) {
        res.status(401).send("Login is required");
    }
    next();
}

function checkAuthorized(req, res, next) {
    if (req.session.identity === "outsider") {
        res.status(401).send("Authorization from admin is required");
    }
    next();
}

router.post('/teachers/', checkSesion, checkAuthorized, (req, res, next) => {
    Teacher.where("googleid", req.session.googleid).exec((err, docs) => {
        if (docs.length !== 0) {
            res.status(400).send("You are already a teacher");
        }
        else {
            const teacher = new Teacher({ googleid: req.session.googleid, description: req.body.description });
            teacher.save(err => {
                if (err) {
                    console.log(err);
                    res.status(500).send(err);
                }
                else {
                    res.status(200).send();
                }
            })
        }
    });
});

router.get('/teachers/:id/', (req, res, next) => {
    Teacher.where("_id", req.params.id).exec((err, docs) => {
        if (err) {
            console.log(err);
            res.status(500).send();
        }
        if (docs.length === 0) {
            res.status(400).send("Teacher unexisted");
        }
        else {
            res.status(200).send(docs[0]);
        }
    });
});

router.post('/teachers/:id/put', (req, res, next) => {
    Teacher.updateOne({ _id: req.params.id }, { description: req.body.description }, (err, docs) => {
        if (err) {
            console.log(err);
            res.status(500).send();
        }
        if (docs.length === 0) {
            res.status(400).send("Teacher unexisted");
        }
        res.status(200).send();

    });
});

router.post('/teachers/:id/delete', (req, res, next) => {
    Teacher.deleteOne({ _id: req.params.id }, (err) => {
        if (err) {
            console.log(err);
            res.status(500).send();
        }
        res.status(200).send();
    });
});





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
