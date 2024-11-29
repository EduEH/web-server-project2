var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var auth = require ('./routes/auth'); 

var app = express();

var passport = require('passport'); 
var session = require('express-session'); 
var GoogleStrategy = require('passport-google-oauth20').Strategy; 
passport.use(new GoogleStrategy({ 
clientID: '683472913075-7a0lp319cnm7q9rk274rr788jv67mg42.apps.googleusercontent.com',
clientSecret: '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', 
callbackURL: 'https://test.eddhirai.online:4000/auth/google/callback'}, 
function(accessToken, refreshToken, profile, cb) { 
cb(null, profile); 
} 
));


app.use('/auth', auth); 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({secret: 'cat',
    resave: false,
    saveUnitialized: false,
    cookie: {secure: false}
})); 
app.use(passport.initialize()); 
app.use(passport.session()); 
passport.serializeUser(function(user, done) { 
done(null, user); 
});
passport.deserializeUser(function(user, done) { 
  done(null, user); 
  }); 


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
