var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();



router.get('/new',(req, res) => {
    console.log('=================================');
    console.log('BARANGAY: PROBLEM STATEMENT-NEW');
    console.log('=================================');

        
    res.render('barangay/problemstatement/views/newproblem');
});


router.get('/previous',(req,res) => {
    console.log('=================================');
    console.log('BARANGAY: PROBLEM STATEMENT-PREVIOUS');
    console.log('=================================');


    res.render('barangay/problemstatement/views/previousproblem');
});



module.exports = router;