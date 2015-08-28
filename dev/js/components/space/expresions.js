const React = require("react");
const Expresion = require('./expresion');
const Symbols = require('../util/symbols');
const Trigonometric = require('../util/trigonometric');
const Logic = require('../util/logic');
const OtherSymbols = require('../util/other-symbols');
const Delimiters = require('../util/delimiters');
const Bynary = require('../util/binary');
const Greek = require('../util/greek');

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
      <nav className="Expresions-Header teal darken-4">
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

   componentDidMount() {
    $(this.getDOMNode()).collapsible();
  },

  _getSymbols(){
    return(
      Symbols.symbols
    );
  },

  _getTrigonometric(){
    return(
      Trigonometric.symbols
    );
  },

  _getLogic(){
    return(
      Logic.symbols
    );
  },

  _getOtherSymbols(){
    return(
      OtherSymbols.symbols
    );
  },

  _getBinary(){
    return(
        Bynary.symbols
      );
  },

  _getDelimiters(){
    return(
        Delimiters.symbols
      );
  },

  _getGreek(){
    return(
      Greek.symbols
      );
  },

  render() {
    return (
      
        <ul className="Expresions-Content__collapse collapsible popout z-depth-0" data-collapsible="accordion">
          <Expresions.Collapse type={'Symbols'} title={'Symbols'} symbols={this._getSymbols()} {...this.props}/>  
          <Expresions.Collapse type={'Trigonometric'} title={'Trigonometric'} symbols={this._getTrigonometric()} {...this.props}/>  
          <Expresions.Collapse type={'Symbols'} title={'Logic'} symbols={this._getLogic()} {...this.props}/>
          <Expresions.Collapse type={'Symbols'} title={'Binary'} symbols={this._getBinary()} {...this.props}/> 
          <Expresions.Collapse type={'Symbols'} title={'Delimiters'} symbols={this._getDelimiters()} {...this.props}/> 
          <Expresions.Collapse type={'Symbols'} title={'Greek Letters'} symbols={this._getGreek()} {...this.props}/>  
          <Expresions.Collapse type={'Symbols'} title={'Other symbols'} symbols={this._getOtherSymbols()} {...this.props}/> 

        </ul>
      
    )
  }
});

Expresions.Collapse = React.createClass({
  render() {    
    switch (this.props.type) {
    case 'Symbols':        
        var content = {type:'symbols',width:'14',height:'14'};        
        break;
    case 'Trigonometric':
        var content = {type:'trigonometric',width:'54',height:'15'};
        break;   
  }
    return (
      <li>
        <div className="collapsible-header" >{this.props.title} </div>
        <div className="collapsible-body Expresions-Content__wrapper">
          { this.props.symbols.map((symbol,index)=>{
            return(<Expresion img={symbol.img} content={content} source={symbol.script} key={symbol.script} {...this.props}/> );
          })}        
        </div>
      </li>

    );
  }
});

module.exports = Expresions;
