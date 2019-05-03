var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var { checkSession, checkAuthorized, dealServerError } = require('./tools');

// mongoose schema
var Teacher = require('../models/teacher');

// check if the user has privilege to modifiy teacher information
function checkTeacherId(req, res, next) {
    if (!req.session.teacherid || req.params.id !== req.session.teacherid) {
        res.status(401).send("Unauthorized access");
    }
    next()
}

// Organize browser input to fit Teacher schema
function organizeInputTeacher(req, res, next) {
    let input = req.body.data;
    if (!input) {
        res.status(404).send("No data received");
    }
    if (input.department) {
        input.departmentid = req.session.departmentInfo.name2id[input.department];
    }
    let sanitized = {};
    Object.keys(Teacher.schema.obj).forEach(field => {
        if (input[field]) {
            sanitized[field] = input[field];
        }
    });
    req.body.data = sanitized;
    next()
}

function organizeOutputTeacher(docsFromDatabase, req) {
    let docs = docsFromDatabase;
    docs = docs.map(doc => {
        return {
            name: doc.name,
            department: req.session.departmentInfo.id2name[doc.departmentid],
            imgurl: doc.imgurl,
            description: doc.description
        }
    });
    return docs;
}



// RESTFUL API

// index
router.get('/', (req, res, next) => {
    Teacher.find().exec().catch(err => { dealServerError(err, res); }).then(docs => {
        docs = organizeOutputTeacher(docs, req);
        res.status(200).send({ infos: docs });
    });
});

// create
router.post('/', checkSession, checkAuthorized, organizeInputTeacher, (req, res, next) => {
    Teacher.where("googleid", req.session.googleid).exec().catch(err => { dealServerError(err, res); }).then(docs => {
        if (docs.length !== 0) {
            res.status(400).send("You are already a teacher");
        }
        else {
            const teacher = new Teacher({ googleid: req.session.googleid, ...req.body.data });
            teacher.save().catch(err => { dealServerError(err, res); }).then(docs => {
                res.status(200).send();
            });
        }
    })
});

// show
router.get('/:id/', (req, res, next) => {
    Teacher.where("_id", req.params.id).exec().catch(err => { dealServerError(err, res); }).then(docs => {
        docs = organizeOutputTeacher(docs, req);
        if (docs.length === 0) {
            res.status(400).send("Teacher unexisted");
        }
        else {
            res.status(200).send({ info: docs[0] });
        }
    });
});

// edit: cause teacher information is public, no need to check the authorization
router.get('/:id/edit/', (req, res, next) => {
    Teacher.where("_id", req.params.id).exec().catch(err => { dealServerError(err, res); }).then(docs => {
        docs = organizeOutputTeacher(docs, req);
        if (docs.length === 0) {
            res.status(400).send("Teacher unexisted");
        }
        else {
            res.status(200).send({ info: docs[0] });
        }
    });
});

// update
router.post('/:id/put/', checkSession, checkTeacherId, organizeInputTeacher, (req, res, next) => {
    Teacher.updateOne({ _id: req.params.id }, req.body.data).exec().catch(err => { dealServerError(err, res); }).then(docs => {
        if (docs.length === 0) {
            res.status(400).send("Teacher unexisted");
        }
        res.status(200).send();
    });
});

// destroy
router.get('/:id/delete/', checkSession, checkTeacherId, (req, res, next) => {
    Teacher.deleteOne({ _id: req.params.id }).catch(err => { dealServerError(err, res); }).then(docs => {
        res.status(200).send();
    });
});

module.exports = router;