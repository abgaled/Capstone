var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();

router.get('/',(req, res) => {
    console.log('=================================');
    console.log('ADMIN PROFILE');
    console.log('=================================');
    res.render('admin/profile/views/index');
    });

module.exports = router;