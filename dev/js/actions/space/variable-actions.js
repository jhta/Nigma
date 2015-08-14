const VariableConstants = require('../../constants/space/variable-constants');
var Dispatcher = require('../../dispatchers/dispatcher');

var VariableActions = {
  addVariable(variableCode) {
    Dispatcher.dispatch({
      type: VariableConstants.ADD_VARIABLE,
      variableCode: variableCode
    });
  },
  validateCode(code) {
    code = code.split("\n").filter(variable => variable != '')
    Dispatcher.dispatch({
      type: VariableConstants.VALIDATE_CODE,
      code: code
    });
  }
}

module.exports = VariableActions;