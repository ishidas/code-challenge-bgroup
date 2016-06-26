'use strict';
const debug = require('debug')('noteApp:cli-server');

require('express')().use(require('express').static('build'))
  .listen(8080, ()=>{debug('listening at 8080');});
