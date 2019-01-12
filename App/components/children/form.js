// Include React
var React = require("react");
// Helper for making AJAX requests to our API
var helpers = require("../utils/helpers");
// Creating the Form component
var Form = React.createClass({

  // Here we set a generic state associated with the text being searched for
  getInitialState: function() {
    return { term: "", startYear: "", endYear: "", results: [] };
  },

  // This function will respond to the user input
  termChange: function(event) {
    this.setState({ 
      term: event.target.value });

  },

    // This function will respond to the user input
  endyearChange: function(event) {
    this.setState({ 
      endYear: event.target.value });

  },

  // This function will respond to the user input
  startyearChange: function(event) {
    this.setState({ 
      startYear: event.target.value });
  },

  queryAPI : function(){
    //queries API and saves results to an array (will be an array of objects)
    var self =this;
    helpers.runQuery(this.state.term, this.state.startYear, this.state.endYear)
    .then(function(response){
      var searchResults = [];
      for(var i = 0; i < response.data.response.docs.length; i++){
        var info = {
          title: response.data.response.docs[i].headline.main,
          url: response.data.response.docs[i].web_url,
          date: response.data.response.docs[i].pub_date,
          saved: false
        }
        searchResults.push(info);
      }
      self.setState({
        results: searchResults
      });
      //updates the parents state
      self.props.setParent(searchResults);
    });
  },
  // Here we describe this component's render method
  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Search</h3>
        </div>
        <div className="panel-body text-center">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <h4 className="">
                <strong>Topic</strong>
              </h4>
              <input
                value={this.state.term}
                type="text"
                className="form-control text-center"
                id="term"
                onChange={this.termChange}
                required
              />
              <br />
              <h4 className="">
                <strong>Start Year</strong>
              </h4>
              <input
                value={this.state.startYear}
                type="text"
                className="form-control text-center"
                id="startYear"
                onChange={this.startyearChange}
                required
              />
              <br />
              <h4 className="">
                <strong>End Year</strong>
              </h4>
              <input
                value={this.state.endYear}
                type="text"
                className="form-control text-center"
                id="endYear"
                onChange={this.endyearChange}
                required
              />
              <br />
              <button
                className="btn btn-primary"
                type="submit"
                onClick = {this.queryAPI}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Form;
