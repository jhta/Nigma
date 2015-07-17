const React = require("react");

var Modal = require('../util/modal');
var FolderQuestionForm = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function() {
    return {
      questionName: ""
    };
  },
  propTypes: {
    folderIndex: React.PropTypes.number.isRequired,
  },
  _handleClick: function(e) {
    this.refs.modal.open();
  },
  render: function() {
    let folderIndex = this.props.folderIndex;
    return (
      <div className="FolderQuestionForm">
        <div className="row">
          <div className="col s5 offset-s7">
            <div className="right-align">
              <a onClick={this._handleClick} className="new-question waves-effect waves-light btn">Nueva pregunta</a>
            </div>
          </div>
        </div>
        <Modal headerText="Nueva pregunta" ref="modal">
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
