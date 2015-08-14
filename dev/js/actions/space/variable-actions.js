const VariableConstants = require('../../constants/space/variable-constants');
var Dispatcher = require('../../dispatchers/dispatcher');

var VariableActions = {
  addVariable(variableCode) {
    console.log(`Im here ${variableCode}`);
    Dispatcher.dispatch({
      type: VariableConstants.ADD_VARIABLE,
      variableCode: variableCode
    });
  }
}

module.exports = VariableActions;