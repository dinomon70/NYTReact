// Include React
var React = require("react");

// Here we include all of the sub-components
var Form = require("./children/Form");
var Articles = require("./children/articles");
var Saved = require("./children/saved");

// Helper for making AJAX requests to our API
var helpers = require("./utils/helpers");

// Creating the Main component
var Main = React.createClass({

  // Here we set a generic state
  getInitialState: function() {
    return { searchTerm: "", startYear: "", endYear: "", results: [], savedArticles:[] };
  },
  setTerm: function(term, endyear, startyear) {
    //will update the terms based on user input into the form
    this.setState({ searchTerm: term, endYear: endyear, startYear: startyear});
  },
  componentWillMount: function(){
    //retrieves all currently saved articles
    var self =this;
    helpers.getArticle("/api/saved")
      .then(function(response) {
        self.setState({
          savedArticles: response.data
        });
    });
  },
  setParent: function(results) {
    //function that will update results from searching different articles
    this.setState({
      results: results
    });
  },
  clickToSave: function(i, article){
    //when a user clicks on a article to save it, it will update the state of main
    var self = this;
    var articleName = "article"+i;
    var data = article;
    console.log(article);
    helpers.createArticle("/api/saved", data).then(function(response){
      var newArray = self.state.savedArticles;
      newArray.push(article);
      self.setState({
        savedArticles: newArray 
      });
    });
  },
  deleteArticle: function(i, id){
    //when a user deletes a saved article from the DB
    var self = this;
    helpers.deleteArticle("/api/saved/" + id).then(function(){
      var savedArray = self.state.savedArticles;
      savedArray.splice(i,1);
      self.setState({
        savedArticles: savedArray
      })
    });

  },
  // Here we render the page
  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="banner">
              <div className="jumbotron col-md-12">
                <h1>The New York Times Article Finder!</h1>
              </div>
          </div>
        </div>
          <div className="row">
            <div className="col-md-12">
              <Form setParent={this.setParent} />
            </div>
          </div>
        <div className="row">
          <div className="col-md-12">
            <Articles results={this.state.results} clickFunction={this.clickToSave} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <Saved savedArticles={this.state.savedArticles} deleteArticle={this.deleteArticle} />
          </div>
        </div>

      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Main;
