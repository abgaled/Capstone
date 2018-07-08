var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();

router.get('/transactions1',(req, res) => {
    console.log('=================================');
    console.log('ADMIN: TRANSACTIONS - 1');
    console.log('=================================');

    res.render('admin/transactions/views/transactions1');
});

router.get('/transactions2',(req, res) => {
    console.log('=================================');
    console.log('ADMIN: TRANSACTIONS - 2');
    console.log('=================================');

    res.render('admin/transactions/views/transactions2');
});

router.get('/transactions3',(req, res) => {
    console.log('=================================');
    console.log('ADMIN: TRANSACTIONS - 3');
    console.log('=================================');

    res.render('admin/transactions/views/transactions3');
});


module.exports = router;