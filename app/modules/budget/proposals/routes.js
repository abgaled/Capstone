var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();



router.get('/new',(req, res) => {
    console.log('=================================');
    console.log('BUDGET: PROPOSALS-NEW');
    console.log('=================================');

    res.render('budget/proposals/views/newproposals');

});

router.get('/reviewed',(req, res) => {
    console.log('=================================');
    console.log('BUDGET: PROPOSALS-REVIEWED');
    console.log('=================================');

    res.render('budget/proposals/views/reviewedproposals');

});


module.exports = router;