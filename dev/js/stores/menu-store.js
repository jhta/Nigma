const MenuActionsConstants = require('../constants/menu-constants');
const CHANGE_EVENT = 'change';

var Dispatcher = require('../dispatchers/dispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var _folders = require('../components/menu/example-items');

function _addFolder(folderName) {
  var lastId = _folders[_folders.length - 1];
  var folder = {
    id: lastId  + 1,
    name: folderName,
    items: []
  }
  _folders.push(folder);
}

var MenuStore = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  getFolders: function() {
    return _folders;
  }
});

MenuStore.dispatchToken = Dispatcher.register(function(action) {
  switch (action.type) {
    case MenuActionsConstants.ADD_FOLDER:
      _addFolder(action.folderName);
      MenuStore.emitChange();
      break;
    default:
  }
});

module.exports = MenuStore;
