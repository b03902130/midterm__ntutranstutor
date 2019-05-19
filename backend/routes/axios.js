var express = require('express');
var router = express.Router();
var teacherRouter = require('./teacherRouter');
var courseRouter = require('./courseRouter');
var whiteRouter = require('./whiteRouter')
var tools = require('./tools');
var roots = require('../root');

// mongoose schema
var Teacher = require('../models/teacher');
var Course = require('../models/course');


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

router.get('/data', function (req, res, next) {
    let teachers = { order: [], infos: {} };
    let courses = { order: [], infos: {} };
    Teacher.find().populate("departmentid").exec().catch(err => { tools.dealServerError(err, res); }).then(docs => {
        docs = tools.organizeOutputTeacher(docs);
        docs.forEach(teacher => {
            teacher.courses = [];
            teachers.infos[teacher.id] = teacher;
            teachers.order.push(teacher.id);
        });
        Course.find().populate("subjectid").exec().catch(err => { tools.dealServerError(err, res); }).then(docs => {
            docs = tools.organizeOutputCourse(docs);
            docs.forEach(course => {
                courses.infos[course.id] = course;
                courses.order.push(course.id);
                teachers.infos[course.teacher].courses.push(course.id);
            });
            res.status(200).send({ teachers: teachers, courses: courses });
        });
    });
});

router.get('/connection', function (req, res, next) {
    if (!req.session.googleid) {
        res.send({ connection: false });
    }
    else {
        res.send({ connection: true });
    }
});

router.post('/alias', function (req, res, next) {
    if (roots.includes(req.session.googleid)) {
        req.session.teacherid = req.body.data.teacherid;
        res.status(200).send();
    }
    else {
        res.status(401).send("Root only");
    }
});


router.use("/teachers", teacherRouter);
router.use("/courses", courseRouter);
router.use("/whitelist", whiteRouter);

module.exports = router;
