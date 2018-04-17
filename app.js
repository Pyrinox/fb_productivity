var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const https = require('https');
const fs = require('fs');
var http = require('http');
var forceSsl = require('express-force-ssl');



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();


// const status = function statusChangeCallback(req, res, next){
// 	if(response.status === "connected"){
// 		console.log("Logged in and authenticated");
// 	} else {
// 		console.log("Not authenticated");
// 	};
// };






// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


// const credentials = {
//   key: fs.readFileSync('.localhost-ssl/key.pem'),
//   cert: fs.readFileSync('.localhost-ssl/cert.pem')
// }
// console.log(credentials)
// var httpServer = http.createServer(app);
// var httpsServer = https.createServer(credentials, app);

// httpServer.listen(8080);
// httpsServer.listen(3000);



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
  res.render('error.html');
});

// app.use(status);

// app.use(forceSsl);






module.exports = app;