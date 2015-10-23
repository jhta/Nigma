const React = require("react");

//USED
const Modal = require('./../util/modal');
const VariableActions = require('../../actions/space/variable-actions');

//Variables
const Uniform = require('../../utils/variables/uniform');
const Specific = require('../../utils/variables/specific');
const Categorical = require('../../utils/variables/categorical');

//UTIl
const AlertMessage = require('../util/alert');

//Stores
/*VariableStore is global*/

const Variables = React.createClass({

  getInitialState() {
    return {
      showModal: false,
      typeOfVariable: 0
    }
  },

  _openModal(type) {
    this.setState({showModal: true, typeOfVariable: type});
  },

  render() {
    return (
      <div className="z-depth-1">
        <div className="Variables">
          <Variables.Header />
          <Variables.Content />
        </div>
    </div>
    );
  }

});

Variables.Header = React.createClass({

  render() {
    return (
      <nav className="Variables-Header teal">
       <div className="nav-wrapper">
         <div className="brand-logo Variables-Header__brand">
           VARIABLES
         </div>
       </div>
     </nav>
    )
  }
});

Variables.Content = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  getInitialState: function() {
    return {
      text: "",
      variables: [],
      validating: false,
      validationOutput: null
    };
  },

  componentWillMount() {
    VariableStore.addChangeListener(this._handleChange)
  },

  _handleChange(){
    var variables = VariableStore.getVariables();
    this.setState({
      validating: false,
      text: variables.text,
      variables: variables.variables
    });
  },

  _validateCode() {
    this.setState({
      validating: true,
      validationOutput: null
    });

    setTimeout( () => {
      VariableActions.validateCode(this.state.text);
    }, 500);
  },

  _addVariable(varType) {
    var currentCode = this.refs.codeArea.getDOMNode().value;
    VariableActions.addVariable(varType.createSkeleton(), currentCode);
  },

  render() {
    return (
      <div className="Variables-Content">
        <AlertMessage data={VariableStore.getValidationOutPut()}/>
        <Variables.Content.Create  actionAddVariable={this._addVariable}/>
        <div className="Variables-Content__actions">
          <textarea valueLink={this.linkState('text')} ref="codeArea" />
        </div>
        <Variables.Content.SaveAndCheck validateCode={this._validateCode} validating={this.state.validating}/>
      </div>
    )
  },

  componentDidMount() {
    $('.dropdown-button').dropdown();
  },
  componentWillUnmount() {
    VariableStore.removeChangeListener()
  },

});

Variables.Content.Create = React.createClass({
  render() {
    return (
      <div className="Variables-Content-actions__create">
        <i className="small material-icons dropdown-button" data-activates='dropme' data-beloworigin='true' data-constrainwidth='false'>add_box</i>
        <ul id='dropme' className='dropdown-content'>
          <li onClick={this.props.actionAddVariable.bind(null, Uniform)}>
              <a>Uniforme</a>
          </li>
          <li onClick={this.props.actionAddVariable.bind(null, Categorical)}>
              <a>Categorica</a>
          </li>
          <li onClick={this.props.actionAddVariable.bind(null, Specific)}>
            <a>Especifica</a>
          </li>
        </ul>
      </div>
    )
  }
});
Variables.Content.SaveAndCheck = React.createClass({

  render() {
    var classCSS = !this.props.validating ? { css: "material-icons", icon: "done"} : {css: "material-icons spin", icon: "loop"}
    return (
      <div className="Formulation-AnswerContainer-Validation">
        <i className={classCSS.css} onClick={this.props.validateCode} >{classCSS.icon}</i>
      </div>
    );
  }
});
module.exports = Variables;
