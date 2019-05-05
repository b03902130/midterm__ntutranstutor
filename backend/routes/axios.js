var express = require('express');
var router = express.Router();
var teacherRouter = require('./teacherRouter');
var courseRouter = require('./courseRouter');
var tools = require('./tools');

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

router.get('/database', function (req, res, next) {
    res.locals.teachers = { order: [] };
    res.locals.courses = { order: [] };
    Teacher.find().populate({ path: "departmentid", options: { sort: { name: -1 } } }).exec().catch(err => { tools.dealServerError(err, res); }).then(docs => {
        docs = tools.organizeOutputTeacher(docs);
        docs.forEach(teacher => {
            teacher.courses = [];
            res.locals.teachers[teacher.id] = teacher;
            res.locals.teachers.order.push(teacher.id);
        });
        Course.find().populate({ path: "subjectid", options: { sort: { name: -1 } } }).exec().catch(err => { tools.dealServerError(err, res); }).then(docs => {
            docs = tools.organizeOutputCourse(docs);
            docs.forEach(course => {
                res.locals.courses[course.id] = course;
                res.locals.courses.order.push(course.id);
                res.locals.teachers[course.teacher].courses.push(course.id);
            });
            res.status(200).send({ teachers: res.locals.teachers, courses: res.locals.courses });
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

router.use("/teachers", teacherRouter);
router.use("/courses", courseRouter);


module.exports = router;
