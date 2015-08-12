const MenuActionsConstants = require('../constants/menu-constants');
const CHANGE_EVENT = 'change';

var Dispatcher = require('../dispatchers/dispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _folders = [];

function _addFolder(folder) {
  _folders.push(folder);
}

function _setFolders(folders) {
  _folders = folders;
}

function _createQuestion(folderIndex, question) {
  _folders[folderIndex].questions.push(question)
}
function _deleteFolder(folderIndex, folder) {
  if(_folders[folderIndex]._id == folder._id){
    _folders.splice(folderIndex, 1)
  }
}

function _editFolder(folderIndex, folder, folderName) {
  if(_folders[folderIndex]._id == folder._id){
    _folders[folderIndex].name = folderName
  }
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
      _addFolder(action.folder);
      MenuStore.emitChange();
      break;
    case MenuActionsConstants.ADD_QUESTION:
      _createQuestion(action.folderIndex, action.question);
      MenuStore.emitChange();
      break;
    case MenuActionsConstants.LIST_FOLDERS:
      _setFolders(action.folders);
      MenuStore.emitChange();
      break;
    case MenuActionsConstants.DELETE_FOLDER:
      _deleteFolder(action.folderIndex, action.folder);
      MenuStore.emitChange();
      break;
    case MenuActionsConstants.EDIT_FOLDER:
      _editFolder(action.folderIndex, action.folder, action.folderName);
      MenuStore.emitChange();
      break;
    default:
  }
});

module.exports = MenuStore;
