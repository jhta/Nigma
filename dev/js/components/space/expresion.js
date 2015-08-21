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
    var classExpresion = this.props.content.type == 'trigonometric'? 'Expresion-trigonometric' : 'Expresion';
    return (
      <div className={classExpresion} onClick={this._addExp}>
        <img src={this.props.img} width={this.props.content.width} height={this.props.content.height} />
      </div>
    )
  }
});

module.exports = Expresion;
