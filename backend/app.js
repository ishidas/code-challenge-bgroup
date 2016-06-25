'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const debug = require('debug')('noteApp:app');
const mysql = require('mysql');

//connection to db
let connectApp = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'note_app_project'
});

connectApp.connect((err)=>{
  if(err) return debug(`error connectApp.connect ${err}`);
  debug('Successfully connected!');
});

app.use(bodyParser.json());

app.get('/', (req, res)=>{
  connectApp.query('SELECT * FROM note_app', (err, rows, fields)=>{
    connectApp.end();
    if(err) return debug('Error while querying data!');
    debug('data Successfully retreived');
    console.log('rows', rows);
    res.json(rows);
    // console.log('fields', fields);
  });
});

app.post('/new', (req, res)=>{
  var data = req.body;
  // var date = new Date();
  console.log(data);
  connectApp.query('INSERT INTO note_app SET ?', {
    note_title: data.note_title,
    note_food_nmae: data.note_food_nmae
  },(err, results)=>{
    connectApp.end();
    if(err) return console.log(err); debug('Error inserting data!!');

    debug('Inserted data successfully!');
    console.log(results);
    res.json({data: results});
  });
});

app.listen(3000, debug('listening at 3000'));
