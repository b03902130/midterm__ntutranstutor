var express = require('express');
var router = express.Router();

router.get('/logout', function (req, res, next) {
    req.session.destroy(() => {
        res.send("Successfully logged out");
    });
});

// test if session already established for a user
router.get('/session', function (req, res, next) {
    if (!req.session.userid) {
        res.send(false);
    }
    else {
        res.send(true);
    }
});

module.exports = router;
