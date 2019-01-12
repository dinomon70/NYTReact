// Backend; must run server.js for app to work
// server.js has listeners (api's) that communicate to the client (front end) 
// Include Server Dependencies
// These are frameworks that make it easier to build a server - allows user to use node for web applications.  This can mean less jQuery on the front end and more speed for the user.
// 
var express = require("express");
// body paser is middleware - what is middleware?
// body parser makes sense of the json object that is returned from the api.  
// body parser extracts the entire body portion of the josn oject that the api provides, and 
// look up body parser to understand
var bodyParser = require("body-parser");
// morgan is middleware
// logs interactions of the get/post requests
// allows developer to see the logs.  develop defines where the log goes.
// look it answer
var logger = require("morgan");
// orm for mongodb
// orm = object relational map
// orm allows for findAll() rather than having to write out what each thing means
// you wrap your tables or stored procedures in classes in your programming language, so that instead of writing SQL/Mongo statements/? to interact with your database, you use methods and properties or objects
// Orm give you a way of writing queries
var mongoose = require("mongoose");

// Require History Schema
// History is the model I defined utilizing the mongoose orm for mongodb
// the server needs to know where/what the model is, and how it suppose to talk to the db
var History = require("./models/history");

// Create Instance of Express
// instaniating express
// why are you instaniating express?  what does it help to instantiate things?
// what does instaniate mean?  An instantiated object is given a name and created in memory or on disk using the structure described within a class declaration.
// 
var app = express();

// Sets an initial port. We'll use this later in our listener
// database and server run on two different ports
// this is the port you're creating for your server
var PORT = process.env.PORT || 3000;

// Run Morgan (aka the instantiation of morgan) which is stored in the variable logger
// using the variables defined above to write instructions for morgan on how to record mongo logs.
// find where else in the app this is used.  
// you're not using this at all right now.  to use, you need to write code to help morgan understand where to put the object it gets back from mongo with the records of each instance of a query aka, logs
// .use is an express method
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("./public"));

// -------------------------------------------------
// mongodb://heroku_sd8x9fwj:h64aoisulb9351p9epa0dan28k@ds129442.mlab.com:29442/heroku_sd8x9fwj
// MongoDB Configuration configuration
// Mongo - nonsql database.  can define collections/db fields as you go
// writing a line of code that connect the mongoose orm to mongodb
mongoose.connect(process.env.MONGODB_URI || "mongodb://heroku_sd8x9fwj:h64aoisulb9351p9epa0dan28k@ds129442.mlab.com:29442/heroku_sd8x9fwj");
// putting connection into a variable because typing it out is harder
// what is the difference between connect above and .connection below
var db = mongoose.connection;

// understand what these are...
db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// -------------------------------------------------
//defining routes
// html route
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});
// -------------------------------------------------
//API Routes ---------------------------------
// This is the route we will send GET requests to retrieve our most recent search data.
app.get("/api/saved", function(req, res) {

  // We will find all the records
  // find is a mongoose method
  // mongoose methods define queries so you don't have to
  // what is history
  History.find({}).exec(function(err, doc) {
    if (err) {
      console.log(err);
    }
    else {
      res.send(doc);
    }
  });
});

// This is the route we will send POST requests to save each article.
app.post("/api/saved", function(req, res) {
  console.log(req.body);

  History.create({
    title: req.body.title,
    date: req.body.date,
    url: req.body.url,
    saved: req.body.saved,
    notes: []
  }, function(err) {
    if (err) {
      console.log(err);
    }
    else {
      res.redirect("saved");
    }
  });
});

//delete route
app.post("/api/saved/:noteId", function(req, res) {
  var noteId = req.params.noteId;
  console.log(noteId);
  History.remove({ '_id': noteId })
    // Now, execute the query
    .exec(function(error, doc) {
      // Send any errors to the browser
      if (error) {
        res.send(error);
      }
      // Or send the doc to the browser
      else {
        res.redirect("/");
      }
    });
});

// -------------------------------------------------

// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
