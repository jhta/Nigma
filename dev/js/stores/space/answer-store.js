const AnswerConstants = require('../../constants/space/answer-constants');
const CHANGE_EVENT = 'AnswerStoreChange';
const Answer = require('../../utils/answers/answer');
var Dispatcher = require('../../dispatchers/dispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var Parser = require('../../utils/parser');

//Should be empty
const static_values = [
  {
    _id: 1,
    name: "Área",
    correctValue: "_a * _b",
    showLabel: true,
    precision: 2,
    commonErrors: [
      {
        value: "_b - _a",
        message: "Para calcular el tiempo entre dos primero es el tiempo de fin - tiempo inicio"
      },
      {
        value: "_a * _a",
        message: "Recordar tal formula"
      }
    ]
  },
  {
    _id: 2,
    name: "Perimetro",
    correctValue: "_a * 2 + 2 * _b",
    precision: 3,
    showLabel: false,
    commonErrors: [
      {
        value: "_b - _a",
        message: "Para calcular el tiempo entre dos primero es el tiempo de fin - tiempo inicio"
      },
      {
        value: "_b / _a",
        message: "Recordar tal formula"
      }
    ]
  }
]

var _answers = static_values.map(answer => Answer.createFromResponse(answer));
var _validationOutput = null;


function _setAnswers(answers) {
  _answers = answers;
}

function _addNewAnswer() {
  _answers.push(new Answer());
}

function _validateAnswers(answers, variables) {
  _setAnswers(answers);
  _validationOutput = {error: false, messages: []};
  for(var i = 0; i < answers.length; i++) {
    var answer = answers[i];
    var validation = answer.isValid(variables);
    _validationOutput.error = _validationOutput.error || validation.error;
    _validationOutput.messages = _validationOutput.messages.concat(validation.messages)
  }
  if (!_validationOutput.error){
    _validationOutput.messages = ["Validation successfull"];
  }
}


var AnswerStore = assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getAnswers() {
    return _answers;
  },

  getValidationOutPut() {
    var aux = _validationOutput;
    _validationOutput = null;
    return aux;
  }
});

AnswerStore.dispatchToken = Dispatcher.register(function(action) {
  _validationOutput = null;
  switch (action.type) {
    case AnswerConstants.LIST_ANSWERS:
      AnswerStore.emitChange();
      break;
    case AnswerConstants.VALIDATE_ANSWERS:
      _validateAnswers(action.answers, action.variables)
      AnswerStore.emitChange();
      break;
    case AnswerConstants.ADD_NEW_ANSWER:
      _addNewAnswer();
      AnswerStore.emitChange();
      break;
    default:
  }
});

module.exports = AnswerStore;
