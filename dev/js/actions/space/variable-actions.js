const VariableConstants = require('../../constants/space/variable-constants');
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
  validateCode(code) {
    console.log(code);
    code = code.split("\n").filter(variable => variable != '')
    Dispatcher.dispatch({
      type: VariableConstants.VALIDATE_CODE,
      code: code
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
