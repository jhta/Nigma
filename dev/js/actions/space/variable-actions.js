const VariableConstants = require('../../constants/space/variable-constants');
const QuestionAPI = require('../../api/utils/question');
var Dispatcher = require('../../dispatchers/dispatcher');

var VariableActions = {
  addVariable(variableCode, code) {
    code = code.split("\n").filter(variable => variable != '')
    Dispatcher.dispatch({
      type: VariableConstants.ADD_VARIABLE,
      variableCode: variableCode,
      code: code
    });
  },
  validateCode(code, questionId, questionData) {
    var data = {
      variables: {
        text: code
      },
      questionId: questionId,
      question: {
        data: JSON.stringify(questionData)
      }
    };
    QuestionAPI.validateVariables(data, (err, res) => {
      if(err && res == null) {
        console.log("Validación de variables: Un error inesperado ha ocurrido");
      } else {
        Dispatcher.dispatch({
          type: VariableConstants.VALIDATE_CODE,
          output: res,
          code: code
        });
      }
    });
    
  },
  loadVariables(variables) {
    Dispatcher.dispatch({
      type: VariableConstants.LOAD_VARIABLES,
      variables: variables
    });
  }
}

module.exports = VariableActions;
