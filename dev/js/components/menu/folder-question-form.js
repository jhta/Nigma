const React = require("react");
const MenuActions = require('../../actions/menu-actions');
var Modal = require('../util/modal');


var FolderQuestionForm = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState() {
    return {
      questionName: ""
    };
  },
  propTypes: {
    folderIndex: React.PropTypes.number.isRequired,
  },
  _handleClick(e) {
    this.refs.modal.openModal();
  },
  _addQuestion() {
    MenuActions.addQuestion(this.props.folderIndex, this.state.questionName);
  },
  render() {
    let folderIndex = this.props.folderIndex;
    return (
      <div>
        <div className="FolderQuestionForm">
          <a onClick={this._handleClick}
            className="new-question waves-effect waves-light btn">
              Nueva pregunta
          </a>
        </div>
        <Modal headerText="Nueva pregunta" ref="modal" positiveCallback={this._addQuestion}>
          <div className="input-field col s12">
            <input
              id="question-name"
              type="text"
              valueLink={this.linkState('questionName')}/>
            <label htmlFor="question-name">Nombre</label>
          </div>
        </Modal>
      </div>
    );
  }

});

module.exports = FolderQuestionForm;
