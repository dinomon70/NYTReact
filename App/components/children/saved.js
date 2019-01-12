// Include React
var React = require("react");
// Helper for making AJAX requests to our API
var helpers = require("../utils/helpers");

var Saved = React.createClass({
   getInitialState: function() {
    return {results: []};
  },

  render: function() {
    var self = this;
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center"> Saved Articles</h3>
        </div>
        <div className="panel-body text-center">

          {/* Here we use a map function to loop through an array in JSX */}
          {this.props.savedArticles.map(function(search, i) {
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
                      <button className="btn btn-primary" id={search._id} onClick={self.props.deleteArticle.bind(null, i, search._id) } type="submit"> Remove Saved Article </button>
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
module.exports = Saved;
