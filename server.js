require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var ConstructionRouter = require('./routes/Buildings')
var ruleRouter = require('./routes/Rule')
var SpecificRuleRouter = require('./routes/SpecificRule')
var AdminRouter = require('./routes/Admin')
var PoliciesRouter = require('./routes/Privacies')
var feedbackRouter = require('./routes/feedback')
var feedbackResponseRouter = require('./routes/feedbackReponse')
var alertRouter = require('./routes/alerts')
var subscriptionRouter = require('./routes/subscription')

const uri = process.env.DATABASE_URL || "mongodb://localhost:27017/FinalYearProject";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/Policies' , PoliciesRouter)
app.use('/users', usersRouter);
app.use('/Construction',ConstructionRouter)
app.use('/Rules' , ruleRouter)
app.use('/SpecificRules' , SpecificRuleRouter)
app.use('/Admin',AdminRouter)
app.use('/feedback' , feedbackRouter)
app.use('/feedbackResponse',feedbackResponseRouter)
app.use('/Alert',alertRouter)
app.use('/subscription' , subscriptionRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page if found
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
