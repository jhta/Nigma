const VariableConstants = require('../../constants/space/variable-constants');
const CHANGE_EVENT = 'VariableStoreChange';
var Dispatcher = require('../../dispatchers/dispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var Parser = require('../../utils/parser');


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

function _validateCode (code) {
  var outputCompilation = Parser.compile(code);
  if (outputCompilation.errors.length == 0) {
    var outputExecution = Parser.executeCode(outputCompilation.variables);
    if (outputExecution.errors.length == 0) {
      _variableObjects = outputCompilation.variables;
      return {
        error: false,
        messages: ["Variables successfuly validated"],
        result: outputExecution.result
      }
    } else {
      return {
        error: true,
        messages: outputExecution.errors,
        result: null
      }
    }
  } else {
    return {
      error: true,
      messages: outputCompilation.errors,
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
      _setVariables(action.code);
      _validationOutput = _validateCode(action.code);
      VariableStore.emitChange();
      break;
    default:
  }
});

module.exports = VariableStore;
