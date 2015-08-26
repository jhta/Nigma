const React = require("react");

//USED
const Modal = require('./../util/modal');


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
      <div className="z-depth-1">
        <div className="Variables">
          <Variables.Header />
          <Variables.Content
            onOpenModal = {this._openModal}
          />
          <Variables.Modal
            showModal = {this.state.showModal}
          />
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
        Nothing here yet...
        <Variables.Dropdown {...this.props}/>
      </div>
    )
  }
});

Variables.Dropdown = React.createClass({

  _selectType(type) {
    return ()=>{
      this.props.onOpenModal(type);
    }
  },

  render() {
    return (
      <div>
        {/* Dropdown Trigger */}
        <div className="dropdown-button btn" data-activates="dropdown-variables">
          Drop Me!
        </div>
        {/* Dropdown Structure */}
        <ul id="dropdown-variables" className="dropdown-content">
          <li>
            <a
              onClick = {this._selectType(0)}
              href="javascript:void(0)"
            >
              one
            </a>
          </li>
          <li><a href="javascript:void(0)">two</a></li>
          <li><a href="javascript:void(0)">three</a></li>
        </ul>
      </div>

    );
  }
});

Variables.Modal = React.createClass({

  componentWillReceiveProps(nextProps) {
    if(nextProps.showModal) {
      this._openModal();
    }
  },

  _openModal() {
    this.refs.modal.openModal();
  },

  _selectType() {
    let type = this.props.type;
    switch(type) {
      case 0:
        console.log("0");
        break;

      case 1:
        console.log("0");
        break;
    }
  },

  render() {
    return (
      <Modal
        headerText="Nueva pregunta"
        ref="modal"
        positiveCallback={console.log("holi")}
      >
        <div className="input-field col s12">
          <input
            type="text"
          />
          <label htmlFor="question-name">Nombre</label>
        </div>
      </Modal>
    )
  }
});

module.exports = Variables;
