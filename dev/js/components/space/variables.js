const React = require("react");

//USED
const Modal = require('./../util/modal');
const VariableActions = require('../../actions/space/variable-actions');

//Variables
const Uniform = require('../../utils/variables/uniform');
const Specific = require('../../utils/variables/specific');
const Categorical = require('../../utils/variables/categorical');

//Stores
const VariableStore = require('../../stores/space/variable-store');

const Variables = React.createClass({

  getInitialState() {
    return {
      showModal: false,
      typeOfVariable: 0
    }
  },

  _openModal(type) {
    console.log("0pen");
    this.setState({showModal: true, typeOfVariable: type});
  },

  render() {
    return (
      <div className="Space-right z-depth-1">
        <div className="Variables">
          <Variables.Header />
          <Variables.Content/>
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
  type: 'Content',

  getInitialState: function() {
    return {
      variables: ""
    };
  },

  componentWillMount() {
    VariableStore.addChangeListener(this._handleChange.bind(this, this.type))
  },

  _handleChange(type){
    this.setState({
      variables: VariableStore.getVariables()
    });
  },

  _getVariables() {
    return this.state.variables;
  },

  render() {
    return (
      <div className="Variables-Content">
        <Variables.Content.Create />
        <div className="Variables-Content__actions">
          <textarea valueLink={this.linkState('variables')} />
        </div>
        <Variables.Content.SaveAndCheck getVariables={this._getVariables} />
      </div>
    )
  },
  componentWillUnmount() {
    VariableStore.removeChangeListener()
  }
});

Variables.Content.Create = React.createClass({
  _addVariable(varType) {
    VariableActions.addVariable(varType.prototype.createSkeleton());
  },
  render() {
    return (
      <div className="Variables-Content-actions__create">
        <i className="small material-icons dropdown-button" data-activates='dropme' data-beloworigin='true' data-constrainwidth='false'>add_box</i>
        <ul id='dropme' className='dropdown-content'>
          <li onClick={this._addVariable.bind(this, Uniform)}>
              <a>Uniforme</a>
          </li>
          <li onClick={this._addVariable.bind(this, Categorical)}>
              <a>Categorica</a>
          </li>
          <li onClick={this._addVariable.bind(this, Specific)}>
            <a>Especifica</a>
          </li>
        </ul>
      </div>
    )
  }
});


Variables.Content.SaveAndCheck =  React.createClass({
  type: "SaveAndCheck",

  getInitialState: function() {
    return {
      validating: false
    };
  },

  _validate() {
    this.setState({
      validating: true
    });
    VariableActions.validateCode(this.props.getVariables());
  },

  componentWillMount() {
    VariableStore.addChangeListener(this._handleChange)
  },

  _handleChange(type){
    var validationOutput = VariableStore.getValidationOutPut();
      this.setState({
        validating: false
      });
    if(validationOutput && validationOutput.error){
      alert(validationOutput.errors.map(error => error.message).join("\n"));
    }
    console.log("Salida", validationOutput);

  },

  render() {
    var classCSS = { css: "small material-icons", icon: "done"}
    if (this.state.validating) {
      classCSS = {css: "small material-icons spin", icon: "loop"}
    }
    return (
      <div className="Variables-Content-actions__check_save">
         <i className={classCSS.css} onClick={this._validate}>{classCSS.icon}</i>
      </div>
    );
  }
});

module.exports = Variables;
