const React = require("react");

const Expresion = React.createClass({
  propTypes: {
    img: React.PropTypes.string
  },

  _addText(text) {
    console.log("holi");
  },

  render() {
    return (
      <div className="Expresion">
        <img src={this.props.img} width="53" height="40"/>
      </div>
    )
  }
});

module.exports = Expresion;
