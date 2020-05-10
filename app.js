require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');

const Router = require('./routes/index');
const dbConnection = require('./src/config/dbconnect');
const userpassport = require('./src/config/userpassport');

const app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true
}));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: dbConnection,
    autoRemove:'native',
    autoRemoveInterval:'1440'
  }),
  cookie:{
    maxAge:1000*60*60*24
  }
}));
app.use(userpassport.initialize());
app.use(userpassport.session());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(cookieParser());

//Routers
app.use('/',Router.usersapi);
app.use('/notesapi',Router.notesapi)
app.use('/todoapi',Router.todosapi)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
//handling uncaugh exceptions
process.on('uncaughtException', (err, origin) => {
  console.log({
    err,
    origin
  });
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
