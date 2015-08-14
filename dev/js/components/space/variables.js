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

  getInitialState: function() {
    return {
      variables: ""
    };
  },

  componentWillMount() {
    VariableStore.addChangeListener(this._handleChange)
  },

  _handleChange(){
    this.setState({
      variables: VariableStore.getVariables()
    });
  },

  render() {
    return (
      <div className="Variables-Content">
        <Variables.Content.Create />
        <div className="Variables-Content__actions">
          <textarea valueLink={this.linkState('variables')} />
        </div>
        <Variables.Content.SaveAndCheck variables={this.state.variables} />
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
  render() {
    console.log(this.props.variables);
    return (
      <div className="Variables-Content-actions__check_save">
         <i className="small material-icons dropdown-button">done</i>
      </div>
    );
  }
});

module.exports = Variables;
