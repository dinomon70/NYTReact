// the model for mongodb utilizes mongoose orm
// the model file is named "history"
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  title: {
    type: String
  },
  date: {
    type: Date
  },
  url: {
  	type: String
  }, 
  notes: []

});

var Articles = mongoose.model("Articles", ArticleSchema);
module.exports = Articles;
