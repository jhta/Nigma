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


  _changeAnswer(path, value) {

    var objectPath = path.split('.') || [];

    if(objectPath.length == 0)
      return;

    var answer = this.state.answer;
    var item = answer;

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
  answerBasicActions(data) {
    console.log(data);
    var addAnswer = (answername) => {
      var answer = this.state.answer;
      if(answername != null && answername != "")
        answer.names.push(answername);
      this.setState({
        answer: answer
      });
    }
    var editAnswer = (index, answername) => {
      var answer = this.state.answer;
      if(answername != null && answername != "")
        answer.names[index] = answername;
      this.setState({
        answer: answer
      });
    }
    var deleteAnswer= (index) => {
      var answer = this.state.answer;
      if(index != null && !isNaN(index))
        answer.names.splice(index, 1)
      this.setState({
        answer: answer
      });
    }
    switch(data.action) {
      case "addAnswer":
        addAnswer(data.answerName);
        break;
      case "editAnswer":
        editAnswer(data.index, data.answerName);
        break;
      case "deleteAnswer":
        deleteAnswer(data.index)
        break;
    }

  },



  render() {
    return (
      <div className="Formulation-AnswerContainer u-tab-content">
        <AnswerContainer.Validation validateForm={this._validateForm} validating={this.state.validating} />
        <AlertMessage data={AnswerStore.getValidationOutPut()}/>
        {
          this.state.answer != null ?
            <AnswerContainer.Answer answer={this.state.answer} handleChange={this._changeAnswer} answerActions={this.answerBasicActions} />
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
    this.props.handleChange(path, value);
  },

  _deleteQuestion() {
    AnswerActions.deleteQuestion(this.props.answer, this.props.index);
  },

  _addCommonError() {
    AnswerActions.addCommonError(this.props.answer, this.props.index)
  },

  render() {
    return (
      <div className="Formulation-AnswerContainer-Answer">
        <AnswerContainer.Answer.GeneralInformation answer={this.props.answer} handleChange={this._handleChange} answerActions={this.props.answerActions}/>
      </div>
    );
  }

});

AnswerContainer.Answer.GeneralInformation = React.createClass({
  getInitialState() {
    return {newAnswerName: ""};
  },

  mixins: [React.addons.LinkedStateMixin],
  precision: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],

  _addAnswer() {
    this.props.answerActions({
      answerName: this.state.newAnswerName,
      action: "addAnswer"
    })
    this.setState({
      newAnswerName: ""
    });
  },


  render() {
    return (
      <div className="general-information">
        <div className="">
            <input type="checkbox" className="col s3" id={`showLabelCheckBox`}  onChange={this.props.handleChange} checked={this.props.answer.showLabel} value={!this.props.answer.showLabel} data-path="showLabel" />
            <label htmlFor={`showLabelCheckBox`} className="col s4">Incluir etiquetas</label>
        </div>
        <div className="">
          <label htmlFor={`questionPrecision`} className="col s4">Precisión decimal exigida</label>
          <div className="col s3">
            <select className="browser-default" data-path="precision" value={this.props.answer.precision} onChange={this.props.handleChange} id="questionPrecision">
              <option value="" disabled>Precisión decimal exigida</option>
              { this.precision.map((optionValue, index) => <option key={index}  value={optionValue}>{optionValue}</option>) }
            </select>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s6">
            <input id={`textbox_answer_name`} valueLink={this.linkState('newAnswerName')} type="text"/>
            <label htmlFor={`textbox_answer_name`}>Agregar respuesta</label>
          </div>
          <div className="col s1">
            <a className="btn-floating btn-medium waves-effect waves-light green create-btn" onClick={this._addAnswer}><i className="material-icons">add</i></a>
          </div>
          <div className="col s5">
            <div className="answers-names-container">
              {
                this.props.answer.names.map((answerName, index) => <AnswerContainer.Answer.GeneralInformation.AnswerName index={index} name={answerName} key={index} handleChange={this.props._handleChange} answerActions={this.props.answerActions}/>)
              }
            </div>
          </div>
        </div>
        <hr />
      </div>
    );
  }
});

AnswerContainer.Answer.GeneralInformation.AnswerName = React.createClass({
  _deleteQuestion() {
    this.props.answerActions({
      action: "deleteAnswer",
      index: this.props.index
    });
  },
  render() {
    return (
      <div className="answer-name">
        <div className="name">
          {this.props.name}
        </div>
        <div className="actions">
          <i className="material-icons">edit</i>
          <i className="material-icons" onClick={this._deleteQuestion}>delete</i>
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
