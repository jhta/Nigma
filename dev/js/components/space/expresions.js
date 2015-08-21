const React = require("react");
const Expresion = require('./expresion');

const Expresions = React.createClass({

  propTypes: {
    expresions: React.PropTypes.bool
  },

  render() {
    if(!this.props.expresions) {
      return null;
    }

    return (
      <div className="Space-right z-depth-1">
        <div className="Expresions z-depth-1">
          <Expresions.Header />
          <Expresions.Content  {...this.props}/>
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

  _getSymbols(){
    return(
      [ {script: '<', img:'images/symbols/menor.png'},
        {script:'\\leq ', img:'images/symbols/leq.png'},
        {script:'\\ll',img:'images/symbols/ll.png'},
        {script:'\\subset',img:'images/symbols/subset.png'},
        {script:'\\subseteq',img:'images/symbols/subseteq.png'},
        {script:'\\nsubseteq',img:'images/symbols/nsubseteq.png'},
        {script:'\\sqsubset',img:'images/symbols/sqsubset.png'},
        {script:'\\sqsubseteq',img:'images/symbols/sqsubseteq.png'},
        {script:'\\preceq',img:'images/symbols/preceq.png'},
      ]
    );
  },

  render() {
    return (
      <div className="Expresions-Content">
        <ul className="Expresions-Content__collapse collapsible z-depth-0" data-collapsible="accordion">
          <Expresions.Collapse symbols={this._getSymbols()} {...this.props}/>        
        </ul>
      </div>
    )
  }
});

Expresions.Collapse = React.createClass({
  render() {
    return (
      <li>
        <div className="collapsible-header">Symbols</div>
        <div className="collapsible-body Expresions-Content__wrapper">
          { this.props.symbols.map((symbol,index)=>{
            return(<Expresion img={symbol.img} source={symbol.script} {...this.props}/> );
          })}        
        </div>
      </li>

    );
  }
});

module.exports = Expresions;
