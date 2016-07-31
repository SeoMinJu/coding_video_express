var fs = require('fs');
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

// form
exports.form = function(req, res) {
	res.render('form');
};

// get
var topics = [
	'Javascript is ...',
	'Node.js is ...',
	'Express is ...'
];

exports.get = function(req, res){
  res.render('get', {query : topics[req.query.id-1],
					 params : topics[req.params.id-1]});
};

// post
/*
 * POST home page.
 */

exports.post = function(req, res){
	var title = req.body.title;
	var description = req.body.description;
  	res.render('post', {title : title , description: description.toString() });
};

//file 
exports.new = function(req, res) {
	fs.readdir('data', function(err, files) {
		if(err){
			console.log(err);
			res.status(500).send('Internal Server Error1');		
		}
		res.render('new', {topics : files});
	});
};

exports.save = function(req, res){
	var title = req.body.title;
	var description = req.body.description;
	fs.writeFile('data/'+ title, description, function(err){
		if(err){
			console.log(err);
			res.status(500).send('Internal Server Error');
		}
		res.redirect('/topic/'+title);
	});
	
};
/*
exports.view = function(req, res) {
	fs.readdir('data', function(err, files) {
		if(err){
			console.log(err);
			res.status(500).send('Internal Server Error');		
		}
		res.render('view', {topics : files});
	});
};
*/
exports.view = function(req, res) {
	fs.readdir('data', function(err, files) {
		if(err){
			console.log(err);
			res.status(500).send('Internal Server Error1');		
		}
		
		var id = req.params.id;
		if(id) {
			fs.readFile('data/'+id, 'utf8', function(err, data){
			if(err){
				console.log(err);
				res.status(500).send('Internal Server Error2' + id);		
			}
			res.render('view', {topics : files, title: id, description:data});
			});
		}
		
		else {
			res.render('view', {topics : files, title: 'welcome', description:'Hello, Javascript for Server'});
		}	
	});
};
	
		