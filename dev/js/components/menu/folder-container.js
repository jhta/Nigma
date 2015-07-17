const React = require("react");


//USED COMPONENTS
const FolderForm = require('./folder-form');
const FolderList = require('./folder-list');
var MenuStore = require('../../stores/menu-store');
var FolderContainer = React.createClass({
  getInitialState: function() {
    return {
      folderItems: MenuStore.getFolders()
    };
  },
  _handleChange: function(){
    this.setState({
      folderItems: MenuStore.getFolders()
    });
  },
  componentWillMount: function() {
    MenuStore.addChangeListener(this._handleChange);
  },
  render: function() {
    return (
      <div className="FolderContainer  hoverable container z-depth-1">
        <h3 className="title">Preguntas y temas</h3>
        <div className="divider"></div>
        <FolderForm />
        <FolderList folders={this.state.folderItems} />
      </div>
    );
  },
  componentWillUnmount: function() {
    MenuStore.removeChangeListener()
  },

});

module.exports = FolderContainer;
