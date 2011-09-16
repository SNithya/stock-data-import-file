var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_stock');

var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var Post = new Schema({
ModelCode : String,
ItemCode : String,
ProductName : String,
StockQty : String,
Mrp : String,
CashandCarry : String

});

mongoose.model('Post', Post);
var Post = mongoose.model('Post');

PostProvider = function(){};

//Find all posts
PostProvider.prototype.findAll = function(callback) {
  Post.find({}, function (err, posts) {
    callback( null, posts )
  });  
};

//Find post by ID
PostProvider.prototype.findById = function(id, callback) {
  Post.findById(id, function (err, post) {
    if (!err) {
	  callback(null, post);
	}
  });
};

//Update post by ID
PostProvider.prototype.updateById = function(id, body, callback) {
  Post.findById(id, function (err, post) {
    if (!err) {
	  post.ModelCode = body.ModelCode;
	post.ItemCode = body.ItemCode;
post.ProductName = body.ProductName;
post.StockQty = body.StockQty;
post.Mrp = body.Mrp;
post.CashandCarry = body.CashandCarry;
	 
	  post.save(function (err) {
	    callback();
	  });
	}
  });
};

//Create a new post
PostProvider.prototype.save = function(params, callback) {
  var post = new Post({ModelCode: params['ModelCode'],ItemCode: params['ItemCode'],ProductName: params['ProductName'],StockQty: params['StockQty'],Mrp: params['Mrp'],CashandCarry: params['CashandCarry'], created_at: new Date()});
  post.save(function (err) {
    callback();
  });
};


exports.PostProvider = PostProvider;
