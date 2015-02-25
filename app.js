var express = require('express');
var path = require('path');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var bodyParser = require('body-parser');
var multer = require('multer');
var mysql = require('mysql');
var myConnection = require('express-myconnection');
var favicon = require('serve-favicon');



//  =================
//  = Setup the app =
//  =================

// The app itself
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//  ============================
//  = Middleware configuration =
//  ============================

// Setup serving static assets public and make upload map available
app.use(express.static(path.join(__dirname, 'public')));
app.use('/upload', express.static(path.join(__dirname, 'upload')));
app.use(favicon(__dirname + '/public/favicon.ico'));


// Add session support
app.use(session({
  secret: '...', // CHANGE THIS!!!
  store: new FileStore(),
  saveUninitialized: true,
  resave: false
}));

// Setup bodyparser
app.use(bodyParser.urlencoded({extended: true}));

// Setup Multer
app.use(multer({dest: __dirname + "/upload" }));



// Setup MySQL

// Database configuration
var dbOptions = {
  host: 'localhost',
  user: 'root',
  password: '.....',
  database: '....'
};

// Add connection middleware
app.use(myConnection(mysql, dbOptions, 'single'));

//  ===========
//  = Routers =
//  ===========
var homeRouter = require('./routers/home');
var registerRouter = require('./routers/register');
var loginRouter = require('./routers/login');
var uploadRouter = require('./routers/upload');
var commentRouter = require('./routers/comment');
var logoutRouter = require('./routers/logout');
var userRouter = require('./routers/users');



app.use('/home', homeRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/upload', uploadRouter);
app.use('/comment', commentRouter);
app.use('/logout', logoutRouter);
app.use('/users', userRouter);

// This should be the ONLY route in this file!
app.get('/', function(req, res){
  res.redirect('/home');
});

//add 404 support, to-do: make neat 404 page
app.use(function (req, res){
  res.status(404);
  res.send("oops a 404!");
});


//  =================
//  = Start the app =
//  =================

app.listen(3000, function(){
  console.log('App listening at http://localhost:3000');
});