var express              = require('express');
var path                 = require('path');
var favicon              = require('serve-favicon');
var logger               = require('morgan');
var cookieParser         = require('cookie-parser');
var bodyParser           = require('body-parser');
var routes               = require('./controllers/index');
var mongoose             = require('mongoose');
var passport             = require('passport');
var session              = require('express-session');
var flash                = require('connect-flash');
var config               = require('./config/appConfig.js');
var attachAuthentication = require('./middlewares/attachAuthentication.js');
var setFlash             = require('./middlewares/setFlash');
var csurf                = require('csurf');
var helmet               = require('helmet');

var app = express();

// database connection
mongoose.connect(config.databaseUrl);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger(config.environment));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));
app.use(cookieParser());
app.use(session({
    secret : config.sessionSecret,
    resave : true,
    saveUninitialized : true
}));
app.use(passport.initialize());
// pass passport for configuration
require('./config/passportConfig.js')(passport);
app.use(passport.session());
app.use(flash());
app.use(setFlash);
app.use(attachAuthentication);
app.use(csurf());
app.use(require('./middlewares/attachCrsfToken.js'));
app.use(helmet());
app.use(helmet.csp(config.helmet.csp));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// bad csrf token error handler
app.use(function (err, req, res, next) {
    if (err.code !== 'EBADCSRFTOKEN'){
        return next(err);
    }
    // handle CSRF token errors here
    res.status(403);
    res.send('form tampered with');
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
