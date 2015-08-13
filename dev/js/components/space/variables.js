const React = require("react");

//USED
const Modal = require('./../util/modal');


//Variables
var Uniform = require('../../utils/variables/uniform');
var Specific = require('../../utils/variables/specific');
var Categorical = require('../../utils/variables/categorical');

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

  render() {
    return (
      <div className="Variables-Content">
        <Variables.Content.Create />
      </div>
    )
  }
});

Variables.Content.Create = React.createClass({
  _createVariable(variableIndentifier) {
    console.log(variableIndentifier);
  },
  render() {
    return (
      <div className="Variables-Content__actions">
        <i className="small material-icons dropdown-button" data-activates='dropme' data-beloworigin='true' data-constrainwidth='false'>add_box</i>
        <ul id='dropme' className='dropdown-content'>
          <li
            onClick={this._createVariable(Uniform.prototype.identifier)}>
              <a>Uniforme</a>
          </li>
          <li
            onClick={this._createVariable(Categorical.prototype.identifier)}>
              <a>Categorica</a>
          </li>
          <li
            onClick={this._createVariable(Specific.prototype.identifier)}>
            <a>Especifica</a>
          </li>
        </ul>
      </div>
    )
  }
});



module.exports = Variables;
