var express = require('express');
var serverPort = 3000;
var app = express();
var databaseConstant = require('./src/constants/database');
var mysql = require('mysql2');

global.connection = mysql.createConnection({
    host: databaseConstant.serverHost,
    user: databaseConstant.username,
    password: databaseConstant.password,
    database: databaseConstant.database
});

app.use(require('body-parser').json());
require('./src/route')(app);

app.listen(serverPort, function() {
    console.log('Server started on', serverPort);
});
