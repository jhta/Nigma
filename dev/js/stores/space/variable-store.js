const VariableConstants = require('../../constants/space/variable-constants');
const CHANGE_EVENT = 'VariableStoreChange';
var Dispatcher = require('../../dispatchers/dispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var Parser = require('../../utils/variables/parser');


var _variables = "";
var _validationOutput = {};

function _addVariable (variableCode) {
  _variables+= variableCode + "\n";
}

function _setVariables (code) {
  console.log("codigo", code);
  if(code.length != 0)
    _variables = code.join("\n") + "\n";
}

function _validateCode (code) {
  var outputCompilation = Parser.generateCode(code);
  if (outputCompilation.errors.length == 0) {
    var outputExecution = Parser.executeCode(outputCompilation.variables);
    if (outputExecution.errors.length == 0) {
      return {
        error: false,
        errors: [],
        result: outputExecution.result
      }
    } else {
      return {
        error: true,
        errors: outputExecution.errors,
        result: null
      }
    }
  } else {
    return {
      error: true,
      errors: outputCompilation.errors,
      result: null
    }
  }
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
    return _variables;
  },
  getValidationOutPut() {
    return _validationOutput;
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
      _setVariables(action.code);
      _validationOutput = _validateCode(action.code);
      VariableStore.emitChange();
      break;
    default:
  }
});

module.exports = VariableStore;
