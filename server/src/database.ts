//import mysql from 'promise-mysql';
import keys from './keys';



var mysql = require('mysql');
var pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'bdserviciotecnico',
  port: '3306',
  multipleStatements: true,
});

pool.getConnection(function (error: any) {
  if (!!error) {
    console.log(error);
  } else {
    console.log('base conectada!');
  }
});
export default pool;

