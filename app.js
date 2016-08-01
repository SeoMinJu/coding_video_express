
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , bodyParser = require('body-parser')
  , fs = require('fs')
  , session = require('express-session')
  , FileStore = require('session-file-store')(session);

var app = express();
var port = process.env.PORT || 3001;

app.configure(function(){
  app.set('port', port);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(session({
	  store: new FileStore(),
	  secret: 'asdgae@dfsdf',
	  resave: false,
	  saveUninitialized: true
  }));
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(bodyParser.urlencoded({extended:false}));
  
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);

/*
// getTest
app.get('/getTest', routes.get);
app.get('/getTest/:id', routes.get);

// postTest
app.get('/form', routes.form);
app.post('/form_receiver', routes.post);

*/

// file 
app.get('/topic/new', routes.new);
app.post('/topic', routes.save);

app.get('/topic/:id', routes.view);
app.get('/topic', routes.view);

// session
app.get('/count', function(req, res) {
	if(req.session.count){
		req.session.count++;
	}
	else {
		req.session.count = 1;
	}
	res.send('count : ' + req.session.count );
});

app.get('/tmp', function(req, res){
	res.send('result : ' + req.session.count);
});

// login
app.get('/auth/login', routes.login);
app.post('/auth/login', routes.signin);

app.get('/welcome', function(req, res) {
	if(req.session.displayName){
		res.send('<h1>Hello,' +  req.session.displayName + '</h1><a href="/auth/logout">logout</a>');
	}
	else {
		res.send('<a href="/auth/login">Login</a>')		;
	}
});

app.get('/auth/logout', function(req, res){
	delete req.session.displayName;
	res.redirect('/welcome');
});

// session-store-file

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
