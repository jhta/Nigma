const React = require("react");
var MenuStore = require('../../stores/menu-store');
const MenuActions = require('../../actions/menu-actions');
//USED COMPONENTS
const FolderForm = require('./folder-form');
const FolderList = require('./folder-list');
const QuestionList = require('./question-list');

var FolderContainer = React.createClass({

  getInitialState: function () {
    return {
      folderItems: MenuStore.getFolders()
    };
  },

  componentWillMount: function () {
    MenuStore.addChangeListener(this._handleChange);
    MenuActions.listFolders();
  },

  componentWillUnmount: function () {
    MenuStore.removeChangeListener()
  },

  _handleChange() {
    this.setState({
      folderItems: MenuStore.getFolders(),
      folderDefault: MenuStore.getDefaultFolder()
    });
  },

  render() {
    return (
      <div className="FolderContainer container">
        <div className="FolderContainer-header z-depth-1">
          <h3 className="title">Preguntas y temas</h3>

          <div className="divider"></div>
          <FolderForm folderDefault={this.state.folderDefault}/>
        </div>
        <FolderList folders={this.state.folderItems}/>
        <QuestionList folderDefault={this.state.folderDefault}/>
      </div>
    );
  },

});

module.exports = FolderContainer;
