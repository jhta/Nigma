const React = require("react");
//Utils
const ContentEditable       = require("../utils/content-editable");
const MaterializeComponents = require("../utils/material-components");
const {Button} = MaterializeComponents;
const Ckeditor = require('../../utils/ckeditor');
const ExpressionEvaluator = require('../../utils/variables/expression-evaluator');
const VariableStore = require('../../stores/space/variable-store');

//Custom components
const ExpresionGenerator  = require("./expresion-generator");

const Formulation = React.createClass({

  propTypes: {
    showExpresions: React.PropTypes.func,
    expresions: React.PropTypes.bool
  },

  getInitialState() {
    return {
      html: "escribe algo...",
    }
  },

  componentDidMount() {
    setTimeout(Ckeditor.start(this._onOpen, this._onClose),100);
    this.props.changeDialogTex(Ckeditor.getTeX);
  },

  componentWillReceiveProps(nextProps) {   
    if(this.props.dialogTeX != nextProps.dialogTeX) {
      Ckeditor.addTeX(nextProps.dialogTeX);
    }
  },

  _onOpen() {
    this.props.showExpresions(true);
  },

  _onClose() {
    this.props.showExpresions(false);
  },
  /**
   * [set html->state, when  any change is
   * made on content-editable]
   * @param  {event} e [event target of input]
   */
  _onChangeContentEditable(e) {
    this.setState({html: e.target.value})    
  },

  _addExpresion(TeX) {
    Ckeditor.addTeX(TeX);
  },



  _validateQuestion(){
    var question = Ckeditor.getValue();     
    
    let expresionsInQuestion = [];   // @($q + $b) 
    for (var i = 0; i < question.length; i++) {
      const token = question[i];
         
      if(token == '@'){        
        var initialIndex = {'index':i};        
      } else if(token == '}' && initialIndex){
        console.log(i);
        var finalIndex = {'index':i};        
        expresionsInQuestion.push({
          'expresion':String(question).substring(initialIndex.index+2,finalIndex.index),
          'completeExpresion': String(question).substring(initialIndex.index,finalIndex.index+1),
          'initial':initialIndex.index,
          'final':finalIndex.index
        });            
      }
    }

    //let lifeVariables= VariableStore.getVariables();  //Variales que están definidas, le puedo mandar toda esa mondá?
    
    //_onAddQuestion(question);
    var newQuestion = question;
    expresionsInQuestion.map((expresion,index)=>{                 
      var newValor = (ExpressionEvaluator.isEvaluable(expresion.expresion,VariableStore.getVariables().variables).possibleValue);
      newQuestion = newQuestion.replace(expresion.completeExpresion,newValor);      
      console.log(newQuestion);
    });

  },





  _onAddQuestion(question){  
   console.log(question);
  },

  render() {
    return (
      <div className="Formulation u-tab-content">
        <div className="row Formulation-CKEditor">
          <div id="editor">
            <p>{this.state.html}</p>
          </div>
        </div>
        <div className="btn-floating btn waves-effect waves-light pink accent-3" onClick={this._validateQuestion} >
          +
        </div>
      </div>
    )
  }
});


module.exports = Formulation;
