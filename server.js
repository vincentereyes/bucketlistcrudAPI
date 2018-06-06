var express = require('express');
// Create an Express App
var app = express();

var mongoose = require('mongoose');
// Require body-parser (to receive post data from clients)
mongoose.connect('mongodb://localhost/task_api');
mongoose.Promise = global.Promise;

var TaskSchema = new mongoose.Schema({
    title:  { type: String, required: [true, "Title cannot be empty"]},
    completed: { type: Boolean, default: false}
}, {timestamps: true });

mongoose.model('Task', TaskSchema); // We are setting this Schema in our Models as 'User'
var Task = mongoose.model('Task');

var bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.json());
// Require path
var path = require('path');
// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './static')));

app.use(express.static(path.join(__dirname, '/restfulAngular/dist')));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
// Routes
// Root Request
app.get('/tasks', function(req, res) {
    // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
    Task.find({}, function(err, tasks) {
    	if (err) {
    		console.log("error")
            res.json({message: "Error", error: err})
    	} else {
    		res.json({message: "success", data: tasks});
    	}
    })
})

app.get('/tasks/:id', function(req, res) {
    // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
    Task.findOne({_id: req.params.id}, function(err, task){
		if (err) {
    		console.log("error")
            res.json({message: "Error", error: err})
    	} else {
    		res.json({message: "success", data: task});
    	}
	})   
})

app.post('/tasks', function(req, res) {
    console.log("posty malony")
    // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
    var task = new Task();
    console.log(req)
    task.title = req.body.title;
    task.save(function(err) {
    if (err) {
            res.json({message: "Error", error: task.errors})
    	} else {
    		res.json({message: "Success"});
    	}	
    })    
})

app.put('/tasks/:id', function(req, res) {
    Task.findOne({_id: req.params.id}, function(err, task) {
    task.title = req.body.title;
    task.completed = req.body.completed;
    task.save(function(err){
    	if (err) {
        console.log(err)
         res.json({message: "Error", error: err})
     } else {
         res.json({message: "Success"});  
     }
    })
     
    })
})

app.delete("/tasks/:id", function(req, res) {
    Task.remove({_id: req.params.id}, function(err){
        if (err){
            console.log("error")
        }else {
            res.json({message: "success"});
        }
    })
})

app.listen(8000, function() {
    console.log("listening on port 8000");
})