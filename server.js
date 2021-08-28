const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });

const config = require('./config');
const router = require('./router');
var parser = require('body-parser');
var path = require('path');

const app = express();
app.use(parser.urlencoded({ extended: false }))
app.use(parser.json())

/** all routes available here */
app.use('/', router);
app.set('port', config.port);
try {
    mongoose
        .connect(
            process.env.DB_URL + process.env.DB_NAME,
            {
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

app.use(express.static(path.join(__dirname, 'public')));

// error handler
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 400);
    res.render('error');
});

/** port for run server  */
var PORT = process.env.PORT || 8080
app.listen(PORT, err => {
    if (err) console.error(err);
    console.log(`Server listening on port localhost:${PORT}`);
});