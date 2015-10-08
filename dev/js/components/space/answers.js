const React = require("react");
const AnswerActions = require('../../actions/space/answer-actions');
const AlertMessage = require('../util/alert');

var AnswerContainer = React.createClass({
  getInitialState: function() {
    return {
      answer: AnswerStore.getAnswer(),
      validating: false
    };
  },


  _changeAnswer(index, path, value) {

    var objectPath = path.split('.') || [];

    if(objectPath.length == 0)
      return;

    var answer = this.state.answer;
    var item = answer[index];

    for(var i = 0; i < objectPath.length -1; i++) {
      var pathValue = objectPath[i];
      if(!isNaN(pathValue)){
        pathValue = parseInt(pathValue);
      }
      item = item[objectPath[i]];
    }

    item[objectPath[objectPath.length -1]] = value;
    this.setState({
      answer: answer
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
      answer: AnswerStore.getAnswer(),
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
          this.state.answer != null ?
            <AnswerContainer.Answer answer={this.state.answer}  />
            :
            <div className="empty-text" onClick={this._addNewAnswer}>No hay respuestas para la pregunta, click aquí para agregar una nueva</div>
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
      <AnswerContainer.Answer.GeneralInformation answer={this.props.answer} handleChange={this._handleChange}/>
    );
  }

});

AnswerContainer.Answer.GeneralInformation = React.createClass({

  precision: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],

  render() {
    return (
      <div className="row">
        <div className="input-field col s4">
          <input type="checkbox" id={`showLabelCheckBox`}  onChange={this.props.handleChange} checked={this.props.answer.showLabel} value={!this.props.answer.showLabel} data-path="showLabel" />
          <label htmlFor={`showLabelCheckBox`} >Mostrar etiquetas</label>
        </div>
        <div className="input-field col s3">
          <select className="browser-default" data-path="precision" value={this.props.answer.precision} onChange={this.props.handleChange}>
            <option value="" disabled>Precisión</option>
            { this.precision.map((optionValue, index) => <option key={index}  value={optionValue}>{optionValue}</option>) }
          </select>
        </div>
      </div>
    );
  }
});

AnswerContainer.Answer.Form = React.createClass({



  render() {
    return (
      <div className="row">
        <div className="input-field col s4">
          <input id={`textbox_answer_name${this.props.index}`} value={this.props.answer.name} onChange={this.props.handleChange} data-path="name" type="text"/>
          <label htmlFor={`textbox_answer_name${this.props.index}`}>Etiqueta</label>
        </div>

        <div className="input-field col s4">
          <input  id={`textbox_answer_correct_value${this.props.index}`} value={this.props.answer.correctValue} onChange={this.props.handleChange} data-path="correctValue" type="text"/>
          <label htmlFor={`textbox_answer_correct_value${this.props.index}`}>Valor correcto</label>
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
            <label htmlFor={`textbox_answer_${this.props.answerIndex}_error__message${this.props.index}`}>Mensaje de retroalimentacion</label>
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
