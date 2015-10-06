const AnswerConstants = require('../../constants/space/answer-constants');
const CHANGE_EVENT = 'AnswerStoreChange';
const Answer = require('../../utils/answers/answer');
var Dispatcher = require('../../dispatchers/dispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var Parser = require('../../utils/parser');


var _answer = null;
var _validationOutput = null;


function _setAnswer(answer) {
  _answer = answer;
}

function _addNewAnswer() {
  _answer = new Answer();
}

function _validateAnswers(answers, variables) {
  _setAnswers(answers);
  _validationOutput = {error: false, messages: []};
  for(var i = 0; i < _answers.length; i++) {
    var answer = answers[i];
    var validation = answer.isValid(variables);
    _validationOutput.error = _validationOutput.error || validation.error;
    _validationOutput.messages = _validationOutput.messages.concat(validation.messages)
  }
  if (!_validationOutput.error){
    _validationOutput.messages = ["Respustas validadas correctamente"];
  }
  console.log(_validationOutput);

}

function _removeAnswer(answer, index) {
  var storeAnswer = _answers[index];
  if(storeAnswer._id == answer._id){
    _answers.splice(index,1);
  }
}

function _removeAnswerCommonError(answer, answerIndex, index) {
  var storeAnswer = _answers[answerIndex];
  if(storeAnswer._id == answer._id){
    _answers[answerIndex].commonErrors.splice(index,1);
  }
}

function _addCommonError(answer, answerIndex) {
  var storeAnswer = _answers[answerIndex];
  if(storeAnswer._id == answer._id){
    _answers[answerIndex].addCommonError();
  }
}

function _loadAnswers(jsonAnswer) {
  if(jsonAnswer != null)
    _answer = Answer.createFromResponse(jsonAnswer)
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
    case AnswerConstants.DELETE_COMMON_ERROR:
      _removeAnswerCommonError(action.answer,  action.answerIndex ,action.index)
      AnswerStore.emitChange();
      break;
    case AnswerConstants.ADD_COMMON_ERROR:
      _addCommonError(action.answer,  action.answerIndex)
      AnswerStore.emitChange();
      break;
    case AnswerConstants.LOAD_ANSWERS:
      _loadAnswers(action.answers)
      AnswerStore.emitChange();
      break;

    default:
  }
});

module.exports = AnswerStore;
