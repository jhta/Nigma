const MenuActionConstants = require('../constants/menu-constants');
const FolderAPI = require('../api/utils/folder');
var Dispatcher = require('../dispatchers/dispatcher.js');

var MenuActions = {
  addFolder(folderName) {
    Dispatcher.dispatch({
      type: MenuActionConstants.ADD_FOLDER,
      folderName: folderName
    });
  },
  addQuestion(folderIndex, question) {
    Dispatcher.dispatch({
      type: MenuActionConstants.ADD_QUESTION,
      folderIndex: folderIndex,
      question: question
    });
  },
  listFolders() {
    FolderAPI.listFolders({}, (err, folders) => {
      if(!err){
        Dispatcher.dispatch({
          type: MenuActionConstants.LIST_FOLDERS,
          folders: folders
        });
      }
    });
  }


}

module.exports = MenuActions;
