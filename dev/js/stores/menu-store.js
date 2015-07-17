const MenuActionsConstants = require('../constants/menu-constants');
const CHANGE_EVENT = 'change';

var Dispatcher = require('../dispatchers/dispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var _folders = require('../components/menu/example-items');

function _addFolder(folderName) {
  var folder = {
    id: _folders.length + 1,
    name: folderName,
    items: []
  }
  _folders.push(folder);
}

function _addQuestion(folderIndex, question) {
  if(folderIndex >= 0 && folderIndex < _folders.length){
    _folders[folderIndex].items.push({
      title: question
    });
  }
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
    case MenuActionsConstants.ADD_QUESTION:
      _addQuestion(action.folderIndex, action.question);
      MenuStore.emitChange();
      break;
    default:
  }
});

module.exports = MenuStore;
