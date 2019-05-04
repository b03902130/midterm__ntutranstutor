var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var { checkSession, checkAuthorized, dealServerError, organizeOutputTeacher, organizeOutputCourse } = require('./tools');

// mongoose schema
var Teacher = require('../models/teacher');
var Course = require('../models/course');

// check if the user has privilege to modifiy teacher information
function checkIsTeacher(req, res, next) {
    if (!req.session.teacherid) {
        res.status(401).send("You should register to become a teacher first");
    }
    next()
}

// Organize browser input to fit Teacher schema
function organizeInputCourse(req, res, next) {
    let input = req.body.data;
    if (!input) {
        res.status(404).send("No data received");
    }
    if (input.subject) {
        input.subjectid = req.session.subjectInfo.name2id[input.subject];
    }
    let sanitized = {};
    Object.keys(Course.schema.obj).forEach(field => {
        if (input[field]) {
            sanitized[field] = input[field];
        }
    });
    req.body.data = sanitized;
    next()
}



// RESTFUL API

// index
// router.get('/', (req, res, next) => {
//     Teacher.find().exec().catch(err => { dealServerError(err, res); }).then(docs => {
//         docs = organizeOutputTeacher(docs, req);
//         res.status(200).send({ infos: docs });
//     });
// });

// create
router.post('/', checkSession, checkIsTeacher, organizeInputCourse, (req, res, next) => {
    const course = new Course({ ...req.body.data, teacherid: req.session.teacherid });
    course.save().catch(err => { dealServerError(err, res); }).then(doc => {
        res.status(200).send({ courseid: doc.id });
    });
});

// show
// router.get('/:id/', (req, res, next) => {
//     Teacher.where("_id", req.params.id).exec().catch(err => { dealServerError(err, res); }).then(docs => {
//         docs = organizeOutputTeacher(docs, req);
//         if (docs.length === 0) {
//             res.status(400).send("Teacher unexisted");
//         }
//         else {
//             res.status(200).send({ info: docs[0] });
//         }
//     });
// });

// edit: cause course information is public, no need to check the authorization
router.get('/:id/edit/', (req, res, next) => {
    Course.where("_id", req.params.id).exec().catch(err => { dealServerError(err, res); }).then(docs => {
        docs = organizeOutputCourse(docs, req);
        if (docs.length === 0) {
            res.status(400).send("Course unexisted");
        }
        else {
            res.status(200).send({ info: docs[0] });
        }
    });
});

// router.get('/:id/courses/', (req, res, next) => {
//     Course.where("teacherid", req.params.id).exec().catch(err => { dealServerError(err, res); }).then(docs => {
//         docs = organizeOutputCourse(docs, req);
//         res.status(200).send(docs);
//     });
// });

// update
router.post('/:id/put/', checkSession, organizeInputCourse, (req, res, next) => {
    Course.updateOne({ _id: req.params.id, teacherid: req.session.teacherid }, req.body.data).exec().catch(err => { dealServerError(err, res); }).then(docs => {
        if (docs.length === 0) {
            res.status(404).send("Course not found or User not authorized");
        }
        res.status(200).send();
    });
});

// destroy
router.get('/:id/delete/', checkSession, (req, res, next) => {
    Course.findOneAndDelete({ _id: req.params.id, teacherid: req.session.teacherid }).exec().catch(err => {dealServerError(err, res)}).then(doc => {
        if (!doc) {
            res.status(401).send("You are not allow to delete this course");
        }
        res.status(200).send(doc);
    });
});

module.exports = router;