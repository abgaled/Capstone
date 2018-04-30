var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();

router.get('/newproject',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: NEW PROJECT');
    console.log('=================================');

    res.render('office/projects/views/newproject');

});

router.get('/ongoingproject',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: ONGOING PROJECT');
    console.log('=================================');

    res.render('office/projects/views/ongoingproject');

});

router.get('/finishedproject',(req, res) => {
    console.log('=================================');
    console.log('OFFICE: FINISHED PROJECT');
    console.log('=================================');

    res.render('office/projects/views/finishedproject');

});

module.exports = router;
