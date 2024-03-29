
/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer();

// Configuration
var pub = __dirname + '/public';

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.compiler({ src: pub, enable: ['sass'] }));
  app.use(express.static(pub));
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

var PostProvider = require('./postprovider').PostProvider;
var PostProvider= new PostProvider();

//Blog index
app.get('/', function(req, res){
  PostProvider.findAll(function(error, posts){
    res.render('index', {
	        locals: {
	          title: 'STOCK',
	          posts: posts
	        }
	});
  })
});

//new
app.get('/posts/new', function(req, res){
  res.render('post_new', {
             locals: {
               title: 'New Post'
             }
  });
});

//create
app.post('/posts/new', function(req, res){
  PostProvider.save({
	ModelCode: req.param('ModelCode'),
ItemCode: req.param('ItemCode'),
ProductName: req.param('ProductName'),
StockQty: req.param('StockQty'),
Mrp: req.param('Mrp'),
CashandCarry: req.param('CashandCarry'),
      }, function(error, docs) {
	res.redirect('/');
  });
});

//show
app.get('/posts/:id', function(req, res){
  PostProvider.findById(req.param('id'), function(error, post) {
    res.render('post_show', {
      locals: {
        title: post.title,
        post:post
      }
    });
  });
});

//edit
app.get('/posts/:id/edit', function(req, res){
  PostProvider.findById(req.param('id'), function(error, post) {
    res.render('post_edit', {
      locals: {
        title: post.title,
        post:post
      }
    });
  });
});

//update
app.post('/posts/:id/edit', function(req, res){
  PostProvider.updateById(req.param('id'), req.body, function(error, post) {
    res.redirect('/');
  });
});

// Only listen on $ node app.js

if (!module.parent) {
  app.listen(3000);
  console.log("Express server listening on port %d", app.address().port);
}
