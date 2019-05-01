var express = require('express');
var router = express.Router();
var { checkSession, checkAuthorized, dealServerError } = require('./tools');

// mongoose schema
var Teacher = require('../models/teacher');

// check if the user has privilege to modifiy teacher information
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


// RESTFUL API

// index
router.get('/', (req, res, next) => {
    Teacher.find().exec().catch(dealServerError).then(docs => {
        res.status(200).send(docs);
    });
});

// create
router.post('/', checkSession, checkAuthorized, (req, res, next) => {
    Teacher.where("googleid", req.session.googleid).exec().catch(dealServerError).then(docs => {
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
    })
});

// show
router.get('/:id/', (req, res, next) => {
    Teacher.where("_id", req.params.id).exec().catch(dealServerError).then(docs => {
        if (docs.length === 0) {
            res.status(400).send("Teacher unexisted");
        }
        else {
            res.status(200).send(docs[0]);
        }
    });
});

// edit: cause teacher information is public, no need to check the authorization
router.get('/:id/edit/', (req, res, next) => {
    Teacher.where("_id", req.params.id).exec().catch(dealServerError).then(docs => {
        if (docs.length === 0) {
            res.status(400).send("Teacher unexisted");
        }
        else {
            res.status(200).send(docs[0]);
        }
    });
});

// update
router.post('/:id/put/', checkSession, checkTeacher, (req, res, next) => {
    Teacher.updateOne({ _id: req.params.id }, { description: req.body.description }).exec().catch(dealServerError).then(docs => {
        if (docs.length === 0) {
            res.status(400).send("Teacher unexisted");
        }
        res.status(200).send();
    });
});

// destroy
router.get('/:id/delete/', checkSession, checkTeacher, (req, res, next) => {
    Teacher.deleteOne({ _id: req.params.id }).catch(dealServerError).then(docs => {
        res.status(200).send();
    });
});

module.exports = router;