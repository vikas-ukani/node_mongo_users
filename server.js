const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const router = require('./router');

const app = express();
app.use(bodyParser.json());

app.set('port', config.port);

var PORT = process.env.PORT || 8080
app.listen(PORT, err => {
    if (err) console.error(err);
    console.log(`Server listening on port localhost:${PORT}`);
});

