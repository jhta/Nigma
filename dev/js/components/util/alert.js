const React = require('react');

const AlertMessage = React.createClass({

  propTypes: {
    data: React.PropTypes.object
  },

  getInitialState() {
    return {isShowing: false}
  },

  componentWillReceiveProps(nextProps) {
    if(nextProps.data != null && !this.state.isShowing) {
      this.setState({isShowing: true})
      this._alertTimming();
    }
  },


  _alertTimming() {
    setTimeout(this._closeAlert, 8000);
  },

  _closeAlert() {
    this.setState({isShowing: false});
  },

  render(){
    let status = this.state.isShowing? "active":"";
    let type = (this.props.data == null) ? "": (this.props.data.error ? "negative":"positive");
    let classMessage = `${type} alert-message ${status}`;
    let messages = (this.props.data == null) ? []:this.props.data.messages;
    return(
      <div className={classMessage}>
        <div className="close" onClick={this._closeAlert}>
          <i className="material-icons">close</i>
        </div>
        <ul>
          {messages.map((message, index) => <li key={index}>{message}</li>)}
        </ul>
      </div>
    );
  }

});

module.exports = AlertMessage;