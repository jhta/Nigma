const React = require("react");
//Utils
const ContentEditable       = require("../utils/content-editable");
const MaterializeComponents = require("../utils/material-components");
const {Button} = MaterializeComponents;

//Custom components
const ExpresionGenerator  = require("./expresion-generator");

const Formulation = React.createClass({

  getInitialState() {
    return {
      html: "escribe algo...",
      showGenerator: false
    }
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
        <div className="row">
          <ContentEditable
            cssClass = {"Formulation-ContentEditable"}
            html     = {this.state.html}
            onChange = {this._onChange}
          />
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
