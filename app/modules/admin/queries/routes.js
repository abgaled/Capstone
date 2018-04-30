var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();
var nodemailer = require('nodemailer');

router.get('/',(req, res) => {
    console.log('=================================');
    console.log('ADMIN: QUERIES');
    console.log('=================================');

    res.render('admin/queries/views/queries');

});

module.exports = router;