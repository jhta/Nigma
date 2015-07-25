const React = require("react");
const MenuActions = require('../../actions/menu-actions');


var FormFolder = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  getInitialState() {
    return {
      folderName: ""
    };
  },
  _handleClick(e) {
    MenuActions.addFolder(this.state.folderName);
    //React.findDOMNode(this.refs.folderInput).value = "";
    console.log(React.findDOMNode(this.refs.folderInput));
  },
  render() {
    return (
      <div className="FolderForm">
            <div className="FolderForm-input input-field">
              <input
                id="folder_name"
                type="text"
                ref="folderInput"
                valueLink={this.linkState('folderName')}/>
              <label htmlFor="folder_name">Nombre</label>
            </div>
            <button
              className="FolderForm-button waves-effect waves-light truncate btn"
              onClick={this._handleClick}
              >
                Agregar folder
              <i className="material-icons right">
                done
              </i>
            </button>
      </div>
    );
  }

});

module.exports = FormFolder;
