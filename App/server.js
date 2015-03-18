var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('co_status', ['project']);
var bodyParser = require('body-parser');


app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/colist', function(req,res){
	//console.log("I received a GET colist!!");
	
	db.project.find(function(err,docs){
		//console.log(docs);
    		res.json(docs);
	}); 
});

app.post('/colist', function (req, res) {
	//console.log(req.body);
	var obj = req.body;
	//console.log ('length is ' + obj.length );
	for (i = 0; i < obj.length; i++) {
		var id = obj[i]._id;
		//console.log('id is ' + id);
		//console.log(docs);

    				if (id == null)
				{
					//console.log("in if");
					//console.log(obj[i]);
					db.project.insert(obj[i], function(err, doc) {
					//console.log ('inserted');
					//console.log (err);
					res.json(doc);
					})	
				}
	}
	
});

app.delete('/colist/:id', function (req, res) {
	var id = req.params.id;
	//console.log(id);
	db.project.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
		res.json(doc);
	})
});

app.get('/colist/:id', function (req, res) {
	var id = req.params.id;
	//console.log(id);
	db.project.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
		res.json(doc);
	});
});

app.put('/colist/:id', function (req, res) {
	var id = req.params.id;
	//console.log(req.body.number);
	db.project.findAndModify({query: {_id: mongojs.ObjectId(id)},
		update: {$set: {act_effort: req.body.act_effort, end_date: req.body.end_date, status: req.body.status, remarks: req.body.remarks, effort_type: req.body.effort_type}},
		new: true}, function (err, doc) {
			//res.json(doc);
		});
		
	db.project.update({'number':req.body.number},{$set:{'status':req.body.status}},{multi:true}, function (err, doc) {
			res.json(doc);
		}); 		
});
app.listen(3000);
console.log("Server running on port 3000");