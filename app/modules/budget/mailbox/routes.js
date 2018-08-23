var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();

router.get('/', (req, res) => {
    console.log('=================================');
    console.log('BUDGET: MAILBOX');
    console.log('=================================');


    var strQuery = `SELECT *
    FROM tbl_message M, tbl_user U
    WHERE M.int_senderID=U.int_userID AND M.int_receiverID=4`;

    db.query(strQuery, function (err, results, fields) {
        if (err) return res.send(err);
        console.log(results);
        res.render('budget/mailbox/views/mailbox', { messages:results});
    });
});

module.exports = router;