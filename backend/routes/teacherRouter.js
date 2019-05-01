var express = require('express');
var router = express.Router();
var { checkSession, checkAuthorized, dealServerError } = require('./tools');

// mongoose schema
var Teacher = require('../models/teacher');

router.post('/', checkSession, checkAuthorized, (req, res, next) => {
    Teacher.where("googleid", req.session.googleid).exec((err, docs) => {
        if (docs.length !== 0) {
            res.status(400).send("You are already a teacher");
        }
        else {
            const teacher = new Teacher({ googleid: req.session.googleid, description: req.body.description });
            teacher.save(err => {
                dealServerError(err, res);
                res.status(200).send();
            })
        }
    });
});

router.get('/:id/', (req, res, next) => {
    Teacher.where("_id", req.params.id).exec((err, docs) => {
        dealServerError(err, res);
        if (docs.length === 0) {
            res.status(400).send("Teacher unexisted");
        }
        else {
            res.status(200).send(docs[0]);
        }
    });
});

function checkTeacher(req, res, next) {
    Teacher.where("_id", req.params.id).exec()
        .then(docs => {
            if (docs.length === 0 || docs[0].googleid !== req.session.googleid) {
                res.status(401).send("Unauthorized access");
            }
            next();
        })
        .catch(err => {
            dealServerError(err, res);
        });
}

router.post('/:id/put/', checkSession, checkTeacher, (req, res, next) => {
    Teacher.updateOne({ _id: req.params.id }, { description: req.body.description }).exec()
        .then(docs => {
            if (docs.length === 0) {
                res.status(400).send("Teacher unexisted");
            }
            res.status(200).send();
        })
        .catch(err => {
            dealServerError(err, res);
        });
});

router.post('/:id/delete/', checkSession, checkTeacher, (req, res, next) => {
    Teacher.deleteOne({ _id: req.params.id }, (err) => {
        dealServerError(err, res);
        res.status(200).send();
    });
});

module.exports = router;