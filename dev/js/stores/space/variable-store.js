const VariableConstants = require('../../constants/space/variable-constants');
const CHANGE_EVENT = 'VariableStoreChange';
var Dispatcher = require('../../dispatchers/dispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');


var _textVariables = "";
var _variableObjects = [];
var _validationOutput = {};

function _addVariable (variableCode) {
  _textVariables+= variableCode + "\n";
}

function _setVariables (code) {
  if(code.length != 0)
    _textVariables = code.join("\n") + "\n";
}



var VariableStore = assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getVariables() {
    return {text: _textVariables, variables: _variableObjects};
  },
  getValidationOutPut() {
    var aux = _validationOutput;
    _validationOutput = null;
    return aux;
  }
});

VariableStore.dispatchToken = Dispatcher.register(function(action) {
  _validationOutput = null;
  switch (action.type) {
    case VariableConstants.ADD_VARIABLE:
      _setVariables(action.code);
      _addVariable(action.variableCode);
      VariableStore.emitChange();
      break;

    case VariableConstants.VALIDATE_CODE:
      var code =  action.code.split("\n").filter(variable => variable != '')
      _setVariables(code);
      var output = action.output;
      if(output.ok) {
        _validationOutput = {
          error: false,
          messages: ["Variable validadas correctamente"],
          result: output.values
        };
        _variableObjects = output.variables;
      } else {
        _validationOutput = {
          error: true,
          messages: output.errors,
          result: output.values
        };
        _variableObjects = output.variables;
      }
      VariableStore.emitChange();
      break;

    case VariableConstants.LOAD_VARIABLES:
      var code =  action.variables.text.split("\n").filter(variable => variable != '')
      _setVariables(code);
      VariableStore.emitChange();
      break;
    default:
  }
});

module.exports = VariableStore;
