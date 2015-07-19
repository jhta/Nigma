const React = require("react");

const Variables = React.createClass({

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

  render() {
    return (
      <div className="Variables-Content">
        Nothing here yet...
        <Variables.Dropdown />
      </div>
    )
  }
});

Variables.Dropdown = React.createClass({
  render() {
    return (
      <div>
        {/* Dropdown Trigger */}
        <div className="dropdown-button btn" data-activates="dropdown-variables">
          Drop Me!
        </div>
        {/* Dropdown Structure */}
        <ul id="dropdown-variables" className="dropdown-content">
          <li><a href="#!">one</a></li>
          <li><a href="#!">two</a></li>
          <li><a href="#!">three</a></li>
        </ul>
      </div>

    );
  }
});

module.exports = Variables;
