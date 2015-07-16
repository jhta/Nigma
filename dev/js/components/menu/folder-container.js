const React = require("react");


//USED COMPONENTS
const FolderForm = require('./folder-form');
const FolderList = require('./folder-list');
var folderItems = require('./example-items');
var FolderContainer = React.createClass({

  render: function() {
    return (
      <div className="FolderContainer  hoverable container z-depth-1">
        <h3 className="title">Preguntas y temas</h3>
        <div className="divider"></div>
        <FolderForm />
        <FolderList folders={folderItems} />
      </div>
    );
  }

});

module.exports = FolderContainer;
