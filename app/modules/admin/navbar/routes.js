var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();

router.get('/',(req, res) => {
    console.log('=================================');
    console.log('BARANGAY: HOME');
    console.log('=================================');

    res.render('admin/navbar/views/navbar');

});

module.exports = router;