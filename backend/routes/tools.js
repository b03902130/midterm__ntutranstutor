var Whitelist = require('../models/whitelist');
var Teacher = require('../models/teacher');
var preload = require('../preload');

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
    organizeOutputTeacher: function (docsFromDatabase) {
        let docs = docsFromDatabase;
        docs = docs.map(doc => {
            return {
                id: doc.id,
                name: doc.name,
                department: !doc.departmentid.name ? preload.departmentInfo.id2name[doc.departmentid.toString()] :
                    {
                        id: doc.departmentid.id,
                        name: doc.departmentid.name,
                        value: doc.departmentid.value
                    },
                imgurl: doc.imgurl,
                description: doc.description
            }
        });
        return docs;
    },
    organizeOutputCourse: function (docsFromDatabase) {
        let docs = docsFromDatabase;
        docs = docs.map(doc => {
            return {
                id: doc.id,
                teacher: doc.teacherid.name ? tools.organizeOutputTeacher([doc.teacherid]) : doc.teacherid.toString(),
                subject: !doc.subjectid.name ? preload.subjectInfo.id2name[doc.subjectid.toString()] :
                    {
                        id: doc.subjectid.id,
                        name: doc.subjectid.name,
                        value: doc.subjectid.value
                    },
                price: doc.price,
                description: doc.description
            }
        });
        return docs;
    }
};

module.exports = tools;