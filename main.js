'use strict';
// Packages
const express = require('express'); // To serve the webpage
const bodyParser = require('body-parser'); // To parse POST data
const app = express();
app.use(express.urlencoded());
app.use(express.json());

// Routes
const api = require('./routes/api');


// ROOT
app.get('/', (req, res) => {
    res.send('ok');
});

// ROOT/api
app.use('/api', api);

// Listening to http://localhost:3000
app.listen(3000)