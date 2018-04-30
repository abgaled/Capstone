var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();

router.get('/',(req, res) => {
    console.log('=================================');
    console.log('BUDGET: REPORTS');
    console.log('=================================');

    res.render('budget/reports/views/reports');

});

module.exports = router;