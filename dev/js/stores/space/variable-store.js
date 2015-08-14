const VariableConstants = require('../../constants/space/variable-constants');
const CHANGE_EVENT = 'VariableStoreChange';
var Dispatcher = require('../../dispatchers/dispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var _variables = "";

function _addVariable (variableCode) {
  _variables+= variableCode + "\n";
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
  }
});

VariableStore.dispatchToken = Dispatcher.register(function(action) {
  switch (action.type) {
    case VariableConstants.ADD_VARIABLE:
      _addVariable(action.variableCode);
      VariableStore.emitChange();
      break;
    default:
  }
});

module.exports = VariableStore;
