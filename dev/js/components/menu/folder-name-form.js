const React = require("react");
const MenuActions = require('../../actions/menu-actions');
var Modal = require('../util/modal');


var FolderNameForm = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  getInitialState() {
    return {
      folderName: this.props.folder.name,
      modalCreated: false
    };
  },

  propTypes: {
    folderIndex: React.PropTypes.number.isRequired,
    folder: React.PropTypes.object.isRequired
  },

  _handleClick(e) {
    this.setState({
      modalCreated: true
    });
  },

  _cancelUpdate() {
    this.setState({
      modalCreated: false
    });
  },

  _updateFolder(evt){
    MenuActions.updateFolder(this.props.folderIndex, this.props.folder, this.state.folderName);
    this.setState({
      modalCreated: false
    });
  },

  render() {
    let folderIndex = this.props.folderIndex;
    var modal;
    if (this.state.modalCreated) {
      modal = (
        <Modal headerText="Editar carpeta" ref="modal" positiveCallback={this._updateFolder}
               negativeCallback={this._cancelUpdate}>
          <div className="input-field col s12">
            <input
              type="text"
              valueLink={this.linkState('folderName')}
              defaultValue={this.props.folder.name}/>
          </div>
        </Modal>
      );
    }
    return (
      <span>
      <a className="Folder-body_actions__edit" onClick={this._handleClick}>
        <i className="material-icons">
          create
        </i>
      </a>
        {modal}
      </span>
    );
  },

  componentDidUpdate(prevProps, prevState) {
    if (this.state.modalCreated && !prevState.modalCreated) {
      this.refs.modal.openModal();
    }
  }


});

module.exports = FolderNameForm;
