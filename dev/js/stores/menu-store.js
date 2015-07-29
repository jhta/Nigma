const MenuActionsConstants = require('../constants/menu-constants');
const CHANGE_EVENT = 'change';

var Dispatcher = require('../dispatchers/dispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _folders = [];

function _addFolder(folderName) {

}

function _setFolders(folders) {
  _folders = folders;
}

function _addQuestion(folderIndex, question) {

}

var MenuStore = assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getFolders(){
    return _folders;
  }
});

MenuStore.dispatchToken = Dispatcher.register(function(action) {
  switch (action.type) {
    case MenuActionsConstants.ADD_FOLDER:
      _addFolder(action.folderName, MenuStore);
      break;
    case MenuActionsConstants.ADD_QUESTION:
      _addQuestion(action.folderIndex, action.question);
      MenuStore.emitChange();
      break;
    case MenuActionsConstants.LIST_FOLDERS:
      _setFolders(action.folders);
      MenuStore.emitChange();
    default:
  }
});

module.exports = MenuStore;
