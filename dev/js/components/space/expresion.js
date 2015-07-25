const React = require("react");

const Expresion = React.createClass({
  render() {
    return (
      <div className="Expresion">
        <img src={this.props.img} width="53" height="40"/>
      </div>
    )
  }
});

module.exports = Expresion;
