var express = require('express');
var router = express.Router();
var authMiddleware = require('../../auth/middlewares/auth');
var db = require('../../../lib/database')();

router.get('/projects',(req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 1');
    console.log('=================================');

    res.render('admin/maintenance/views/maintenance1');

});

router.get('/requirements',(req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 2');
    console.log('=================================');

    res.render('admin/maintenance/views/maintenance2');
});

router.get('/projectcategory',(req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 3');
    console.log('=================================');

    res.render('admin/maintenance/views/maintenance3');
});

router.get('/problemcategory',(req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 4');
    console.log('=================================');

    res.render('admin/maintenance/views/maintenance4');
});

router.get('/targetbeneficiary',(req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 5');
    console.log('=================================');
    
    res.render('admin/maintenance/views/maintenance5');
});

router.get('/barangay',(req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 6');
    console.log('=================================');
    
    res.render('admin/maintenance/views/maintenance6');
});

router.get('/awards',(req, res) => {
    console.log('=================================');
    console.log('ADMIN: MAINTENANCE - 7');
    console.log('=================================');
    
    res.render('admin/maintenance/views/maintenance7');
});

module.exports = router;