var express = require('express');
var router = express.Router();
var teacherRouter = require('./teacherRouter');
var courseRouter = require('./courseRouter');
var tools = require('./tools');

// mongoose schema
var Whitelist = require('../models/whitelist');
var Teacher = require('../models/teacher');

var Department = require('../models/department');
var departmentName2Id = {};
var departmentId2Name = {};
var departmentNames = [];
var departmentInfo = {};
Department.find().exec().catch(err => { dealServerError(err, res); }).then(docs => {
    docs.forEach(doc => {
        departmentName2Id[doc.name] = doc.id;
        departmentId2Name[doc.id] = doc.name;
    });
    departmentNames = Object.keys(departmentName2Id);
    departmentInfo = {
        name2id: departmentName2Id,
        id2name: departmentId2Name,
        names: departmentNames
    }
});

var Subject = require('../models/subject');
var subjectName2Id = {};
var subjectId2Name = {};
var subjectNames = [];
var subjectInfo = {};
Subject.find().exec().catch(err => { dealServerError(err, res); }).then(docs => {
    docs.forEach(doc => {
        subjectName2Id[doc.name] = doc.id;
        subjectId2Name[doc.id] = doc.name;
    });
    subjectNames = Object.keys(subjectName2Id);
    subjectInfo = {
        name2id: subjectName2Id,
        id2name: subjectId2Name,
        names: subjectNames
    }
});

router.get('/logout', function (req, res, next) {
    req.session.destroy(() => {
        res.status(200).send();
    });
});

router.get('/session', function (req, res, next) {
    if (!req.session.googleid) {
        req.session.departmentInfo = departmentInfo;
        req.session.subjectInfo = subjectInfo;
    }
    if (req.session.googleid) {
        tools.refreshSession(req, res, () => {
            res.status(200).send({ session: req.session });
        })
    }
    else {
        res.status(200).send({ session: req.session });
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
