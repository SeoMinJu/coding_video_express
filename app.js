
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , bodyParser = require('body-parser')
  , fs = require('fs');

var app = express();
var port = process.env.PORT || 3001;

app.configure(function(){
  app.set('port', port);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
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

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
