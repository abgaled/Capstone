var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();


router.get('/',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: PROPOSALS');
    console.log('=================================');

    res.render('office/proposals/views/proposals');

});

module.exports = router;