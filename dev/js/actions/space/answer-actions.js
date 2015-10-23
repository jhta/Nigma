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

  setAnswer(answer) {
    Dispatcher.dispatch({
      type: AnswerConstants.SET_ANSWER,
      answer: answer
    });
  }
}

module.exports = AnswerActions;
