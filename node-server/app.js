// modules =================================================
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var environment = process.env.NODE_ENV || 'development';
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var methodOverride = require('method-override');
var cors = require('cors');
var fs = require('fs');

// configuration ===========================================

// config files
var db = require('./config/db');

// connect to our mongoDB database
if (environment === 'production') {
  mongoose.connect(db.production.mongo);
} else {
  mongoose.connect(db.development.mongo);
}

// Allow cross-origin resource sharing
app.use(cors());

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('view engine', 'ejs');

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

app.use(express.static(__dirname + '/public'));

app.use(session({
  secret: 'soggyNacho',
  name: 'soggy-nachos',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// models ==================================================
fs.readdirSync(__dirname + '/app/models').forEach(function(filename) {
  if (~filename.indexOf('.js')) {
    require(__dirname + '/app/models/' + filename);
  }
});

// routes ==================================================
require('./app/controllers/routes')(app);

// start app ===============================================
app.listen(port);
console.log('listening on port', port);

exports = module.exports = app;
