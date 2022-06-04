"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require('mysql');
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'bdserviciotecnico',
    port: '3306',
    multipleStatements: true,
});
pool.getConnection(function (error) {
    if (!!error) {
        console.log(error);
    }
    else {
        console.log('base conectada!');
    }
});
exports.default = pool;
