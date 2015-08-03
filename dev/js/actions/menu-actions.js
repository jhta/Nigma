const MenuActionConstants = require('../constants/menu-constants');
const FolderAPI = require('../api/utils/folder');
const QuestionAPI = require('../api/utils/question');
var Dispatcher = require('../dispatchers/dispatcher.js');

var MenuActions = {
  createFolder(folderName) {
    FolderAPI.createFolder({
      folder: {
        name: folderName
      }
    }, (err, folder) => {
      if(!err){
        Dispatcher.dispatch({
          type: MenuActionConstants.ADD_FOLDER,
          folder: folder
        });
      }
    });

  },
  addQuestion(folderIndex, folder, questionName) {
    QuestionAPI.createQuestion({
        folderid: folder._id,
        name: questionName
      }, (err, question) => {
      if(!err){
        Dispatcher.dispatch({
          type: MenuActionConstants.ADD_QUESTION,
          folderIndex: folderIndex,
          question: question
        });
      }
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
  },
  deleteFolder(folderIndex, folder){
    FolderAPI.deleteFolder({folderid: folder._id}, (err, res) => {
      if(!err){
        Dispatcher.dispatch({
          type: MenuActionConstants.DELETE_FOLDER,
          folderIndex: folderIndex,
          folder: folder
        });
      }
    });
  },
  editFolder(folderIndex, folder, folderName){
    folderName = "LALAL ESTO ESTA QUEMADO EN ACTIONS"
    FolderAPI.editFolder({folderid: folder._id, name: folderName}, (err, res) => {
      if(!err){
        Dispatcher.dispatch({
          type: MenuActionConstants.EDIT_FOLDER,
          folderIndex: folderIndex,
          folder: folder,
          folderName: folderName
        });
      }
    });
  }

}

module.exports = MenuActions;
