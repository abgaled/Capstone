var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();

router.get('/',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: HOME');
    console.log('=================================');

    var queryString =`SELECT COUNT(*) AS openApplicationCount
    FROM tbl_project
    WHERE enum_projectStatus = "Ongoing"`

        db.query(queryString, (err, results, fields) => {
            console.log(results);
            if (err) console.log(err);

        res.render('office/home/views/home',{tbl_projCount:results[0]});

    });
});

module.exports = router;