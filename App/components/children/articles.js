// Include React
var React = require("react");
// Helper for making AJAX requests to our API
var helpers = require("../utils/helpers");
// This is the History component. It will be used to show a log of  recent searches.
var Articles = React.createClass({
  // Here we describe this component's render method
  render: function() {
    var self = this;
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center"> Results</h3>
        </div>
        <div className="panel-body text-center">

          {/* Here we use a map function to loop through an array in JSX */}
          {this.props.results.map(function(search, i) {
            return (
              <div key={i} ref={"article"+i} className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title text-center"> {search.title}</h3>
                </div>
                <div className="panel-body text-center">
                  <div  className="row">
                    <div  className="col-md-9">
                      <p  className>{search.url}</p>
                    </div>
                    <div className="col-md-3">
                      <button className="btn btn-primary" onClick={self.props.clickFunction.bind(null, i, self.props.results[i])} type="submit"> Save </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Articles;
