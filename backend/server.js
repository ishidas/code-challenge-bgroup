'use strict';
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const debug = require('debug')('noteApp:server');
const PORT = 3000;

app.use(bodyParser);


app.listen(PORT, ()=> debug(`server running at ${PORT}`));
