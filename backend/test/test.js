'use strict';
const debug = require('debug')('noteApp:test');
const server = require(__dirname + '/../app.js');
const port = 3000;
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request(`localhost:${port}`);
const expect = chai.expect;

describe('Testing GET and POST route with mySQL db', function(){
  var id;
  var user;
  before((done)=>{
    debug('hitting before block');
    if(!server.isRunning)
      server.listen(port, ()=>{
        debug('test server is running at 3000');
        server.isRunning = true;
        done();
      });
    done();
  });

  after((done)=>{
    debug('hitting after block');
    if(server.isRunning)
      server.close(()=>{
        debug('server is closing');
        server.isRunning = false;
        done();
      });
  });

  it('should POST data into db', (done)=>{
    debug('inside post');
    var newData = {note_id: '1',note_title: 'testing title2', note_user_name: 'Jess', note_food_name: 'chocolate'};
    request.post('/new')
    .send(newData)
    .end((err, res)=>{
      debug('inside post');
      id = res.body.insertId;
      expect(err).to.eql(null);
      expect(res.body.insertId).to.eql(id);
      done();
    });
  });

  it('should GET by id', (done)=>{
    debug('GET by id');
    request.get('/'+ id)
    .end((err, res)=>{
      debug('inside GET by id test');
      user = res.body[0].note_user_name;
      console.log('res.body', res.body);
      expect(err).to.eql(null);
      expect(res.body).to.be.an('Array');
      expect(res.body[0].note_title).to.eql('testing title2');
      expect(res.body[0].note_food_name).to.eql('chocolate');
      done();
    });
  });

  it('should GET by user name', (done)=>{
    console.log('user name?', user);
    debug('GET by user name');
    request.get('/user/'+ user)
    .end((err, res)=>{
      debug('inside GET by user name test');
      console.log('res.body', res.body);
      expect(err).to.eql(null);
      expect(res.body).to.be.an('Array');
      expect(res.body[0].note_title).to.eql('testing title2');
      expect(res.body[0].note_food_name).to.eql('chocolate');
      done();
    });
  });

  it('should GET all the data stored in db', (done)=>{
    debug('hitting get');
    request.get('/')
    .end((err, res)=>{
      debug('hitting inside test get');
      expect(err).to.eql(null);
      expect(res.body).to.be.an('Array');
      expect(res.body[0]).to.have.property('note_id');
      expect(res.body[0]).to.have.property('note_title');
      expect(res.body[0]).to.have.property('note_food_name');
      expect(res.body[0]).to.have.property('submission_date');
      done();
    });
  });

  it('should DELETE data by id', (done)=>{
    debug('delete test block');
    console.log('id check in delete', id);
    request.delete('/delete/' + id)
    .end((err, res)=>{
      debug('inside of delete end');
      expect(err).to.eql(null);
      expect(res.body.insertId).to.eql(0);
      done();
    });
  });
});
