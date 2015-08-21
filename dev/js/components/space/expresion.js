const React = require("react");

const Expresion = React.createClass({
  propTypes: {
    img: React.PropTypes.string,
  },

  getDefaultProps() {
    expresion: {
      mathjax: 'funciona'
    }
  },

  _addExp() {
    this.props.changeDialogTex(this.props.source);
  },

  render() {
    return (
      <div className="Expresion" onClick={this._addExp}>
        <img src={this.props.img} width="53" height="40"/>
      </div>
    )
  }
});

module.exports = Expresion;
