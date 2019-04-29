var Whitelist = require('../models/whitelist');
var Teacher = require('../models/teacher');

module.exports = {
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
                next();
            });
        });
    }
};