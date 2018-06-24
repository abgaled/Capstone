require('dotenv').config();

var express = require('express');
var winston = require('winston');
var app = express();
require('./app')(app);

app.listen(app.get('port'), () => {
    winston.info(`City Project Application and Beneficiary Releasing Management System is on PORT:${app.get('port')}`);
});