const MetadataConstants = require('../../constants/space/metadata-constants');
const CHANGE_EVENT = 'SpaceStoreChange';
var Dispatcher = require('../../dispatchers/dispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var _metadata= null;

var MetadataStore = assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getMetadata(){
    return _metadata
  },


});

MetadataStore.dispatchToken = Dispatcher.register(function(action) {

  switch (action.type) {
    case MetadataConstants.SET_METADATA:
      _metadata = action.data;
      break;
    default:
  }
});

module.exports = MetadataStore;
