const AnswerConstants = require('../../constants/space/answer-constants');
var Dispatcher = require('../../dispatchers/dispatcher');

var AnswerActions = {
  listAnswers(questionId) {
    //Pedido al API
    Dispatcher.dispatch({
      type: AnswerConstants.LIST_ANSWERS,
    });
  }
}

module.exports = AnswerActions;
