const React = require("react");
const AnswerActions = require('../../actions/space/answer-actions');
const AlertMessage = require('../util/alert');

var AnswerContainer = React.createClass({
  getInitialState: function() {
    return {
      answers: AnswerStore.getAnswers(),
      validating: false
    };
  },


  _changeAnswer(index, path, value) {

    var objectPath = path.split('.') || [];

    if(objectPath.length == 0)
      return;

    var answers = this.state.answers;
    var item = answers[index];

    for(var i = 0; i < objectPath.length -1; i++) {
      var pathValue = objectPath[i];
      if(!isNaN(pathValue)){
        pathValue = parseInt(pathValue);
      }
      item = item[objectPath[i]];
    }

    item[objectPath[objectPath.length -1]] = value;
    this.setState({
      answers: answers
    });
  },

  _validateForm() {
    this.setState({
      validating: true
    });
    setTimeout(() => AnswerActions.validateAnswers(this.state.answers, VariableStore.getVariables().variables), 1000);
  },

  componentWillMount() {
    AnswerStore.addChangeListener(this._handleChange)
  },

  _handleChange() {
    this.setState({
      answers: AnswerStore.getAnswers(),
      validating: false
    });

  },

  _addNewAnswer() {
    AnswerActions.addNewAnswer();
  },



  render() {

    return (
      <div className="Formulation-AnswerContainer u-tab-content">
        <AnswerContainer.Validation validateForm={this._validateForm} validating={this.state.validating} />
        <AlertMessage data={AnswerStore.getValidationOutPut()}/>
        {
          this.state.answers.length != 0 ?
            (
              <ul className="collapsible" data-collapsible="expandable">
                {
                  this.state.answers.map((answer, index) => <AnswerContainer.Answer key={answer.index} index={index} answer={answer} handleChange={this._changeAnswer} />)
                }
              </ul>
            )
            :
            <div className="empty-text" onClick={this._addNewAnswer}>No answers to show, click here to create one</div>
        }

        <AnswerContainer.Validation validateForm={this._validateForm} validating={this.state.validating} />
        <div className="right-align">
          <a className="btn-floating btn-medium waves-effect waves-light red create-btn" onClick={this._addNewAnswer}><i className="material-icons">add</i></a>
        </div>

      </div>
    )
  },

  componentWillUnmount() {
    AnswerStore.removeChangeListener();
  },

  componentWillUpdate(nextProps, nextState) {

  },
  componentDidUpdate(prevProps, prevState) {
    $('.collapsible').collapsible();
  },
});

AnswerContainer.Answer = React.createClass({

  _convertToNativeType(value) {
    console.log(value);
    if(value == "" || value == null || value == undefined){
      return "";
    } else if(value === "false"){
      value = false;
    } else if (value === "true"){
      value = true;
    } else if(!isNaN(value)){
      value = parseInt(value);
    }
    return value;
  },

  _handleChange(evt) {
    const target = evt.target;
    const path = target.getAttribute('data-path');
    var value = this._convertToNativeType(target.value);
    this.props.handleChange(this.props.index, path, value);
  },

  _deleteQuestion() {
    AnswerActions.deleteQuestion(this.props.answer, this.props.index);
  },

  _addCommonError() {
    AnswerActions.addCommonError(this.props.answer, this.props.index)
  },

  render() {
    return (
      <li className="Formulation-AnswerContainer-Answer">
        <div className="collapsible-header header">
            <i className="material-icons">help</i>
            <span className="title">{this.props.answer.name}</span>
            <span className="actions-container">
              <span className="material-icons">edit</span>
              <span className="material-icons" onClick={this._deleteQuestion}>delete</span>
            </span>
        </div>
        <div className="collapsible-body">
          <ul className="collection main-answer-content" >
            <li className="collection-item main-answer-form">
              <AnswerContainer.Answer.Form answer={this.props.answer} handleChange={this._handleChange} index={this.props.index}/>
            </li>
            <li className="collection-item">
              <div className="collapsible-header header">
                <i className="material-icons">error</i>
                <span className="title">Errores comunes</span>
                <span className="actions-container">
                  <span className="material-icons" onClick={this._addCommonError}>add</span>
                </span>
              </div>
              <div>
                <ul className="collection">
                  {this.props.answer.commonErrors.map((error, index) => <AnswerContainer.Answer.CommonError key={index} index={index} error={error} answer={this.props.answer} answerIndex={this.props.index} handleChange={this._handleChange} />)}
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </li>
    );
  }

});

AnswerContainer.Answer.Form = React.createClass({

  _generatePresicion() {
    var precision = [];
    for (var i = 0; i < 16; i++) {
      precision.push(i);
    }
    return precision;
  },

  render() {
    return (
      <div className="row">

        <div className="input-field col s4">
          <input  id={`textbox_answer_correct_value${this.props.index}`} value={this.props.answer.correctValue} onChange={this.props.handleChange} data-path="correctValue" type="text"/>
          <label htmlFor={`textbox_answer_correct_value${this.props.index}`}>Valor correcto</label>
        </div>

        <div className="input-field col s2">
          <select className="browser-default" data-path="precision" value={this.props.answer.precision} onChange={this.props.handleChange}>
            <option value="" disabled>Precisión</option>
            {
              this._generatePresicion().map((optionValue, index) => <option key={index}  value={optionValue}>{optionValue}</option>)
            }
          </select>
        </div>

        <div className="input-field col s4">
          <input id={`textbox_answer_name${this.props.index}`} value={this.props.answer.name} onChange={this.props.handleChange} data-path="name" type="text"/>
          <label htmlFor={`textbox_answer_name${this.props.index}`}>Label</label>
        </div>

        <div className="input-field col s2">
          <input type="checkbox" id={`checkbox_answer${this.props.index}`}  onChange={this.props.handleChange} checked={this.props.answer.showLabel} value={!this.props.answer.showLabel} data-path="showLabel" />
          <label htmlFor={`checkbox_answer${this.props.index}`} >Mostrar</label>
        </div>
      </div>
    )
  }
});

AnswerContainer.Answer.CommonError = React.createClass({
  _deleteCommonError() {
    AnswerActions.deleteCommonErrorQuestion(this.props.answer, this.props.answerIndex, this.props.index);
  },

  render() {
    return (
      <li className="collection-item">
        <div className="row">
          <div className="input-field col s3">
            <input  id={`textbox_answer_${this.props.answerIndex}_error__value${this.props.index}`} value={this.props.error.value} onChange={this.props.handleChange} data-path={`commonErrors.${this.props.index}.value`} type="text"/>
            <label htmlFor={`textbox_answer_${this.props.answerIndex}_error__value${this.props.index}`}>Valor del error</label>
          </div>
          <div className="input-field col s8">
            <input  id={`textbox_answer_${this.props.answerIndex}_error__message${this.props.index}`} value={this.props.error.message} onChange={this.props.handleChange} data-path={`commonErrors.${this.props.index}.message`} type="text"/>
            <label htmlFor={`textbox_answer_${this.props.answerIndex}_error__message${this.props.index}`}>Valor del error</label>
          </div>
          <div className="col s1">
            <span className="actions-container">
              <span className="material-icons" onClick={this._deleteCommonError}>delete</span>
            </span>
          </div>
        </div>

      </li>
    );
  }
});

AnswerContainer.Validation = React.createClass({

  render() {
    var classCSS = !this.props.validating ? { css: "material-icons", icon: "done"} : {css: "material-icons spin", icon: "loop"}
    return (
      <div className="Formulation-AnswerContainer-Validation">
        <i className={classCSS.css} onClick={this.props.validateForm} >{classCSS.icon}</i>
      </div>
    );
  }
});


module.exports = AnswerContainer;
