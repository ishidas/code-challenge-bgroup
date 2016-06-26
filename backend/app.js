'use strict';
const express = require('express');
const app = express();
const cors = require('cors');
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

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res)=>{
  connectApp.query('SELECT * FROM note_app', (err, rows)=>{
    // connectApp.end();
    if(err) return debug('Error while querying data!');
    debug('data Successfully retreived');
    console.log('rows', rows);
    res.json(rows);
  });
});

app.get('/:id', (req, res)=>{
  debug('inside of GET by id route');
  var id = req.params.id;
  connectApp.query('SELECT * FROM note_app WHERE ?',{note_id: id},(err, results)=>{
    if(err) return console.error(err);
    console.log('search by id result',results);
    res.json(results);
  });
});

app.get('/user/:id', (req, res)=>{
  var user = req.params.id;
  console.log('user name???', user);
  debug('inside of GET by note_food_name route');
  connectApp.query('SELECT * FROM note_app WHERE ?', {note_user_name: user}, (err, results)=>{
    if(err) return console.error(err);
    console.log('Search by user name', results);
    res.json(results);
  });
});

app.post('/new', (req, res)=>{
  var data = req.body;
  // var date = new Date();
  console.log(data);
  connectApp.query('INSERT INTO note_app SET ?', {
    note_title: data.note_title,
    note_food_name: data.note_food_name,
    note_user_name: data.note_user_name,
    submission_date: data.submission_date
  },(err, results)=>{
    // connectApp.end();
    if(err) return console.log(err); debug('Error inserting data!!');
    debug('Inserted data successfully!');
    console.log(results);
    res.json(results);
  });
});

app.delete('/delete/:id', (req, res)=>{
  var id = req.params.id;
  console.log('id in delete route', id);
  debug('hitting delete route');
  connectApp.query('DELETE FROM note_app WHERE ?',{note_id: id}, (err, results)=>{
    // connectApp.end();
    if(err) return console.error(err);
    console.log('Delete results', results);
    res.json(results);
  });
});

let server = app.listen(3000, debug('listening at 3000'));
server.isRunning = true;
module.exports = server;
