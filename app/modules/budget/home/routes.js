var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();

router.get('/',(req, res) => {
    console.log('=================================');
    console.log('BUDGET: HOME');
    console.log('=================================');

    res.render('budget/home/views/home');

});

module.exports = router;