const AnswerConstants = require('../../constants/space/answer-constants');
const QuestionAPI = require('../../api/utils/question');
var Dispatcher = require('../../dispatchers/dispatcher');

var AnswerActions = {
  listAnswers(questionId) {
    //Pedido al API
    Dispatcher.dispatch({
      type: AnswerConstants.LIST_ANSWERS,
    });
  },

  validateAnswers(answer, variablesText, questionId, questionData) {

    var data = {
      answer: answer,
      variables: {
        text: variablesText
      },
      questionId: questionId,
      question: {
        data: JSON.stringify(questionData)
      }
      
    }
    QuestionAPI.validateAnswers(data, (err, res) => {
      if(err && res == null) {
        console.log("Validación de variables: Un error inesperado ha ocurrido");
      } else {
        Dispatcher.dispatch({
          type: AnswerConstants.VALIDATE_ANSWERS,
          output: res
        });
      }
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
