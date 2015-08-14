const React = require("react");
//Utils
const ContentEditable       = require("../utils/content-editable");
const MaterializeComponents = require("../utils/material-components");
const {Button} = MaterializeComponents;
const Ckeditor = require('../../utils/ckeditor');

//Custom components
const ExpresionGenerator  = require("./expresion-generator");

const Formulation = React.createClass({

  propTypes: {
    showExpresions: React.PropTypes.func,
    expresions: React.PropTypes.bool
  },

  getInitialState() {
    return {
      html: "escribe algo...",
      showGenerator: false
    }
  },

  componentDidMount() {
    setTimeout(Ckeditor.start(this._onOpen, this._onClose),100);
  },

  _onOpen() {
    this.props.showExpresions(true);
  },

  _onClose() {
    this.props.showExpresions(false);
  },
  /**
   * [set html->state, when  any change is
   * made on content-editable]
   * @param  {event} e [event target of input]
   */
  _onChangeContentEditable(e) {
    this.setState({html: e.target.value})
  },

  _addExpresion() {
    this.setState({showGenerator: true});
  },

  render() {
    return (
      <div className="Formulation u-tab-content">
        <div className="row Formulation-CKEditor">
          <div id="editor">
            <p>{this.state.html}</p>
          </div>
        </div>

        <div className="row">
          <Button
            label = "Expresion"
            icon  = "code"
            cssClass = "Button"
            onClick  = {this._addExpresion}
          />
          <Button
            label = "Imagen"
            icon  = "attach_file"
            cssClass = "Button"
          />
        </div>
        <ExpresionGenerator show={this.state.showGenerator}/>
      </div>
    )
  }
});


module.exports = Formulation;
