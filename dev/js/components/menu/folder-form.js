const React = require("react");
var FormFolder = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  getInitialState: function() {
    return {
      folderName: ""
    };
  },
  _handleClick: function (e) {
    alert("Click");
  },

  render: function() {
    return (
      <div className="FolderForm">
        <div className="row">
          <div className="col s7 m8 l9">
            <div className="input-field col s12">
              <input
                id="folder-name"
                placeholder="Nombre"
                type="text"
                valueLink={this.linkState('folderName')}/>
            </div>
          </div>
          <div className="col s5 m4 l3">
            <button className="waves-effect waves-light truncate btn" onClick={this._handleClick}>Agregar folder <i className="material-icons right">done</i></button>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = FormFolder;
