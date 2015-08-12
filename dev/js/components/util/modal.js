const React = require('react');

var Modal = React.createClass({

  getDefaultProps: function() {
    return {
      positiveButtonText: "Aceptar",
      negativeButtonText: "Cancelar",
      showPositiveButton: true,
      showNegativeButton: true
    };
  },

  propTypes: {
    headerText: React.PropTypes.string.isRequired,
    positiveButtonText: React.PropTypes.string,
    showPositiveButton: React.PropTypes.bool,
    showNegativeButton: React.PropTypes.bool,
    negativeCallback: React.PropTypes.func,
    positiveCallback: React.PropTypes.func
  },

  _handlePositiveClick: function(){
    if(this.props.positiveCallback)
      this.props.positiveCallback();
    $(this.getDOMNode()).closeModal();
  },

  _handleNegativeClick: function() {
    if(this.props.negativeCallback)
      this.props.negativeCallback();
    $(this.getDOMNode()).closeModal();
  },

  openModal: function() {
    $(this.getDOMNode()).openModal({
      dismissible: false
    });
  },

  closeModal: function() {
    $(this.getDOMNode()).closeModal();
  },

  render: function() {
    var positiveButton;
    var negativeButton;
    if (this.props.showPositiveButton){
      positiveButton = <a onClick={this._handlePositiveClick} className="modal-action waves-effect waves-green btn">{this.props.positiveButtonText}</a>
    }
    if (this.props.showNegativeButton){
      negativeButton = <a onClick={this._handleNegativeClick} className="modal-action waves-effect waves-green btn-flat">{this.props.negativeButtonText}</a>
    }
    return (
      <div className="modal">
        <div className="modal-content">
          <h4>{this.props.headerText}</h4>
          {this.props.children}
        </div>
        <div className="modal-footer">
          {positiveButton}
          {negativeButton}
        </div>
      </div>

    );
  }

});

module.exports = Modal;
