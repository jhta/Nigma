const React = require("react");
const Expresion = require('./expresion');
const Symbols = require('../util/symbols');
const Trigonometric = require('../util/trigonometric');
const Logic = require('../util/logic');

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
      Symbols.symbols
    );
  },

  _getTrigonometric(){
    return(
      Trigonometric.trigonometric
    );
  },

  _getLogic(){
    return(
      Logic.logic
    );
  },

  render() {
    return (
      <div className="Expresions-Content">
        <ul className="Expresions-Content__collapse collapsible z-depth-0" data-collapsible="accordion">
          <Expresions.Collapse type={'Symbols'} title={'Symbols'} symbols={this._getSymbols()} {...this.props}/>  
          <Expresions.Collapse type={'Trigonometric'} title={'Trigonometric'} symbols={this._getTrigonometric()} {...this.props}/>  
          <Expresions.Collapse type={'Symbols'} title={'Logic'} symbols={this._getLogic()} {...this.props}/>  
        </ul>
      </div>
    )
  }
});

Expresions.Collapse = React.createClass({
  render() {    
    switch (this.props.type) {
    case 'Symbols':        
        var content = {type:'symbols',width:'12',height:'16'};        
        break;
    case 'Trigonometric':
        var content = {type:'trigonometric',width:'53',height:'12'};
        break;   
  }
    return (
      <li>
        <div className="collapsible-header">{this.props.title} </div>
        <div className="collapsible-body Expresions-Content__wrapper">
          { this.props.symbols.map((symbol,index)=>{
            return(<Expresion img={symbol.img} content={content} source={symbol.script} {...this.props}/> );
          })}        
        </div>
      </li>

    );
  }
});

module.exports = Expresions;
