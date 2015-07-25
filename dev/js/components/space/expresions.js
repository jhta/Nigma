const React = require("react");
const Expresion = require('./expresion');

const Expresions = React.createClass({

  render() {
    return (
      <div className="Space-right z-depth-1">
        <div className="Expresions">
          <Expresions.Header />
          <Expresions.Content />
        </div>
    </div>
    );
  }

});

Expresions.Header = React.createClass({
  render() {
    return (
      <nav className="Expresions-Header teal">
       <div className="nav-wrapper">
         <div className="brand-logo Expresions-Header__brand">
           EXPRESIONS
         </div>
       </div>
     </nav>
    )
  }
});

Expresions.Content = React.createClass({

  render() {
    return (
      <div className="Expresions-Content">
        <ul className="Expresions-Content__collapse collapsible z-depth-0" data-collapsible="accordion">
          <Expresions.Collapse />
          <Expresions.Collapse />
          <Expresions.Collapse />
        </ul>
      </div>
    )
  }
});

Expresions.Collapse = React.createClass({
  render() {
    return (
      <li>
        <div className="collapsible-header">First</div>
        <div className="collapsible-body Expresions-Content__wrapper">
          <Expresion img="images/arsec.png"/>
          <Expresion img="images/arsec.png"/>
          <Expresion img="images/arsec.png"/>
          <Expresion img="images/arsec.png"/>
          <Expresion img="images/arsec.png"/>
          <Expresion img="images/arsec.png"/>
          <Expresion img="images/arsec.png"/>
          <Expresion img="images/arsec.png"/>
          <Expresion img="images/arsec.png"/>
          <Expresion img="images/arsec.png"/>
          <Expresion img="images/arsec.png"/>
        </div>
      </li>

    );
  }
});

module.exports = Expresions;
