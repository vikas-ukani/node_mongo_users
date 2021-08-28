const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
require('dotenv').config({ path: '.env' });

const config = require('./config');
const router = require('./router');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var path = require('path');
var flash = require('express-flash');
var session = require('express-session');

const app = express();
app.use(bodyParser.json());

app.use('/', router);

app.set('port', config.port);
try {
    mongoose
        .connect(process.env.DB_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            retryWrites: true,
        })
        .then((con) => console.log('DB connection successful'))
        .catch(error => console.log('catch::', error))
}
catch (error) {
    console.log('Error connection: ' + error);
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(flash());


// error handler
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 400);
    res.render('error');
});

var PORT = process.env.PORT || 8080
app.listen(PORT, err => {
    if (err) console.error(err);
    console.log(`Server listening on port localhost:${PORT}`);
});

