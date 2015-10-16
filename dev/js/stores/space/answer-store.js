const AnswerConstants = require('../../constants/space/answer-constants');
const CHANGE_EVENT = 'AnswerStoreChange';
const Answer = require('../../utils/answers/answer');
var Dispatcher = require('../../dispatchers/dispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var Parser = require('../../utils/parser');


var _answer = null;
var _validationOutput = null;



function _addNewAnswer() {
  _answer = new Answer();
}

function _addAnswer(answerName) {
  _answer.names.push(answerName)
}

function _validateAnswers(answer, variables) {
  _loadAnswer(answer);
  _validationOutput = {error: false, messages: []};
  var validation = _answer.isValid(variables);
  _validationOutput.error = _validationOutput.error || validation.error;
  _validationOutput.messages = _validationOutput.messages.concat(validation.messages)

  if (!_validationOutput.error){
    _validationOutput.messages = ["Respustas validadas correctamente"];
  }

}

function _loadAnswer(answer) {
  if(answer != null)
    _answer = Answer.createFromResponse(answer)
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

  getAnswer() {
    return _answer;
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
    case AnswerConstants.DELETE_ANSWER:
      _removeAnswer(action.answer, action.index)
      AnswerStore.emitChange();
      break;

    case AnswerConstants.SET_ANSWER:
      _loadAnswer(action.answer)
      AnswerStore.emitChange();
      break;
    default:
  }
});

module.exports = AnswerStore;
