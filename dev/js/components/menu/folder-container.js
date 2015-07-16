const React = require("react");


//USED COMPONENTS
var FolderForm = require('./folder-form');

var FolderContainer = React.createClass({

  render: function() {
    return (
      <div className="FolderContainer  hoverable container z-depth-1">
        <h3 className="title">Preguntas y temas</h3>
        <hr />
        <FolderForm />
      </div>
    );
  }

});

module.exports = FolderContainer;
