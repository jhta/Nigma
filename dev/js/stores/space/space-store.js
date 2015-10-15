const SpaceConstants = require('../../constants/space/space-constants');
const CHANGE_EVENT = 'SpaceStoreChange';
var Dispatcher = require('../../dispatchers/dispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var _preview = null;
var SpaceStore = assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },


  getPreview(){
    return _preview
  }
});

SpaceStore.dispatchToken = Dispatcher.register(function(action) {
  _preview = null;
  switch (action.type) {
    case SpaceConstants.PREVIEW_QUESTION:
      _preview = {}
      _preview['error'] = !action.response;
      _preview['message'] = action.response ? "":'Se presentó un error intenta de nuevo más tarde'
      SpaceStore.emitChange();
      break;

    default:
  }
});

module.exports = SpaceStore;
