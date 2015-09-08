const React = require("react");
const MenuActions = require('../../actions/menu-actions');


var FormFolder = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  getInitialState() {
    return {
      folderName: "",
      questionName: ""
    };
  },

  propTypes: {
    folderDefault: React.PropTypes.object.isRequired
  },

  _handleClickCreateFolder(e) {
    MenuActions.createFolder(this.state.folderName);
  },

  _handleClickCreateQuestion(e) {
    MenuActions.createQuestion(-1, this.props.folderDefault, this.state.questionName);
  },

  render() {
    return (
      <div>
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
            onClick={this._handleClickCreateFolder}
            >
            Agregar carpeta
            <i className="material-icons right">
              done
            </i>
          </button>
        </div>

        <div className="FolderForm">
          <div className="FolderForm-input input-field">
            <input
              type="text"
              ref="questionInput"
              valueLink={this.linkState('questionName')}/>
            <label htmlFor="question_name">Nombre</label>
          </div>
          <button
            className="FolderForm-button waves-effect waves-light truncate btn"
            onClick={this._handleClickCreateQuestion}
            >
            Agregar pregunta
            <i className="material-icons right">
              done
            </i>
          </button>
        </div>
      </div>
    );
  }

});

module.exports = FormFolder;
