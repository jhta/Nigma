const FormulationConstants = require('../../constants/space/formulation-constants');
const CHANGE_EVENT = 'FormulationStore';
var Dispatcher = require('../../dispatchers/dispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var _formulation = '';
var FormulationStore = assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getFormulation(){
    return _formulation
  },

  setFormulation(formulation) {
    _formulation = formulation
  }
});

FormulationStore.dispatchToken = Dispatcher.register(function(action) {
  switch (action.type) {
    case FormulationConstants.ADD_FORMULATION:
      console.log(action);
      FormulationStore.setFormulation(action.formulation);
      FormulationStore.emitChange();
      break;
    default:
  }
});

module.exports = FormulationStore;
