const React = require("react");
const ContentEditable       = require("../utils/content-editable");
const MaterializeComponents = require("../utils/material-components");
const {Button} = MaterializeComponents;
const Ckeditor = require('../../utils/ckeditor');
const FormulationActions = require('../../actions/space/formulation-actions')

//Custom components
const ExpresionGenerator  = require("./expresion-generator");

const Formulation = React.createClass({

  propTypes: {
    showExpresions: React.PropTypes.func,
    expresions: React.PropTypes.bool
  },

  getInitialState() {
    return {
      html: FormulationStore.getFormulation(),
    }
  },

  componentWillMount() {
    FormulationStore.addChangeListener(this._onChange);
  },

  _onChange() {
    this.setState({
      html: FormulationStore.getFormulation()
    });
  },

  componentDidMount() {
    setTimeout(Ckeditor.start(this._onOpen, this._onClose),100);
    this.props.changeDialogTex(Ckeditor.getTeX);
  },

  componentWillReceiveProps(nextProps) {
    if(this.props.dialogTeX != nextProps.dialogTeX) {
      Ckeditor.addTeX(nextProps.dialogTeX);
    }
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

  _addExpresion(TeX) {
    Ckeditor.addTeX(TeX);
  },

  componentDidUpdate(prevProps, prevState) {
    if (this.state.html) {
      setTimeout(Ckeditor.setValue(this.state.html),2000);
    }
  },

  createMarkup() {
    const html = (this.state.html)? this.state.html : '';
    return {__html: html};
  },

  render() {
    return (
      <div className="Formulation u-tab-content">
        <div className="row Formulation-CKEditor">
          <div id="editor" >
              <div dangerouslySetInnerHTML={this.createMarkup()} />
          </div>
        </div>
      </div>
    )
  }
});


module.exports = Formulation;
