var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();

router.get('/',(req, res) => {
    console.log('=================================');
    console.log('BUDGET: HOME');
    console.log('=================================');
    
    var newCountQuery = `SELECT count(*) AS int_newCount
        FROM tbl_projectproposal
        WHERE enum_proposalStatus='New'`;

    db.query(newCountQuery, (err, newCountResult, fields) => {
        if (err) console.log(err);

        var reviewedCountQuery = `SELECT count(*) AS int_reviewedCount
            FROM tbl_projectproposal
            WHERE enum_proposalStatus='Reviewed'`;

        db.query(reviewedCountQuery, (err, reviewedCountResult, fields) => {
            if (err) console.log(err);

            var approvedCountQuery = `SELECT count(*) AS int_approvedCount
                FROM tbl_projectproposal
                WHERE enum_proposalStatus='Approved'`;

            db.query(approvedCountQuery, (err, approvedCountResult, fields) => {
                if (err) console.log(err);

                res.render('budget/home/views/home', {newCounts: newCountResult, reviewedCounts: reviewedCountResult, approvedCounts: approvedCountResult});
            });
        });
    });
});

module.exports = router;