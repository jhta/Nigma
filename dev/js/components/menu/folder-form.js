const React = require("react");
const MenuActions = require('../../actions/menu-actions');


var FormFolder = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  getInitialState: function() {
    return {
      folderName: ""
    };
  },
  _handleClick: function (e) {
    MenuActions.addFolder(this.state.folderName);
  },
  render: function() {
    return (
      <div className="FolderForm">
        <div className="row">
          <div className="col s7 m7 l7">
            <div className="input-field col s12">
              <input
                id="folder_name"
                type="text"
                valueLink={this.linkState('folderName')}/>
              <label htmlFor="folder_name">Nombre</label>
            </div>
          </div>
          <div className="col s5 m5 l5">
            <button className="form-folder-button waves-effect waves-light truncate btn" onClick={this._handleClick}>Agregar folder <i className="material-icons right">done</i></button>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = FormFolder;
