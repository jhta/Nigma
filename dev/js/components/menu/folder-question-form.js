const React = require("react");
const MenuActions = require('../../actions/menu-actions');
var Modal = require('../util/modal');


var FolderQuestionForm = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState() {
    return {
      questionName: "",
      modalCreated: false
    };
  },
  propTypes: {
    folderIndex: React.PropTypes.number.isRequired,
  },
  _handleClick(e) {
    this.setState({
      modalCreated: true
    });
  },
  _addQuestion() {
    MenuActions.addQuestion(this.props.folderIndex, this.state.questionName);
    this.setState({
      modalCreated: false
    });
  },
  _cancelQuestion() {
    this.setState({
      modalCreated: false
    });
  },
  render() {
    let folderIndex = this.props.folderIndex;
    var modal;
    if(this.state.modalCreated){
      modal = (
        <Modal headerText="Nueva pregunta" ref="modal" positiveCallback={this._addQuestion} negativeCallback={this._cancelQuestion}>
          <div className="input-field col s12">
            <input
              id="question-name"
              type="text"
              valueLink={this.linkState('questionName')}/>
            <label htmlFor="question-name">Nombre</label>
          </div>
        </Modal>
      );
    }
    return (
      <div className="right-align FolderQuestionForm">
        <a onClick={this._handleClick}
          className="new-question waves-effect waves-light btn">
            Nueva pregunta
        </a>
        {modal}
      </div>
    );
  },

  componentDidUpdate(prevProps, prevState) {
    if(this.state.modalCreated && !prevState.modalCreated){
      this.refs.modal.openModal();
    }
  }


});

module.exports = FolderQuestionForm;
