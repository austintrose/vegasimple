// Third party dependencies.
let express = require('express')
    ,path = require('path')
    ,swig = require('swig')
    ,logger = require('morgan')
    ;

// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');
// var cookieSession = require('cookie-session');

// URL routes.
let routes = require('./routes/index.js');

// Express app.
let app = express();

// Configure view engine.
app.engine('html', new swig.Swig().renderFile);
app.set('view engine', 'html');

// Configure static files directory.
app.set('views', path.join(__dirname, 'views' ));

// Configure middleware.
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, '../client')));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(cookieSession({name: 'session', keys: ['key1', 'key2'], maxAge: 24 * 60 * 60 * 1000}));

// Configure routes.
app.use('/', routes);

// Catch 404 and forward to error handler.
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Dev error handler.
if (app.get('env') === 'development') {
    app.use(function(err, req, res) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// Prod error handler.
else {
    app.use(function(err, req, res) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
}

// Export express app.
module.exports = app;