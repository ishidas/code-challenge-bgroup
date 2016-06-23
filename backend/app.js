'use strict';
// const express = require('express');
// const app = express();
const debug = require('debug')('noteApp:app');
const mysql = require('mysql');

//connection to db
let connectApp = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: ''
});

connectApp.connect((err)=>{
  if(err) return debug(`error connectApp.connect ${err}`);
  debug('Successfully connected!');
});

connectApp.end((err)=>{
  if(err) return debug('error disconnecting');
  debug('connectApp.end');
});
