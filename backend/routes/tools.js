var Whitelist = require('../models/whitelist');
var Teacher = require('../models/teacher');
var mongoose = require('mongoose');

let tools = {
    checkSession: function (req, res, next) {
        if (!req.session.googleid) {
            res.status(401).send("Login is required");
        }
        next();
    },
    checkAuthorized: function (req, res, next) {
        if (req.session.identity === "outsider") {
            res.status(401).send("Authorization from admin is required");
        }
        next();
    },
    dealServerError: function (err, res) {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        }
    },
    refreshSession: function (req, res, next) {
        let criteria = req.session.emails.map(email => {
            return { gmail: email };
        });
        let identity = "outsider";
        Whitelist.find({ $or: criteria }, (err, docs) => {
            if (docs.length !== 0) {
                identity = "candidate";
                Teacher.where("googleid", req.session.googleid).exec((err, docs) => {
                    req.session.teacherid = undefined;
                    if (docs.length !== 0) {
                        identity = "teacher";
                        req.session.teacherid = docs[0].id;
                    }
                    req.session.identity = identity;
                    next();
                });
            }
            else { next(); }
        });
    },
    organizeOutputTeacher: function (docsFromDatabase, req) {
        let docs = docsFromDatabase;
        docs = docs.map(doc => {
            return {
                teacherid: doc.id,
                name: doc.name,
                department: req.session.departmentInfo.id2name[doc.departmentid.toString()],
                imgurl: doc.imgurl,
                description: doc.description
            }
        });
        return docs;
    },
    organizeOutputCourse: function (docsFromDatabase, req) {
        let docs = docsFromDatabase;
        docs = docs.map(doc => {
            let processedTeacher = typeof doc.teacherid === mongoose.Types.ObjectId ?
                doc.teacherid.toString()
                :
                tools.organizeOutputTeacher([doc.teacherid], req)
            return {
                courseid: doc.id,
                teacherid: processedTeacher,
                subject: req.session.subjectInfo.id2name[doc.subjectid.toString()],
                price: doc.price,
                description: doc.description
            }
        });
        return docs;
    }
};

module.exports = tools;