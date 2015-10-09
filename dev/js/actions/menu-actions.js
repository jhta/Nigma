const MenuActionConstants = require('../constants/menu-constants');
const FolderAPI = require('../api/utils/folder');
const QuestionAPI = require('../api/utils/question');
var Dispatcher = require('../dispatchers/dispatcher.js');

var MenuActions = {
  createFolder(folderName, rootId, folderRoot) {
    FolderAPI.createFolder({
      folderid: rootId,
      folder: {
        name: folderName
      }
    }, (err, folder) => {
      if(!err){

        Dispatcher.dispatch({
          type: MenuActionConstants.ADD_FOLDER,
          folder: folder,
          folderRoot: folderRoot,
        });
      }
    });

  },
  createQuestion(questionName, folderId, folderRoot) {
    QuestionAPI.createQuestion({
        folderid: folderId,
        question: {
          name: questionName
        }
      }, (err, question) => {
      if(!err){
        Dispatcher.dispatch({
          type: MenuActionConstants.ADD_QUESTION,
          question: question,
          folderRoot: folderRoot,
        });
      }
    });
  },
  deleteQuestion(index, question) {
    Dispatcher.dispatch({
        type: MenuActionConstants.DELETE_QUESTION,
        question: question,
        index: index,
      });
  },

  listFolders() {
    FolderAPI.listFolders({}, (err, res) => {
      if(!err) {
        Dispatcher.dispatch({
          type: MenuActionConstants.LIST_FOLDERS,
          rootFolder: res.root_folder
        });
      } else {
        
        alert("whatda fuc?");
      }
    });
  },
  deleteFolder(folderIndex, folder) {
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
  updateFolder(folderIndex, folder, folderName){
    folderName = "LALAL ESTO ESTA QUEMADO EN ACTIONS"
    var data = {
      folderid: folder._id,
      folder: {
        name: folderName
      }
    }
    FolderAPI.updateFolder(data, (err, res) => {
      if(!err){
        Dispatcher.dispatch({
          type: MenuActionConstants.EDIT_FOLDER,
          folderIndex: folderIndex,
          folder: folder,
          folderName: folderName
        });
      }
    });
  },

  shareQuestion(questionIndex, question, email) {
    const data =  {
      user: {
        email: email,
      },
      questionId: question._id,
    }
    QuestionAPI.shareQuestion(data, (err, res) => {
      if (!err) {
        const type = MenuActionConstants.SHARE_ITEM;
        Dispatcher.dispatch({
          type,
          question,
          questionIndex
        });
      }
    });
  },

  shareFolder(folderIndex, folder, email) {
    const data =  {
      user: {
        email: email,
      },
      folderId: folder._id,
    }
    FolderAPI.shareFolder(data, (err, res) => {
      if (!err) {
        const type = MenuActionConstants.SHARE_FOLDER;
        Dispatcher.dispatch({
          type,
          folder,
          folderIndex
        });
      }
    });
  }

}

module.exports = MenuActions;
