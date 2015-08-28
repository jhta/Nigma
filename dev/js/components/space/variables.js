const React = require("react");

//USED
const Modal = require('./../util/modal');
const VariableActions = require('../../actions/space/variable-actions');

//Variables
const Uniform = require('../../utils/variables/uniform');
const Specific = require('../../utils/variables/specific');
const Categorical = require('../../utils/variables/categorical');

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
      <div className="Space-right z-depth-1">
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
      variables: ""
    };
  },

  componentWillMount() {
    VariableStore.addChangeListener(this._handleChange)
  },

  _handleChange(type){
    this.setState({
      variables: VariableStore.getVariables()
    });
  },

  _validateCode() {
    setTimeout( () => {
      VariableActions.validateCode(this.state.variables);
    }, 500);
  },

  _addVariable(varType) {
    var currentCode = this.refs.codeArea.getDOMNode().value;
    VariableActions.addVariable(varType.createSkeleton(), currentCode);
  },

  render() {
    return (
      <div className="Variables-Content">
        <Variables.Content.Create  actionAddVariable={this._addVariable}/>
        <div className="Variables-Content__actions">
          <textarea valueLink={this.linkState('variables')} ref="codeArea"/>
        </div>
        <Variables.Content.SaveAndCheck validationOutput={VariableStore.getValidationOutPut()} validateCode={this._validateCode}/>
      </div>
    )
  },
  componentWillUnmount() {
    VariableStore.removeChangeListener()
  }
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


Variables.Content.SaveAndCheck =  React.createClass({

  getInitialState: function() {
    return {
      validating: false
    };
  },

  _validate() {
    this.setState({validating: true});
    this.props.validateCode();
  },

  _handleChange(validationOutput){
    this.setState({ validating: false });
    if(validationOutput != null && validationOutput.error){
      alert(validationOutput.errors.map(error => error.message).join("\n"));
    }
  },

  render() {
    var classCSS = !this.state.validating ? { css: "small material-icons", icon: "done"} : {css: "small material-icons spin", icon: "loop"}
    return (
      <div className="Variables-Content-actions__check_save">
        <i className={classCSS.css} onClick={this._validate}>{classCSS.icon}</i>
      </div>
    );
  },

  componentWillReceiveProps(nextProps) {
    if(nextProps.validationOutput && this.state.validating){
      this._handleChange(nextProps.validationOutput)
    }
  }
});

module.exports = Variables;
