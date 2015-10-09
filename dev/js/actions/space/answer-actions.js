const AnswerConstants = require('../../constants/space/answer-constants');
var Dispatcher = require('../../dispatchers/dispatcher');

var AnswerActions = {
  listAnswers(questionId) {
    //Pedido al API
    Dispatcher.dispatch({
      type: AnswerConstants.LIST_ANSWERS,
    });
  },

  validateAnswers(answers, variables) {
    Dispatcher.dispatch({
      type: AnswerConstants.VALIDATE_ANSWERS,
      answers: answers,
      variables: variables
    });
  },

  addNewAnswer() {
    Dispatcher.dispatch({
      type: AnswerConstants.ADD_NEW_ANSWER,
    });
  },

  deleteQuestion(answer, index) {
    Dispatcher.dispatch({
      type: AnswerConstants.DELETE_ANSWER,
      answer: answer,
      index: index
    });
  },

  deleteCommonErrorQuestion(answer, answerIndex,index) {
    Dispatcher.dispatch({
      type: AnswerConstants.DELETE_COMMON_ERROR,
      answer: answer,
      answerIndex: answerIndex,
      index: index
    });
  },

  addCommonError(answer, answerIndex) {
    Dispatcher.dispatch({
      type: AnswerConstants.ADD_COMMON_ERROR,
      answer: answer,
      answerIndex: answerIndex
    });
  },

  loadAnswers(answersJson) {
    Dispatcher.dispatch({
      type: AnswerConstants.LOAD_ANSWERS,
      answers: answersJson
    });
  },
  addAnswer(answerName) {
    Dispatcher.dispatch({
      type: AnswerConstants.ADD_ANSWER,
      answerName: answerName
    });
  }
}

module.exports = AnswerActions;
